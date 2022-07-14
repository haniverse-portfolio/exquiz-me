import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

import { Button } from "@mantine/core";
import {
  Emphasis,
  FileX,
  Login,
  ReportMoney,
  UserCircle,
} from "tabler-icons-react";

function nav() {
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
            fontSize: 14,
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
          variant="gradient"
          gradient={{ from: "yellow", to: "orange" }}
          component="a"
          rel="noopener noreferrer"
          href="/membership"
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

              "&:hover": {},
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
    <div className={styles.container}>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header style={{ position: "sticky", zIndex: "100" }}>{nav()}</header>

      <main>
        <div
          style={{
            height: 600,
          }}
        >
          <Button
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
            component="a"
            rel="noopener noreferrer"
            href="/experience"
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
            문제 제작하기
          </Button>
          <Button
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
            component="a"
            rel="noopener noreferrer"
            href="/enter"
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
          <p>exquiz.me</p>
        </div>

        <div style={{ height: 400, display: "flex", alignItems: "center" }}>
          <p style={{ fontWeight: "bold" }}>
            약 3,677개의 학교들이<br></br> exquiz.me를 사용중입니다.
          </p>
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
