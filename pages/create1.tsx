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
} from "tabler-icons-react";
// 85vh 20vw

function fastSetting() {}
function detailSetting() {}
function quizSetting() {}
// 빈 슬라이드 객관식 주관식 O/X 넌센스 다이나믹
const Home: NextPage = () => {
  const [progressActive, setProgressActive] = useState(-1);
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

      <header style={{}}>{NavCreate()}</header>
      <main style={{ marginLeft: 20, marginRight: 20 }}>
        <section>
          <div
            style={{
              margin: "5vh 20vw",
              height: "65vh",
            }}
          >
            <Tabs position="center" variant="pills">
              <Tabs.Tab
                label={
                  <ThemeIcon
                    style={{
                      backgroundColor: "#babbbd",
                    }}
                  >
                    <BrowserPlus color="white" />
                  </ThemeIcon>
                }
                style={{
                  border: "1px dotted",
                  borderRadius: "10px",
                  height: "50px",
                  width: "50px",
                  color: "black",
                  backgroundColor: "#babbbd",
                }}
              >
                <Container
                  style={{
                    height: "500px",
                    width: "100%",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                >
                  <Textarea
                    placeholder="슬라이드 내용을 입력하세요."
                    label=""
                    required
                  />
                </Container>
              </Tabs.Tab>
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
                <Container
                  style={{
                    height: "500px",
                    width: "100%",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                >
                  <Textarea
                    placeholder="문제 내용을 입력하세요."
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
                </Container>
              </Tabs.Tab>
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
                <Container
                  style={{
                    height: "500px",
                    width: "100%",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                >
                  <Textarea
                    placeholder="문제 내용을 입력하세요."
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
                </Container>
              </Tabs.Tab>
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
                <Container
                  style={{
                    height: "500px",
                    width: "100%",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                >
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
                </Container>
              </Tabs.Tab>

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
                <Container
                  style={{
                    height: "500px",
                    width: "100%",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                >
                  *제작 준비 중입니다.
                </Container>
              </Tabs.Tab>

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
                <Container
                  style={{
                    height: "500px",
                    width: "100%",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                >
                  *제작 준비 중입니다.
                </Container>
              </Tabs.Tab>
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
