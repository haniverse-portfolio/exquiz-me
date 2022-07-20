import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import NavIndex from "./components/navIndex";
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
} from "tabler-icons-react";
// 85vh 20vw

function fastSetting() {}
function detailSetting() {}
function quizSetting() {}

const Home: NextPage = () => {
  return (
    <div
      style={{
        scrollSnapAlign: "start",
        scrollSnapPointsY: "repeat(100vh)",
        scrollSnapType: "y mandatory",
      }}
    >
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header style={{ position: "sticky", zIndex: "100" }}>
        {NavIndex()}
      </header>

      <main style={{ marginLeft: 20, marginRight: 20 }}>
        <div
          style={{
            margin: "20px 22vw",
            height: "10vh",
            textAlign: "center",
          }}
        >
          <Stepper color="red" size="md" active={0}>
            <Stepper.Step label="빠른설정" description="" />
            <Stepper.Step label="세부설정" description="" />
            <Stepper.Step label="완성하기" description="" />
          </Stepper>
        </div>
        <section>
          <div
            style={{
              margin: "20px 20vw",
              height: "10vh",
            }}
          >
            <Tabs position="center" variant="pills">
              <Tooltip
                label="객관식"
                position="top"
                placement="center"
                gutter={10}
              >
                <Tabs.Tab
                  label={
                    <ThemeIcon
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #fa584b, #fc7b1b)",
                      }}
                    >
                      <SquareCheck color="white" />
                    </ThemeIcon>
                  }
                  style={{
                    borderRadius: "10px",
                    height: "50px",
                    width: "50px",
                    color: "white",
                    backgroundImage:
                      "linear-gradient(to right, #fa584b, #fc7b1b)",
                  }}
                >
                  {/* 객관식 내용물 */}
                  <br></br>
                  <TextInput
                    placeholder="키워드가 들어간 문제는 검색 알고리즘 향상에 도움이 됩니다."
                    label=""
                    required
                  />
                  <br></br>
                  <SimpleGrid cols={2}>
                    <div>
                      <div>
                        <Checkbox label="" />
                        <Textarea
                          maxRows={2}
                          placeholder="선지 1"
                          label=""
                          required
                        />
                      </div>
                    </div>
                    <div>
                      {" "}
                      <div>
                        <Checkbox label="" />
                        <Textarea
                          maxRows={2}
                          placeholder="선지 2"
                          label=""
                          required
                        />
                      </div>
                    </div>
                    <div>
                      {" "}
                      <div>
                        <Checkbox label="" />
                        <Textarea
                          maxRows={2}
                          placeholder="선지 3"
                          label=""
                          required
                        />
                      </div>
                    </div>
                    <div>
                      {" "}
                      <div>
                        <Checkbox label="" />
                        <Textarea
                          maxRows={2}
                          placeholder="선지 4"
                          label=""
                          required
                        />
                      </div>
                    </div>
                  </SimpleGrid>
                </Tabs.Tab>
              </Tooltip>

              <Tooltip
                label="주관식"
                position="top"
                placement="center"
                gutter={10}
              >
                <Tabs.Tab
                  label={
                    <ThemeIcon
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #4A73F0, #3A8DDA)",
                      }}
                    >
                      <Parentheses color="white" />
                    </ThemeIcon>
                  }
                  style={{
                    borderRadius: "10px",
                    height: "50px",
                    width: "50px",
                    color: "white",
                    backgroundImage:
                      "linear-gradient(to right, #4A73F0, #3A8DDA)",
                  }}
                >
                  <br></br>
                  <p
                    style={{
                      textAlign: "left",
                      textDecoration: "underline orange 5px",
                    }}
                  >
                    문제 내용을 입력해주세요
                  </p>
                  <Textarea
                    maxRows={2}
                    placeholder="문제 내용"
                    label=""
                    required
                  />
                  <br></br>
                  <p
                    style={{
                      textAlign: "left",
                      textDecoration: "underline orange 5px",
                    }}
                  >
                    선지 내용을 입력해주세요
                  </p>
                  <SimpleGrid cols={2}>
                    <div>
                      <div>
                        <Checkbox label="" />
                        <Textarea
                          maxRows={2}
                          placeholder="선지 1"
                          label=""
                          required
                        />
                      </div>
                    </div>
                    <div>
                      {" "}
                      <div>
                        <Checkbox label="" />
                        <Textarea
                          maxRows={2}
                          placeholder="선지 2"
                          label=""
                          required
                        />
                      </div>
                    </div>
                    <div>
                      {" "}
                      <div>
                        <Checkbox label="" />
                        <Textarea
                          maxRows={2}
                          placeholder="선지 3"
                          label=""
                          required
                        />
                      </div>
                    </div>
                    <div>
                      {" "}
                      <div>
                        <Checkbox label="" />
                        <Textarea
                          maxRows={2}
                          placeholder="선지 4"
                          label=""
                          required
                        />
                      </div>
                    </div>
                  </SimpleGrid>
                </Tabs.Tab>
              </Tooltip>
              <Tooltip
                label="O/X"
                position="top"
                placement="center"
                gutter={10}
              >
                <Tabs.Tab
                  label={
                    <ThemeIcon
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #23B87F, #79C72F)",
                      }}
                    >
                      <AB color="white" />
                    </ThemeIcon>
                  }
                  style={{
                    borderRadius: "10px",
                    height: "50px",
                    width: "50px",
                    color: "white",
                    backgroundImage:
                      "linear-gradient(to right, #23B87F, #79C72F)",
                  }}
                >
                  {/* 객관식 내용물 */}
                  <br></br>
                  <p
                    style={{
                      textAlign: "left",
                      textDecoration: "underline orange 5px",
                    }}
                  >
                    문제 내용을 입력해주세요
                  </p>
                  <TextInput
                    placeholder="키워드가 들어간 문제는 검색 알고리즘 향상에 도움이 됩니다."
                    label=""
                    required
                  />
                  <br></br>
                  <p
                    style={{
                      textAlign: "left",
                      textDecoration: "underline orange 5px",
                    }}
                  >
                    정답을 선택해주세요
                  </p>
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
                </Tabs.Tab>
              </Tooltip>
              <Tooltip
                label="넌센스"
                position="top"
                placement="center"
                gutter={10}
              >
                <Tabs.Tab
                  label={
                    <ThemeIcon
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #F9B204, #FFD400)",
                      }}
                    >
                      <QuestionMark color="white" />
                    </ThemeIcon>
                  }
                  style={{
                    borderRadius: "10px",
                    height: "50px",
                    width: "50px",
                    color: "white",
                    backgroundImage:
                      "linear-gradient(to right, #F9B204, #FFD400)",
                  }}
                >
                  *제작 준비 중입니다.
                </Tabs.Tab>
              </Tooltip>

              <Tooltip
                label="다이나믹"
                position="top"
                placement="center"
                gutter={10}
              >
                <Tabs.Tab
                  label={
                    <ThemeIcon
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #946cee, #b464eb)",
                      }}
                    >
                      <Apps color="white" />
                    </ThemeIcon>
                  }
                  style={{
                    borderRadius: "10px",
                    height: "50px",
                    width: "50px",
                    color: "white",
                    backgroundImage:
                      "linear-gradient(to right, #946cee, #b464eb)",
                  }}
                >
                  *제작 준비 중입니다.
                </Tabs.Tab>
              </Tooltip>
            </Tabs>
          </div>
          <div style={{ height: "9vh", textAlign: "center" }}>
            <Button
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
            >
              이대로 제작할래요
            </Button>
            <Link href="/create2">
              <Button
                variant="gradient"
                gradient={{ from: "teal", to: "lime", deg: 105 }}
                style={{ marginLeft: "20px" }}
              >
                세부 설정 &nbsp;→
              </Button>
            </Link>
          </div>
        </section>
        <div
          style={{
            backgroundColor: "orange",
            position: "fixed",
            top: 44,
            left: 0,
          }}
        >
          <Slide></Slide>
        </div>
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
