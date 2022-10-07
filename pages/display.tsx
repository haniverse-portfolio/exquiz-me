import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRef } from "react";
import React, { useEffect } from "react";
import { Button, Group, useMantineTheme, Stack, Grid } from "@mantine/core";
import {
  Alarm,
  BellRinging,
  Pencil,
  ArrowBigRightLines,
  Router,
} from "tabler-icons-react";

import { useRecoilState } from "recoil";
import { playProblem, playOption, playProblemset } from "../components/States";
import { useDebouncedState } from "@mantine/hooks";

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

  let [problem, setProblem] = useRecoilState(playProblem);
  let [option, setOption] = useRecoilState(playOption);
  let [problemset, setProblemset] = useRecoilState(playProblemset);

  useEffect(() => {
    setTime(time - 1);
  }, []);

  useEffect(() => {
    if (time <= 0) {
      if (curIdx === problem.length) {
        router.push("/leaderboard_display_podium");
      } else {
        setStep((prevstate) => step + 1);
        setCurIdx((prevState) => curIdx + 1);
      }
    } else setTime(time - 1);
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
                  <Image
                    alt="hello"
                    src="/../public/halla.png"
                    width={600}
                    height={400}
                  ></Image>
                  <Stack>
                    <Grid columns={24} justify="center" gutter="sm">
                      {option.map((description, i) => {
                        let color = ["red", "blue", "green", "orange"];
                        let bgColor = "bg-" + color[i] + "-500";
                        let hoverColor = "hover:" + bgColor;
                        return (
                          <Grid.Col key={i} span={12}>
                            <Button
                              fullWidth
                              onClick={() => {
                                setAnswer(answer === i ? -1 : i);
                              }}
                              color={color[i]}
                              className={`h-[30vh] ${
                                answer === i ? "shadow-inner text-white" : ""
                              } shadow-lg h-28 ${
                                answer === i ? hoverColor : ""
                              } w-full  ${answer === i ? bgColor : ""}`}
                              variant="outline"
                            >
                              {option[curIdx][i].description}
                            </Button>
                          </Grid.Col>
                        );
                      })}
                    </Grid>
                  </Stack>
                </Stack>

                <br></br>
                <Stack>
                  <Group className="justify-between">
                    <Button
                      onClick={() => {
                        if (time <= 50) setTime(time + 10);
                      }}
                      className="mx-4 h-[60px] w-[200px]"
                      variant="outline"
                      gradient={{ from: "orange", to: "red" }}
                      component="a"
                      rel="noopener noreferrer"
                      rightIcon={<Alarm size={38} />}
                      styles={(theme: {
                        fn: { darken: (arg0: string, arg1: number) => any };
                      }) => ({
                        root: {
                          textDecoration: "none",
                          fontWeight: "bold",
                          fontSize: 20,
                          marginRight: 10,
                          color: "orange",
                          backgroundColor: "white",
                          border: "2px solid orange",
                          height: 42,

                          "&:hover": {
                            backgroundColor: theme.fn.darken("#FFFFFF", 0.05),
                          },
                        },

                        leftIcon: {
                          marginRight: 5,
                        },
                      })}
                    >
                      시간 연장 +10
                    </Button>
                    <p className="font-bold text-4xl text-red-500">{time}</p>

                    <Button
                      onClick={() => {
                        setTime(0);
                      }}
                      className=" h-[60px] w-[200px] bg-orange-500"
                      variant="gradient"
                      gradient={{ from: "orange", to: "red" }}
                      component="a"
                      rel="noopener noreferrer"
                      leftIcon={<BellRinging size={38} />}
                      styles={(theme) => ({
                        root: {
                          fontWeight: "bold",
                          fontSize: 20,
                          marginLeft: 5,
                          color: "white",
                          backgroundColor: "orange",
                          border: 0,
                          height: 42,

                          "&:hover": {},
                        },

                        leftIcon: {
                          marginRight: 5,
                        },
                      })}
                    >
                      조기 종료
                    </Button>
                  </Group>
                </Stack>
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
                    <Grid columns={24} justify="center" gutter="sm">
                      {option.map((description, i) => {
                        let color = ["red", "blue", "green", "orange"];
                        let bgColor = "bg-" + color[i] + "-500";
                        let hoverColor = "hover:" + bgColor;
                        return (
                          <Grid.Col key={i} span={12}>
                            <Button
                              onClick={() => {
                                setAnswer(answer === i ? -1 : i);
                              }}
                              color={color[i]}
                              className={`${
                                answer === i ? "shadow-inner text-white" : ""
                              } shadow-lg h-28 ${
                                answer === i ? hoverColor : ""
                              } w-full  ${answer === i ? bgColor : ""}`}
                              variant="outline"
                            >
                              {option[curIdx][i].description}
                              30%
                            </Button>
                          </Grid.Col>
                        );
                      })}
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
                      27명 중 <strong className="text-amber-500">9명</strong>
                    </p>
                  </Stack>
                  <br></br>
                  <Stack>
                    <Group className="justify-between">
                      <Button
                        onClick={() => {
                          setStep(1);
                        }}
                        className=" h-[60px] w-[200px] bg-orange-500"
                        variant="gradient"
                        gradient={{ from: "orange", to: "red" }}
                        component="a"
                        rel="noopener noreferrer"
                        href="/inbox"
                        leftIcon={<Pencil size={38} />}
                        styles={(theme) => ({
                          root: {
                            fontWeight: "bold",
                            fontSize: 20,
                            marginLeft: 5,
                            color: "white",
                            backgroundColor: "orange",
                            border: 0,
                            height: 42,

                            "&:hover": {},
                          },

                          leftIcon: {
                            marginRight: 5,
                          },
                        })}
                      >
                        해설하기
                      </Button>
                      <Button
                        onClick={() => {
                          setStep(0);
                        }}
                        className="mx-4 h-[60px] w-[200px]"
                        variant="outline"
                        gradient={{ from: "orange", to: "red" }}
                        component="a"
                        rel="noopener noreferrer"
                        href="/create_rf"
                        rightIcon={<ArrowBigRightLines size={38} />}
                        styles={(theme: {
                          fn: { darken: (arg0: string, arg1: number) => any };
                        }) => ({
                          root: {
                            textDecoration: "none",
                            fontWeight: "bold",
                            fontSize: 20,
                            marginRight: 10,
                            color: "orange",
                            backgroundColor: "white",
                            border: "2px solid orange",
                            height: 42,

                            "&:hover": {
                              backgroundColor: theme.fn.darken("#FFFFFF", 0.05),
                            },
                          },

                          leftIcon: {
                            marginRight: 5,
                          },
                        })}
                      >
                        다음 문제
                      </Button>
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
