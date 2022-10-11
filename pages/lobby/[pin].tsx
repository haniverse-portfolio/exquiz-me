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
  createImageList,
  createImageURL,
  createIsImageLoading,
  createOption,
  createProblem,
  createProblemIdx,
  createProblemset,
  createScore,
  createStep,
  createTabCurrentIdx,
  createTabNextIdx,
  createTargetIdx,
  createTimelimit,
  playParticipants,
  playPin,
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
} from "@mantine/core";
import { ArrowBigRightLines, Qrcode, Copy } from "tabler-icons-react";

const Home: NextPage = () => {
  const [partlist, setPartlist] = useRecoilState(playParticipants);
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
  let stompClient: Stomp.Client;

  let connect = () => {
    const headers = {};
    var socket = new SockJS(connectMainServerApiAddress + "stomp");
    stompClient = Stomp.over(socket);

    var reconnect = 0;
    stompClient.connect(
      {},
      function (frame) {
        console.log(router.query.pin);
        if (router.query.pin === undefined) router.push("/404");
        getRoomOpened(router.query.pin as string);
        stompClient.subscribe(
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
      <main style={{ margin: "0px 10px" }}>
        <section className="h-[85vh]">
          <Stack className="items-center flex contents-between">
            <Stack>
              {/* 메인 배너 */}
              <Stack className="mx-12">
                <Stack>
                  {/* <p className="underline decoration-amber-500 font-bold text-6xl text-left mt-10">
                    참가 코드
                  </p> */}
                  <Group className="mt-10">
                    <p className="font-bold text-9xl text-left">
                      <strong className="text-gray-400">#</strong>{" "}
                      {router.query.pin}
                    </p>{" "}
                    <CopyButton value={pin as string}>
                      {({ copied, copy }) => (
                        <Button
                          size="xl"
                          variant="light"
                          leftIcon={<Copy></Copy>}
                          color="orange"
                          onClick={copy}
                        >
                          {copied ? "복사됨!" : "복사하기"}
                        </Button>
                      )}
                    </CopyButton>
                    <Button
                      size="xl"
                      color="orange"
                      variant="filled"
                      component="a"
                      href="/inbox"
                      leftIcon={<Qrcode size={38} />}
                    >
                      QR코드
                    </Button>
                  </Group>
                </Stack>
                <Divider my="xs" />
                <Stack>
                  {
                    <Group className="h-[56vh]">
                      {partlist.map((cur, i) => {
                        return cur.nickname === "초대해보세요" ? (
                          <></>
                        ) : (
                          <Stack key={i}>
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
                          </Stack>
                        );
                      })}
                    </Group>
                  }
                </Stack>
                <Divider my="xs" />
                <Stack>
                  <Group position="apart" className="justify-between">
                    <p className="font-bold text-4xl">
                      입장 인원 /{" "}
                      <strong className="text-amber-500">
                        {partlist.length === 1 &&
                        partlist[0].nickname === "초대해보세요"
                          ? 0
                          : partlist.length}
                      </strong>
                      명<strong className="text-amber-500"></strong>
                    </p>
                    <Button
                      size="xl"
                      color="orange"
                      variant="outline"
                      component="a"
                      href={`/display/${pin}`}
                      rightIcon={<ArrowBigRightLines size={16} />}
                    >
                      시작하기
                    </Button>
                  </Group>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <br />
          <br />
          <br />
        </section>
      </main>
    </div>
  );
};

export default Home;
