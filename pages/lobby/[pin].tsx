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
import { lobbyParticipants } from "../../components/States";

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
import LobbyNavigation from "../../components/lobby/LobbyNavigation";

const Home: NextPage = () => {
  const [partlist, setPartlist] = useRecoilState(lobbyParticipants);
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
        // validation
        if (result.data.currentState !== "READY") return;
      })
      .catch((error) => {
        router.push("/404");
      });
    return;
  };
  const router = useRouter();

  const pin = router.query.pin;
  const theme = useMantineTheme();

  useEffect(() => {
    if (!router.isReady) return;
    connect();
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

  {
    /* webSocket */
  }
  let client: Stomp.Client;

  var socket = new SockJS(connectMainServerApiAddress + "stomp");
  client = Stomp.over(socket);

  let connect = () => {
    const headers = {};

    var reconnect = 0;
    client.connect(
      {},
      function (frame) {
        console.log(router.query.pin);
        if (router.query.pin === undefined) router.push("/404");
        getRoomOpened(router.query.pin as string);
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
  };

  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LobbyNavigation></LobbyNavigation>
      <section style={{ height: "calc(100vh - 70px)" }}>
        {/* 메인 배너 */}
        <Grid style={{ height: "calc(100vh - 70px)" }} gutter={0} columns={20}>
          <Grid.Col
            style={{ height: "calc(100vh - 70px)" }}
            className="bg-[#FFD178]"
            span={6}
          >
            <Center>
              <Stack spacing={0}>
                <p className="py-16 m-0 font-semibold text-3xl text-center">
                  퀴즈 입장 로비 방
                </p>
                <Center>
                  <Stack className="w-64 h-12 shadow-lg rounded-t-2xl bg-orange-500">
                    <p className="text-center text-white">
                      QR코드를 공유해보세요!
                    </p>
                  </Stack>
                </Center>
                <Stack
                  align="center"
                  className=" w-80 h-80 shadow-lg rounded-2xl bg-white border-8 border-orange-500 border-solid"
                >
                  <Image
                    src="https://www.exquiz.me/qrcode.png"
                    width={150}
                    height={150}
                    alt="QR CODE"
                  />
                </Stack>
                <Group position="center">
                  <p className="font-bold text-orange-500 text-2xl text-center">
                    PIN 번호
                  </p>
                </Group>
                <Group position="center">
                  <p className="font-bold text-4xl text-center">
                    #{router.query.pin}
                  </p>
                  <CopyButton value={pin as string}>
                    {({ copied, copy }) => (
                      <ActionIcon color="orange" variant="light" onClick={copy}>
                        <Copy></Copy>
                      </ActionIcon>
                    )}
                  </CopyButton>
                </Group>
                <Button
                  className="cursor-pointer"
                  onClick={() => {
                    client.send("/pub/room/" + pin + "/start", {});
                  }}
                  size="xl"
                  color="orange"
                  variant="filled"
                  component="a"
                  href={`/display/${pin}`}
                >
                  퀴즈 시작하기!
                </Button>
              </Stack>
            </Center>
          </Grid.Col>
          <Grid.Col
            style={{ height: "calc(100vh - 70px)" }}
            className="bg-[#F9F5F4]"
            span={14}
          >
            <Stack className="px-8">
              <Group position="apart">
                <p className="font-semibold text-3xl">삼삼고등학교 3학년 2반</p>{" "}
                <p className="font-bold text-2xl text-center">
                  입장 인원 &nbsp;
                  <strong className="text-blue-500">{partlist.length}</strong>
                  /30명
                </p>
              </Group>
              <Divider size="sm"></Divider>
              {
                <ScrollArea style={{ height: "calc(100vh - 70px)" }}>
                  <Stack style={{ height: "400vh" }}>
                    <Grid columns={6}>
                      {partlist.map((cur: any, i) => {
                        return (
                          <Grid.Col
                            className="p-8 h-42 w-36 rounded-xl bg-white shadow-lg"
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
