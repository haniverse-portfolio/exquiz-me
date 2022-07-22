import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import NavIndex from "./components/navIndex";
import SchoolList from "./components/schoolList";

import {
  Button,
  Grid,
  SimpleGrid,
  Input,
  Card,
  Text,
  Badge,
  Group,
  useMantineTheme,
  Center,
  Tabs,
  ThemeIcon,
  Container,
  Textarea,
} from "@mantine/core";
import {
  Emphasis,
  FileX,
  Login,
  ReportMoney,
  UserCircle,
  Pencil,
  Archive,
  BrowserPlus,
  SquareCheck,
  AB,
  QuestionMark,
  Apps,
  Checkbox,
  Parentheses,
} from "tabler-icons-react";

const Home: NextPage = () => {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];
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

      <header>{NavIndex()}</header>

      <main>
        <section>
          <div
            style={{
              height: "55vh",
              textAlign: "center",
            }}
          >
            <div
              style={{
                height: "30vh",
                display: "flex",
                justifyContent: "space-between",
                backgroundImage: "linear-gradient(to left,#F9B204, #fc7b1b)",
              }}
            >
              <div style={{ marginLeft: 20, marginRight: 20 }}>
                <div
                  style={{
                    textAlign: "right",
                    height: "400px",
                    width: "400px",
                    borderRadius: "50%",
                    backgroundColor: "white",
                  }}
                >
                  <span
                    style={{
                      fontSize: 36,
                      textDecoration: "underline orange 10px",
                      fontWeight: "bold",
                      textAlign: "right",
                    }}
                  >
                    <br></br>
                    퀴즈에 경험을 더하다<br></br> exquiz.me
                  </span>
                </div>
              </div>
            </div>
            <br></br>
            <br></br>
            <Button
              variant="outline"
              gradient={{ from: "orange", to: "red" }}
              component="a"
              rel="noopener noreferrer"
              href="/create1"
              leftIcon={<Pencil size={32} />}
              styles={(theme) => ({
                root: {
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
              문제 제작하기
            </Button>
            <Button
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
              component="a"
              rel="noopener noreferrer"
              href="/host"
              leftIcon={<Login size={32} />}
              styles={(theme) => ({
                root: {
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
              방 생성하기
            </Button>
          </div>
          <div style={{ height: "40vh" }}>
            <p style={{ fontWeight: "bold", textAlign: "center" }}>
              약 3,677개의 학교에서<br></br> exquiz.me를 사용중입니다.
            </p>
            <Center>
              <div
                style={{
                  height: "5px",
                  width: "30px",
                  backgroundColor: "black",
                }}
              ></div>
              <br></br>
              <br></br>
            </Center>
            <Center style={{ textAlign: "center" }}>{SchoolList()}</Center>
          </div>
        </section>

        <section>
          <div style={{ height: "40vh" }}>
            <p style={{ fontWeight: "bold", textAlign: "center" }}>
              아래에서 간단히 체험해보세요.
            </p>
          </div>
          <div style={{ height: "40vh" }}>
            <p style={{ fontWeight: "bold", textAlign: "left" }}>
              - exquiz.me는 직관적인 문제 제작 툴을 제공합니다. 직접 해보세요!
            </p>
            <div style={{ width: "60vw", textAlign: "center" }}>
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
                          <Checkbox />
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
                          <Checkbox />
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
                          <Checkbox />
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
                          <Checkbox />
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
                          <Checkbox />
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
                          <Checkbox />
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
                          <Checkbox />
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
                          <Checkbox />
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
          </div>
        </section>

        <div>
          <div style={{ height: "40vh" }}>
            <p style={{ fontWeight: "bold", textAlign: "right" }}>
              exquiz.me는 새로운 퀴즈 경험을 제시합니다 -
            </p>
          </div>

          <div style={{ height: "40vh" }}>
            <p style={{ fontWeight: "bold", textAlign: "left" }}>
              - exquiz.me는 재미있는 스코어보드와 통계를 제공합니다.
            </p>
          </div>
        </div>
        <div>
          <div style={{ height: "10vh" }}>
            <p style={{ fontWeight: "bold", textAlign: "center" }}>
              아래에서 나에게 가장 맞는 플랜을 선택해보세요.
            </p>
          </div>

          <div style={{ height: "50vh" }}>
            <div style={{ width: 340, margin: "auto" }}>
              <Card shadow="sm" p="lg">
                <Card.Section></Card.Section>

                <Group
                  position="apart"
                  style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
                >
                  <Text weight={500}>무료 플랜</Text>
                </Group>

                <Text
                  size="sm"
                  style={{ color: secondaryColor, lineHeight: 1.5 }}
                >
                  익스퀴즈미가 제공하는 무료 서비스 입니다.
                </Text>

                <Button
                  variant="light"
                  color="gray"
                  fullWidth
                  style={{ marginTop: 14 }}
                >
                  현재 이용 중
                </Button>
              </Card>
              <Card shadow="sm" p="lg">
                <Card.Section></Card.Section>

                <Group
                  position="apart"
                  style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
                >
                  <Text weight={500}>스탠다드 플랜 (실속형)</Text>
                  <Badge color="blue" variant="light">
                    30% 할인 특가
                  </Badge>
                </Group>

                <Text
                  size="sm"
                  style={{ color: secondaryColor, lineHeight: 1.5 }}
                >
                  퀴즈 제작 및 참여의 필수적인 기능만 골라서 합리적인 가격에
                  제공합니다.
                </Text>

                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  style={{ marginTop: 14 }}
                >
                  <span
                    style={{ color: "gray", textDecoration: "line-through" }}
                  >
                    월 5,990
                  </span>{" "}
                  &nbsp;→ 월 3,990원
                </Button>
              </Card>
              <Card shadow="sm" p="lg">
                <Card.Section></Card.Section>

                <Group
                  position="apart"
                  style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
                >
                  <Text weight={500}>프리미엄 플랜</Text>
                  <Badge color="orange" variant="light">
                    모든 서비스 이용 가능
                  </Badge>
                </Group>

                <Text
                  size="sm"
                  style={{ color: secondaryColor, lineHeight: 1.5 }}
                >
                  퀴즈 제작 및 참여의 모든 과정에서 최고의 서비스를 제공합니다.
                </Text>

                <Button
                  variant="light"
                  color="orange"
                  fullWidth
                  style={{ marginTop: 14 }}
                >
                  월 7,990원
                </Button>
              </Card>
            </div>
          </div>
        </div>
        <div
          style={{
            position: "fixed",
            background: "white",
            boxShadow:
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
            borderRadius: "50%",
            height: "50px",
            width: "50px",
            right: "10px",
            bottom: "10px",
            cursor: "pointer",
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
    </div>
  );
};

export default Home;
