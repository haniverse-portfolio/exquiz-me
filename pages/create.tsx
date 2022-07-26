import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import NavCreate from "./components/navCreate";
import Slide from "./components/slide";

import {
  Button,
  Grid,
  Stepper,
  SimpleGrid,
  Tabs,
  Autocomplete,
  Tooltip,
  NativeSelect,
  Input,
  TextInput,
  Textarea,
  Navbar,
  ScrollArea,
  Center,
  Container,
  ThemeIcon,
  Checkbox,
  Drawer,
  Group,
} from "@mantine/core";
import {
  Emphasis,
  FileX,
  Login,
  ReportMoney,
  UserCircle,
  Pencil,
  Hash,
  Database,
  Tool,
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
} from "tabler-icons-react";
// 85vh 20vw

function form(idx: number) {
  if (idx == -1) return;
  else if (idx == 0) {
    return (
      <Container
        style={{
          height: "500px",
          width: "100%",
          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        }}
      >
        <Textarea placeholder="슬라이드 내용을 입력하세요." label="" required />
      </Container>
    );
  } else if (idx == 1) {
    return (
      <Container
        style={{
          height: "500px",
          width: "100%",
          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        }}
      >
        <Textarea placeholder="문제 내용을 입력하세요." label="" required />
        <br></br>
        <SimpleGrid cols={2}>
          <div>
            <div>
              <Checkbox label="" />
              <Textarea maxRows={2} placeholder="선지 1" label="" required />
            </div>
          </div>
          <div>
            {" "}
            <div>
              <Checkbox label="" />
              <Textarea maxRows={2} placeholder="선지 2" label="" required />
            </div>
          </div>
          <div>
            {" "}
            <div>
              <Checkbox label="" />
              <Textarea maxRows={2} placeholder="선지 3" label="" required />
            </div>
          </div>
          <div>
            {" "}
            <div>
              <Checkbox label="" />
              <Textarea maxRows={2} placeholder="선지 4" label="" required />
            </div>
          </div>
        </SimpleGrid>
      </Container>
    );
  } else if (idx == 2) {
    return (
      <Container
        style={{
          height: "500px",
          width: "100%",
          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        }}
      >
        <Textarea placeholder="문제 내용을 입력하세요." label="" required />
        <br></br>
        <SimpleGrid cols={2}>
          <div>
            <div>
              <Checkbox label="" />
              <Textarea maxRows={2} placeholder="선지 1" label="" required />
            </div>
          </div>
          <div>
            {" "}
            <div>
              <Checkbox label="" />
              <Textarea maxRows={2} placeholder="선지 2" label="" required />
            </div>
          </div>
          <div>
            {" "}
            <div>
              <Checkbox label="" />
              <Textarea maxRows={2} placeholder="선지 3" label="" required />
            </div>
          </div>
          <div>
            {" "}
            <div>
              <Checkbox label="" />
              <Textarea maxRows={2} placeholder="선지 4" label="" required />
            </div>
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
          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        }}
      >
        *제작 준비 중입니다.
      </Container>
    );
  } else {
    return (
      <Container
        style={{
          height: "500px",
          width: "100%",
          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        }}
      >
        *제작 준비 중입니다.
      </Container>
    );
  }
}

