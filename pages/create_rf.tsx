import { Profiler, useState } from "react";
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
  Notification,
  Avatar,
  Drawer,
  Popover,
  HoverCard,
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
  CircleCheck,
  MathAvg,
  Copy,
  X,
  FileUpload,
} from "tabler-icons-react";

import { NotificationsProvider } from "@mantine/notifications";
import { copyFileSync } from "fs";
// 85vh 20vw

const delay = (ms: number | undefined) =>
  new Promise((res) => setTimeout(res, ms));

function sideIconCode(idx: string) {
  if (idx == "empty") return <MathAvg size={20} color={"#babbbd"} />;
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

  let problemInput = [
    {
      answer: "0",
      description: "",
      dtype: "MultipleChoiceProblem",
      idx: 0,
      picture: "",
      problemsetId: 0,
      score: 0,
      timelimit: 30,
      title: "",
    },
  ];

  let optionInput = [
    [
      {
        description: "",
        idx: 0,
        picture: "",
        problemId: 0,
      },
      {
        description: "",
        idx: 1,
        picture: "",
        problemId: 0,
      },
      {
        description: "",
        idx: 2,
        picture: "",
        problemId: 0,
      },
      {
        description: "",
        idx: 3,
        picture: "",
        problemId: 0,
      },
    ],
  ];
  {
    /* *** main state *** */
  }
  let [problemSet, setProblemSet] = useState({
    closingMent: "",
    description: "",
    hostId: 1,
    title: "",
  });
  let [problem, setProblem] = useState(problemInput);
  let [option, setOption] = useState(optionInput);

  {
    /* mantine statement */
  }

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
    if (idx == 0) return <SquareCheck className="m-auto" size={"30px"} />;
    if (idx == 1) return <Parentheses className="m-auto" size={"30px"} />;
    if (idx == 2) return <AB className="m-auto" size={"30px"} />;
    if (idx == 3) return <QuestionMark className="m-auto" size={"30px"} />;
    if (idx == 4) return <Apps className="m-auto" size={"30px"} />;
    if (idx == 5) return <MathAvg className="m-auto" size={"30px"} />;
  }

  const tabTooltip = [
    "객관식",
    "주관식",
    "O/X",
    "넌센스",
    "다이나믹",
    "빈 슬라이드",
  ];

  {
    /* custom converter */
  }
  const idxToString = [
    "MultipleChoiceProblem",
    "subjective",
    "ox",
    "nonsense",
    "dynamic",
    "empty",
  ];

  function stringToIdx(x: string) {
    let rt = 0;
    if (x === "MultipleChoiceProblem") rt = 0;
    if (x === "subjective") rt = 1;
    if (x === "ox") rt = 2;
    if (x === "nonsense") rt = 3;
    if (x === "dynamic") rt = 4;
    if (x === "empty") rt = 5;
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
  const [step, setStep] = useState(0);

  /* 2. modal */
  const [modalOpened, setModalOpened] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(true);
  const [popOverOpened, setPopOverOpened] = useState(false);

  /* 2. drop zone */
  const [files, setFiles] = useState<File[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });

  const getProblemsetId = async () => {
    const { data: result } = await axios.post(
      "https://prod.exquiz.net/api/problemset",
      problemSet
    );
    return result.data.id;
  };

  const getProblemId = async (idx: number) => {
    const { data: result } = await axios.post(
      "https://prod.exquiz.net/api/problem",
      problem[idx]
    );
    return result.data.id;
  };

  const postOption = async (idx: number) => {
    const { data: result } = await axios.post(
      "https://prod.exquiz.net/api/problem_option",
      option[idx]
    );
    return;
  };

  const theme = useMantineTheme();

  return (
    <>
      {/* head */}
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* modal */}
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="퀴즈를 완성하시겠습니까?"
      >
        <Button
          variant="outline"
          color={subjectInfo[subjectIdx + (subjectIdx === 0 ? 4 : 0)].endColor}
          onClick={async () => {
            setModalOpened(false);
            setStep((prevState) => step + 1);

            let problemsetId = 0;
            async () => (problemsetId = await getProblemsetId());

            let copyProblem = [...problem];
            let copyOption = [...option];
            for (let i = 0; i < copyProblem.length; i++) {
              copyProblem[i].idx = i;
              copyProblem[i].problemsetId = problemsetId;
            }
            setProblem((prevState) => copyProblem);

            for (let i = 0; i < copyProblem.length; i++) {
              let problemId = 0;
              async () => (problemId = await getProblemId(i));

              for (let j = 0; j < copyOption.length; j++) {
                copyOption[i][j].idx = j;
                copyOption[i][j].problemId = problemId;
              }
              setOption((prevState) => copyOption);
              async () => await postOption(i);
            }
            await delay(1500);
            await setStep((prevState) => step + 1);
            await delay(1500);
            // sleep(3000);
            location.replace("/inbox");
          }}
        >
          네
        </Button>
        <Button
          variant="outline"
          color={subjectInfo[subjectIdx + (subjectIdx === 0 ? 4 : 0)].endColor}
          onClick={() => {
            setModalOpened(false);
          }}
        >
          좀 더 검토해볼래요
        </Button>
      </Modal>

      <Drawer
        position="bottom"
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        title="퀴즈 설정"
        padding="xl"
        size="75%"
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <Group>
          <Stack>
            <Group className="w-[60vw]">
              {/* 왼쪽 */}
              <Group>
                <Stack>
                  {/* 퀴즈 정보 */}
                  <Stack>
                    {/* 컨텐츠 - 퀴즈 정보 */}
                    <Stack className="p-10 bg-white shadow-lg sm:rounded-3xl backdrop-blur-xl bg-opacity-50">
                      {/* 컨텐츠 - 퀴즈 정보 */}
                      <h2 className="text-amber-500 font-semibold">
                        퀴즈 정보
                      </h2>
                      {/* 이미지 - 봉투 */}
                      <Group>
                        <Tooltip
                          position="top-start"
                          transition="scale-y"
                          transitionDuration={300}
                          withArrow
                          label={"아래 스위치로 공개 여부를 선택하세요."}
                        >
                          <Group spacing={0}>
                            <Group className="shadow-lg" spacing={0}>
                              <Group className="border-r-2 border-gray-300 shadow-lg h-32 w-4 bg-amber-200" />
                              <Group>
                                <Stack spacing={0}>
                                  <Group className="border-b-2 border-gray-300 m-0 p-0 h-16 w-48 bg-amber-200">
                                    <Switch
                                      defaultChecked={true}
                                      color={
                                        subjectInfo[
                                          subjectIdx +
                                            (subjectIdx === 0 ? 4 : 0)
                                        ].endColor
                                      }
                                      onLabel="공개"
                                      offLabel="비공개"
                                      size="xl"
                                      className="mx-1"
                                    />
                                  </Group>
                                  <Group
                                    spacing={2}
                                    className=" m-0 p-0 h-16 w-48 bg-amber-200"
                                  >
                                    <Group
                                      className={`mx-1 text-white cursor-pointer w-12 h-12 bg-gradient-to-r from-${subjectInfo[subjectIdx].startColor}-500 to-${subjectInfo[subjectIdx].endColor}-500 rounded-full`}
                                    >
                                      <p className="text-xs m-auto">
                                        {subjectInfo[subjectIdx].name}
                                      </p>
                                    </Group>
                                    <Group
                                      className={`mx-0 text-white cursor-pointer w-12 h-12 bg-gradient-to-r from-${tabInfo[tabIdx].startColor} to-${tabInfo[tabIdx].endColor} rounded-full`}
                                    >
                                      <p className="text-xs m-auto">
                                        {tabTooltip[tabIdx]}
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
                          {/* 입력 - 퀴즈 제목 */}
                          <TextInput
                            onChange={(event) => {
                              let copy = { ...problemSet };
                              copy.title = event.currentTarget.value;
                              setProblemSet(copy);
                            }}
                            value={problemSet.title}
                            color="orange"
                            placeholder="퀴즈 제목"
                            icon={<Plus size={14} />}
                          />
                          {/* 입력 - 퀴즈 설명 */}
                          <Textarea
                            onChange={(event) => {
                              let copy = { ...problemSet };
                              copy.description = event.currentTarget.value;
                              setProblemSet(copy);
                            }}
                            value={problemSet.description}
                            placeholder="퀴즈 설명"
                            autosize
                            minRows={4}
                            maxRows={4}
                          />
                        </Stack>
                      </Group>
                    </Stack>
                  </Stack>
                  {/* 과목 정보 */}
                  <Stack>
                    <Stack className="p-10 bg-white shadow-lg sm:rounded-3xl backdrop-blur-xl bg-opacity-50">
                      {/* 텍스트 - 과목 선택 */}
                      <h2 className="text-amber-500 font-semibold">
                        과목 선택
                      </h2>
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
                  </Stack>
                </Stack>
              </Group>

              {/* 컨텐츠 - 퀴즈 정보 */}
              <Group className="w-[60vw] p-10 bg-white shadow-lg sm:rounded-3xl backdrop-blur-xl bg-opacity-50">
                {/* 이미지 - 봉투 */}

                {/* 입력 - 퀴즈 상세 정보 */}
                <Stack className="w-[25vw]">
                  {/* 스위치 - 퀴즈 시간 제한 일괄 적용 여부 */}
                  <Group>
                    <Switch
                      color={
                        subjectInfo[subjectIdx + (subjectIdx === 0 ? 4 : 0)]
                          .endColor
                      }
                      onLabel="일괄"
                      offLabel=""
                      size="xl"
                    />
                    <p className="font-semibold">시간 일괄 설정</p>
                  </Group>
                  {/* 슬라이더 - 퀴즈 시간 제한 일괄 적용 정도 */}
                  <Slider
                    disabled
                    color={
                      subjectInfo[subjectIdx + (subjectIdx === 0 ? 4 : 0)]
                        .endColor
                    }
                    label={(val) =>
                      MARKSTIME.find((mark) => mark.value === val)?.label
                    }
                    defaultValue={50}
                    step={25}
                    marks={MARKSTIME}
                    styles={{ markLabel: { display: "none" } }}
                  />
                  <Group>
                    {/* 스위치 - 퀴즈 점수 일괄 적용 여부 */}
                    <Switch
                      color={
                        subjectInfo[subjectIdx + (subjectIdx === 0 ? 4 : 0)]
                          .endColor
                      }
                      onLabel="일괄"
                      offLabel=""
                      size="xl"
                    />
                    <p className="font-semibold">점수 일괄 설정</p>
                  </Group>
                  {/* 슬라이더 - 퀴즈 점수 일괄 적용 정도 */}
                  <Tabs
                    color={
                      subjectInfo[subjectIdx + (subjectIdx === 0 ? 4 : 0)]
                        .endColor
                    }
                    defaultValue="gallery"
                  >
                    <Tabs.List>
                      <Tabs.Tab value="gallery" icon={<Plus size={14} />}>
                        일반적으로
                      </Tabs.Tab>
                      <Tabs.Tab value="messages" icon={<Plus size={14} />}>
                        극적으로
                      </Tabs.Tab>
                      <Tabs.Tab value="settings" icon={<Plus size={14} />}>
                        자동으로
                      </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="gallery" pt="xs">
                      모든 문제의 배점이 동일하게 적용됩니다.
                    </Tabs.Panel>

                    <Tabs.Panel value="messages" pt="xs">
                      퀴즈 경과에 따라 점차 증가합니다.
                    </Tabs.Panel>

                    <Tabs.Panel value="settings" pt="xs">
                      익스퀴즈미에서 분석한 데이터를 기반으로 자동으로
                      설정합니다.
                    </Tabs.Panel>
                  </Tabs>
                </Stack>
              </Group>
            </Group>
          </Stack>
        </Group>
      </Drawer>

      {/* contents */}
      <main>
        {step === 0 ? (
          <Stack justify="space-between">
            <Group
              position="apart"
              className="h-[60px] border-b-2 border-gray-300"
            >
              {/* 홈 */}
              <Link href="/">
                <Group className="w-[60px] border-r-2 border-gray-300">
                  <Group className="cursor-pointer m-auto w-[50px] h-[50px] border-2 rounded-full">
                    <p className="m-auto"> 홈 </p>
                  </Group>
                </Group>
              </Link>
              <Group
                onClick={() => {
                  setDrawerOpened(true);
                }}
                className="w-8/12"
              >
                <Group className="cursor-pointer" spacing={0}>
                  <Group className="shadow-lg" spacing={0}>
                    <Group className="border-r-2 border-gray-300 shadow-lg h-12 w-4 bg-amber-200" />
                    <Group>
                      <Stack spacing={0}>
                        <Group className="border-b-2 border-gray-300 m-0 p-0 h-6 w-16 bg-amber-200"></Group>
                        <Group
                          spacing={2}
                          className=" m-0 p-0 h-6 w-16 bg-amber-200"
                        >
                          <Group
                            className={`mx-1 text-white w-5 h-5 bg-gradient-to-r from-${subjectInfo[subjectIdx].startColor}-500 to-${subjectInfo[subjectIdx].endColor}-500 rounded-full`}
                          ></Group>
                          <Group
                            className={`mx-0 text-white w-5 h-5 bg-gradient-to-r from-${tabInfo[tabIdx].startColor} to-${tabInfo[tabIdx].endColor} rounded-full`}
                          ></Group>
                        </Group>
                      </Stack>
                    </Group>
                  </Group>
                  <Group className="shadow-lg m-0 p-0 h-10 w-3 bg-white"></Group>
                </Group>
                {problemSet.title === "" ? (
                  <p className="text-2xl text-gray-400 font-bold">
                    제목을 입력해주세요
                  </p>
                ) : (
                  <p className="text-2xl font-bold">{problemSet.title}</p>
                )}
              </Group>
              <Group className="w-[180px] border-l-2 border-gray-300">
                <Button
                  variant="outline"
                  color={
                    subjectInfo[subjectIdx + (subjectIdx === 0 ? 4 : 0)]
                      .endColor
                  }
                  onClick={() => {
                    setModalOpened(true);
                  }}
                >
                  완성하기
                </Button>
              </Group>
            </Group>
            <Group position="apart" className="h-[100vh-60px]">
              <Group className="w-2/12">
                <Stack>
                  <Stack>
                    {/* 슬라이드 문제 */}
                    <ScrollArea className="h-[40vh] w-[20vw]" scrollbarSize={0}>
                      {problem.map(({ dtype, description }, i) => {
                        return (
                          <Stack key={i} className="m-0 p-0">
                            <Group
                              onClick={() => {
                                if (curIdx === i) {
                                } else setCurIdx((prevState) => i);

                                setTabIdx((prevstate) =>
                                  stringToIdx(problem[i].dtype)
                                );
                              }}
                              className={` justify-between cursor-pointer my-4 shadow-lg rounded-md border-solid border-2 border-${
                                curIdx === i
                                  ? subjectInfo[
                                      subjectIdx + (subjectIdx === 0 ? 4 : 0)
                                    ].startColor
                                  : "white"
                              }-500`}
                            >
                              {/* 슬라이드 정보 */}
                              <Group>
                                <ActionIcon variant="transparent">
                                  {sideIconCode(dtype)}
                                </ActionIcon>
                                {description}
                              </Group>
                              <ActionIcon
                                className="rounded-full"
                                variant="subtle"
                                onClick={async () => {
                                  setCurIdx((prevState) => i);
                                  if (problem.length === 1) return;
                                  if (problem.length - 1 === curIdx)
                                    await setCurIdx((prevState) => curIdx - 1);
                                  let copy1 = [...problem];
                                  copy1.splice(i, 1);
                                  setProblem(copy1);

                                  let copy2 = [...option];
                                  copy2.splice(i, 1);
                                  setOption(copy2);
                                }}
                                size="lg"
                              >
                                <Trash size={16} />
                              </ActionIcon>
                            </Group>
                          </Stack>
                        );
                      })}
                    </ScrollArea>
                    {/* 슬라이드 추가 */}
                    <Button
                      variant="outline"
                      color={
                        subjectInfo[subjectIdx + (subjectIdx === 0 ? 4 : 0)]
                          .startColor
                      }
                      leftIcon={<Plus size={32} />}
                      onClick={() => {
                        setProblem([
                          ...problem,
                          {
                            answer: "-1",
                            description: "",
                            dtype: idxToString[tabIdx],
                            idx: 0,
                            picture: "",
                            problemsetId: 0,
                            score: 0,
                            timelimit: 30,
                            title: "",
                          },
                        ]);

                        setOption([
                          ...option,
                          [
                            {
                              description: "",
                              idx: 0,
                              picture: "",
                              problemId: 0,
                            },
                            {
                              description: "",
                              idx: 1,
                              picture: "",
                              problemId: 0,
                            },
                            {
                              description: "",
                              idx: 2,
                              picture: "",
                              problemId: 0,
                            },
                            {
                              description: "",
                              idx: 3,
                              picture: "",
                              problemId: 0,
                            },
                          ],
                        ]);
                      }}
                    >
                      추가하기
                    </Button>
                  </Stack>

                  <Stack>
                    <ActionIcon>
                      <Settings></Settings>
                    </ActionIcon>
                    <Avatar
                      radius="xl"
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                    />
                  </Stack>
                </Stack>
              </Group>
              <Container className="w-8/12">
                <Group>
                  <Stack>
                    <Center>
                      <Group className="items-center p-4 bg-white shadow-lg sm:rounded-3xl backdrop-blur-xl bg-opacity-80">
                        {tabInfo.map(({ name, startColor, endColor }, i) => {
                          return (
                            <Tooltip label={tabTooltip[i]}>
                              <Group
                                onClick={() => {
                                  setTabIdx((prevState) => i);
                                }}
                                key={i}
                                className="w-30 h-18 bg-white rounded-lg cursor-pointer"
                              >
                                <Group
                                  className={`shadow-${
                                    i === tabIdx
                                      ? "[inset_0_-2px_4px_rgba(128,128,128,0.8)]"
                                      : ""
                                  }
                              hover:shadow-[inset_0_-2px_4px_rgba(128,128,128,0.8)] m-auto bg-gradient-to-r from-${startColor} to-${endColor} text-white w-18 h-18 rounded-lg`}
                                >
                                  <Button
                                    leftIcon={tabIcon(i)}
                                    variant="gradient"
                                  >
                                    {tabTooltip[i]}
                                  </Button>
                                </Group>
                              </Group>
                            </Tooltip>
                          );
                        })}
                        {/* <Group ref={targetRef}>.</Group> */}
                      </Group>
                    </Center>
                    <Stack className="p-10 bg-white shadow-lg sm:rounded-3xl backdrop-blur-xl bg-opacity-50">
                      {/* 입력 - 문제 설명 */}
                      {/* 입력 - 문제 사진 및 동영상 */}
                      <Group className="justify-between">
                        <p className="text-amber-500 font-bold">문제 정보</p>
                        <Group>
                          <ActionIcon variant="outline">
                            <FileUpload></FileUpload>
                          </ActionIcon>
                          <ActionIcon variant="outline">
                            <Copy></Copy>
                          </ActionIcon>
                          <ActionIcon variant="outline">
                            <X></X>
                          </ActionIcon>
                        </Group>
                      </Group>
                      <HoverCard width={280} shadow="md">
                        <HoverCard.Target>
                          <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
                            <Text color="gray" align="center">
                              이미지나 동영상을 첨부하세요
                            </Text>
                          </Dropzone>
                        </HoverCard.Target>
                        <HoverCard.Dropdown>{previews}</HoverCard.Dropdown>
                      </HoverCard>
                      <TextInput
                        size="xl"
                        onChange={(event) => {
                          let copy = [...problem];
                          copy[curIdx].description = event.currentTarget.value;
                          setProblem(copy);
                        }}
                        value={problem[curIdx].description}
                        // [problem[curIdx].description] => event.currentTarget.value}
                        // value={problem[curIdx].description}
                        color="orange"
                        placeholder="문제 설명"
                        icon={<Plus size={14} />}
                      ></TextInput>
                      <p className="text-amber-500 font-bold">선지 정보</p>
                      {/* 입력 - 선지 정보 */}
                      {
                        <Grid>
                          {option[curIdx].map(
                            ({ description, idx, picture, problemId }, i) => {
                              const ans = problem[curIdx].answer;
                              return (
                                <Grid.Col key={i} span={5}>
                                  <Group
                                    className={`bg-amber-100 rounded-lg border-solid border-2 border-${
                                      subjectInfo[
                                        subjectIdx + (subjectIdx === 0 ? 4 : 0)
                                      ].startColor
                                    }-500`}
                                  >
                                    <Checkbox
                                      onClick={(event) => {
                                        let copy = [...problem];
                                        // (this.checked === true)?:"":
                                        copy[curIdx].answer = i.toString();
                                        setProblem(copy);
                                      }}
                                      checked={
                                        problem[curIdx].answer === i.toString()
                                          ? true
                                          : false
                                      }
                                      // checked={true}

                                      color={
                                        subjectInfo[
                                          subjectIdx +
                                            (subjectIdx === 0 ? 4 : 0)
                                        ].startColor
                                      }
                                      size="xl"
                                    />
                                    <Textarea
                                      className=""
                                      variant="unstyled"
                                      onChange={(event) => {
                                        let copy = [...option];
                                        copy[curIdx][i].description =
                                          event.currentTarget.value;
                                        setOption(copy);
                                      }}
                                      value={description}
                                      placeholder={`선지 ${i + 1}`}
                                      autosize
                                      minRows={4}
                                      maxRows={4}
                                    />
                                  </Group>
                                </Grid.Col>
                              );
                            }
                          )}
                        </Grid>
                      }
                    </Stack>
                    <Group>
                      <Stack className="p-10 bg-white shadow-lg sm:rounded-3xl backdrop-blur-xl bg-opacity-50">
                        <p>배점 설정</p>
                        <Slider
                          className="w-[18vw]"
                          // onChange={(event) => {
                          //   let copy = [...problem];
                          //   copy[curIdx].score = event.currentTarget.value.toString();
                          //   setProblemSet(copy);
                          // }}
                          // value={problem[curIdx].score}
                          color={
                            subjectInfo[subjectIdx + (subjectIdx === 0 ? 4 : 0)]
                              .endColor
                          }
                          label={(val) =>
                            MARKSCORE.find((mark) => mark.value === val)?.label
                          }
                          defaultValue={50}
                          step={25}
                          marks={MARKSCORE}
                          styles={{ markLabel: { display: "none" } }}
                        />
                      </Stack>
                      <Stack className="p-10 bg-white shadow-lg sm:rounded-3xl backdrop-blur-xl bg-opacity-50">
                        <p>시간 설정</p>
                        <Slider
                          className="w-[18vw]"
                          color={
                            subjectInfo[subjectIdx + (subjectIdx === 0 ? 4 : 0)]
                              .endColor
                          }
                          label={(val) =>
                            MARKSTIME.find((mark) => mark.value === val)?.label
                          }
                          defaultValue={50}
                          step={25}
                          marks={MARKSTIME}
                          styles={{ markLabel: { display: "none" } }}
                        />
                      </Stack>
                    </Group>
                  </Stack>
                </Group>
              </Container>
              <Group className="w-[20vw] h-10/12 border-l-2 border-gray-300"></Group>
            </Group>
          </Stack>
        ) : (
          <></>
        )}

        {step === 1 ? (
          <section
            className={`w-full h-full bg-gradient-to-r from-orange-500 to-yellow-500`}
          >
            <Center>
              <Notification
                loading
                color={
                  subjectInfo[subjectIdx + (subjectIdx === 0 ? 4 : 0)].endColor
                }
                title="서버에 퀴즈 업로드 중..."
                disallowClose
              >
                퀴즈 정보가 서버에 업로드 될 때까지 기다려주세요.
              </Notification>
            </Center>
          </section>
        ) : (
          <></>
        )}

        {step === 2 ? (
          <section
            className={`w-full h-full bg-gradient-to-r from-orange-500 to-yellow-500`}
          >
            <Center>
              <Notification
                icon={<Check size={20} />}
                color={
                  subjectInfo[subjectIdx + (subjectIdx === 0 ? 4 : 0)].endColor
                }
                title="업로드 완료!"
                disallowClose
              >
                퀴즈 정보가 서버에 안전하게 저장되었습니다.
              </Notification>
            </Center>
          </section>
        ) : (
          <></>
        )}
      </main>
    </>
  );
};

export default Home;
