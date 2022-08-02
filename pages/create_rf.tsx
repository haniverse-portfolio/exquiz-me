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
} from "@mantine/core";

import {
  SquareCheck,
  Parentheses,
  QuestionMark,
  AB,
  Apps,
  AdjustmentsHorizontal,
  Notes,
  BrowserPlus,
  Plus,
  Trash,
  Check,
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
  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className=" bg-gradient-to-r from-purple-500 to-pink-500">
        <Center>
          <Container className="m-10 p-10 h-500 w-80vw bg-white shadow-lg sm:rounded-3xl backdrop-blur-xl bg-opacity-80">
            hello wefwefwef wefwefweffwe fewf wefwefwef
          </Container>
          <Container>hello</Container>
        </Center>
      </section>
    </div>
  );
};

export default Home;