function colorRt(type: string) {
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
          backgroundImage: "linear-gradient(to right, #fa584b, #fc7b1b)",
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
  let [quizTypeIdx, setQuizTypeIdx] = useState(-1);
  const [progressActive, setProgressActive] = useState(-1);

  let quizSetExample = [
    {
      quizType: "subjective",
      quizContents: "가장 높은 산은 ()이다?",
      selection: ["지리산", "북한산", "한라산", "설악산"],
      answerNumber: ["1"],
      scoredRate: 3,
      timeLimit: [0, 1, 0],
    },
    {
      quizType: "ox",
      quizContents: "대한민국은 영어로 korea이다.",
      selection: ["O", "X"],
      answerNumber: ["0"],
      scoredRate: 3,
      timeLimit: [0, 1, 0],
    },
    {
      quizType: "objective",
      quizContents: "소프트웨어 마에스트로가 있는 건물은?",
      selection: ["센터필드", "아남타워", "황해주택", "인하주택"],
      answerNumber: ["2"],
      scoredRate: 3,
      timeLimit: [0, 1, 0],
    },
  ];

  let gridSet = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];

  const [slideActive, setSlideActive] = useState(-1);
  let [quizSet, setQuizSet] = useState(quizSetExample);

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

  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Navigation Bar */}
      <header>{NavCreate()}</header>
      {/* Navigation Bar */}

      {/* Main Bar */}
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
                          setQuizTypeIdx((prevState) => i);
                          setTabClickedState([
                            i == 0 ? 1 : 0,
                            i == 1 ? 1 : 0,
                            i == 2 ? 1 : 0,
                            i == 3 ? 1 : 0,
                            i == 4 ? 1 : 0,
                            i == 5 ? 1 : 0,
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
          {form(quizTypeIdx)}
          {/* Main Form */}

          <div
            onClick={() => {}}
            style={{ height: "9vh", textAlign: "center" }}
          >
            <ThemeIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                let copy = [...quizSet];
                copy.unshift({
                  quizType: "objective",
                  quizContents: "",
                  selection: [],
                  answerNumber: [],
                  scoredRate: 3,
                  timeLimit: [0, 1, 0],
                });
                setQuizSet(copy);
              }}
            >
              <Plus style={{ color: "white" }} />
            </ThemeIcon>
          </div>
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
        <section style={{ height: "80vh", width: "18vw", marginLeft: "10px" }}>
          <Center>
            <ScrollArea
              style={{ width: "20vw", height: "60vh", textAlign: "center" }}
            >
              <Center>
                <Grid style={{ width: "10vw" }}>
                  <Grid.Col style={{ height: "40px", width: "40px" }} span={4}>
                    15s
                  </Grid.Col>
                  <Grid.Col style={{ height: "40px", width: "40px" }} span={4}>
                    30s
                  </Grid.Col>

                  <Grid.Col style={{ height: "40px", width: "40px" }} span={4}>
                    45s
                  </Grid.Col>
                </Grid>
                <br></br>
              </Center>
              {quizSet.map((quiz, i) => {
                return (
                  <div key={i}>
                    <Tooltip
                      label={"Q".concat(
                        (i + 1).toString(),
                        ". ",
                        quiz.quizContents
                      )}
                    >
                      <br></br>
                      <Grid>
                        {quizSet[i].timeLimit.map((time, j) => {
                          return (
                            <div key={i}>
                              <Grid.Col
                                onClick={() => {
                                  quizSet[i].timeLimit = gridSet[j];
                                }}
                                onDragOver={() => {
                                  alert("hello!");
                                }}
                                style={{
                                  cursor: "pointer",
                                  height: "30px",
                                  width: "30px",
                                  borderRadius: "50%",
                                  boxShadow:
                                    "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                                }}
                                span={4}
                              >
                                {quizSet[i].timeLimit[j] == 1 ? (
                                  colorRt(quizSet[i].quizType)
                                ) : (
                                  <span />
                                )}
                              </Grid.Col>
                              <br></br>
                            </div>
                          );
                        })}
                      </Grid>
                      <ThemeIcon style={{ cursor: "pointer" }} color="gray">
                        <Trash
                          onClick={() => {
                            let copy = [...quizSet];
                            copy.splice(i, 1);
                            setQuizSet(copy);
                          }}
                        >
                          삭제
                        </Trash>
                      </ThemeIcon>
                    </Tooltip>
                  </div>
                );
              })}
            </ScrollArea>
          </Center>
          <Link href="./create3">
            <Button
              style={{
                textAlign: "center",
                fontSize: "18px",
                height: "40px",
                width: "90%",
              }}
              variant="outline"
            >
              완성하기
            </Button>
          </Link>
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
