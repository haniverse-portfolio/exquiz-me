import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import NavIndex from "./components/navIndex";
import SchoolList from "./components/schoolList";
import { useState } from "react";
import { useRef } from "react";
import React, { useEffect } from "react";
import axios from "axios";

import {
  Button,
  Grid,
  SimpleGrid,
  Input,
  Card,
  Text,
  Badge,
  Group,
  useMantineTheme,
  Center,
  Tabs,
  ThemeIcon,
  Container,
  Textarea,
  Tooltip,
  Stack,
  Stepper,
  ActionIcon,
  Autocomplete,
  TextInput,
} from "@mantine/core";
import {
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
  Checkbox,
  Parentheses,
  Settings,
  Plus,
  Check,
  Number1,
  Number2,
  Number3,
  Circle,
  Triangle,
  X,
  Folders,
  ArrowBigRightLines,
  Qrcode,
  Copy,
} from "tabler-icons-react";

const rightEnvelope = (subject: number) => {
  const subjectInfo = [
    { name: "미분류", startColor: "gray", endColor: "gray" },
    { name: "언어", startColor: "orange", endColor: "red" },
    { name: "수리과학", startColor: "blue", endColor: "green" },
    { name: "인문사회", startColor: "violet", endColor: "pink" },
    { name: "예체능", startColor: "yellow", endColor: "orange" },
  ];

  return (
    <Group className="transition ease-in-out hover:scale-105" spacing={0}>
      <Group className="shadow-lg" spacing={0}>
        <Group
          className={`bg-${subjectInfo[subject].startColor} border-r-2 border-gray-300 shadow-lg h-24 w-4 bg-amber-200`}
        />
        <Group>
          <Stack spacing={0}>
            <Group
              className={`bg-gradient-to-r from-${subjectInfo[subject].startColor} to-${subjectInfo[subject].endColor} border-b-2 border-gray-300 m-0 p-0 h-12 w-32 bg-amber-200`}
            />
            <Group
              className={`bg-gradient-to-r from-${subjectInfo[subject].startColor} to-${subjectInfo[subject].endColor} m-0 p-0 h-12 w-32 bg-amber-200`}
            />
          </Stack>
        </Group>
      </Group>
      <Group
        className={`bg-gradient-to-r from-${subjectInfo[subject].startColor} to-${subjectInfo[subject].endColor} shadow-lg m-0 p-0 h-20 w-6 bg-white`}
      ></Group>
    </Group>
  );
};

const leftEnvelope = (subject: number) => {
  const subjectInfo = [
    { name: "미분류", startColor: "gray", endColor: "gray" },
    { name: "언어", startColor: "orange", endColor: "red" },
    { name: "수리과학", startColor: "blue", endColor: "green" },
    { name: "인문사회", startColor: "violet", endColor: "pink" },
    { name: "예체능", startColor: "yellow", endColor: "orange" },
  ];

  return (
    <Group className="transition ease-in-out hover:scale-105" spacing={0}>
      <Group
        className={`bg-gradient-to-r shadow-lg m-0 p-0 h-20 w-6 bg-white`}
      ></Group>
      <Group className="shadow-lg" spacing={0}>
        <Group>
          <Stack spacing={0}>
            <Group
              className={`bg-gradient-to-r from-${subjectInfo[subject].startColor}-500 to-${subjectInfo[subject].endColor}-500 m-0 p-0 h-12 w-32 bg-amber-200`}
            />
            <Group
              className={`bg-gradient-to-r from-${subjectInfo[subject].startColor}-500 to-${subjectInfo[subject].endColor}-500 m-0 p-0 h-12 w-32 bg-amber-200`}
            />
          </Stack>
        </Group>
        <Group
          className={`bg-${subjectInfo[subject].endColor}-500 border-l-2 border-gray-300 shadow-lg h-24 w-4 bg-amber-200`}
        />
      </Group>
    </Group>
  );
};

