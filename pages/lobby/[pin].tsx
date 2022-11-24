import Router, { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
import React, { useEffect } from "react";
import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useRecoilState } from "recoil";
import { indexIsLogined } from "../../components/States";

import {
  avatarAnimal,
  avatarColor,
  connectMainServerApiAddress,
  inboxRoomInput,
} from "../../components/ConstValues";

import {
  Button,
  Group,
  Stack,
  Center,
  Grid,
  ScrollArea,
  Loader,
  Modal,
} from "@mantine/core";
import IndexNavigation from "../../components/index/IndexNavigation";

const Home: NextPage = () => {
  const router = useRouter();

  const [partlist, setPartlist] = useState([]);
  const [isLogined, setIsLogined] = useRecoilState(indexIsLogined);

  const [visible, setVisible] = useState(false);
  const [room, setRoom] = useState(inboxRoomInput);

  useEffect(() => {
    // if (isLogined === false) router.push("/401");
    connect();
    getPartlist();
    getRoomOpened(router.query.pin as string);
  }, [router.isReady]);

  const getRoomOpened = (pin: string) => {
    axios
      .get(connectMainServerApiAddress + `api/room/${router.query.pin}/open`)
      .then((result) => {
        setRoom(result.data);
        // validation
        if (result.data.currentState !== "READY") return;
      })
      .catch((error) => {
        router.push("/404");
      });
    return;
  };

  const getPartlist = () => {
    axios
      .get(
        connectMainServerApiAddress +
          `api/room/${router.query.pin}/participants`
      )
      .then((result) => {
        setPartlist(result.data);
      })
      .catch((error) => {});
    return;
  };

  const [socketManager, setSocketManager] = useState<any>(null);
  let connect = () => {
    var socket = new SockJS(connectMainServerApiAddress + "stomp");
    let client: Stomp.Client;
    client = Stomp.over(socket);

    const headers = {};
    var reconnect = 0;
    client.connect(
      {},
      function (frame) {
        // if (socket.readyState !== 1) {
        //   return;
        // }
        if (router.query.pin === undefined) router.push("/404");
        client.subscribe(
          "/topic/room/" + router.query.pin + "/host",
          function (message) {
            // socket ready?
            if (socket.readyState !== 1) return;
            if (JSON.parse(message.body).messageType === "PARTICIPANT") {
              setPartlist(JSON.parse(message.body).participantList);
            }
            if (JSON.parse(message.body).messageType === "NEW_PROBLEM") {
              client.unsubscribe("lobby");
            }
          },
          { id: "lobby" }
        );
      },
      function (error) {
        // connect();
      }
    );
    setSocketManager(client);
    socket.onclose = function () {
      setTimeout(() => {
        getPartlist();
        socket = connect();
      }, 1);
    };

    return socket;
  };

  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal
        withCloseButton={false}
        overlayOpacity={0.55}
        overlayBlur={3}
        centered
        opened={visible}
        onClose={() => {}}
        className="animate-fadeIn"
      >
        <Center>
          <Stack align="center">
            <Loader color="orange" />
            <p className="text-center text-xl text-gray-500">
              {room.roomName}에 입장하는 중...
            </p>
          </Stack>
        </Center>
      </Modal>
      <section className="h-[100vh]">
        <IndexNavigation></IndexNavigation>
        {/* 메인 배너 */}
        <Grid style={{ height: "calc(100vh - 60px)" }} gutter={0} columns={20}>
          <Grid.Col
            style={{ height: "calc(100vh - 60px)" }}
            className="animate-textSlow bg-gradient-to-r from-[#FF9B3F] to-[#ffd178]"
            span={6}
          >
            <Center>
              <Stack spacing={0}>
                <p className="py-16 m-0 font-semibold text-3xl text-center">
                  퀴즈 입장 로비
                </p>
                <Center>
                  <Stack className="flex items-center justify-center w-64 h-12 shadow-lg rounded-t-2xl bg-orange-500">
                    <p className="text-2xl font-extrabold text-center text-white">
                      QR CODE
                    </p>
                  </Stack>
                </Center>
                <Stack
                  align="center"
                  className="flex items-center justify-center w-80 h-80 shadow-lg rounded-2xl bg-white border-8 border-orange-500 border-solid"
                >
                  <Image
                    src="/qr_code_enter.png"
                    width={280}
                    height={280}
                    alt="QR CODE"
                  />
                </Stack>
                <Stack className="rounded-xl p-4 mt-4 bg-[#FFE2A6]">
                  <Group position="center">
                    <p className="font-bold text-orange-500 text-2xl text-center">
                      PIN 번호
                    </p>
                  </Group>
                  <Group position="center">
                    <p className="text-white font-bold text-6xl text-center">
                      <strong className="tracking-wider text-[#273248]">
                        {router.query.pin}
                      </strong>
                    </p>
                  </Group>
                </Stack>
                <Button
                  className="mt-16 cursor-pointer"
                  onClick={() => {
                    setVisible(true);
                    setTimeout(() => {
                      router.push(`/display/${router.query.pin}`);
                      setVisible(false);
                      setTimeout(() => {
                        socketManager.send(
                          "/pub/room/" + router.query.pin + "/start",
                          {}
                        );
                      }, 1500);
                    }, 1500);
                  }}
                  size="xl"
                  color="orange"
                  variant="filled"
                  component="a"
                >
                  퀴즈 시작하기!
                </Button>
              </Stack>
            </Center>
          </Grid.Col>
          <Grid.Col
            style={{ height: "calc(100vh - 60px)" }}
            className="bg-[#F9F5F4]"
            span={14}
          >
            <Stack>
              <Group className="shadow-lg px-8" position="apart">
                <p className="font-semibold text-3xl">{room.roomName}</p>
                <p className="p-8 font-bold text-2xl text-center">
                  입장 인원 &nbsp;
                  <strong className="text-blue-500">{partlist.length}</strong>/
                  {room.maxParticipantCount}명
                </p>
              </Group>
              {
                <ScrollArea className="px-8" style={{ height: "calc(83vh)" }}>
                  <Grid columns={6}>
                    {partlist.map((cur: any, i) => {
                      return (
                        <Grid.Col
                          className="animate-fadeUp flex items-center justify-center h-60"
                          span={1}
                          key={i}
                        >
                          <Stack className="w-[400px] rounded-xl bg-white shadow-lg">
                            <Center
                              className={` rounded-t-xl h-[160px] ${
                                avatarColor[cur.colorNumber]
                              }  shadow-lg`}
                            >
                              <Image
                                alt="hello"
                                className={`cursor-pointer rounded-full`}
                                src={avatarAnimal[cur.imageNumber]}
                                width={"120px"}
                                height={"120px"}
                              />
                            </Center>
                            <p className="font-semibold 2xl:text-lg md:text-sm pb-4 text-center text-black">
                              {cur.nickname}
                            </p>
                          </Stack>
                        </Grid.Col>
                      );
                    })}
                  </Grid>
                </ScrollArea>
              }
            </Stack>
          </Grid.Col>
        </Grid>
      </section>
    </div>
  );
};

export default Home;
