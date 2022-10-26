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
            span={7}
          >
            <Center>
              <Stack spacing={0}>
                <p className="m-0 text-5xl text-left">실시간 퀴즈 플랫폼</p>
                <p className="m-0 font-semibold text-5xl text-left">
                  exquiz.me
                </p>
                <Stack className="shadow-lg rounded-xl bg-white border-8 border-amber-500">
                  <Image
                    className="m-0"
                    src="https://www.exquiz.me/rat.png"
                    width={300}
                    height={300}
                    alt="QR CODE"
                  />
                  <Group position="center">
                    <p className="font-bold text-gray-500 text-2xl text-left">
                      PIN 번호
                    </p>
                    <CopyButton value={pin as string}>
                      {({ copied, copy }) => (
                        <ActionIcon variant="outline" onClick={copy}>
                          <Copy></Copy>
                        </ActionIcon>
                      )}
                    </CopyButton>
                  </Group>
                  <p className="font-bold text-6xl text-center">
                    #{router.query.pin}
                  </p>
                </Stack>
                <Stack className="rounded-full bg-white">
                  <p className="py-8 font-bold text-4xl text-center">
                    입장 인원 &nbsp;
                    <strong className="text-amber-500">
                      {partlist.length}
                    </strong>
                    /30명
                    <strong className="text-amber-500"></strong>
                  </p>
                </Stack>
                <Button
                  onClick={() => {
                    client.send("/pub/room/" + pin + "/start", {});
                  }}
                  size="xl"
                  color="orange"
                  variant="filled"
                  component="a"
                  href={`/display/${pin}`}
                >
                  퀴즈 시작하기
                </Button>
              </Stack>
            </Center>
          </Grid.Col>
          <Grid.Col style={{ height: "calc(100vh - 70px)" }} span={13}>
            <Stack>
              <p className="font-semibold text-xl p-8">
                삼삼고등학교 3학년 2반
              </p>
              {
                <ScrollArea style={{ height: "calc(100vh - 70px)" }}>
                  <Stack style={{ height: "400vh" }}>
                    <Grid columns={6}>
                      {partlist.map((cur: any, i) => {
                        return (
                          <Grid.Col span={1} key={i}>
                            <Group className="h-32 w-32 rounded-xl border-2 bg-gray-200">
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
                            </Group>
                            <p className="text-center text-black">
                              {cur.nickname}
                            </p>
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
