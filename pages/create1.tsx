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
} from "@mantine/core";
import {
  Emphasis,
  FileX,
  Login,
  ReportMoney,
  UserCircle,
  Pencil,
} from "tabler-icons-react";

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
        <div style={{ height: "100vh" }}>
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
            <p style={{ textAlign: "left", fontWeight: "bold" }}>
              {" "}
              - 문제 종류를 선택해주세요.
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
                <br></br>
                <Autocomplete
                  style={{ textAlign: "left" }}
                  label="선지 개수를 골라주세요."
                  placeholder="선지 개수"
                  data={["3개", "4개", "5개", "6개"]}
                />
              </Tabs.Tab>
              <Tabs.Tab
                label="주관식"
                style={{
                  color: "white",
                  backgroundImage:
                    "linear-gradient(to right, #4A73F0, #3A8DDA)",
                }}
              >
                Second tab content
              </Tabs.Tab>
              <Tabs.Tab
                label="O/X"
                style={{
                  color: "white",
                  backgroundImage:
                    "linear-gradient(to right, #23B87F, #79C72F)",
                }}
              >
                Third tab content
              </Tabs.Tab>
              <Tooltip
                label="이런! 프리미엄 구독자만 이용 가능합니다."
                openDelay={500}
              >
                <Tabs.Tab
                  disabled
                  label="다이나믹 퀴즈"
                  style={{
                    color: "white",
                    backgroundImage:
                      "linear-gradient(to right, #F9B204, #FFD400)",
                  }}
                >
                  Third tab content
                </Tabs.Tab>
              </Tooltip>
            </Tabs>
          </div>
          <div></div>
          <div style={{ height: "90vh" }}></div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          style={{ textDecoration: "none" }}
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