const Home: NextPage = () => {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const [active, setActive] = useState(0);

  const [status, setStatus] = useState([
    {
      nickname: "성찰하는 소크라테스",
      avatar: "panda",
      color: "orange",
      answer: false,
    },
  ]);

  // useEffect(() => {
  //   getPartlist();
  // }, []);

  let [partlist, setPartlist] = useState({
    currentScore: 0,
    entryDate: "2022-08-23T08:34:54.994Z",
    id: 0,
    name: "string",
    nickname: "string",
    roomDto: {
      currentProblemNum: 0,
      currentState: "FINISH",
      endDate: "2022-08-23T08:34:54.994Z",
      id: 0,
      maxParticipantCount: 0,
      pin: "string",
      problemsetDto: {
        closingMent: "string",
        description: "string",
        id: 0,
        title: "string",
      },
      startDate: "2022-08-23T08:34:54.994Z",
    },
    uuid: "string",
  });
  const getPartlist = () => {
    axios
      .get("https://dist.exquiz.me//api/room/100494/participants")
      .then((result) => {
        setPartlist(result.data);
      })
      .catch((error) => {
        alert("getParticipants_error");
      });
    return;
  };
  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ margin: "0px 10px" }}>
        <section className="h-[86vh]">
          <Stack className="items-center flex contents-between">
            <Stack>
              {/* 메인 배너 */}
              <Stack className="mx-40">
                <Stack>
                  {/* ../public/globe_banner.png */}
                  <p className="underline decoration-amber-500 font-bold text-6xl text-left mt-10">
                    핀 번호
                  </p>
                  <Group>
                    <p className="font-bold text-9xl text-left mb-10">
                      # 354673
                    </p>{" "}
                    <Button
                      color="orange"
                      variant="outline"
                      leftIcon={<Copy></Copy>}
                    >
                      복사하기
                    </Button>
                  </Group>
                </Stack>
                <Stack>
                  <Group>
                    {status.map((cur, i) => {
                      let color;
                      return (
                        <Stack>
                          <Group
                            className={`h-32 w-32 rounded-xl border-2 ${
                              cur.answer === false ? "bg-gray-200" : ""
                            }`}
                          >
                            <Group></Group>
                          </Group>
                          <p
                            className={`text-center ${
                              cur.answer === false ? "text-gray-400" : ""
                            }`}
                          >
                            {cur.nickname}
                          </p>
                        </Stack>
                      );
                    })}
                  </Group>
                </Stack>
                <br></br>
                <Stack>
                  <Group className="justify-between">
                    <Button
                      className=" h-[60px] w-[200px] bg-orange-500"
                      variant="gradient"
                      gradient={{ from: "orange", to: "red" }}
                      component="a"
                      rel="noopener noreferrer"
                      href="/inbox"
                      leftIcon={<Qrcode size={38} />}
                      styles={(theme) => ({
                        root: {
                          fontWeight: "bold",
                          fontSize: 20,
                          marginLeft: 5,
                          color: "white",
                          backgroundColor: "orange",
                          border: 0,
                          height: 42,

                          "&:hover": {},
                        },

                        leftIcon: {
                          marginRight: 5,
                        },
                      })}
                    >
                      QR코드 화면
                    </Button>
                    <p className="font-bold text-4xl">
                      입장 인원 : &nbsp;
                      <strong className="text-amber-500">
                        {status.length}명
                      </strong>
                    </p>
                    <Button
                      className="mx-4 h-[60px] w-[200px]"
                      variant="outline"
                      gradient={{ from: "orange", to: "red" }}
                      component="a"
                      rel="noopener noreferrer"
                      href="/play"
                      rightIcon={<ArrowBigRightLines size={38} />}
                      styles={(theme: {
                        fn: { darken: (arg0: string, arg1: number) => any };
                      }) => ({
                        root: {
                          textDecoration: "none",
                          fontWeight: "bold",
                          fontSize: 20,
                          marginRight: 10,
                          color: "orange",
                          backgroundColor: "white",
                          border: "2px solid orange",
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
                      시작하기
                    </Button>
                  </Group>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <br />
          <br />
          <br />
        </section>
      </main>
    </div>
  );
};

export default Home;
