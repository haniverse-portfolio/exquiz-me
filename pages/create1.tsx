import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

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
  Checkbox,
  Textarea,
  Navbar,
  ScrollArea,
  Center,
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
} from "tabler-icons-react";
// 85vh 20vw
function Slide() {
  return (
    <ScrollArea style={{ width: "20vw", height: "85vh" }}>
      <p style={{ textAlign: "center", fontWeight: "bold" }}>
        현재 제작 완료된 퀴즈
      </p>
      <hr></hr>
      <div style={{ textAlign: "left" }}>
        <Button
          component="a"
          rel="noopener noreferrer"
          href="#"
          leftIcon={<Database size={18} />}
          styles={(theme) => ({
            root: {
              backgroundColor: "#fc7b1b",
              border: 0,
              height: 42,
              paddingLeft: 20,
              paddingRight: 20,

              "&:hover": {
                backgroundColor: theme.fn.darken("gray", 0.05),
              },
            },

            leftIcon: {
              marginRight: 15,
            },
          })}
        >
          가장 높은 산은?
        </Button>
        <Button
          component="a"
          rel="noopener noreferrer"
          href="#"
          leftIcon={<Database size={18} />}
          styles={(theme) => ({
            root: {
              backgroundColor: "#79C72F",
              border: 0,
              height: 42,
              paddingLeft: 20,
              paddingRight: 20,

              "&:hover": {
                backgroundColor: theme.fn.darken("gray", 0.05),
              },
            },

            leftIcon: {
              marginRight: 15,
            },
          })}
        >
          left는 영어로 왼쪽?
        </Button>
      </div>
    </ScrollArea>
  );
}

function Nav() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 3px 4px -4px black",
      }}
    >
      <Button
        component="a"
        rel="noopener noreferrer"
        href="/"
        leftIcon={<Emphasis size={32} />}
        styles={(theme) => ({
          root: {
            fontWeight: "bold",
            fontSize: 16,
            marginLeft: 10,
            paddingLeft: 0,
            color: "black",
            backgroundColor: "white",
            border: 0,
            height: 42,

            "&:hover": {
              backgroundColor: "white",
              //backgroundColor: theme.fn.darken("#ffffff", 0.05),
            },
          },

          leftIcon: {
            marginRight: 0,
          },
        })}
      >
        xquiz.me
      </Button>
      <span>
        <Button
          onClick={() => {
            alert("구독 연장까지 90일 남았습니다.");
          }}
          variant="gradient"
          gradient={{ from: "yellow", to: "orange" }}
          component="a"
          rel="noopener noreferrer"
          href="#"
          leftIcon={<ReportMoney size={32} />}
          styles={(theme) => ({
            root: {
              fontWeight: "bold",
              fontSize: 16,
              paddingLeft: 15,
              color: "white",
              backgroundColor: "white",
              border: 0,
              height: 42,

              "&:hover": {
                backgroundColor: theme.fn.darken("#ffffff", 0.05),
              },
            },

            leftIcon: {
              marginRight: 5,
            },
          })}
        >
          스탠다드 플랜 이용 중
        </Button>

        <Button
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          component="a"
          rel="noopener noreferrer"
          href="/login"
          leftIcon={<UserCircle size={32} />}
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
          내 퀴즈
        </Button>
      </span>
    </div>
  );
}

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

      <header style={{ position: "sticky", zIndex: "100" }}>{Nav()}</header>

      <main style={{ marginLeft: 20, marginRight: 20 }}>
        <div style={{ height: "75vh" }}>
          <div
            style={{
              margin: "20px 20vw",
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
          <div
            style={{
              margin: "20px 20vw",
              height: "10vh",
              textAlign: "center",
            }}
          >
            <p style={{ textAlign: "left" }}>
              {" "}
              -{" "}
              <span style={{ textDecoration: "underline orange 5px" }}>
                문제 종류
              </span>
              를 선택해주세요.
            </p>
            <Tabs variant="pills">
              <Tabs.Tab
                label="객관식"
                style={{
                  color: "white",
                  backgroundImage:
                    "linear-gradient(to right, #fa584b, #fc7b1b)",
                }}
              >
                {/* 객관식 내용물 */}
                <br></br>
                <p style={{ textAlign: "left" }}>
                  {" "}
                  -{" "}
                  <span style={{ textDecoration: "underline orange 5px" }}>
                    문제 내용
                  </span>
                  을 입력해주세요.
                </p>
                <TextInput
                  placeholder="키워드가 들어간 문제는 검색 알고리즘 향상에 도움이 됩니다."
                  label=""
                  required
                />
                <br></br>
                <p style={{ textAlign: "left" }}>
                  {" "}
                  -{" "}
                  <span style={{ textDecoration: "underline orange 5px" }}>
                    선지 내용
                  </span>
                  을 입력해주세요.
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
              <Tabs.Tab
                label="주관식"
                style={{
                  color: "white",
                  backgroundImage:
                    "linear-gradient(to right, #4A73F0, #3A8DDA)",
                }}
              >
                <br></br>
                <p style={{ textAlign: "left" }}>
                  {" "}
                  -{" "}
                  <span style={{ textDecoration: "underline orange 5px" }}>
                    문제 내용
                  </span>
                  을 입력해주세요.
                </p>
                <Textarea
                  maxRows={2}
                  placeholder="문제 내용"
                  label=""
                  required
                />
                <br></br>
                <p style={{ textAlign: "left" }}>
                  {" "}
                  -{" "}
                  <span style={{ textDecoration: "underline orange 5px" }}>
                    선지 내용
                  </span>
                  을 입력해주세요.
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
              <Tabs.Tab
                label="O/X"
                style={{
                  color: "white",
                  backgroundImage:
                    "linear-gradient(to right, #23B87F, #79C72F)",
                }}
              >
                {/* 객관식 내용물 */}
                <br></br>
                <p style={{ textAlign: "left" }}>
                  {" "}
                  -{" "}
                  <span style={{ textDecoration: "underline orange 5px" }}>
                    문제 내용
                  </span>
                  을 입력해주세요.
                </p>
                <TextInput
                  placeholder="키워드가 들어간 문제는 검색 알고리즘 향상에 도움이 됩니다."
                  label=""
                  required
                />
                <br></br>
                <p style={{ textAlign: "left" }}>
                  {" "}
                  -{" "}
                  <span style={{ textDecoration: "underline orange 5px" }}>
                    정답
                  </span>
                  을 선택해주세요.
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
              <Tabs.Tab
                label="다이나믹 퀴즈"
                style={{
                  color: "white",
                  backgroundImage:
                    "linear-gradient(to right, #F9B204, #FFD400)",
                }}
              >
                *제작 준비 중입니다.
              </Tabs.Tab>
            </Tabs>
          </div>
        </div>
        <div style={{ height: "9vh", textAlign: "center" }}>
          <Button variant="gradient" gradient={{ from: "indigo", to: "cyan" }}>
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
