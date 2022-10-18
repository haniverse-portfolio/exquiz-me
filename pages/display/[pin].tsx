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
} from "@mantine/core";
import {
  Alarm,
  BellRinging,
  Pencil,
  ArrowBigRightLines,
  Router,
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
  const [seconds, setSeconds] = useState(30);
  const interval = useInterval(() => setSeconds((s) => s - 0.05), 50);
  const [messagetypestate, setPlaymessagetypestate] =
    useRecoilState(playMessagetype);

  const router = useRouter();
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const [active, setActive] = useState(0);
  let [image, setImage] = useState("/../public/panda.png");

  let [step, setStep] = useState(0);
  let [curIdx, setCurIdx] = useState(0);
  let [answer, setAnswer] = useState(-1);

  const [problem, setProblem] = useState(testPlayProblem);
  const [option, setOption] = useState(testPlayOption);
  const [isDrawerOpened, setDrawerOpened] = useState(playIsDrawerOpened);
  const [participants, setParticipants] = useState(playParticipants);
  const [leftParticipants, setLeftParticipants] = useState(playParticipants);

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
            // do it
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
    setImage("/../public/dino_env.png");
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
      <Button
        color="orange"
        onClick={() => {
          setStep(step - 1);
        }}
      >
        테스트용 이전 씬
      </Button>
      <Button
        color="orange"
        onClick={() => {
          setStep(step + 1);
        }}
      >
        테스트용 다음 씬
      </Button>
      <Button
        onClick={() => {
          setPlaymessagetypestate("NEWPROBLEM");
        }}
      >
        문제 시간 스타트
      </Button>

      <main>
        <section className="h-[100vh]">
          <Stack className="items-center flex contents-between">
            {/* 메인 배너 */}
            {step === 0 ? (
              <Stack>
                <Stack>
                  {/* ../public/globe_banner.png */}
                  <p className=" font-bold text-7xl text-center mt-10">
                    {problem[curIdx].description}
                  </p>
                  <Progress
                    size="xl"
                    color="orange"
                    value={(seconds / problem[curIdx].timelimit) * 100.0}
                  />
                  <p>테스트용 시간 출력: {seconds}</p>
                  <Image
                    alt="hello"
                    src="/../public/halla.png"
                    width={600}
                    height={400}
                  ></Image>
                  <Stack>
                    <Grid className="" justify="center" gutter="sm">
                      {option[curIdx].map(
                        ({ description, idx, picture, problemId }, i) => {
                          let color = ["red", "blue", "green", "orange"];
                          let bgColor = "hover:bg-" + color[i] + "-500";
                          return (
                            <Grid.Col
                              className="!max-w-[50%] !basis-2/4"
                              key={i}
                              span={5}
                              offset={0}
                            >
                              <Button
                                fullWidth
                                style={{ height: "100px" }}
                                onClick={() => {
                                  setAnswer(answer === i ? -1 : i);
                                }}
                                color={color[i]}
                                className="shadow-md"
                                variant="outline"
                              >
                                <p className="text-lg"> {description}</p>
                              </Button>
                            </Grid.Col>
                          );
                        }
                      )}
                    </Grid>
                  </Stack>
                </Stack>
                <Divider my="xs" />
                <Center>
                  <Group>
                    {[0, 3, 5, 2, 4, 6, 8, 7, 0, 2].map((description, i) => {
                      return (
                        <Image
                          key={i}
                          alt="hello"
                          className={`cursor-pointer rounded-full`}
                          src={avatarAnimal[description]}
                          width={"50px"}
                          height={"50px"}
                        ></Image>
                      );
                    })}
                  </Group>
                </Center>
              </Stack>
            ) : (
              <></>
            )}
            {step === 1 ? (
              <Stack>
                <Stack>
                  {/* ../public/globe_banner.png */}
                  <p className="underline decoration-amber-500 font-bold text-7xl text-center mt-10">
                    정답은 3번입니다.
                  </p>
                  <p className="underline decoration-amber-500 font-bold text-7xl text-center mt-10">
                    {problem[curIdx].description}
                  </p>
                  <Image
                    alt="hello"
                    src={image}
                    width={600}
                    height={400}
                  ></Image>
                  <Stack>
                    <Grid className="" justify="center" gutter="sm">
                      {option[curIdx].map(
                        ({ description, idx, picture, problemId }, i) => {
                          let color = ["red", "blue", "green", "orange"];
                          let bgColor = "hover:bg-" + color[i] + "-500";
                          return (
                            <Grid.Col
                              className="!max-w-[50%] !basis-2/4"
                              key={i}
                              span={5}
                              offset={0}
                            >
                              <Button
                                fullWidth
                                style={{ height: "100px" }}
                                onClick={() => {
                                  setAnswer(answer === i ? -1 : i);
                                }}
                                color={color[i]}
                                className={`${
                                  answer === i ? "shadow-inner text-white" : ""
                                } shadow-md ${answer === i ? bgColor : ""} ${
                                  answer === i ? bgColor : ""
                                }`}
                                variant={answer === i ? "filled" : "outline"}
                              >
                                <p className="text-lg"> {description}</p>
                              </Button>
                            </Grid.Col>
                          );
                        }
                      )}
                    </Grid>
                  </Stack>
                </Stack>

                <Group className="justify-between">
                  <Button
                    color="orange"
                    onClick={() => {
                      setStep(step + 1);
                    }}
                    className="mx-4 h-[60px] w-[200px]"
                    variant="outline"
                    component="a"
                    rel="noopener noreferrer"
                    rightIcon={<Alarm size={38} />}
                  >
                    순위 변동
                  </Button>

                  <Button
                    color="orange"
                    onClick={() => {
                      setStep(step - 1);
                    }}
                    component="a"
                    rel="noopener noreferrer"
                    leftIcon={<BellRinging size={38} />}
                  >
                    다음으로
                  </Button>
                </Group>
              </Stack>
            ) : (
              <></>
            )}

            {step === 2 ? (
              <Stack>
                {/* 메인 배너 */}
                <Stack className="mx-40">
                  <Stack>
                    {/* ../public/globe_banner.png */}
                    <p className="underline decoration-amber-500 font-bold text-6xl text-left mt-10">
                      정답자 수는?
                    </p>
                    <p className="font-bold text-6xl text-left mb-10">
                      35명 중 <strong className="text-amber-500">10명</strong>
                    </p>
                  </Stack>
                  <Stack>
                    <Group>
                      {testUserData.map((cur, i) => {
                        let color;
                        return (
                          <Stack key={i}>
                            <Center
                              className={`h-32 w-32 rounded-xl border-2 ${
                                cur.answer === false ? "bg-gray-200" : ""
                              }`}
                            >
                              <Image
                                key={i}
                                alt="hello"
                                className={`cursor-pointer rounded-full`}
                                src={avatarAnimal[0]}
                                width={"100px"}
                                height={"100px"}
                              ></Image>
                            </Center>
                            <p
                              className={`text-center ${
                                cur.answer === false ? "text-gray-400" : ""
                              }`}
                            >
                              {cur.nickname}
                            </p>
                          </Stack>
                        );
                      })}
                    </Group>
                  </Stack>
                </Stack>
              </Stack>
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
