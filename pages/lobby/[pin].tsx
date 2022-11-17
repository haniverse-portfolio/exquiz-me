import Router, { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRef } from "react";
import React, { useEffect } from "react";
import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useRecoilState } from "recoil";
import {
  inboxRoom,
  lobbyParticipants,
  playProblem,
} from "../../components/States";

import { avatarAnimal, avatarColor } from "../../components/ConstValues";

const connectMainServerApiAddress = "https://api.exquiz.me/";

import {
  Button,
  Group,
  useMantineTheme,
  Stack,
  CopyButton,
  Divider,
  Center,
  ActionIcon,
  Grid,
  ScrollArea,
} from "@mantine/core";
import { ArrowBigRightLines, Qrcode, Copy } from "tabler-icons-react";
import IndexNavigation from "../../components/index/IndexNavigation";

const Home: NextPage = () => {
  const [partlist, setPartlist] = useRecoilState(lobbyParticipants);
  const [problem, setProblem] = useRecoilState(playProblem);
  // const addParticipant = (cur: object) => {
  //   // console.log("추가전 직전 참가자 정보");
  //   // console.log(partlist);
  //   let newParticipant = cur;
  //   // JSON.parse(message.body)
  //   setPartlist([...partlist, curParticipant]);
  // };

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
  const router = useRouter();

  const pin = router.query.pin;
  const theme = useMantineTheme();

  useEffect(() => {
    if (!router.isReady) return;
    connect();
    getPartlist();
    getRoomOpened(router.query.pin as string);
  }, [router.isReady]);

  const [curParticipant, setCurParticipant] = useState({
    colorNumber: 0,
    imageNumber: 0,
    flag: "",
    fromSession: "",
    id: 0,
    name: "test_index_0",
    nickname: "",
    entryDate: 0,
    currentScore: 0,
  });
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const [active, setActive] = useState(0);
  const [room, setRoom] = useRecoilState(inboxRoom);

  {
    /* webSocket */
  }

  var socket = new SockJS(connectMainServerApiAddress + "stomp");
  let client: Stomp.Client;
  client = Stomp.over(socket);

  let connect = () => {
    const headers = {};
    var reconnect = 0;
    client.connect(
      {},
      function (frame) {
        console.log(router.query.pin);
        if (router.query.pin === undefined) router.push("/404");
        // getRoomOpened(router.query.pin as string);
        client.subscribe(
          "/topic/room/" + router.query.pin + "/host",
          function (message) {
            if (JSON.parse(message.body).messageType === "PARTICIPANT") {
              setPartlist(JSON.parse(message.body).participantList);
            }
          }
        );
      },
      function (error) {
        // connect();
      }
    );

    socket.onclose = function () {
      setTimeout(() => {
        getPartlist();
        socket = connect();
        partlist;
      }, 1000);
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
      <section className="h-[100vh]">
        <IndexNavigation></IndexNavigation>
        {/* 메인 배너 */}
        <Grid style={{ height: "calc(100vh - 60px)" }} gutter={0} columns={20}>
          <Grid.Col
            style={{ height: "calc(100vh - 60px)" }}
            className="bg-[#FFD178]"
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
                    {/* <CopyButton value={pin as string}>
                    {({ copied, copy }) => (
                      <ActionIcon color="orange" variant="light" onClick={copy}>
                        <Copy></Copy>
                      </ActionIcon>
                    )}
                  </CopyButton> */}
                  </Group>
                </Stack>
                <Button
                  className="mt-32 cursor-pointer"
                  onClick={() => {
                    client.send("/pub/room/" + pin + "/start", {});
                    router.push(`/display/${pin}`);
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
                  <strong className="text-blue-500">{partlist.length}</strong>
                  /30명
                </p>
              </Group>
              {
                <ScrollArea
                  className="px-8"
                  style={{ height: "calc(100vh - 60px)" }}
                >
                  <Stack>
                    <Grid columns={6}>
                      {partlist.map((cur: any, i) => {
                        return (
                          <Grid.Col
                            className="flex items-center justify-center h-60 rounded-xl bg-white shadow-lg"
                            span={1}
                            key={i}
                          >
                            <Center>
                              <Stack>
                                <Center
                                  className={`w-[120px] h-[120px] ${
                                    avatarColor[cur.colorNumber]
                                  } rounded-full shadow-lg`}
                                >
                                  <Image
                                    alt="hello"
                                    className={`cursor-pointer rounded-full`}
                                    src={avatarAnimal[cur.imageNumber]}
                                    width={"100px"}
                                    height={"100px"}
                                  ></Image>
                                </Center>
                                <p className="text-center text-black">
                                  {cur.nickname}
                                </p>
                              </Stack>
                            </Center>
                          </Grid.Col>
                        );
                      })}
                    </Grid>
                  </Stack>
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

// {
//   colorNumber: 0,
//   imageNumber: 0,
//   flag: "",
//   fromSession: "",
//   id: 0,
//   name: "test_index_0",
//   nickname: "초대해보세요",
//   entryDate: 0,
//   currentScore: 0,
// },
