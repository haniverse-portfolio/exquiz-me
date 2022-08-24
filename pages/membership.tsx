import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import NavCreate from "./components/navCreate";
import Slide from "./components/slide";
import axios from "axios";
import { useRef } from "react";

import {
  Button,
  SimpleGrid,
  Tooltip,
  Textarea,
  ScrollArea,
  Center,
  Container,
  ThemeIcon,
  Checkbox,
  Group,
  Accordion,
  useMantineTheme,
  Box,
  ActionIcon,
  Slider,
  BackgroundImage,
  Switch,
  Stack,
  MantineProvider,
  Card,
  Text,
  Badge,
} from "@mantine/core";

import {
  AdjustmentsHorizontal,
  Notes,
  Plus,
  Trash,
  Check,
  Home2,
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
  Parentheses,
} from "tabler-icons-react";

import { copyFileSync } from "fs";
// 85vh 20vw

function sideIconCode(idx: string) {
  if (idx == "empty") return <BrowserPlus size={20} color={"#babbbd"} />;
  if (idx == "MultipleChoiceProblem")
    return <SquareCheck size={20} color={"#fa584b"} />;
  if (idx == "subjective") return <Parentheses size={20} color={"#4A73F0"} />;
  if (idx == "ox") return <AB size={20} color={"#23B87F"} />;
  if (idx == "nonsense") return <QuestionMark size={20} color={"#F4B404"} />;
  if (idx == "dynamic") return <Apps size={20} color={"#946cee"} />;
}

function rtColor(idx: string) {
  if (idx == "empty") return "#babbbd";
  if (idx == "MultipleChoiceProblem") return "#fa584b";
  if (idx == "subjective") return "#4A73F0";
  if (idx == "ox") return "#23B87F";
  if (idx == "nonsense") return "#F4B404";
  if (idx == "dynamic") return "#946cee";
}

function tabIconCode(idx: number) {
  if (idx == 0) return <BrowserPlus size={"2vw"} />;
  if (idx == 1) return <SquareCheck size={"2vw"} />;
  if (idx == 2) return <Parentheses size={"2vw"} />;
  if (idx == 3) return <AB size={"2vw"} />;
  if (idx == 4) return <QuestionMark size={"2vw"} />;
  if (idx == 5) return <Apps size={"2vw"} />;
}

// 빈 슬라이드 객관식 주관식 O/X 넌센스 다이나믹
const Home: NextPage = () => {
  /* slide */
  let [currentIdx, setCurrentIdx] = useState(-1);
  /* form */
  let [dtypeIdx, setdtypeIdx] = useState(0);
  const [progressActive, setProgressActive] = useState(-1);

  let input = [
    {
      answer: "-1",
      description: "",
      dtype: "MultipleChoiceProblem",
      index: "-1",
      picture: "",
      problemsetId: "0",
      score: "0",
      timeLimit: "30",
      title: "",
      options: [
        {
          description: "",
          index: 0,
          picture: "",
          problemId: 0,
        },
        {
          description: "",
          index: 1,
          picture: "",
          problemId: 0,
        },
        {
          description: "",
          index: 2,
          picture: "string",
          problemId: 0,
        },
        {
          description: "",
          index: 3,
          picture: "string",
          problemId: 0,
        },
      ],
    },
  ];

  const [slideActive, setSlideActive] = useState(-1);
  let [quizSet, setQuizSet] = useState(input);

  const theme = useMantineTheme();
  const getColor = (color: string) =>
    theme.colors[color][theme.colorScheme === "dark" ? 5 : 7];

  const tabColorCode = [
    "linear-gradient(to right, #babbbd, #babbbd)",
    "linear-gradient(to right, #fa584b, #fc7b1b)",
    "linear-gradient(to right, #4A73F0, #3A8DDA)",
    "linear-gradient(to right, #23B87F, #79C72F)",
    "linear-gradient(to right, #F9B204, #FFD400)",
    "linear-gradient(to right, #946cee, #b464eb)",
  ];

  const tabTooltip = [
    "빈 슬라이드",
    "객관식",
    "주관식",
    "O/X",
    "넌센스",
    "다이나믹",
  ];

  const idxToString = [
    "empty",
    "MultipleChoiceProblem",
    "subjective",
    "ox",
    "nonsense",
    "dynamic",
  ];

  function stringToIdx(x: string) {
    let rt = 1;
    if (x === "empty") rt = 0;
    if (x === "MultipleChoiceProblem") rt = 1;
    if (x === "subjective") rt = 2;
    if (x === "ox") rt = 3;
    if (x === "nonsense") rt = 4;
    if (x === "dynamic") rt = 5;
    return rt;
  }

  const MARKSTIME = [
    { value: 0, label: "15초" },
    { value: 25, label: "20초" },
    { value: 50, label: "30초" },
    { value: 75, label: "45초" },
    { value: 100, label: "1분" },
  ];

  const MARKSCORE = [
    { value: 0, label: "매우 적게" },
    { value: 25, label: "적게" },
    { value: 50, label: "보통" },
    { value: 75, label: "많이" },
    { value: 100, label: "매우 많이" },
  ];

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];
  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className=" bg-gradient-to-r from-purple-500 to-pink-500">
        <Center>
          <Container className="m-10 p-2 h-10/12 w-10/12 bg-white shadow-lg sm:rounded-3xl backdrop-blur-xl bg-opacity-60">
            <Card className="bg-opacity-0" shadow="sm" p="lg">
              <Group
                position="apart"
                style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
              >
                <Text style={{ display: "block" }} weight={500}>
                  무료 플랜
                </Text>
                <Badge color="gray" variant="light">
                  익스퀴즈미 회원 무료 제공
                </Badge>
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
          </Container>
          <Container className="m-10 p-2 h-10/12 w-10/12 bg-white shadow-lg sm:rounded-3xl backdrop-blur-xl bg-opacity-60">
            <Card shadow="sm" p="lg">
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
                퀴즈 제작 및 참여의 필수적인 기능을 합리적인 가격에 제공합니다.
              </Text>
              <Button
                variant="light"
                color="blue"
                fullWidth
                style={{ marginTop: 14 }}
              >
                <span
                  style={{
                    color: "gray",
                    textDecoration: "line-through",
                  }}
                >
                  월 5,990
                </span>
                &nbsp;→ 월 3,990원
              </Button>
            </Card>
          </Container>
          <Container className="m-10 p-2 h-10/12 w-10/12 bg-white shadow-lg sm:rounded-3xl backdrop-blur-xl bg-opacity-60">
            <Card shadow="sm" p="lg">
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
          </Container>
        </Center>
      </section>
    </div>
  );
};

export default Home;
