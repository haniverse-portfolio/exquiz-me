import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import NavCreate from "./components/navCreate";
import Slide from "./components/slide";
import axios from "axios";
import { useRef } from "react";

import {
  Button,
  SimpleGrid,
  Tooltip,
  Textarea,
  ScrollArea,
  Center,
  Container,
  ThemeIcon,
  Checkbox,
  Group,
  Accordion,
  useMantineTheme,
  Box,
  ActionIcon,
  Slider,
  BackgroundImage,
  Switch,
} from "@mantine/core";

import {
  SquareCheck,
  Parentheses,
  QuestionMark,
  AB,
  Apps,
  AdjustmentsHorizontal,
  Notes,
  BrowserPlus,
  Plus,
  Trash,
  Check,
} from "tabler-icons-react";
import { copyFileSync } from "fs";
// 85vh 20vw

function sideIconCode(idx: string) {
  if (idx == "empty") return <BrowserPlus size={20} color={"#babbbd"} />;
  if (idx == "MultipleChoiceProblem")
    return <SquareCheck size={20} color={"#fa584b"} />;
  if (idx == "subjective") return <Parentheses size={20} color={"#4A73F0"} />;
  if (idx == "ox") return <AB size={20} color={"#23B87F"} />;
  if (idx == "nonsense") return <QuestionMark size={20} color={"#F4B404"} />;
  if (idx == "dynamic") return <Apps size={20} color={"#946cee"} />;
}

function rtColor(idx: string) {
  if (idx == "empty") return "#babbbd";
  if (idx == "MultipleChoiceProblem") return "#fa584b";
  if (idx == "subjective") return "#4A73F0";
  if (idx == "ox") return "#23B87F";
  if (idx == "nonsense") return "#F4B404";
  if (idx == "dynamic") return "#946cee";
}

function tabIconCode(idx: number) {
  if (idx == 0) return <BrowserPlus size={"2vw"} />;
  if (idx == 1) return <SquareCheck size={"2vw"} />;
  if (idx == 2) return <Parentheses size={"2vw"} />;
  if (idx == 3) return <AB size={"2vw"} />;
  if (idx == 4) return <QuestionMark size={"2vw"} />;
  if (idx == 5) return <Apps size={"2vw"} />;
}

