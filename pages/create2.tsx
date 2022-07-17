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
  ScrollArea,
} from "@mantine/core";
import {
  Emphasis,
  FileX,
  Login,
  ReportMoney,
  UserCircle,
  Pencil,
  Hash,
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
        <div style={{ height: "75vh" }}>
          <div
            style={{
              margin: "20px 20vw",
              height: "10vh",
              textAlign: "center",
            }}
          >
            <Stepper color="red" size="md" active={1}>
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
                문제 난이도
              </span>
              를 평가해주세요.
            </p>
            <Button
              style={{
                fontSize: "22px",
                height: "80px",
                width: "27%",
              }}
              variant="outline"
            >
              쉬움
            </Button>
            <Button
              style={{
                marginLeft: "5px",
                fontSize: "22px",
                height: "80px",
                width: "27%",
                color: "gray",
              }}
              variant="outline"
            >
              보통
            </Button>
            <Button
              style={{
                marginLeft: "5px",
                fontSize: "22px",
                height: "80px",
                width: "27%",
                color: "red",
              }}
              variant="outline"
            >
              어려움
            </Button>

            <p style={{ textAlign: "left" }}>
              {" "}
              -{" "}
              <span style={{ textDecoration: "underline orange 5px" }}>
                제한 시간
              </span>
              을 설정해주세요.
            </p>
            <Button
              style={{
                fontSize: "22px",
                height: "80px",
                width: "27%",
              }}
              variant="outline"
            >
              15초
            </Button>
            <Button
              style={{
                marginLeft: "5px",
                fontSize: "22px",
                height: "80px",
                width: "27%",
                color: "gray",
              }}
              variant="outline"
            >
              30초
            </Button>
            <Button
              style={{
                marginLeft: "5px",
                fontSize: "22px",
                height: "80px",
                width: "27%",
                color: "red",
              }}
              variant="outline"
            >
              45초
            </Button>
          </div>
        </div>
        <div style={{ height: "9vh", textAlign: "center" }}>
          <Link href="/create1">
            <Button
              variant="gradient"
              gradient={{ from: "#fa584b", to: "#fc7b1b" }}
            >
              ← &nbsp;빠른 설정
            </Button>
          </Link>
          <Button
            variant="gradient"
            gradient={{ from: "teal", to: "lime", deg: 105 }}
            style={{ marginLeft: "20px" }}
          >
            이대로 만들래요
          </Button>
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
