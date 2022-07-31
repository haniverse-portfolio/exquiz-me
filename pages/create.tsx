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
// 85vh 20vw

function form(idx: number, array: any) {
  if (idx === -1) {
    return (
      <Container
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "10px",
          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container style={{ textAlign: "center" }}>
          <p style={{ color: "gray" }}>문제를 추가 해주세요.</p>
        </Container>
      </Container>
    );
  } else if (idx === 0) {
    return (
      <Container
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "10px",
          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        }}
      >
        <Textarea
          style={{}}
          placeholder="슬라이드 내용을 입력하세요."
          label=""
          required
        />
      </Container>
    );
  } else if (idx === 1) {
    return (
      <Container
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "10px",
          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        }}
      >
        <Textarea placeholder="문제 내용을 입력하세요." label="" required />
        <br></br>
        <SimpleGrid cols={2}>
          <>
            <Textarea maxRows={2} placeholder="선지 1" label="" required />
          </>
          <>
            <Textarea maxRows={2} placeholder="선지 2" label="" required />
          </>
          <>
            <Textarea maxRows={2} placeholder="선지 3" label="" required />
          </>
          <>
            <Textarea maxRows={2} placeholder="선지 4" label="" required />
          </>
          {/* <Group position="center" mt="md">
            <Button onClick={() => openRef.current()}>Select files</Button>
          </Group> */}
        </SimpleGrid>
      </Container>
    );
  } else if (idx == 2) {
    return (
      <Container
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "10px",
          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        }}
      >
        <Textarea placeholder="문제 내용을 입력하세요." label="" required />
        <br></br>
        <SimpleGrid cols={2}>
          <div>
            <Checkbox label="" />
            <Textarea maxRows={2} placeholder="선지 1" label="" required />
          </div>
          <div>
            <Checkbox label="" />
            <Textarea maxRows={2} placeholder="선지 2" label="" required />
          </div>
          <div>
            <Checkbox label="" />
            <Textarea maxRows={2} placeholder="선지 3" label="" required />
          </div>
          <div>
            <Checkbox label="" />
            <Textarea maxRows={2} placeholder="선지 4" label="" required />
          </div>
        </SimpleGrid>
      </Container>
    );
  } else if (idx == 3) {
    return (
      <Container
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "10px",
          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        }}
      >
        <Textarea placeholder="문제 내용을 입력하세요." label="" required />
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
      </Container>
    );
  } else if (idx == 4) {
    return (
      <Container
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "10px",
          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container style={{ textAlign: "center" }}>
          <p style={{ color: "gray" }}>2차 서비스 개발 시 배포 예정입니다</p>
        </Container>
      </Container>
    );
  } else {
    return (
      <Container
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "10px",
          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container style={{ textAlign: "center" }}>
          <p style={{ color: "gray" }}>2차 서비스 개발 시 배포 예정입니다</p>
        </Container>
      </Container>
    );
  }
}

function colorRt(type: string) {
  let t = ["empty", "objective", "objective", "ox", "nonsense", "dynamic"];
  let lg = [
    "gray",
    "linear-gradient(to right, #fa584b, #fb7b1b)",
    "linear-gradient(to right, #4A73F0, #3A8DDA)",
    "linear-gradient(to right, #23B87F, #79C72F)",
  ];
  if (type == "subjective")
    return (
      <ThemeIcon
        style={{
          borderRadius: "50%",
          backgroundImage: "linear-gradient(to right, #4A73F0, #3A8DDA)",
        }}
      >
        <Parentheses color="white" />
      </ThemeIcon>
    );
  if (type == "objective")
    return (
      <ThemeIcon
        style={{
          borderRadius: "50%",
          backgroundImage: "linear-gradient(to right, #fa584b, #fb7b1b)",
        }}
      >
        <SquareCheck color="white" />
      </ThemeIcon>
    );
  if (type == "ox")
    return (
      <ThemeIcon
        style={{
          borderRadius: "50%",
          backgroundImage: "linear-gradient(to right, #23B87F, #79C72F)",
        }}
      >
        <AB color="white" />
      </ThemeIcon>
    );
  if (type == "dynamic") return "gold";
}

