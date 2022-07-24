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
  Tooltip,
  Slider,
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
          borderRadius: "50%",
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
          borderRadius: "50%",
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
          borderRadius: "50%",
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
      timeLimit: [0, 1, 0],
    },
    {
      quizType: "ox",
      quizContents: "대한민국은 영어로 korea이다.",
      selection: ["O", "X"],
      answerNumber: ["0"],
      scoredRate: 3,
      timeLimit: [0, 1, 0],
    },
    {
      quizType: "objective",
      quizContents: "소프트웨어 마에스트로가 있는 건물은?",
      selection: ["센터필드", "아남타워", "황해주택", "인하주택"],
      answerNumber: ["2"],
      scoredRate: 3,
      timeLimit: [0, 1, 0],
    },
  ];

  let gridSet = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];

  const [slideActive, setSlideActive] = useState(-1);
  let [quizSet, setQuizSet] = useState(arr);

  return (
    <section style={{ height: "80vh", width: "18vw", marginLeft: "10px" }}>
      <Center>
        <ScrollArea
          style={{ width: "20vw", height: "60vh", textAlign: "center" }}
        >
          <Center>
            <Grid style={{ width: "10vw" }}>
              <Grid.Col style={{ height: "40px", width: "40px" }} span={4}>
                15s
              </Grid.Col>
              <Grid.Col style={{ height: "40px", width: "40px" }} span={4}>
                30s
              </Grid.Col>

              <Grid.Col style={{ height: "40px", width: "40px" }} span={4}>
                45s
              </Grid.Col>
            </Grid>
            <br></br>
          </Center>
          {quizSet.map((school, i) => {
            return (
              <div key={i}>
                <Tooltip
                  label={"Q".concat(
                    (i + 1).toString(),
                    ". ",
                    quizSet[i].quizContents
                  )}
                >
                  <Grid>
                    {quizSet[i].timeLimit.map((time, j) => {
                      return (
                        <div key={i}>
                          <Grid.Col
                            onClick={() => {
                              quizSet[i].timeLimit = gridSet[j];
                            }}
                            onDragOver={() => {
                              alert("hello!");
                            }}
                            style={{
                              cursor: "pointer",
                              height: "30px",
                              width: "30px",
                              borderRadius: "50%",
                              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                            }}
                            span={4}
                          >
                            {quizSet[i].timeLimit[j] == 1 ? (
                              colorRt(quizSet[i].quizType)
                            ) : (
                              <span />
                            )}
                          </Grid.Col>
                          <br></br>
                        </div>
                      );
                    })}
                  </Grid>
                </Tooltip>
              </div>
            );
          })}
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
