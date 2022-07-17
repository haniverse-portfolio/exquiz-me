import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

import {
  Button,
  Grid,
  SimpleGrid,
  Input,
  TextInput,
  Center,
} from "@mantine/core";
import {
  Emphasis,
  FileX,
  Login,
  ReportMoney,
  UserCircle,
  Pencil,
} from "tabler-icons-react";

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

      <main>
        <div
          style={{
            height: "88vh",
            backgroundColor: "orange",
            textAlign: "center",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginLeft: "40vw",
              marginRight: "40vw",
            }}
          >
            <Button
              variant="light"
              color="gray"
              fullWidth
              style={{ marginTop: 14 }}
            >
              QR코드로 입장하기
            </Button>
            <p style={{ textAlign: "center", color: "white" }}>
              {" "}
              핀 번호를 입력하세요.
            </p>
            <TextInput placeholder="# 123 456" label="" required />
          </div>
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