// 빈 슬라이드 객관식 주관식 O/X 넌센스 다이나믹
const Home: NextPage = () => {
  /* slide */
  let [currentIdx, setCurrentIdx] = useState(-1);
  /* form */
  let [dtypeIdx, setdtypeIdx] = useState(0);
  const [progressActive, setProgressActive] = useState(-1);

  // {
  //   answer: "-1",
  //   description: "가장 높은 산은 ()이다?",
  //   dtype: "subjective",
  //   index: "-1",
  //   picture: "",
  //   problemsetId: "0",
  //   scord: "0",
  //   timLimit: "50",
  //   title: "",
  //   selection: ["지리산", "북한산", "한라산", "설악산"],
  // },
  // {
  //   answer: "-1",
  //   description: "대한민국은 영어로 korea이다.",
  //   dtype: "ox",
  //   index: "-1",
  //   picture: "",
  //   problemsetId: "1",
  //   scord: "0",
  //   timLimit: "50",
  //   title: "",
  //   selection: ["O", "X"],
  // },
  // {
  //   answer: "2",
  //   description: "소프트웨어 마에스트로가 있는 건물은?",
  //   dtype: "MultipleChoiceProblem",
  //   index: "-1",
  //   picture: "",
  //   problemsetId: "2",
  //   scord: "0",
  //   timLimit: "50",
  //   title: "",
  //   selection: ["센터필드", "아남타워", "황해주택", "인하주택"],
  // },

  let input = [
    {
      answer: "-1",
      description: "",
      dtype: "MultipleChoiceProblem",
      index: "-1",
      picture: "",
      problemsetId: "0",
      score: "0",
      timeLimit: "30",
      title: "",
      options: [
        {
          description: "",
          index: 0,
          picture: "",
          problemId: 0,
        },
        {
          description: "",
          index: 1,
          picture: "",
          problemId: 0,
        },
        {
          description: "",
          index: 2,
          picture: "string",
          problemId: 0,
        },
        {
          description: "",
          index: 3,
          picture: "string",
          problemId: 0,
        },
      ],
    },
  ];

  const [slideActive, setSlideActive] = useState(-1);
  let [quizSet, setQuizSet] = useState(input);

  const theme = useMantineTheme();
  const getColor = (color: string) =>
    theme.colors[color][theme.colorScheme === "dark" ? 5 : 7];

  const tabColorCode = [
    "linear-gradient(to right, #babbbd, #babbbd)",
    "linear-gradient(to right, #fa584b, #fc7b1b)",
    "linear-gradient(to right, #4A73F0, #3A8DDA)",
    "linear-gradient(to right, #23B87F, #79C72F)",
    "linear-gradient(to right, #F9B204, #FFD400)",
    "linear-gradient(to right, #946cee, #b464eb)",
  ];

  const tabTooltip = [
    "빈 슬라이드",
    "객관식",
    "주관식",
    "O/X",
    "넌센스",
    "다이나믹",
  ];

  const idxToString = [
    "empty",
    "MultipleChoiceProblem",
    "subjective",
    "ox",
    "nonsense",
    "dynamic",
  ];

  function stringToIdx(x: string) {
    let rt = 1;
    if (x === "empty") rt = 0;
    if (x === "MultipleChoiceProblem") rt = 1;
    if (x === "subjective") rt = 2;
    if (x === "ox") rt = 3;
    if (x === "nonsense") rt = 4;
    if (x === "dynamic") rt = 5;
    return rt;
  }

  const MARKSTIME = [
    { value: 0, label: "15초" },
    { value: 25, label: "20초" },
    { value: 50, label: "30초" },
    { value: 75, label: "45초" },
    { value: 100, label: "1분" },
  ];

  const MARKSCORE = [
    { value: 0, label: "매우 적게" },
    { value: 25, label: "적게" },
    { value: 50, label: "보통" },
    { value: 75, label: "많이" },
    { value: 100, label: "매우 많이" },
  ];
  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Main Bar */}
      {/* Navigation Bar */}
      <header>{NavCreate()}</header>
      {/* Navigation Bar */}
      <main style={{ marginLeft: 20, marginRight: 20 }}>
        <section style={{ height: "88vh" }}>
          <Center style={{}}>
            <Container
              style={{
                height: "7vh",
                width: "32vw",
                margin: "20px 20px",
                borderRadius: "10px",
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Group>
                {tabColorCode.map((colorCode, i) => {
                  return (
                    <Tooltip key={i} label={tabTooltip[i]}>
                      <ThemeIcon
                        onClick={() => {
                          setdtypeIdx((prevState) => i);
                          let copy = quizSet;
                          copy[currentIdx].dtype = idxToString[i];
                          setQuizSet(copy);
                        }}
                        key={i}
                        style={{
                          boxShadow:
                            dtypeIdx === i
                              ? "inset 0 2px 4px 0 rgb(0 0 0 / 0.5)"
                              : "0 10px 15px -3px rgb(0 0 0 / 0.05)",
                          cursor: "pointer",
                          borderRadius: "10px",
                          height: "3vw",
                          width: "3vw",
                          color: "white",
                          backgroundImage: colorCode.toString(),
                        }}
                      >
                        {tabIconCode(i)}
                      </ThemeIcon>
                    </Tooltip>
                  );
                })}
              </Group>
            </Container>
          </Center>
          {/* Main Form */}
          <Container
            style={{
              height: "70vh",
              width: "40vw",
              borderRadius: "10px",
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
            }}
          >
            {dtypeIdx === 0 ? (
              <Textarea
                style={{ textAlign: "center", fontSize: "5ems" }}
                maxLength={1000}
                minRows={17}
                maxRows={2}
                size="xl"
                placeholder="슬라이드 내용을 입력하세요."
                label=""
                required
              />
            ) : null}
            {dtypeIdx === 1 ? (
              <>
                <Textarea
                  placeholder="문제 내용을 입력하세요."
                  label={quizSet[currentIdx].description}
                  required
                />
                <br></br>
                <SimpleGrid cols={2}>
                  {quizSet[currentIdx].options.map((selection, i) => {
                    return (
                      <div key={i}>
                        <Checkbox label="" />
                        <Textarea
                          maxRows={2}
                          placeholder={`선지 ${i + 1}`}
                          label={quizSet[currentIdx].options[i].description}
                          required
                        />
                      </div>
                    );
                  })}
                </SimpleGrid>
              </>
            ) : null}
            {dtypeIdx === 2 ? (
              <>
                <Textarea
                  placeholder="문제 내용을 입력하세요."
                  label=""
                  required
                />
                <br></br>
                <SimpleGrid cols={2}>
                  <div>
                    <Checkbox label="" />
                    <Textarea
                      maxRows={2}
                      placeholder="선지 1"
                      label=""
                      required
                    />
                  </div>
                  <div>
                    <Checkbox label="" />
                    <Textarea
                      maxRows={2}
                      placeholder="선지 2"
                      label=""
                      required
                    />
                  </div>
                  <div>
                    <Checkbox label="" />
                    <Textarea
                      maxRows={2}
                      placeholder="선지 3"
                      label=""
                      required
                    />
                  </div>
                  <div>
                    <Checkbox label="" />
                    <Textarea
                      maxRows={2}
                      placeholder="선지 4"
                      label=""
                      required
                    />
                  </div>
                </SimpleGrid>
                <Switch onLabel="영어" offLabel="한글" size="xl" />
              </>
            ) : null}
            {dtypeIdx === 3 ? (
              <>
                <Textarea
                  placeholder="문제 내용을 입력하세요."
                  label=""
                  required
                />
                <br></br>
                <Center>
                  <Button
                    style={{
                      fontSize: "36px",
                      height: "160px",
                      width: "40%",
                      marginRight: "20px",
                    }}
                    variant="outline"
                  >
                    O
                  </Button>
                  <Button
                    style={{
                      fontSize: "36px",
                      height: "160px",
                      width: "40%",
                      color: "red",
                    }}
                    variant="outline"
                  >
                    X
                  </Button>
                </Center>
              </>
            ) : null}

            {dtypeIdx === 4 ? (
              <Container style={{ textAlign: "center" }}>
                <p style={{ color: "gray" }}>
                  2차 서비스 개발 시 배포 예정입니다
                </p>
              </Container>
            ) : null}
            {dtypeIdx === 5 ? (
              <Container style={{ textAlign: "center" }}>
                <p style={{ color: "gray" }}>
                  2차 서비스 개발 시 배포 예정입니다
                </p>
              </Container>
            ) : null}
          </Container>
          {/* Main Form */}
        </section>
      </main>
      {/* Main Bar */}

      {/* Slide - Side Bar */}
      <div style={{ position: "fixed", left: 0, top: 100 }}>
        <section style={{ height: "80vh", width: "24vw", marginLeft: "10px" }}>
          <Center>
            <ScrollArea
              scrollbarSize={0}
              style={{
                width: "24vw",
                height: "60vh",
                textAlign: "center",
              }}
            >
              <Center>
                <Container style={{ margin: "0px 20px" }}>
                  {quizSet.map(({ dtype, description }, i) => {
                    return (
                      <Container
                        onClick={() => {
                          if (currentIdx === i) {
                          } else setCurrentIdx(i);

                          setdtypeIdx((prevstate) =>
                            stringToIdx(quizSet[i].dtype)
                          );
                        }}
                        style={{
                          cursor: "pointer",
                          margin: "10px 0px",
                          height: "5vh",
                          width: "20vw",
                          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.05)",
                          border: currentIdx === i ? "orange 2px solid" : "",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <ThemeIcon style={{ backgroundColor: "white" }}>
                            {sideIconCode(dtype)}
                          </ThemeIcon>
                          {`${i + 1}.${description}`}

                          <ActionIcon
                            onClick={() => {
                              if (i === 0) return;
                              let copy = [...quizSet];
                              copy.splice(i, 1);
                              setQuizSet(copy);
                              if (currentIdx === i) {
                                setCurrentIdx(i - 1);
                              }
                              // document.getElementById("acc").style.value = currentIdx;
                            }}
                            size="lg"
                          >
                            <Trash size={16} />
                          </ActionIcon>
                        </Box>
                      </Container>
                    );
                  })}
                </Container>
              </Center>
            </ScrollArea>
          </Center>
          <Center>
            <div style={{ marginTop: "10vh", width: "21vw" }}>
              <Button
                variant="outline"
                gradient={{ from: "orange", to: "red" }}
                component="a"
                rel="noopener noreferrer"
                leftIcon={<Plus size={32} />}
                onClick={() => {
                  setQuizSet([
                    ...quizSet,
                    {
                      answer: "-1",
                      description: "",
                      dtype: idxToString[dtypeIdx],
                      index: "-1",
                      picture: "",
                      problemsetId: "0",
                      score: "0",
                      timeLimit: "30",
                      title: "",
                      options: [
                        {
                          description: "",
                          index: 0,
                          picture: "",
                          problemId: 0,
                        },
                        {
                          description: "",
                          index: 1,
                          picture: "",
                          problemId: 0,
                        },
                        {
                          description: "",
                          index: 2,
                          picture: "string",
                          problemId: 0,
                        },
                        {
                          description: "",
                          index: 3,
                          picture: "string",
                          problemId: 0,
                        },
                      ],
                    },
                  ]);
                }}
                styles={(theme: {
                  fn: { darken: (arg0: string, arg1: number) => any };
                }) => ({
                  root: {
                    display: "block",
                    fontWeight: "bold",
                    fontSize: 16,
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
                추가하기
              </Button>
              <Link href="/myQuiz">
                <Button
                  variant="gradient"
                  gradient={{ from: "orange", to: "red" }}
                  component="a"
                  rel="noopener noreferrer"
                  href="#"
                  leftIcon={<Check size={32} />}
                  styles={(theme: {
                    fn: { darken: (arg0: string, arg1: number) => any };
                  }) => ({
                    root: {
                      marginTop: "1vh",
                      display: "block",
                      fontWeight: "bold",
                      fontSize: 16,
                      marginRight: 10,
                      color: "white",
                      backgroundColor: "white",
                      border: 0,
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
                  완성하기
                </Button>
              </Link>
            </div>
          </Center>
        </section>
      </div>

      {/* Slide - Side Bar */}
    </div>
  );
};

export default Home;
