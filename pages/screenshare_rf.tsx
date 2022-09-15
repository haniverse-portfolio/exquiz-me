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
} from "tabler-icons-react";
import { useDebouncedState } from "@mantine/hooks";

const rightEnvelope = (subject: number) => {
  const subjectInfo = [
    { name: "미분류", startColor: "gray", endColor: "gray" },
    { name: "언어", startColor: "orange", endColor: "red" },
    { name: "수리과학", startColor: "blue", endColor: "green" },
    { name: "인문사회", startColor: "violet", endColor: "pink" },
    { name: "예체능", startColor: "yellow", endColor: "orange" },
  ];

  return (
    <Group className="transition ease-in-out hover:scale-105" spacing={0}>
      <Group className="shadow-lg" spacing={0}>
        <Group
          className={`bg-${subjectInfo[subject].startColor} border-r-2 border-gray-300 shadow-lg h-24 w-4 bg-amber-200`}
        />
        <Group>
          <Stack spacing={0}>
            <Group
              className={`bg-gradient-to-r from-${subjectInfo[subject].startColor} to-${subjectInfo[subject].endColor} border-b-2 border-gray-300 m-0 p-0 h-12 w-32 bg-amber-200`}
            />
            <Group
              className={`bg-gradient-to-r from-${subjectInfo[subject].startColor} to-${subjectInfo[subject].endColor} m-0 p-0 h-12 w-32 bg-amber-200`}
            />
          </Stack>
        </Group>
      </Group>
      <Group
        className={`bg-gradient-to-r from-${subjectInfo[subject].startColor} to-${subjectInfo[subject].endColor} shadow-lg m-0 p-0 h-20 w-6 bg-white`}
      ></Group>
    </Group>
  );
};

const leftEnvelope = (subject: number) => {
  const subjectInfo = [
    { name: "미분류", startColor: "gray", endColor: "gray" },
    { name: "언어", startColor: "orange", endColor: "red" },
    { name: "수리과학", startColor: "blue", endColor: "green" },
    { name: "인문사회", startColor: "violet", endColor: "pink" },
    { name: "예체능", startColor: "yellow", endColor: "orange" },
  ];

  return (
    <Group className="transition ease-in-out hover:scale-105" spacing={0}>
      <Group
        className={`bg-gradient-to-r shadow-lg m-0 p-0 h-20 w-6 bg-white`}
      ></Group>
      <Group className="shadow-lg" spacing={0}>
        <Group>
          <Stack spacing={0}>
            <Group
              className={`bg-gradient-to-r from-${subjectInfo[subject].startColor}-500 to-${subjectInfo[subject].endColor}-500 m-0 p-0 h-12 w-32 bg-amber-200`}
            />
            <Group
              className={`bg-gradient-to-r from-${subjectInfo[subject].startColor}-500 to-${subjectInfo[subject].endColor}-500 m-0 p-0 h-12 w-32 bg-amber-200`}
            />
          </Stack>
        </Group>
        <Group
          className={`bg-${subjectInfo[subject].endColor}-500 border-l-2 border-gray-300 shadow-lg h-24 w-4 bg-amber-200`}
        />
      </Group>
    </Group>
  );
};

const Home: NextPage = () => {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const [active, setActive] = useState(0);
  let [image, setImage] = useState("/../public/panda.png");

  const [status, setStatus] = useState([
    {
      nickname: "성찰하는 소크라테스",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "고뇌하는 니체",
      animal: "Panda",
      color: "orange",
      answer: true,
    },
    {
      nickname: "엉뚱한 튜링",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "활기찬 뉴턴",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "명랑한 브라헤",
      animal: "Panda",
      color: "orange",
      answer: true,
    },
    {
      nickname: "정의로운 보어",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "창의적인 레오나르도",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "사색하는 공자",
      animal: "Panda",
      color: "orange",
      answer: true,
    },
    {
      nickname: "부유한 스미스",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "정직한 데카르트",
      animal: "Panda",
      color: "orange",
      answer: true,
    },
    {
      nickname: "슬기로운 세종",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "유능한 한신",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "전설적인 칸",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "전략적인 제갈공명",
      animal: "Panda",
      color: "orange",
      answer: true,
    },
    {
      nickname: "신박한 유레카",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "듬직한 테슬라",
      animal: "Panda",
      color: "orange",
      answer: true,
    },
    {
      nickname: "명석한 칼세이건",
      animal: "Panda",
      color: "orange",
      answer: true,
    },
    {
      nickname: "건강한 클레오파트라",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "용감한 이순신",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "공평한 링컨",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "신속한 나폴레옹",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "뛰어난 워렌버핏",
      animal: "Panda",
      color: "orange",
      answer: true,
    },
    {
      nickname: "비장한 스티브잡스",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "신들린 모차르트",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "감각적인 고흐",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "독보적인 내쉬",
      animal: "Panda",
      color: "orange",
      answer: true,
    },
    {
      nickname: "헌신적인 테레사",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
  ]);
  let [problem, setProblem] = useState([
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
  ]);
  let [option, setOption] = useState([
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
  ]);
  let [step, setStep] = useState(0);
  let [time, setTime] = useDebouncedState(15, 1000);
  let [curIdx, setCurIdx] = useState(0);
  let [answer, setAnswer] = useState(-1);

  useEffect(() => {
    setTime(time - 1);
  }, []);

  useEffect(() => {
    if (time <= 0) {
      if (curIdx === problem.length) {
        location.replace("/leaderboard_display_podium");
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
                        setStep(step + 1);
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
                      순위 변동
                    </Button>

                    <Button
                      onClick={() => {
                        setStep(step - 1);
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
                      다음으로
                    </Button>
                  </Group>
                </Stack>
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
                  <Stack>
                    <Group>
                      {status.map((cur, i) => {
                        let color;
                        return (
                          <Stack key={i}>
                            <Group
                              className={`h-32 w-32 rounded-xl border-2 ${
                                cur.answer === false ? "bg-gray-200" : ""
                              }`}
                            >
                              <Group></Group>
                            </Group>
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