function sideIconCode(idx: string) {
  if (idx == "empty") return <BrowserPlus size={20} color={"#babbbd"} />;
  if (idx == "objective") return <SquareCheck size={20} color={"#fa584b"} />;
  if (idx == "subjective") return <Parentheses size={20} color={"#4A73F0"} />;
  if (idx == "ox") return <AB size={20} color={"#23B87F"} />;
  if (idx == "nonsense") return <QuestionMark size={20} color={"#F4B404"} />;
  if (idx == "dynamic") return <Apps size={20} color={"#946cee"} />;
}

function rtColor(idx: string) {
  if (idx == "empty") return "#babbbd";
  if (idx == "objective") return "#fa584b";
  if (idx == "subjective") return "#4A73F0";
  if (idx == "ox") return "#23B87F";
  if (idx == "nonsense") return "#F4B404";
  if (idx == "dynamic") return "#946cee";
}

function tabIconCode(idx: number) {
  if (idx == 0) return <BrowserPlus />;
  if (idx == 1) return <SquareCheck />;
  if (idx == 2) return <Parentheses />;
  if (idx == 3) return <AB />;
  if (idx == 4) return <QuestionMark />;
  if (idx == 5) return <Apps />;
}

// 빈 슬라이드 객관식 주관식 O/X 넌센스 다이나믹
const Home: NextPage = () => {
  let [dtypeIdx, setdtypeIdx] = useState(-1);
  const [progressActive, setProgressActive] = useState(-1);

  let quizSetExample = [
    {
      answer: "-1",
      description: "가장 높은 산은 ()이다?",
      dtype: "subjective",
      index: "-1",
      picture: "",
      problemsetId: "0",
      scord: "0",
      timLimit: "50",
      title: "",
      selection: ["지리산", "북한산", "한라산", "설악산"],
    },
    {
      answer: "-1",
      description: "대한민국은 영어로 korea이다.",
      dtype: "ox",
      index: "-1",
      picture: "",
      problemsetId: "0",
      scord: "0",
      timLimit: "50",
      title: "",
      selection: ["O", "X"],
    },
    {
      answer: "2",
      description: "소프트웨어 마에스트로가 있는 건물은?",
      dtype: "objective",
      index: "-1",
      picture: "",
      problemsetId: "0",
      scord: "0",
      timLimit: "50",
      title: "",
      selection: ["센터필드", "아남타워", "황해주택", "인하주택"],
    },
  ];

  const [slideActive, setSlideActive] = useState(-1);
  let [quizSet, setQuizSet] = useState(quizSetExample);

  const theme = useMantineTheme();
  const getColor = (color: string) =>
    theme.colors[color][theme.colorScheme === "dark" ? 5 : 7];

  const tabColorCode = [
    ["linear-gradient(to right, #babbbd, #babbbd)"],
    ["linear-gradient(to right, #fa584b, #fc7b1b)"],
    ["linear-gradient(to right, #4A73F0, #3A8DDA)"],
    ["linear-gradient(to right, #23B87F, #79C72F)"],
    ["linear-gradient(to right, #F9B204, #FFD400)"],
    ["linear-gradient(to right, #946cee, #b464eb)"],
  ];

  const tabTooltip = [
    "빈 슬라이드",
    "객관식",
    "주관식",
    "O/X",
    "넌센스",
    "다이나믹",
  ];

  let [tabClickedState, setTabClickedState] = useState([0, 0, 0, 0, 0, 0]);

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
        <section style={{ height: "75vh", margin: "5vh 20vw" }}>
          <Center>
            <Container
              style={{
                height: "7vh",
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
                          setTabClickedState([
                            i === 0 ? 1 : 0,
                            i === 1 ? 1 : 0,
                            i === 2 ? 1 : 0,
                            i === 3 ? 1 : 0,
                            i === 4 ? 1 : 0,
                            i === 5 ? 1 : 0,
                          ]);
                        }}
                        key={i}
                        style={{
                          boxShadow:
                            tabClickedState[i] === 0
                              ? "0 10px 15px -3px rgb(0 0 0 / 0.05)"
                              : "inset 0 2px 4px 0 rgb(0 0 0 / 0.5)",
                          cursor: "pointer",
                          borderRadius: "10px",
                          height: "50px",
                          width: "50px",
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
          {form(dtypeIdx, quizSet)}
          {/* Main Form */}
        </section>
      </main>
      {/* Main Bar */}

      <footer className={styles.footer}>
        <a
          style={{ textDecoration: "none", color: "black" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright ⓒ 2022 exquiz.me All rights reserved. | Team MUMOMU.
        </a>
      </footer>

      {/* Slide - Side Bar */}
      <div style={{ position: "fixed", left: 0, top: 100 }}>
        <section style={{ height: "80vh", width: "20vw", marginLeft: "10px" }}>
          <Center>
            <ScrollArea
              style={{ width: "20vw", height: "60vh", textAlign: "center" }}
            >
              <Accordion
                chevronSize={0}
                variant="separated"
                transitionDuration={0}
              >
                {quizSet.map(({ dtype, description }, i) => {
                  return (
                    <Accordion.Item
                      style={{
                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.05)",
                      }}
                      key={i}
                      value={(i + 1).toString()}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Accordion.Control icon={sideIconCode(dtype)}>
                          {`Q${i + 1}. ${description}`}
                        </Accordion.Control>

                        <ActionIcon
                          onClick={() => {
                            let copy = [...quizSet];
                            copy.splice(i, 1);
                            setQuizSet(copy);
                          }}
                          size="lg"
                        >
                          <Trash size={16} />
                        </ActionIcon>
                      </Box>
                      {/* <Accordion.Panel>
                        <Slider
                          color={"gray"}
                          label={(val) =>
                            MARKSTIME.find((mark) => mark.value === val)?.label
                          }
                          defaultValue={50}
                          step={25}
                          marks={MARKSTIME}
                          styles={{ markLabel: { display: "none" } }}
                        />
                        <Slider
                          // {rtColor(quiz.dtype)}
                          color={"gray"}
                          label={(val) =>
                            MARKSCORE.find((mark) => mark.value === val)?.label
                          }
                          defaultValue={50}
                          step={25}
                          marks={MARKSCORE}
                          styles={{ markLabel: { display: "none" } }}
                        />
                      </Accordion.Panel> */}
                    </Accordion.Item>
                  );
                })}
              </Accordion>
            </ScrollArea>
          </Center>
          <div>
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
                    dtype: "subjective",
                    index: "-1",
                    picture: "",
                    problemsetId: "0",
                    scord: "0",
                    timLimit: "50",
                    title: "",
                    selection: [],
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
        </section>
      </div>

      {/* Slide - Side Bar */}
    </div>
  );
};

export default Home;

{
  /* <button
                  onClick={() => {
                    axios
                      .get("http://localhost:8081/api/test", {
                        params: { str: "abcdefg!" },
                      })
                      .then((result) => {
                        setTmp(result.data.str);
                        alert(result.data.str);
                      })
                      .catch((error) => {
                        alert(error);
                      });
                  }}
                >
                  입력
                </button> */
}

{
  /*      {글제목.map(function (a, i) {
        return (
          <div className="list" key={i}>
            <h4 onClick={()=>{setModal(true); setTitle(i)}}>{글제목[i]}
              <span onClick={(e) => {e.stopPropagation(); sec[i](value[i] + 1);}}>
                👍</span>{value[i]}
            </h4>
            <p>2월 17일 발행</p>
            <button onClick={()=>{let copy = [...글제목]; copy.splice(i, 1); 글제목변경(copy)}}>삭제</button>
          </div>
        );
      })}
      <input onChange={(e)=>{입력값변경(e.target.value);}} />
      <button onClick={()=>{let copy = [...글제목]; copy.unshift(입력값); 글제목변경(copy)}} >
      글발행 </button>

    {modal == true ? <Modal title={title} 글제목={글제목}/> : null}*/
}
