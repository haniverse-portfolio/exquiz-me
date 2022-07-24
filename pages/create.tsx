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

function tabIconCode(idx: number) {
  if (idx == 0) return <BrowserPlus />;
  if (idx == 1) return <SquareCheck />;
  if (idx == 2) return <Parentheses />;
  if (idx == 3) return <AB />;
  if (idx == 4) return <QuestionMark />;
  if (idx == 5) return <Apps />;
}

function fastSetting() {}
function detailSetting() {}
function quizSetting() {}
// 빈 슬라이드 객관식 주관식 O/X 넌센스 다이나믹
const Home: NextPage = () => {
  let [quizTypeIdx, setQuizTypeIdx] = useState(-1);
  const [progressActive, setProgressActive] = useState(-1);

  let tabColorCode = [
    ["linear-gradient(to right, #babbbd, #babbbd)"],
    ["linear-gradient(to right, #fa584b, #fc7b1b)"],
    ["linear-gradient(to right, #4A73F0, #3A8DDA)"],
    ["linear-gradient(to right, #23B87F, #79C72F)"],
    ["linear-gradient(to right, #F9B204, #FFD400)"],
    ["linear-gradient(to right, #946cee, #b464eb)"],
  ];

  let tabTooltip = [
    "빈 슬라이드",
    "객관식",
    "주관식",
    "O/X",
    "넌센스",
    "다이나믹",
  ];

  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Navigation Bar */}
      <header>{NavCreate()}</header>

      <main style={{ marginLeft: 20, marginRight: 20 }}>
        <section style={{ height: "75vh", margin: "5vh 20vw" }}>
          <Container
            style={{
              margin: "20px 20px",
              borderRadius: "10px",
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
            }}
          >
            <Center>
              <Group>
                {tabColorCode.map((colorCode, i) => {
                  return (
                    <Tooltip key={i} label={tabTooltip[i]}>
                      <ThemeIcon
                        onClick={() => {
                          setQuizTypeIdx(i);
                        }}
                        key={i}
                        style={{
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
            </Center>
          </Container>
          {form(quizTypeIdx)}

          <div style={{ height: "9vh", textAlign: "center" }}>
            <Link href="/create2">
              <ThemeIcon>
                <Plus style={{ color: "white" }} />
              </ThemeIcon>
            </Link>
          </div>
        </section>
        <div
          style={{
            position: "fixed",
            top: 44,
            left: 0,
          }}
        ></div>
      </main>

      <footer className={styles.footer}>
        <a
          style={{ textDecoration: "none", color: "black" }}
          href="https://retro5pect.tistory.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright ⓒ 2022 exquiz.me All rights reserved. | Team MUMOMU.
        </a>
      </footer>

      {/* Slide - Side Bar */}
      <div style={{ position: "fixed", left: 0, top: 100 }}>
        <Slide></Slide>
      </div>
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
