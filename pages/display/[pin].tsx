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
} from "@mantine/core";
import {
  Alarm,
  BellRinging,
  Pencil,
  ArrowBigRightLines,
  Router,
} from "tabler-icons-react";

import { useRecoilState } from "recoil";
import { useDebouncedState } from "@mantine/hooks";
import {
  avatarAnimal,
  connectMainServerApiAddress,
  testUserData,
} from "../../components/ConstValues";

const Home: NextPage = () => {
  const router = useRouter();
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const [active, setActive] = useState(0);
  let [image, setImage] = useState("/../public/panda.png");

  let [step, setStep] = useState(0);
  let [time, setTime] = useDebouncedState(15, 1000);
  let [curIdx, setCurIdx] = useState(0);
  let [answer, setAnswer] = useState(-1);

  let [problem, setProblem] = useState([
    {
      answer: "0",
      description: "우리나라에서 가장 높은 산은?",
      dtype: "MultipleChoiceProblem",
      idx: 0,
      picture: "",
      problemsetId: 0,
      score: 125,
      timelimit: 30,
      title: "",
    },
    {
      answer: "0",
      description: "아이스크림을 영어로 하면?",
      dtype: "MultipleChoiceProblem",
      idx: 0,
      picture: "",
      problemsetId: 0,
      score: 125,
      timelimit: 30,
      title: "",
    },
    {
      answer: "0",
      description: "소프트웨어 마에스트로가 있는 빌딩은?",
      dtype: "MultipleChoiceProblem",
      idx: 0,
      picture: "",
      problemsetId: 0,
      score: 125,
      timelimit: 30,
      title: "",
    },
    {
      answer: "0",
      description: "🌋이 중 가장 무시무시한 공룡은?🏔",
      dtype: "MultipleChoiceProblem",
      idx: 0,
      picture: "",
      problemsetId: 0,
      score: 125,
      timelimit: 30,
      title: "",
    },
  ]);

  let [option, setOption] = useState([
    [
      {
        description: "설악산",
        idx: 0,
        picture: "",
        problemId: 0,
      },
      {
        description: "지리산",
        idx: 1,
        picture: "",
        problemId: 0,
      },
      {
        description: "한라산",
        idx: 2,
        picture: "",
        problemId: 0,
      },
      {
        description: "백두산",
        idx: 3,
        picture: "",
        problemId: 0,
      },
    ],
    [
      {
        description: "icecoffee",
        idx: 0,
        picture: "",
        problemId: 0,
      },
      {
        description: "icekekki",
        idx: 1,
        picture: "",
        problemId: 0,
      },
      {
        description: "icecream",
        idx: 2,
        picture: "",
        problemId: 0,
      },
      {
        description: "iceball",
        idx: 3,
        picture: "",
        problemId: 0,
      },
    ],
    [
      {
        description: "황해주택",
        idx: 0,
        picture: "",
        problemId: 0,
      },
      {
        description: "인하주택",
        idx: 1,
        picture: "",
        problemId: 0,
      },
      {
        description: "아남타워",
        idx: 2,
        picture: "",
        problemId: 0,
      },
      {
        description: "코엑스",
        idx: 3,
        picture: "",
        problemId: 0,
      },
    ],
    [
      {
        description: "티라노사우루스",
        idx: 0,
        picture: "",
        problemId: 0,
      },
      {
        description: "트리케라톱스",
        idx: 1,
        picture: "",
        problemId: 0,
      },
      {
        description: "랩터",
        idx: 2,
        picture: "",
        problemId: 0,
      },
      {
        description: "스피노사우루스",
        idx: 3,
        picture: "",
        problemId: 0,
      },
    ],
  ]);

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
    setTime(time);
    connect();
  }, [router.isReady]);

  useEffect(() => {
    if (time <= 0) {
      if (curIdx === problem.length) {
        router.push("/leaderboard_display_podium");
      } else {
        setStep((prevstate) => step + 1);
        setCurIdx((prevState) => curIdx + 1);
      }
    } else setTime(time);
  }, [time]);

  useEffect(() => {
    setImage("/../public/dino_env.png");
  }, []);

  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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

      <main>
        <section className="h-[100vh]">
          <Stack className="items-center flex contents-between">
            {/* 메인 배너 */}
            {step === 0 ? (
              <Stack>
                <Stack>
                  {/* ../public/globe_banner.png */}
                  <p className="underline decoration-amber-500 font-bold text-7xl text-center mt-10">
                    {problem[curIdx].description}
                  </p>
                  <Progress size="xl" color="orange" value={50} />
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

// [
//   [
//     {
//       description: "설악산",
//       idx: 0,
//       picture: "",
//       problemId: 0,
//     },
//     {
//       description: "지리산",
//       idx: 1,
//       picture: "",
//       problemId: 0,
//     },
//     {
//       description: "한라산",
//       idx: 2,
//       picture: "",
//       problemId: 0,
//     },
//     {
//       description: "백두산",
//       idx: 3,
//       picture: "",
//       problemId: 0,
//     },
//   ],
//   [
//     {
//       description: "icecoffee",
//       idx: 0,
//       picture: "",
//       problemId: 0,
//     },
//     {
//       description: "icekekki",
//       idx: 1,
//       picture: "",
//       problemId: 0,
//     },
//     {
//       description: "icecream",
//       idx: 2,
//       picture: "",
//       problemId: 0,
//     },
//     {
//       description: "iceball",
//       idx: 3,
//       picture: "",
//       problemId: 0,
//     },
//   ],
//   [
//     {
//       description: "황해주택",
//       idx: 0,
//       picture: "",
//       problemId: 0,
//     },
//     {
//       description: "인하주택",
//       idx: 1,
//       picture: "",
//       problemId: 0,
//     },
//     {
//       description: "아남타워",
//       idx: 2,
//       picture: "",
//       problemId: 0,
//     },
//     {
//       description: "코엑스",
//       idx: 3,
//       picture: "",
//       problemId: 0,
//     },
//   ],
//   [
//     {
//       description: "티라노사우루스",
//       idx: 0,
//       picture: "",
//       problemId: 0,
//     },
//     {
//       description: "트리케라톱스",
//       idx: 1,
//       picture: "",
//       problemId: 0,
//     },
//     {
//       description: "랩터",
//       idx: 2,
//       picture: "",
//       problemId: 0,
//     },
//     {
//       description: "스피노사우루스",
//       idx: 3,
//       picture: "",
//       problemId: 0,
//     },
//   ],]

// [
//   {
//     answer: "0",
//     description: "우리나라에서 가장 높은 산은?",
//     dtype: "MultipleChoiceProblem",
//     idx: 0,
//     picture: "",
//     problemsetId: 0,
//     score: 125,
//     timelimit: 30,
//     title: "",
//   },
//   {
//     answer: "0",
//     description: "아이스크림을 영어로 하면?",
//     dtype: "MultipleChoiceProblem",
//     idx: 0,
//     picture: "",
//     problemsetId: 0,
//     score: 125,
//     timelimit: 30,
//     title: "",
//   },
//   {
//     answer: "0",
//     description: "소프트웨어 마에스트로가 있는 빌딩은?",
//     dtype: "MultipleChoiceProblem",
//     idx: 0,
//     picture: "",
//     problemsetId: 0,
//     score: 125,
//     timelimit: 30,
//     title: "",
//   },
//   {
//     answer: "0",
//     description: "🌋이 중 가장 무시무시한 공룡은?🏔",
//     dtype: "MultipleChoiceProblem",
//     idx: 0,
//     picture: "",
//     problemsetId: 0,
//     score: 125,
//     timelimit: 30,
//     title: "",
//   },
// ]
