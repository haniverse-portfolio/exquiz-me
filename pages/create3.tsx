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
  Checkbox,
  Textarea,
  ScrollArea,
  RadioGroup,
  Radio,
  Select,
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
        <div style={{ height: "75vh" }}>
          <div
            style={{
              margin: "20px 22vw",
              height: "10vh",
              textAlign: "center",
            }}
          >
            <Stepper color="red" size="md" active={2}>
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
            <p
              style={{
                textAlign: "left",
                textDecoration: "underline orange 5px",
              }}
            >
              퀴즈 제목을 정해주세요
            </p>
            <TextInput
              placeholder="키워드가 들어간 문제는 검색 알고리즘 향상에 도움이 됩니다."
              label=""
              required
            />

            <p
              style={{
                textAlign: "left",
                textDecoration: "underline orange 5px",
              }}
            >
              클로징 멘트를 작성해주세요
            </p>
            <TextInput
              placeholder="키워드가 들어간 문제는 검색 알고리즘 향상에 도움이 됩니다."
              label=""
              required
            />
            <p
              style={{
                textAlign: "left",
                textDecoration: "underline orange 5px",
              }}
            >
              과목 분류를 선택해주세요
            </p>
            <Select
              label=""
              placeholder="과목"
              data={[
                { value: "korean", label: "국어" },
                { value: "mathmatics", label: "수학" },
                { value: "english", label: "영어" },
                { value: "science", label: "과학" },

                { value: "society", label: "사회" },
                { value: "athletes", label: "체육" },
                { value: "music", label: "음악" },
                { value: "art", label: "미술" },
              ]}
            />
          </div>
        </div>
        <div style={{ height: "9vh", textAlign: "center" }}>
          <Link href="/myQuiz">
            <Button
              variant="gradient"
              gradient={{ from: "#fa584b", to: "#fc7b1b" }}
            >
              완성하기
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
