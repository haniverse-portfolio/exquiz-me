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
  ActionIcon,
  ScrollArea,
  MantineProvider,
} from "@mantine/core";
import { Alarm, Pencil } from "tabler-icons-react";

import { useRecoilState } from "recoil";
import { useInterval } from "@mantine/hooks";
import { connectMainServerApiAddress } from "../../components/ConstValues";
import {
  playIdx,
  playIdx2,
  playMessagetype,
  playOption,
  playParticipants,
  playProblem,
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

  const [step, setStep] = useState(0);

  const [curIdx, setCurIdx] = useRecoilState(playIdx);
  const [problem, setProblem] = useRecoilState(playProblem);
  const [option, setOption] = useRecoilState(playOption);
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

  const getOption = (id: number) => {
    axios
      .get(
        connectMainServerApiAddress + "api/problem_options/" + id?.toString()
      )
      .then((result) => {
        setOption(result.data);
        // setOption
      })
      .catch((error) => {
        alert(error.data);
      });
    return;
  };

  useEffect(() => {
    if (!router.isReady) return;
    connect();

    const promise = bgAudio.current.play();
    if (promise !== undefined) {
    }
  }, [router.isReady]);

  useEffect(() => {
    // getOption((problem[curIdx] as any).id);
  }, [curIdx]);

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
      <main className="h-[100vh] bg-[#EDF4F7]">
        <section style={{ height: "calc(100vh - 140px)" }} className="">
          <Group className="bg-[#273248]" position="right">
            <Button
              variant="outline"
              color="purple"
              onClick={() => {
                console.log(problem);
              }}
            >
              문제를 보자
            </Button>
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
                        value={
                          // (seconds / (problem[curIdx] as any).timelimit || 0) *
                          // 100.0
                          100
                        }
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
                        <strong className="text-orange-500">0</strong>
                        /30명
                      </p>
                    </Group>
                  </Group>
                </Group>
                <Grid columns={2}>
                  <Grid.Col span={1}>
                    <Stack className="h-[70vh] relative bg-white mx-16 rounded-xl shadow-xl">
                      <Stack
                        align="center"
                        className="ml-16 absolute -top-8 rounded-full bg-orange-500 h-12 w-40"
                      >
                        <p className="m-auto text-center text-2xl text-white font-semibold">
                          문제 {curIdx + 1}/{problem.length}
                        </p>
                      </Stack>
                      <Group>
                        <p className="ml-16 text-4xl text-orange-500 font-bold">
                          Q.{" "}
                        </p>
                        <p className="font-bold text-4xl text-left mt-10">
                          {(problem[curIdx] as any).description}
                        </p>
                      </Group>
                      <Image
                        className="rounded-xl"
                        src={(problem[curIdx] as any).picture}
                        width={300}
                        height={500}
                      ></Image>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={1}>
                    <Stack className="h-[70vh] mx-16">
                      {(problem[curIdx] as any).dtype ===
                      "MultipleChoiceProblem" ? (
                        <Grid columns={2} gutter="xl">
                          {option.map(({ description }, i) => {
                            return (
                              <Grid.Col className="h-[35vh]" key={i} span={1}>
                                <Group className="!h-60 bg-white rounded-xl">
                                  <p className="text-2xl text-left">
                                    {i + 1}.{" "}
                                  </p>
                                  <p className="text-2xl text-center">
                                    {description}
                                  </p>
                                </Group>
                              </Grid.Col>
                            );
                          })}
                        </Grid>
                      ) : (
                        <></>
                      )}
                      {(problem[curIdx] as any).dtype === "objective" ? (
                        <Grid columns={2} gutter="xl">
                          {option.map(({ description }, i) => {
                            return (
                              <Grid.Col className="h-[35vh]" key={i} span={1}>
                                <Group className="!h-60 bg-white rounded-xl">
                                  <p className="text-2xl text-left">
                                    {i + 1}.{" "}
                                  </p>
                                  <p className="text-2xl text-center">
                                    {description}
                                  </p>
                                </Group>
                              </Grid.Col>
                            );
                          })}
                        </Grid>
                      ) : (
                        <></>
                      )}
                      {(problem[curIdx] as any).dtype === "ox" ? (
                        <Grid columns={2} gutter="xl">
                          <Grid.Col className="h-[70vh]" span={1}>
                            <Group className="!h-60 bg-white rounded-xl">
                              <p className="text-2xl text-left">O</p>
                            </Group>
                          </Grid.Col>
                          <Grid.Col className="h-[70vh]" span={1}>
                            <Group className="!h-60 bg-white rounded-xl">
                              <p className="text-2xl text-left">X</p>
                            </Group>
                          </Grid.Col>
                        </Grid>
                      ) : (
                        <></>
                      )}
                      {(problem[curIdx] as any).dtype === "nonsense" ? (
                        <Grid columns={2} gutter="xl">
                          {option.map(({ description }, i) => {
                            return (
                              <Grid.Col className="h-[35vh]" key={i} span={1}>
                                <Group className="!h-60 bg-white rounded-xl">
                                  <p className="text-2xl text-left">
                                    {i + 1}.{" "}
                                  </p>
                                  <p className="text-2xl text-center">
                                    {description}
                                  </p>
                                </Group>
                              </Grid.Col>
                            );
                          })}
                        </Grid>
                      ) : (
                        <></>
                      )}
                    </Stack>
                  </Grid.Col>
                </Grid>
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
                      <p className="text-4xl text-white font-semibold">
                        퀴즈 결과
                      </p>
                    </Group>
                  </header>
                  <Stack
                    style={{
                      height: "calc(100vh - 140px)",
                    }}
                    className=" bg-[#FFD178]"
                  >
                    <Stack className="h-[50vh] bg-opacity-50">e</Stack>
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
