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
} from "tabler-icons-react";

const Home: NextPage = () => {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const [active, setActive] = useState(0);
  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>{NavIndex()}</header>

      <main style={{ margin: "0px 10px" }}>
        <section className="h-[86vh]">
          <Stack className="items-center flex contents-between">
            <Stack>
              <Stack
                style={{
                  fontSize: 36,
                  textDecoration: "underline orange 10px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                <p className="mt-10">퀴즈의 새로운 경험을 제시하다</p>
                <p className="mb-10">exquiz.me</p>
              </Stack>
              <Center>
                <TextInput
                  className="w-[14vw]"
                  placeholder="핀 번호 입력하여 입장하기"
                />
              </Center>
            </Stack>
            {/* 아미지 - 봉투 */}
            <Group
              className="transition ease-in-out hover:scale-105"
              spacing={0}
            >
              <Group className="shadow-lg" spacing={0}>
                <Group className="border-r-2 border-gray-300 shadow-lg h-32 w-4 bg-amber-200" />
                <Group>
                  <Stack spacing={0}>
                    <Group className="border-b-2 border-gray-300 m-0 p-0 h-16 w-48 bg-amber-200" />
                    <Group className=" m-0 p-0 h-16 w-48 bg-amber-200" />
                  </Stack>
                </Group>
              </Group>
              <Group className="shadow-lg m-0 p-0 h-28 w-8 bg-white"></Group>
            </Group>
          </Stack>
          <br />
          <br />
          <br />

          <Center>
            <Group className=" m-auto">
              <Stack
                className="transition ease-in-out hover:scale-105 h-72 w-80 rounded-2xl shadow-lg"
                id="index-btns"
              >
                <Center>
                  <ActionIcon className="transition ease-in-out hover:rotate-90">
                    <Plus />
                  </ActionIcon>
                </Center>
                <Button
                  className="mx-4"
                  variant="outline"
                  gradient={{ from: "orange", to: "red" }}
                  component="a"
                  rel="noopener noreferrer"
                  href="/create"
                  leftIcon={<Pencil size={32} />}
                  styles={(theme: {
                    fn: { darken: (arg0: string, arg1: number) => any };
                  }) => ({
                    root: {
                      fontWeight: "bold",
                      fontSize: 16,
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
                  문제 제작하기
                </Button>
                <p className="mx-4 font-semibold">
                  직관적인 출제. 자유로운 커스터마이징
                </p>
                <p className="mx-4">
                  직관적이고 커스터마이징이 간편한 퀴즈 제작 툴을 만나보세요.
                  배점부터 시간까지 설정은 여러분의 자유입니다.
                </p>
              </Stack>

              <Stack className="transition ease-in-out hover:scale-105 h-72 w-80 rounded-2xl shadow-lg">
                <Center>
                  <ActionIcon className="transition ease-in-out hover:rotate-[120deg]">
                    <Triangle />
                  </ActionIcon>
                </Center>
                <Center className="mx-4 h-[4.5vh]">
                  <Autocomplete
                    className="w-full"
                    placeholder="퀴즈 검색하기"
                    data={["언어", "수리과학", "인문사회", "예체능"]}
                  />
                </Center>
                <p className="mx-4 font-semibold">
                  현직 교사들이 제작한 퀴즈 열람
                </p>
                <p className="mx-4">
                  학교 인증을 통해 검증된 퀴즈들을 둘러보세요. exquiz.me의
                  자동화된 태그 시스템이 원하시는 퀴즈의 편리한 이용을
                  지원합니다.
                </p>
              </Stack>

              <Stack className="transition ease-in-out hover:scale-105 h-72 w-80 rounded-2xl shadow-lg">
                <Center>
                  <ActionIcon className="transition ease-in-out hover:-translate-y-2">
                    <Circle />
                  </ActionIcon>
                </Center>
                <Button
                  className="mx-4 bg-orange-500"
                  onClick={() => {
                    alert("아직 들어가지 마세요");
                  }}
                  variant="gradient"
                  gradient={{ from: "orange", to: "red" }}
                  component="a"
                  rel="noopener noreferrer"
                  href="/#"
                  leftIcon={<Login size={32} />}
                  styles={(theme: {
                    fn: { darken: (arg0: string, arg1: number) => any };
                  }) => ({
                    root: {
                      fontWeight: "bold",
                      fontSize: 16,
                      marginRight: 10,
                      color: "white",
                      backgroundColor: "white",
                      border: 0,
                      height: 42,

                      "&:hover": {},
                    },

                    leftIcon: {
                      marginRight: 5,
                    },
                  })}
                >
                  방 생성하기
                </Button>
                <p className="mx-4 font-semibold">즐거운 퀴즈 시간을 즐기기</p>
                <p className="mx-4">
                  방을 생성해서 학생들을 초대해보세요. 다양한 종류의 퀴즈와
                  경쟁적인 리더보드, 그리고 통계가 제공됩니다.
                </p>
              </Stack>
            </Group>
          </Center>
        </section>
      </main>

      <footer className={styles.footer}>
        <a
          className="no-underline text-white font-semibold"
          href="/apiTest"
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
