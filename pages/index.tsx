import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { Button } from "@mantine/core";
import { Emphasis, FileX, Login, ReportMoney } from "tabler-icons-react";

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
            fontSize: 14,
            marginLeft: 0,
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
          component="a"
          rel="noopener noreferrer"
          href="/"
          leftIcon={<ReportMoney size={32} />}
          styles={(theme) => ({
            root: {
              fontSize: 16,
              paddingLeft: 15,
              color: "black",
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
          가격안내
        </Button>

        <Button
          component="a"
          rel="noopener noreferrer"
          href="/"
          leftIcon={<Login size={32} />}
          styles={(theme) => ({
            root: {
              fontSize: 16,
              paddingLeft: 15,
              color: "black",
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
          로그인
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

      <main className={styles.main}></main>

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
