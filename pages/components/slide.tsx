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
  ScrollArea,
} from "@mantine/core";
import {
  Emphasis,
  FileX,
  Login,
  ReportMoney,
  UserCircle,
  Pencil,
  Archive,
} from "tabler-icons-react";

function Slide() {
  let arr = [
    {
      quizType: "subjective",
      quizContents: "가장 높은 산은?",
      selection: ["지리산", "북한산", "한라산", "설악산"],
      answerNumber: ["1"],
      scoredRate: 3,
      timeLimit: 30,
    },
  ];

  return (
    <ScrollArea style={{ width: "20vw", height: "85vh" }}>
      <p style={{ textAlign: "center", fontWeight: "bold" }}>문제 보관함</p>
      <hr></hr>
      {arr.map((school, i) => {
        return (
          <div key={i} style={{ textAlign: "left" }}>
            <Button
              component="a"
              rel="noopener noreferrer"
              href="#"
              styles={(theme) => ({
                root: {
                  backgroundColor: "#fc7b1b",
                  border: 0,
                  height: 42,
                  paddingLeft: 20,
                  paddingRight: 20,

                  "&:hover": {
                    backgroundColor: theme.fn.darken("gray", 0.05),
                  },
                },
              })}
            >
              Q{i + 1}. {arr[i].quizContents}
            </Button>
          </div>
        );
      })}
    </ScrollArea>
  );
}

export default Slide;
