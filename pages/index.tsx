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
        <section>
          <Group className="items-center flex contents-between">
            <Stack>
              <Group
                style={{
                  fontSize: 36,
                  textDecoration: "underline orange 10px",
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                <br></br>더 쉽고 더 재밌는 모르겠다<br></br>퀴즈의 새로운 경험을
                제시하다
                <br></br> exquiz.me 상빈이형이 지어줘
              </Group>
              <Group>
                <Button
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
                <Button
                  className="bg-orange-500"
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
              </Group>
            </Stack>
            {/* 아미지 - 봉투 */}
            <Group spacing={0}>
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
          </Group>
          <br />
          <br />
          <br />

          <br />
          <br />
          <br />

          <br />
          <br />
          <br />
          <Center>
            <Group className=" m-auto">
              <Stack className="transition ease-in-out hover:scale-105 h-72 w-80 rounded-2xl shadow-lg">
                <Center>
                  <ActionIcon className="transition ease-in-out hover:rotate-90">
                    <Plus />
                  </ActionIcon>
                </Center>
                <p className="font-semibold">제작하기</p>
                <p className="mx-4">
                  직관적이고 커스터마이징이 간편한 퀴즈 제작 툴을 만나보세요.
                </p>
                <p className="mx-4">
                  배점부터 시간까지 설정은 여러분의 자유입니다.
                </p>
              </Stack>

              <Stack className="transition ease-in-out hover:scale-105 h-72 w-80 rounded-2xl shadow-lg">
                <Center>
                  <ActionIcon className="transition ease-in-out hover:rotate-[120deg]">
                    <Triangle />
                  </ActionIcon>
                </Center>
                <p className="font-semibold">참여하기</p>
                <p className="mx-4">
                  수업을 듣는 학생 여러분들은 여기로 오시면 됩니다. 뭔가 적고
                  있지만 떠오르지가 않네요.
                </p>
                <p className="mx-4">아래에 핀번호를 입력하세요.</p>
              </Stack>

              <Stack className="transition ease-in-out hover:scale-105 h-72 w-80 rounded-2xl shadow-lg">
                <Center>
                  <ActionIcon className="transition ease-in-out hover:-translate-y-2">
                    <Circle />
                  </ActionIcon>
                </Center>
                <p className="font-semibold">방만들기</p>
                <p className="mx-4">방을 만들어보세요.</p>
                <p className="mx-4">^^</p>
              </Stack>
            </Group>
          </Center>
        </section>
      </main>

      <footer className={styles.footer}>
        <a
          style={{ textDecoration: "none", color: "black" }}
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
