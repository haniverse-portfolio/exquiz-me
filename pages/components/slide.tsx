import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import React, { useState } from "react";

import {
  Button,
  Grid,
  SimpleGrid,
  Input,
  TextInput,
  Center,
  ScrollArea,
  Accordion,
  ThemeIcon,
  Stepper,
} from "@mantine/core";
import {
  Emphasis,
  FileX,
  Login,
  ReportMoney,
  UserCircle,
  Pencil,
  Archive,
  Palette,
  Photo,
  SquareCheck,
  Parentheses,
  AB,
} from "tabler-icons-react";

function logoRt(type: string) {
  if (type == "subjective") return "주";
  if (type == "objective") return "객";
  if (type == "ox") return "O/X";
  if (type == "dynamic") return "동적";
}

function colorRt(type: string) {
  if (type == "subjective")
    return (
      <ThemeIcon
        style={{
          backgroundImage: "linear-gradient(to right, #4A73F0, #3A8DDA)",
        }}
      >
        <Parentheses color="white" />
      </ThemeIcon>
    );
  if (type == "objective")
    return (
      <ThemeIcon
        style={{
          backgroundImage: "linear-gradient(to right, #fa584b, #fc7b1b)",
        }}
      >
        <SquareCheck color="white" />
      </ThemeIcon>
    );
  if (type == "ox")
    return (
      <ThemeIcon
        style={{
          backgroundImage: "linear-gradient(to right, #23B87F, #79C72F)",
        }}
      >
        <AB color="white" />
      </ThemeIcon>
    );
  if (type == "dynamic") return "gold";
}

function Slide() {
  let arr = [
    {
      quizType: "subjective",
      quizContents: "가장 높은 산은 ()이다?",
      selection: ["지리산", "북한산", "한라산", "설악산"],
      answerNumber: ["1"],
      scoredRate: 3,
      timeLimit: 30,
    },
    {
      quizType: "ox",
      quizContents: "대한민국은 영어로 korea이다.",
      selection: ["O", "X"],
      answerNumber: ["0"],
      scoredRate: 3,
      timeLimit: 45,
    },
    {
      quizType: "objective",
      quizContents: "소프트웨어 마에스트로가 있는 건물은?",
      selection: ["센터필드", "아남타워", "황해주택", "인하주택"],
      answerNumber: ["2"],
      scoredRate: 3,
      timeLimit: 60,
    },
  ];

  const [slideActive, setSlideActive] = useState(-1);

  return (
    <section style={{ textAlign: "center" }}>
      <Center>
        <ScrollArea
          style={{ width: "20vw", height: "40vh", textAlign: "center" }}
        >
          <br></br>
          <br></br>
          <Stepper
            color="orange"
            active={slideActive}
            onStepClick={setSlideActive}
            orientation="vertical"
          >
            {arr.map((school, i) => {
              return (
                <Stepper.Step
                  iconPosition="left"
                  color="orange"
                  style={{ backgroundColor: "none" }}
                  key={i}
                  label={i + 1}
                  icon={colorRt(arr[i].quizType)}
                ></Stepper.Step>
              );
            })}
          </Stepper>
        </ScrollArea>
      </Center>
      <Link href="./create3">
        <Button
          style={{
            textAlign: "center",
            fontSize: "18px",
            height: "40px",
            width: "90%",
          }}
          variant="outline"
        >
          완성하기
        </Button>
      </Link>
    </section>
  );
}

export default Slide;
