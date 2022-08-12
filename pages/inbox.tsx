import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
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
  Grid,
  Stepper,
  TextInput,
  Image,
  Paper,
  Tabs,
  Modal,
  Text,
} from "@mantine/core";

import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

import { useScrollIntoView } from "@mantine/hooks";

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
  Folders,
  FileSettings,
  FilePlus,
  FileCheck,
  Settings,
  ArrowBarRight,
  ArrowBarLeft,
  ToggleLeft,
} from "tabler-icons-react";

import { NotificationsProvider } from "@mantine/notifications";
import { copyFileSync } from "fs";
import { errorMonitor } from "events";
import { resourceLimits } from "worker_threads";
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

// 빈 슬라이드 객관식 주관식 O/X 넌센스 다이나믹
const Home: NextPage = () => {
  /* slide */
  let [curIdx, setCurIdx] = useState(0);
  /* form */
  let [tabIdx, setTabIdx] = useState(0);
  const [progressActive, setProgressActive] = useState(-1);

  {
    /* *** main state *** */
  }
  let [problemSet, setProblemSet] = useState({
    closingMent: "",
    description: "",
    hostId: 1,
    title: "",
  });

  {
    /* mantine statement */
  }
  const theme = useMantineTheme();
  const getColor = (color: string) =>
    theme.colors[color][theme.colorScheme === "dark" ? 5 : 7];

  {
    /* 2. 문제 추가 - subNav - tab */
  }

  {
    /* 1. 퀴즈 설정 - 메인 #과목 선택 */
  }
  const subjectInfo = [
    { name: "미분류", startColor: "gray", endColor: "gray" },
    { name: "언어", startColor: "orange", endColor: "red" },
    { name: "수리과학", startColor: "blue", endColor: "green" },
    { name: "인문사회", startColor: "violet", endColor: "pink" },
    { name: "예체능", startColor: "yellow", endColor: "orange" },
  ];

  {
    /* 1. 퀴즈 설정 - 사이드바 - #stepper */
  }
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView();
  const [step, setStep] = useState(0);

  /* 2. modal */
  const [modalOpened, setModalOpened] = useState(false);
  /* submit form */
  let submitForm = {
    answerText: "1",
    problemIdx: 1,
    uuid: "d7a23266-6fc7-421a-9ed8-aad169013e52",
  };

  const getLeaderboard = async () => {
    const { data: result } = await axios.get(
      "https://dist.exquiz.me/api/room/100310/mq/leaderboard"
    );
    return result.data;
  };

  const getProblemsets = () => {
    axios
      .get("https://prod.exquiz.net/api/problemsets/1")
      .then((result) => {
        setProblemsets(result.data);
      })
      .catch((error) => {
        alert(error);
      });
    return;
  };

  let [problemsets, setProblemsets] = useState([
    { id: -1, title: "", description: "", closingMent: "" },
  ]);
  getProblemsets();

  const submit = async () => {
    const { data: result } = await axios.post(
      "https://dist.exquiz.me/api/room/100310/mq/submit",
      submitForm
    );
    return result.data;
  };

  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section
        className={`w-full h-full bg-gradient-to-r from-orange-500 to-yellow-500`}
      >
        <Center>
          <Center className=" my-2 h-[115vh] w-[99vw]">
            <Stack>
              {/* main */}
              {step === 0 ? (
                <Group>
                  <Group>
                    <ActionIcon variant="transparent">
                      <ArrowBarLeft
                        className="cursor-default opacity-0"
                        color="white"
                        size="xl"
                      />
                    </ActionIcon>
                  </Group>
                  <Group className="items-center m-2 p-10 bg-white shadow-lg sm:rounded-3xl backdrop-blur-xl bg-opacity-80">
                    <Stack>
                      {/* Navigation Bar */}
                      <Group className="justify-between">
                        <Tooltip label="홈">
                          <ActionIcon color="orange" component="a" href="/">
                            <Home2 />
                          </ActionIcon>
                        </Tooltip>
                        <Group>
                          <Tooltip label="멤버십">
                            <ActionIcon
                              color="orange"
                              component="a"
                              href="/membership"
                            >
                              <ReportMoney />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label="퀴즈 관리">
                            <ActionIcon
                              color="orange"
                              component="a"
                              href="/membership"
                            >
                              <Folders />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label="계정 관리">
                            <ActionIcon
                              color="orange"
                              component="a"
                              href="#"
                              // variant="transparent"
                            >
                              <UserCircle />
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                      </Group>

                      <Group>
                        <ScrollArea scrollbarSize={0} style={{ height: 500 }}>
                          <Stack>
                            <Stack>
                              {/* 텍스트 - 퀴즈 정보 */}
                              <h2 className="font-semibold">퀴즈 정보</h2>
                              {/* 컨텐츠 - 퀴즈 정보 */}
                              <Group className="p-10 bg-white shadow-lg sm:rounded-3xl backdrop-blur-xl bg-opacity-50">
                                {/* 이미지 - 봉투 */}
                                <Tooltip
                                  position="bottom-start"
                                  transition="scale-y"
                                  transitionDuration={300}
                                  withArrow
                                  label={"몰루"}
                                >
                                  <Group spacing={0}>
                                    <Group className="shadow-lg" spacing={0}>
                                      <Group className="border-r-2 border-gray-300 shadow-lg h-32 w-4 bg-amber-200" />
                                      <Group>
                                        <Stack spacing={0}>
                                          <Group className="border-b-2 border-gray-300 m-0 p-0 h-16 w-48 bg-amber-200" />
                                          <Group className=" m-0 p-0 h-16 w-48 bg-amber-200">
                                            <Group
                                              className={`mx-1 text-white cursor-pointer w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full`}
                                            >
                                              <p className="text-xs m-auto">
                                                태그
                                              </p>
                                            </Group>
                                          </Group>
                                        </Stack>
                                      </Group>
                                    </Group>
                                    <Group className="shadow-lg m-0 p-0 h-28 w-8 bg-white"></Group>
                                  </Group>
                                </Tooltip>
                                {/* 입력 - 퀴즈 정보 */}
                                <Stack>
                                  <p> 여기 어디</p>
                                  <Button
                                    className="bg-black"
                                    onClick={() => {
                                      let submitForm = {
                                        answerText: "1",
                                        problemIdx: 0,
                                        uuid: "d7a23266-6fc7-421a-9ed8-aad169013e52",
                                      };

                                      axios
                                        .post(
                                          "https://dist.exquiz.me/api/room/100310/mq/submit",
                                          submitForm
                                        )
                                        .then((result) => {
                                          alert(result.data);
                                        })
                                        .catch((error) => {
                                          alert(error.response.data);
                                        });
                                    }}
                                  >
                                    Press me!
                                  </Button>
                                  <Button
                                    className="bg-black"
                                    onClick={() => {
                                      axios
                                        .get(
                                          "https://dist.exquiz.me/api/room/100310/mq/leaderboard"
                                        )
                                        .then((result) => {
                                          alert(JSON.stringify(result.data));
                                        })
                                        .catch((error) => {
                                          alert(error);
                                        });
                                    }}
                                  >
                                    리더보드 GET
                                  </Button>
                                </Stack>
                              </Group>
                            </Stack>
                            {/* 텍스트 - 과목 선택 */}
                            <Group className="font-semibold">퀴즈 선택</Group>
                            {problemsets.map(
                              ({ id, title, description, closingMent }, i) => {
                                return (
                                  <Stack key={i}>
                                    <Group spacing={0}>
                                      <Group className="shadow-lg" spacing={0}>
                                        <Group className="border-r-2 border-gray-300 shadow-lg h-32 w-4 bg-amber-200" />
                                        <Group>
                                          <Stack spacing={0}>
                                            <Group className="border-b-2 border-gray-300 m-0 p-0 h-16 w-48 bg-amber-200" />
                                            <Group className=" m-0 p-0 h-16 w-48 bg-amber-200">
                                              <Group
                                                className={`mx-1 text-white cursor-pointer w-12 h-12 bg-gradient-to-r from-black to-black rounded-full`}
                                              >
                                                <p className="text-xs m-auto">
                                                  hello1
                                                </p>
                                              </Group>
                                              <Group
                                                className={`mx-1 text-white cursor-pointer w-12 h-12 bg-gradient-to-r from-black to-black rounded-full`}
                                              >
                                                <p className="text-xs m-auto">
                                                  hello2
                                                </p>
                                              </Group>
                                            </Group>
                                          </Stack>
                                        </Group>
                                      </Group>
                                      <Group className="shadow-lg m-0 p-0 h-28 w-8 bg-white"></Group>
                                    </Group>
                                    <p className="text-xs m-auto">{title}</p>
                                  </Stack>
                                );
                              }
                            )}
                          </Stack>
                        </ScrollArea>
                      </Group>
                    </Stack>
                  </Group>
                </Group>
              ) : (
                <></>
              )}

              {/* caching tailwind css */}
              <Group className=" bg-gradient-to-r shadow-[inset_0_-2px_4px_rgba(128,128,128,0.8)] border-gray-500 from-gray-500 to-gray-500 w-0 h-0" />
              <Group className="bg-gradient-to-r border-orange-500 from-orange-500 to-red-500 w-0 h-0" />
              <Group className="bg-gradient-to-r border-blue-500 from-blue-500 to-green-500 w-0 h-0" />
              <Group className="bg-gradient-to-r border-violet-500 from-violet-500 to-orange-500 w-0 h-0" />
              <Group className="bg-gradient-to-r border-yellow-500 from-yellow-500 to-orange-500 w-0 h-0" />
              <Group className="bg-gradient-to-r border-gray-500 from-gray-400 to-gray-400 w-0 h-0" />
              <Group className="bg-gradient-to-r border-red-500 from-red-500 to-orange-500 w-0 h-0" />
              <Group className="bg-gradient-to-r border-blue-500 from-blue-700 to-blue-500 w-0 h-0" />
              <Group className="bg-gradient-to-r border-green-500 from-green-500 to-lime-500 w-0 h-0" />
              <Group className="bg-gradient-to-r border-amber-500 from-amber-500 to-yellow-400 w-0 h-0" />
              <Group className="bg-gradient-to-r border-violet-500 from-violet-700 to-fuchsia-600 w-0 h-0" />
            </Stack>
          </Center>
        </Center>
      </section>
    </div>
  );
};

export default Home;
function sleep(arg0: number) {
  throw new Error("Function not implemented.");
}
