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
    <div style={{ textAlign: "center" }}>
      <p
        style={{ margin: "20px 0px", textAlign: "center", fontWeight: "bold" }}
      >
        문제 보관함
      </p>
      <Button
        style={{
          textAlign: "center",
          fontSize: "18px",
          height: "40px",
          width: "90%",
        }}
        variant="outline"
      >
        추가하기
      </Button>
      <ScrollArea
        style={{ width: "20vw", height: "70vh", textAlign: "center" }}
      >
        <br></br>
        <br></br>
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
    </div>
  );
}

export default Slide;
