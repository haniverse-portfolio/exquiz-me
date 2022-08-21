import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import NavIndex from "./components/navIndex";
import SchoolList from "./components/schoolList";
import { useState } from "react";
import { useRef } from "react";

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
  Clock,
  Alarm,
  BellRinging,
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
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "고뇌하는 니체",
      animal: "Panda",
      color: "orange",
      answer: true,
    },
    {
      nickname: "엉뚱한 튜링",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "활기찬 뉴턴",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "명랑한 브라헤",
      animal: "Panda",
      color: "orange",
      answer: true,
    },
    {
      nickname: "정의로운 보어",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "창의적인 레오나르도",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "사색하는 공자",
      animal: "Panda",
      color: "orange",
      answer: true,
    },
    {
      nickname: "부유한 스미스",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "정직한 데카르트",
      animal: "Panda",
      color: "orange",
      answer: true,
    },
    {
      nickname: "슬기로운 세종",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "유능한 한신",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "전설적인 칸",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "전략적인 제갈공명",
      animal: "Panda",
      color: "orange",
      answer: true,
    },
    {
      nickname: "신박한 유레카",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "듬직한 테슬라",
      animal: "Panda",
      color: "orange",
      answer: true,
    },
    {
      nickname: "명석한 칼세이건",
      animal: "Panda",
      color: "orange",
      answer: true,
    },
    {
      nickname: "건강한 클레오파트라",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "용감한 이순신",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "공평한 링컨",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "신속한 나폴레옹",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "뛰어난 워렌버핏",
      animal: "Panda",
      color: "orange",
      answer: true,
    },
    {
      nickname: "비장한 스티브잡스",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "신들린 모차르트",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "감각적인 고흐",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "독보적인 내쉬",
      animal: "Panda",
      color: "orange",
      answer: true,
    },
    {
      nickname: "헌신적인 테레사",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "위대한 스티븐호킹",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
    {
      nickname: "입체적인 피카소",
      animal: "Panda",
      color: "orange",
      answer: true,
    },
    {
      nickname: "성스러운 잔다르크",
      animal: "Panda",
      color: "orange",
      answer: false,
    },
  ]);
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
              <Stack className="mx-2">
                <Stack>
                  {/* ../public/globe_banner.png */}
                  <p className="underline decoration-amber-500 font-bold text-7xl text-center mt-10">
                    🌋우리나라에서 가장 높은 산은?🏔
                  </p>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>

                  <br></br>
                  <br></br>
                  <Stack>
                    <Group>
                      <Button
                        color="red"
                        className="h-[20vh] w-[40vw]"
                        variant="outline"
                      >
                        <p className="text-6xl">지리산</p>
                      </Button>
                      <Button
                        className="h-[20vh] w-[40vw]"
                        color="blue"
                        variant="outline"
                      >
                        <p className="text-6xl">설악산</p>
                      </Button>
                    </Group>
                    <Group>
                      <Button
                        className="h-[20vh] w-[40vw]"
                        color="green"
                        variant="outline"
                      >
                        <p className="text-6xl">한라산</p>
                      </Button>
                      <Button
                        className="h-[20vh] w-[40vw]"
                        color="yellow"
                        variant="outline"
                      >
                        <p className="text-6xl">백두산</p>
                      </Button>
                    </Group>
                  </Stack>
                </Stack>

                <br></br>
                <Stack>
                  <Group className="justify-between">
                    <Button
                      className="mx-4 h-[60px] w-[200px]"
                      variant="outline"
                      gradient={{ from: "orange", to: "red" }}
                      component="a"
                      rel="noopener noreferrer"
                      rightIcon={<Alarm size={38} />}
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
                      시간 연장 +10
                    </Button>
                    <p className="font-bold text-4xl text-red-500">00:05</p>

                    <Button
                      className=" h-[60px] w-[200px] bg-orange-500"
                      variant="gradient"
                      gradient={{ from: "orange", to: "red" }}
                      component="a"
                      rel="noopener noreferrer"
                      leftIcon={<BellRinging size={38} />}
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
                      조기 종료
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
