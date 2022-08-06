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
} from "@mantine/core";

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
} from "tabler-icons-react";

import { NotificationsProvider } from "@mantine/notifications";
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

// 빈 슬라이드 객관식 주관식 O/X 넌센스 다이나믹
const Home: NextPage = () => {
  /* slide */
  let [currentIdx, setCurrentIdx] = useState(-1);
  /* form */
  let [tabIdx, setTabIdx] = useState(0);
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
  {
    /* *** main state *** */
  }
  let [quizSet, setQuizSet] = useState(input);
  const [slideActive, setSlideActive] = useState(-1);

  {
    /* mantine statement */
  }
  const theme = useMantineTheme();
  const getColor = (color: string) =>
    theme.colors[color][theme.colorScheme === "dark" ? 5 : 7];

  {
    /* 2. 문제 추가 - subNav - tab */
  }
  const tabInfo = [
    { name: "객관식", startColor: "red-500", endColor: "orange-500" },
    { name: "주관식", startColor: "blue-700", endColor: "blue-500" },
    { name: "O/X", startColor: "green-500", endColor: "lime-500" },
    { name: "넌센스", startColor: "amber-500", endColor: "yellow-400" },
    { name: "다이나믹", startColor: "violet-700", endColor: "fuchsia-600" },
    { name: "빈 슬라이드", startColor: "gray-400", endColor: "gray-400" },
  ];

  function tabIcon(idx: number) {
    if (idx == 0) return <SquareCheck className="m-auto" size={"2vw"} />;
    if (idx == 1) return <Parentheses className="m-auto" size={"2vw"} />;
    if (idx == 2) return <AB className="m-auto" size={"2vw"} />;
    if (idx == 3) return <QuestionMark className="m-auto" size={"2vw"} />;
    if (idx == 4) return <Apps className="m-auto" size={"2vw"} />;
    if (idx == 5) return <BrowserPlus className="m-auto" size={"2vw"} />;
  }

  const tabTooltip = [
    "빈 슬라이드",
    "객관식",
    "주관식",
    "O/X",
    "넌센스",
    "다이나믹",
  ];

  {
    /* custom converter */
  }
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
    { value: 0, label: "X" },
    { value: 25, label: "10" },
    { value: 50, label: "20" },
    { value: 75, label: "30" },
    { value: 100, label: "1M" },
  ];

  const MARKSCORE = [
    { value: 0, label: "매우 적게" },
    { value: 25, label: "적게" },
    { value: 50, label: "보통" },
    { value: 75, label: "많이" },
    { value: 100, label: "매우 많이" },
  ];
  {
    /* 1. 퀴즈 설정 - 메인 #과목 선택 */
  }
  let [subjectIdx, setSubjectIdx] = useState(0);
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
  const [active, setActive] = useState(0);
  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section
        className={`w-full h-full bg-gradient-to-r from-${
          subjectInfo[subjectIdx + (subjectIdx === 0 ? 4 : 0)].startColor
        }-500 to-${
          subjectInfo[subjectIdx + (subjectIdx === 0 ? 4 : 0)].endColor
        }-500`}
      >
        <Center>
          <Center className=" my-2 h-23/24 w-23/24">
            <Stack>
              {/* nav - stepper */}
              <Center>
                <Group className="items-center p-10 bg-white shadow-lg sm:rounded-3xl backdrop-blur-xl bg-opacity-80">
                  <Stepper
                    color={
                      subjectInfo[subjectIdx + (subjectIdx === 0 ? 4 : 0)]
                        .startColor
                    }
                    active={active}
                    onStepClick={setActive}
                    orientation="horizontal"
                  >
                    <Stepper.Step
                      icon={<Settings size={18} />}
                      label="퀴즈 설정"
                      description=""
                    />
                    <Stepper.Step
                      icon={<Plus size={18} />}
                      label="문제 추가"
                      description=""
                      onClick={() => scrollIntoView()}
                    />
                    <Stepper.Step
                      icon={<Check size={18} />}
                      label="퀴즈 배포"
                      description=""
                    />
                  </Stepper>
                </Group>
              </Center>
              {/* main */}
              <Group>
                <Group>
                  <ActionIcon variant="transparent">
                    <ArrowBarLeft color="white" />
                  </ActionIcon>
                </Group>
                <Group className="items-center m-2 p-10 bg-white shadow-lg sm:rounded-3xl backdrop-blur-xl bg-opacity-80">
                  <Stack>
                    {/* Navigation Bar */}
                    <Group className="justify-between">
                      <Tooltip label="홈">
                        <ActionIcon
                          color={
                            subjectInfo[subjectIdx + (subjectIdx === 0 ? 4 : 0)]
                              .startColor
                          }
                          component="a"
                          href="/"
                        >
                          <Home2 />
                        </ActionIcon>
                      </Tooltip>
                      <Group>
                        <Tooltip label="멤버십">
                          <ActionIcon
                            color={
                              subjectInfo[
                                subjectIdx + (subjectIdx === 0 ? 4 : 0)
                              ].startColor
                            }
                            component="a"
                            href="/membership"
                          >
                            <ReportMoney />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="퀴즈 관리">
                          <ActionIcon
                            color={
                              subjectInfo[
                                subjectIdx + (subjectIdx === 0 ? 4 : 0)
                              ].startColor
                            }
                            component="a"
                            href="/membership"
                          >
                            <Folders />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="계정 관리">
                          <ActionIcon
                            color={
                              subjectInfo[
                                subjectIdx + (subjectIdx === 0 ? 4 : 0)
                              ].startColor
                            }
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
                            <Group>
                              <h2 className="font-semibold">퀴즈 정보</h2>
                            </Group>
                            {/* 컨텐츠 - 퀴즈 정보 */}
                            <Group className="p-10 bg-white shadow-lg sm:rounded-3xl backdrop-blur-xl bg-opacity-50">
                              {/* 이미지 - 봉투 */}
                              <Tooltip
                                position="bottom-start"
                                transition="scale-y"
                                transitionDuration={300}
                                withArrow
                                label={
                                  subjectIdx === 0
                                    ? "아래 과목을 선택해 태그를 지정하세요."
                                    : "스티커를 누르면 미분류로 지정됩니다."
                                }
                              >
                                <Group spacing={0}>
                                  <Group className="shadow-lg" spacing={0}>
                                    <Group className="border-r-2 border-gray-300 shadow-lg h-32 w-4 bg-amber-200" />
                                    <Group>
                                      <Stack spacing={0}>
                                        <Group className="border-b-2 border-gray-300 m-0 p-0 h-16 w-48 bg-amber-200" />
                                        <Group className=" m-0 p-0 h-16 w-48 bg-amber-200">
                                          <Group
                                            onClick={() => {
                                              setSubjectIdx(0);
                                            }}
                                            className={`mx-3 text-white cursor-pointer w-12 h-12 bg-gradient-to-r from-${subjectInfo[subjectIdx].startColor}-500 to-${subjectInfo[subjectIdx].endColor}-500 rounded-full`}
                                          >
                                            <p className="text-xs m-auto">
                                              {subjectInfo[subjectIdx].name}
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
                              <Group>
                                <Stack>
                                  {/* 입력 - 퀴즈 재목 */}
                                  <TextInput
                                    color="orange"
                                    placeholder="퀴즈 제목"
                                    icon={<Plus size={14} />}
                                  />
                                  {/* 입력 - 퀴즈 설명 */}
                                  <Textarea
                                    placeholder="퀴즈 설명"
                                    autosize
                                    minRows={4}
                                    maxRows={4}
                                  />
                                </Stack>
                              </Group>
                            </Group>
                          </Stack>
                          <Stack>
                            {/* 텍스트 - 과목 선택 */}
                            <Group className="font-semibold">과목 선택</Group>
                            {/* 입력 - 과목 선택*/}
                            <Group className="mx-2">
                              <Tabs
                                id="subjectTab"
                                allowTabDeactivation={true}
                                defaultValue="0"
                                variant="outline"
                              >
                                <Tabs.List>
                                  {subjectInfo.map(
                                    /* 구조 분해 할당 */
                                    ({ name, startColor, endColor }, i) => {
                                      let current = `transition ease-in-out hover:scale-105 bg-gradient-to-r from-${startColor}-500 to-${endColor}-500 shadow-lg text-white cursor-pointer w-32 h-32 rounded-full`;
                                      return i === 0 ? (
                                        <></>
                                      ) : (
                                        <Tabs.Tab
                                          className="w-36 h-36 rounded-full bg-opacity-0 "
                                          value={i.toString()}
                                          key={i}
                                        >
                                          <Group
                                            onClick={() => {
                                              setSubjectIdx((prevState) =>
                                                prevState === i ? prevState : i
                                              );
                                            }}
                                            className={current}
                                          >
                                            <p className="m-auto">{name}</p>
                                          </Group>
                                        </Tabs.Tab>
                                      );
                                    }
                                  )}
                                  <Tabs.Panel value="0">test용</Tabs.Panel>
                                  <Tabs.Panel value="1">
                                    세분화된 카테고리 제공 예정
                                  </Tabs.Panel>
                                  <Tabs.Panel value="2">
                                    세분화된 카테고리 제공 예정
                                  </Tabs.Panel>
                                  <Tabs.Panel value="3">
                                    세분화된 카테고리 제공 예정
                                  </Tabs.Panel>
                                  <Tabs.Panel value="4">
                                    세분화된 카테고리 제공 예정
                                  </Tabs.Panel>
                                </Tabs.List>
                              </Tabs>
                            </Group>
                          </Stack>
                          <Stack>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <Group className="p-10 bg-white shadow-lg sm:rounded-3xl backdrop-blur-xl bg-opacity-30">
                              퀴즈 들어갈거에요
                            </Group>
                          </Stack>
                        </Stack>
                      </ScrollArea>
                    </Group>
                  </Stack>
                </Group>
                <Group>
                  <ActionIcon variant="transparent">
                    <ArrowBarRight size="xl" color="white" />
                  </ActionIcon>
                </Group>
              </Group>
              {/* tab */}
              <Center>
                <Group className="items-center p-4 bg-white shadow-lg sm:rounded-3xl backdrop-blur-xl bg-opacity-80">
                  {tabInfo.map(({ name, startColor, endColor }, i) => {
                    return (
                      <Group
                        onClick={() => {
                          setTabIdx((prevState) => i);
                        }}
                        key={i}
                        className={`w-20 h-20 bg-white rounded-lg shadow-${
                          i === tabIdx
                            ? "-shadow[inset_0_-2px_4px_rgba(0,0,0,0.5)]"
                            : "lg"
                        }`}
                      >
                        <Group
                          className={`m-auto bg-gradient-to-r from-${startColor} to-${endColor} text-white cursor-pointer w-16 h-16 rounded-lg`}
                        >
                          {tabIcon(i)}
                        </Group>
                      </Group>
                    );
                  })}
                  {/* <Group ref={targetRef}>.</Group> */}
                </Group>
              </Center>
              <Group className=" bg-gradient-to-r from-gray-500 to-gray-500 w-0 h-0" />
              <Group className="bg-gradient-to-r from-orange-500 to-red-500 w-0 h-0" />
              <Group className="bg-gradient-to-r from-blue-500 to-green-500 w-0 h-0" />
              <Group className="bg-gradient-to-r from-violet-500 to-orange-500 w-0 h-0" />
              <Group className="bg-gradient-to-r from-yellow-500 to-orange-500 w-0 h-0" />

              <Group className="bg-gradient-to-r from-gray-400 to-gray-400 w-0 h-0" />
              <Group className="bg-gradient-to-r from-red-500 to-orange-500 w-0 h-0" />
              <Group className="bg-gradient-to-r from-blue-700 to-blue-500 w-0 h-0" />
              <Group className="bg-gradient-to-r from-green-500 to-lime-500 w-0 h-0" />
              <Group className="bg-gradient-to-r from-amber-500 to-yellow-400 w-0 h-0" />
              <Group className="bg-gradient-to-r from-violet-700 to-fuchsia-600 w-0 h-0" />
            </Stack>
          </Center>
        </Center>
      </section>
    </div>
  );
};

export default Home;
