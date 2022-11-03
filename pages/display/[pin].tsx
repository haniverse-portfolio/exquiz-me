import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useState } from "react";
import { useRef } from "react";
import React, { useEffect } from "react";
import {
  Button,
  Group,
  useMantineTheme,
  Stack,
  Grid,
  Progress,
  Center,
  Divider,
  Drawer,
  ActionIcon,
  ScrollArea,
  MantineProvider,
} from "@mantine/core";
import {
  Alarm,
  BellRinging,
  Pencil,
  ArrowBigRightLines,
  Router,
  IdOff,
} from "tabler-icons-react";

import { useRecoilState } from "recoil";
import { useDebouncedState, useInterval } from "@mantine/hooks";
import {
  avatarAnimal,
  connectMainServerApiAddress,
  testPlayOption,
  testPlayProblem,
  testUserData,
} from "../../components/ConstValues";
import {
  playIsDrawerOpened,
  playMessagetype,
  playParticipants,
} from "../../components/States";
import axios from "axios";

const Home: NextPage = () => {
  const bgAudio = useRef(null) as any;

  const [seconds, setSeconds] = useState(30);
  const interval = useInterval(() => setSeconds((s) => s - 0.05), 50);
  const [messagetypestate, setPlaymessagetypestate] =
    useRecoilState(playMessagetype);

  const router = useRouter();
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const [active, setActive] = useState(0);
  let [image, setImage] = useState("https://www.exquiz.me/panda.png");

  let [step, setStep] = useState(0);
  let [curIdx, setCurIdx] = useState(0);
  let [answer, setAnswer] = useState(-1);

  const [problem, setProblem] = useState(testPlayProblem);
  const [option, setOption] = useState(testPlayOption);
  const [participants, setParticipants] = useState(playParticipants);

  let stompClient: Stomp.Client;

  let connect = () => {
    const headers = {};
    var socket = new SockJS(connectMainServerApiAddress + "stomp");
    stompClient = Stomp.over(socket);
    var reconnect = 0;
    stompClient.connect(
      {},
      function (frame) {
        stompClient.subscribe(
          "/topic/room/" + router.query.pin + "/host",
          function (message) {
            if (JSON.parse(message.body).messageType === "NEW_PROBLEM") {
              // audio.play();
            }
          }
        );
      },
      function (error) {
        // connect();
      }
    );
  };

  // let [problem, setProblem] = useRecoilState(playProblem);
  // let [option, setOption] = useRecoilState(playOption);

  useEffect(() => {
    const promise = bgAudio.current.play();
    if (promise !== undefined) {
      alert("audio_not_play");
    }
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    connect();
  }, [router.isReady]);

  useEffect(() => {
    if (messagetypestate === "NEWPROBLEM") {
      interval.start();
      return interval.stop;
    }
  }, [messagetypestate]);

  useEffect(() => {
    if (seconds <= 0) {
      setSeconds(30);
      interval.stop();
      setStep(1);
    }
  }, [seconds]);

  useEffect(() => {
    setImage("https://exquiz.me/dino_env.png");
  }, []);

  const getParticipantList = () => {
    axios
      .get(
        connectMainServerApiAddress +
          "api/room/" +
          router.query.pin +
          "/participants"
      )
      .then((result) => {
        setParticipants(result.data);
      })
      .catch((error) => {
        alert(error);
      });
    return;
  };

  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Drawer
        opened={isDrawerOpened === "0" ? false : true}
        onClose={() => setDrawerOpened("0")}
        title="Register"
        padding="xl"
        size="100%"
      >
        hello
      </Drawer> */}
      <audio
        ref={bgAudio}
        className="invisible"
        src="/sounds/play_music.wav"
      ></audio>
      <main className="h-[100vh]">
        <section
          style={{ height: "calc(100vh - 140px)" }}
          className="bg-[#EDF4F7]"
        >
          <Group className="bg-[#273248]" position="right">
            <Button
              variant="outline"
              color="orange"
              onClick={() => {
                setStep(step - 1);
              }}
            >
              테스트용 이전 씬
            </Button>
            <Button
              variant="outline"
              color="orange"
              onClick={() => {
                setStep(step + 1);
              }}
            >
              테스트용 다음 씬
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setPlaymessagetypestate("NEWPROBLEM");
              }}
            >
              문제 시간 스타트
            </Button>
          </Group>
          <Stack className="items-center flex contents-between">
            {/* 메인 배너 */}
            {step === 0 ? (
              <Stack spacing={0}>
                <header className="h-[140px] bg-[#273248]">
                  <Group
                    position="center"
                    style={{
                      height: "140px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ActionIcon variant="transparent" size={60}>
                      <Alarm size={60} color="orange"></Alarm>
                    </ActionIcon>
                    <MantineProvider
                      inherit
                      theme={{
                        defaultGradient: { from: "red", to: "orange", deg: 45 },
                      }}
                    >
                      <Progress
                        className="w-[70vw]"
                        size="xl"
                        color="orange"
                        // color={theme.fn.gradient({
                        //   from: "red",
                        //   to: "orange",
                        //   deg: 45,
                        // })}
                        value={(seconds / problem[curIdx].timelimit) * 100.0}
                      />
                    </MantineProvider>
                    <p className="font-semibold text-amber-500 text-3xl">
                      {Math.floor(seconds)}
                    </p>
                  </Group>
                </header>

                <Group className="mr-16" position="right">
                  <Group
                    position="center"
                    className="h-16 w-72 bg-white rounded-b-xl shaodw-2xl"
                  >
                    <Group>
                      <p className="text-center">문제 풀이 현황</p>
                      <ActionIcon color="orange" variant="transparent">
                        <Pencil></Pencil>
                      </ActionIcon>
                      <p className="font-bold text-center">
                        <strong className="text-orange-500">19</strong>
                        /30명
                      </p>
                    </Group>
                  </Group>
                </Group>
                <Stack>
                  <Stack className="relative bg-white mx-16 rounded-xl shadow-xl">
                    <Stack
                      align="center"
                      className="ml-16 absolute -top-8 rounded-full bg-orange-500 h-12 w-40"
                    >
                      <p className="m-auto text-center text-2xl text-white font-semibold">
                        문제 1/5
                      </p>
                    </Stack>
                    <Group>
                      <p className="ml-16 text-4xl text-orange-500 font-bold">
                        Q.{" "}
                      </p>
                      <p className="font-bold text-4xl text-left mt-10">
                        {problem[curIdx].description}
                      </p>
                    </Group>
                  </Stack>
                  {/* <Image
                    alt="hello"
                    src="/../public/halla4.jpeg"
                    width={600}
                    height={400}
                  ></Image> */}
                  <Stack className=" mx-16">
                    <Grid columns={4} gutter="xl">
                      {option[curIdx].map(
                        ({ description, idx, picture, problemId }, i) => {
                          return (
                            <Grid.Col key={i} span={1}>
                              <Button
                                variant="white"
                                color="gray.5"
                                fullWidth
                                className="!h-60 bg-white rounded-xl"
                              >
                                <p className="text-2xl text-left">{i + 1}. </p>
                                <p className="text-2xl text-center">
                                  {description}
                                </p>
                              </Button>
                            </Grid.Col>
                          );
                        }
                      )}
                    </Grid>
                  </Stack>
                </Stack>
              </Stack>
            ) : (
              <></>
            )}
            {step === 1 ? (
              <Grid
                style={{ height: "calc(100vh - 70px)" }}
                gutter={0}
                columns={20}
              >
                <Grid.Col
                  style={{ height: "calc(100vh - 70px)" }}
                  className="bg-[#273248]"
                  span={6}
                >
                  <Center>
                    <Stack align="apart" spacing={0}>
                      <Stack>
                        <p className="text-white py-16 m-0 font-semibold text-4xl text-center">
                          정답자 수는?
                        </p>
                        <p className="text-white font-bold text-4xl text-center">
                          35명 중{" "}
                          <strong className="text-4xl text-orange-500 font-bold">
                            10명
                          </strong>
                        </p>
                      </Stack>
                      <Stack>
                        <Button
                          onClick={() => {
                            setStep(2);
                          }}
                          color="orange"
                          variant="light"
                          size="xl"
                        >
                          해설하기
                        </Button>
                        <Button
                          onClick={() => {
                            setStep(0);
                          }}
                          color="orange"
                          variant="filled"
                          size="xl"
                        >
                          다음으로
                        </Button>
                      </Stack>
                    </Stack>
                  </Center>
                </Grid.Col>
                <Grid.Col
                  style={{ height: "calc(100vh - 70px)" }}
                  className="bg-[#F9F5F4]"
                  span={14}
                >
                  <Stack className="px-8">
                    {
                      <ScrollArea style={{ height: "calc(100vh - 70px)" }}>
                        <Stack style={{ height: "400vh" }}>
                          {/* <Grid columns={6}>
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
                        </Grid> */}
                        </Stack>
                      </ScrollArea>
                    }
                  </Stack>
                </Grid.Col>
              </Grid>
            ) : (
              <></>
            )}

            {step === 2 ? (
              <>
                <Stack>
                  <Stack className="bg-white mx-16 rounded-xl shadow-xl">
                    <Stack
                      align="center"
                      className="ml-16 relative bottom-8 rounded-full bg-orange-500 h-12 w-40"
                    >
                      <p className="m-auto text-center text-2xl text-white font-semibold">
                        문제 1/5
                      </p>
                    </Stack>
                    <Group>
                      <p className="ml-16 text-4xl text-orange-500 font-bold">
                        Q.{" "}
                      </p>
                      <p className="font-bold text-4xl text-left mt-10">
                        {problem[curIdx].description}
                      </p>
                    </Group>
                  </Stack>
                  {/* <Image
                  alt="hello"
                  src="/../public/halla4.jpeg"
                  width={600}
                  height={400}
                ></Image> */}
                  <Stack className=" mx-16">
                    <Grid columns={4} gutter="xl">
                      {option[curIdx].map(
                        ({ description, idx, picture, problemId }, i) => {
                          return (
                            <Grid.Col key={i} span={1}>
                              <Button
                                variant="white"
                                color="gray.5"
                                fullWidth
                                className="!h-60 bg-white rounded-xl"
                              >
                                <p className="text-2xl text-left">{i + 1}. </p>
                                <p className="text-2xl text-center">
                                  {description}
                                </p>
                              </Button>
                            </Grid.Col>
                          );
                        }
                      )}
                    </Grid>
                  </Stack>
                </Stack>
              </>
            ) : (
              <></>
            )}
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

//!max-w-[25%] !basis-1/4
