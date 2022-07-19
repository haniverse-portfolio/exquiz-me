import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import NavIndex from "./components/navIndex";

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
            <p
              style={{
                textAlign: "left",
                textDecoration: "underline orange 5px",
              }}
            >
              1. 문제 배점을 정해주세요
            </p>
            <RadioGroup
              label=""
              description=""
              spacing="xl"
              size="md"
              color="red"
              required
            >
              <Radio value="1" label="" />
              <Radio value="2" label="" />
              <Radio value="3" label="" />
              <Radio value="4" label="" />
              <Radio value="5" label="" />
              <Radio value="6" label="" />
            </RadioGroup>

            <p
              style={{
                textAlign: "left",
                textDecoration: "underline orange 5px",
              }}
            >
              2. 제한 시간을 설정해주세요.
            </p>
            <RadioGroup
              label=""
              description=""
              spacing="xl"
              size="md"
              color="red"
              required
            >
              <Radio value="1" label="" />
              <Radio value="2" label="" />
              <Radio value="3" label="" />
              <Radio value="4" label="" />
              <Radio value="5" label="" />
              <Radio value="6" label="" />
            </RadioGroup>
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
