import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import React, { useEffect } from "react";

import {
  Button,
  Tooltip,
  Textarea,
  Center,
  Checkbox,
  Group,
  Accordion,
  useMantineTheme,
  ActionIcon,
  Slider,
  Switch,
  Stack,
  Grid,
  TextInput,
  Tabs,
  Modal,
  Text,
  Notification,
  Drawer,
  ScrollArea,
} from "@mantine/core";

import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

import {
  AdjustmentsHorizontal,
  Plus,
  Check,
  SquareCheck,
  AB,
  QuestionMark,
  Apps,
  Parentheses,
  MathAvg,
  Copy,
  X,
  FileUpload,
  GridDots,
} from "tabler-icons-react";

// 85vh 20vw

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

const delay = (ms: number | undefined) =>
  new Promise((res) => setTimeout(res, ms));

function sideIconCode(idx: string, flag: boolean) {
  let color = ["red", "blue", "green", "gold", "purple", "gray"];
  let cur = color[stringToIdx(idx)];
  if (!flag) cur = "#babbbd";

  if (idx == "empty") return <MathAvg size={30} color={cur} />;
  if (idx == "MultipleChoiceProblem")
    return <SquareCheck size={30} color={cur} />;
  if (idx == "subjective") return <Parentheses size={30} color={cur} />;
  if (idx == "ox") return <AB size={30} color={cur} />;
  if (idx == "nonsense") return <QuestionMark size={30} color={cur} />;
  if (idx == "dynamic") return <Apps size={30} color={cur} />;
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

  let problemInput = [
    {
      answer: "0",
      description: "",
      dtype: "MultipleChoiceProblem",
      idx: 0,
      picture: "",
      problemsetId: 0,
      score: 125,
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

  let [scoreValue, setScoreValue] = useState(50);
  let [timelimit, setTimelimit] = useState(50);

  useEffect(() => {
    let copy = [...problem];
    copy[curIdx].score = Math.trunc(100 + (scoreValue / 25) * 100);
    setProblem((prevstate) => copy);
  }, [scoreValue]);

  useEffect(() => {
    let copy = [...problem];
    copy[curIdx].timelimit = Math.trunc(10 + (timelimit / 25) * 10);
    setProblem((prevstate) => copy);
  }, [timelimit]);

  {
    /* mantine statement */
  }

  {
    /* 2. 문제 추가 - subNav - tab */
  }
  const tabInfo = [
    { name: "객관식", color: "red-400" },
    { name: "주관식", color: "blue-400" },
    { name: "O/X", color: "green-400" },
    { name: "넌센스", color: "amber-400" },
    { name: "다이나믹", color: "violet-400" },
    { name: "빈 슬라이드", color: "gray-400" },
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
    "여러개의 선지로 이루어진 단일 답안형 문제 유형입니다",
    "여러개의 선지로 이루어진 복수 답안형 문제 유형입니다",
    "두개의 선지로 이루어진 단일 답안형 문제 유형입니다",
    "exquiz.me가 제공하는 랜덤 넌센스 문제 유형입니다",
    "exquiz.me가 제공하는 엔터테인먼트형 다이나믹 문제 유형입니다",
    "텍스트나 이미지를 통해 설명할 수 있는 설명 유형입니다",
  ];

  const dtypeName = [
    "객관식",
    "주관식",
    "O/X",
    "넌센스",
    "다이나믹",
    "지문설명",
  ];

  const MARKSTIME = [
    { value: 0, label: "10" },
    { value: 25, label: "20" },
    { value: 50, label: "30" },
    { value: 75, label: "40" },
    { value: 100, label: "50" },
  ];

  const MARKSCORE = [
    { value: 0, label: "100" },
    { value: 25, label: "200" },
    { value: 50, label: "300" },
    { value: 75, label: "400" },
    { value: 100, label: "500" },
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
  const [step, setStep] = useState(0);

  /* 2. modal */
  const [modalOpened, setModalOpened] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(true);

  /* 2. drop zone */
  const [files, setFiles] = useState<File[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <></>
      // <Image
      //   key={index}
      //   src={imageUrl}
      //   imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      // />
    );
  });

  const getProblemsetId = async () => {
    let rt = Infinity;
    await axios
      .post(
        //const { data: result } =
        "https://prod.exquiz.net/api/problemset",
        problemSet
      )
      .then((result) => {
        rt = result.data.id;
      })
      .catch((error) => {
        alert("problemset_error");
      });
    return rt;
  };

  const getProblemId = async (idx: number) => {
    let rt = Infinity;
    await axios
      .post("https://prod.exquiz.net/api/problem", problem[idx])
      .then((result) => {
        rt = result.data.id;
      })
      .catch((error) => {
        alert("problem_error");
      });
    return rt;
  };

  const postOption = async (idx1: number, idx2: number) => {
    await axios
      .post("https://prod.exquiz.net/api/problem_option", option[idx1][idx2])
      .then((result) => {})
      .catch((error) => {
        // alert(error);
      });
    return;
  };

  const theme = useMantineTheme();

  let plus = async () => {
    await setProblem((prevstate) => [
      ...prevstate,
      {
        answer: "-1",
        description: "",
        dtype: idxToString[tabIdx],
        idx: 0,
        picture: "",
        problemsetId: 0,
        score: 300,
        timelimit: 30,
        title: "",
      },
    ]);

    await setOption((prevstate) => [
      ...prevstate,
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
  };

  return (
    <>
      {/* head */}
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        ></meta>
      </Head>
      {/* modal */}
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="퀴즈를 완성하시겠습니까?"
      >
        <Button
          variant="outline"
          color="orange"
          onClick={async () => {
            setModalOpened(false);
            setStep((prevState) => step + 1);

            let problemsetId = await getProblemsetId();
            // await delay(1500);
            let copyProblem = [...problem];
            let copyOption = [...option];
            {
              /* problemset */
            }
            for (let i = 0; i < copyProblem.length; i++) {
              copyProblem[i].idx = i;
              copyProblem[i].problemsetId = problemsetId;
            }
            setProblem((prevState) => copyProblem);

            for (let i = 0; i < copyProblem.length; i++) {
              {
                /* problem */
              }
              let problemId = await getProblemId(i);
              // await delay(1500);
              {
                /* problem_option */
              }
              for (let j = 0; j < copyOption.length; j++) {
                copyOption[i][j].idx = j;
                copyOption[i][j].problemId = problemId;
              }
              setOption((prevState) => copyOption);
              for (let j = 0; j < copyOption.length; j++) {
                await postOption(i, j);
              }
            }
            await setStep((prevState) => step + 1);
            await delay(2000);
            location.replace("/inbox");
          }}
        >
          네
        </Button>
        <Button
          variant="outline"
          color="orange"
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
        padding="xl"
        size="93.8%"
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        // overlayBlur={3}
      >
        <Center>
          <Stack align="center" spacing={0}>
            <Stack className="bg-white w-[46vw] h-12 shadow-lg"></Stack>
            <Stack className="bg-amber-200 w-[50vw] h-[80vh] shadow-lg">
              <TextInput
                variant="unstyled"
                placeholder="제목을 입력해주세요"
                size="xl"
              ></TextInput>

              <Textarea
                variant="unstyled"
                placeholder="설명을 입력해주세요"
                size="xl"
              ></Textarea>
              <h2 className="text-amber-500 font-semibold">과목 선택</h2>

              <Button color="orange" variant="outline">
                완료
              </Button>
            </Stack>
          </Stack>
        </Center>
      </Drawer>

      {/* contents */}
      <main>
        {step === 0 ? (
          <Stack spacing={0}>
            <Group
              position="apart"
              className="h-[60px] border-b-2 border-gray-300"
            >
              {/* 홈 */}
              <Link href="/">
                <Group className="w-[60px] border-r-2 border-gray-300">
                  <Group className="cursor-pointer m-auto w-[50px] h-[50px]">
                    <Image
                      src="/../public/globe_banner_2.png"
                      alt="Picture of the author"
                      width={50}
                      height={50}
                    />
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
                            className={`mx-0 text-white w-5 h-5 bg-gradient-to-r from-${tabInfo[tabIdx].color} to-${tabInfo[tabIdx].color} rounded-full`}
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
                  color="orange"
                  onClick={() => {
                    setModalOpened(true);
                  }}
                >
                  완성하기
                </Button>
              </Group>
            </Group>
            <Group spacing={0} className="h-[100vh-60px]">
              <Stack className="pb-[47vh] w-[20vw]">
                <p className="border-b-2 border-gray-300 text-amber-500 font-bold">
                  문제 관리
                </p>
                <Stack spacing={0}>
                  {problem.map(({ dtype, description }, i) => {
                    return (
                      <Stack
                        className={`cursor-pointer border-b-2 border-${
                          curIdx === i ? "amber" : "gray"
                        }-300`}
                        spacing={0}
                        onClick={() => {
                          if (curIdx === i) {
                          } else setCurIdx((prevState) => i);

                          setTabIdx((prevstate) =>
                            stringToIdx(problem[i].dtype)
                          );
                        }}
                        key={i}
                      >
                        {/* 슬라이드 정보 */}
                        <p
                          className={`${
                            i === curIdx ? "bg-amber-500" : ""
                          } text-xl ${
                            i === curIdx ? "text-white" : "text-gray-500"
                          } py-2 px-1`}
                        >
                          {i + 1}.&nbsp;{problem[i].description}
                        </p>
                      </Stack>
                    );
                  })}
                </Stack>
              </Stack>
              <Group
                spacing={0}
                className="border-x-2 border-gray-300 bg-[#F7F9FB] w-7/12"
              >
                <Center>
                  {/* slide */}
                  <Stack>
                    <ActionIcon>
                      <Plus size={0}></Plus>
                    </ActionIcon>
                  </Stack>

                  <Stack spacing="xl" className="w-10/12 mx-2">
                    <Stack
                      onClick={() => {
                        if (curIdx !== 0) setCurIdx((prevState) => curIdx - 1);
                      }}
                      className="shadow-lg cursor-pointer hover:bg-gradient-to-b hover:from-amber-500 hover:via-white hover:to-white h-16 bg-white"
                    ></Stack>
                    <Stack className="py-10" spacing={0}>
                      <Group
                        align="left"
                        spacing={0}
                        className="ml-4 items-center"
                      >
                        {tabInfo.map(({ name, color }, i) => {
                          return (
                            <Tooltip
                              color="orange"
                              offset={10}
                              openDelay={500}
                              closeDelay={100}
                              position="top-start"
                              key={i}
                              label={tabTooltip[i]}
                            >
                              <Group
                                onClick={() => {
                                  setTabIdx((prevState) => i);
                                }}
                                className="w-18 h-18 cursor-pointer"
                              >
                                <Group
                                  className={`${
                                    i !== tabIdx
                                      ? "shadow-[inset_0_-2px_4px_rgba(128,128,128,0.8)] text-black bg-white"
                                      : "bg-amber-500 text-white"
                                  }
                              hover:shadow-none m-auto w-18 h-18`}
                                >
                                  <Button
                                    className={`w-24 ${
                                      i === tabIdx
                                        ? "text-white"
                                        : "text-gray-400"
                                    } `}
                                    variant="gradient"
                                  >
                                    {dtypeName[i]}
                                  </Button>
                                </Group>
                              </Group>
                            </Tooltip>
                          );
                        })}
                        {/* <Group ref={targetRef}>.</Group> */}
                      </Group>
                      <Stack
                        className={`border-2 border-amber-500 bg-white items-center shadow-lg`}
                      >
                        <Stack className="p-10">
                          {/* 입력 - 문제 설명 */}
                          {/* 입력 - 문제 사진 및 동영상 */}
                          <Group className="justify-between">
                            <p className="text-amber-500 font-bold">
                              문제 정보
                            </p>
                            <Group className="justify-between">
                              <ActionIcon variant="outline">
                                <FileUpload></FileUpload>
                              </ActionIcon>
                              <ActionIcon variant="outline">
                                <Copy></Copy>
                              </ActionIcon>
                              <ActionIcon
                                onClick={async () => {
                                  if (problem.length === 1) return;
                                  if (problem.length - 1 === curIdx)
                                    await setCurIdx((prevState) => curIdx - 1);
                                  let copy1 = [...problem];
                                  copy1.splice(curIdx, 1);
                                  setProblem(copy1);

                                  let copy2 = [...option];
                                  copy2.splice(curIdx, 1);
                                  setOption(copy2);
                                }}
                                className="bg-red-200 hover:bg-red-200"
                                variant="outline"
                              >
                                <X></X>
                              </ActionIcon>
                            </Group>
                          </Group>
                          <TextInput
                            size="xl"
                            onChange={(event) => {
                              console.log("hello", problem);
                              let copy = [...problem];
                              console.log("hello" + copy);
                              copy[curIdx].description =
                                event.currentTarget.value;
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
                                (
                                  { description, idx, picture, problemId },
                                  i
                                ) => {
                                  const ans = problem[curIdx].answer;
                                  return (
                                    <Grid.Col key={i} span={5}>
                                      <Group
                                        className={`bg-amber-100 rounded-lg border-solid border-2 border-amber-500`}
                                      >
                                        <Checkbox
                                          defaultChecked={false}
                                          onClick={(event) => {
                                            let copy = [...problem];
                                            // (this.checked === true)?:"":
                                            copy[curIdx].answer = i.toString();
                                            setProblem(copy);
                                          }}
                                          checked={
                                            problem[curIdx].answer ===
                                            i.toString()
                                              ? true
                                              : false
                                          }
                                          // checked={true}

                                          color="orange"
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
                          <Group position="left">
                            <Stack>
                              <p>
                                <strong className="text-amber-500">배점</strong>
                                &nbsp;
                                <span className="text-gray-500">
                                  {problem[curIdx].score}점
                                </span>
                              </p>
                              <Slider
                                className="w-[5vw]"
                                onChangeEnd={setScoreValue}
                                color="orange"
                                label={(val) =>
                                  MARKSCORE.find((mark) => mark.value === val)
                                    ?.label
                                }
                                defaultValue={25}
                                value={Math.trunc(
                                  ((problem[curIdx].score - 100) / 100) * 25
                                )}
                                step={25}
                                marks={MARKSCORE}
                                styles={{ markLabel: { display: "none" } }}
                              />
                            </Stack>
                            <Stack>
                              <p>
                                <strong className="text-amber-500">시간</strong>
                                &nbsp;
                                <span className="text-gray-500">
                                  {problem[curIdx].timelimit}초
                                </span>
                              </p>
                              <Slider
                                className="w-[5vw]"
                                onChangeEnd={setTimelimit}
                                color="orange"
                                label={(val) =>
                                  MARKSTIME.find((mark) => mark.value === val)
                                    ?.label
                                }
                                value={Math.trunc(
                                  ((problem[curIdx].timelimit - 10) / 10) * 25
                                )}
                                step={25}
                                marks={MARKSTIME}
                                styles={{ markLabel: { display: "none" } }}
                              />
                            </Stack>
                          </Group>
                        </Stack>
                      </Stack>
                    </Stack>
                    <Stack
                      onClick={() => {
                        console.log(curIdx);
                        if (curIdx === problem.length - 1) plus();
                        else setCurIdx((prevState) => curIdx + 1);
                        console.log(curIdx);
                      }}
                      className="shadow-lg cursor-pointer hover:bg-gradient-to-t hover:from-amber-500 hover:via-white hover:to-white h-16 bg-white"
                    ></Stack>
                  </Stack>
                  <Stack
                    spacing={300}
                    className=" flex flex-col justify-between"
                  >
                    {/* 추가 */}
                    <ActionIcon variant="transparent">
                      <Plus
                        onClick={() => {
                          plus();
                        }}
                        size="xl"
                        color="gray"
                      />
                    </ActionIcon>
                    {/* 이동 */}
                    <ActionIcon variant="transparent">
                      <GridDots size="xl" color="gray" />
                    </ActionIcon>
                    {/* 추가 */}
                    <ActionIcon variant="transparent">
                      <Plus
                        onClick={() => {
                          plus();
                        }}
                        size="xl"
                        color="gray"
                      />
                    </ActionIcon>
                  </Stack>
                </Center>
              </Group>
              <Stack className="w-[20vw]">
                <p className="border-b-2 border-gray-300 text-amber-500 font-bold">
                  이미지 검색
                </p>
                <TextInput
                  size="lg"
                  label=""
                  placeholder="검색어를 입력하세요"
                  rightSection={
                    <ActionIcon>
                      <AdjustmentsHorizontal size="md" />
                    </ActionIcon>
                  }
                  value="한라산"
                />
                <p className="border-b-2 border-gray-300 text-amber-500 font-bold">
                  미리보기
                </p>
                <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
                  <Text color="gray" align="center">
                    이미지나 동영상을 첨부하세요
                  </Text>
                </Dropzone>

                <Image
                  className="border-2 border-amber-500"
                  src="/../public/halla1.jpeg"
                  alt="Picture of the author"
                  width={300}
                  height={220}
                />

                <Image
                  className="border-2 border-amber-500"
                  src="/../public/halla2.jpeg"
                  alt="Picture of the author"
                  width={300}
                  height={220}
                />
                <Group className="bg-amber-500 text-white w-0 h-0"></Group>
                <Group className="border-blue-400 text-black bg-blue-400 w-0 h-0"></Group>
                <Group className="border-green-400 bg-green-400 w-0 h-0"></Group>
                <Group className="border-amber-400 bg-amber-400 w-0 h-0"></Group>
                <Group className="border-violet-400 bg-violet-400 w-0 h-0"></Group>
                <Group className="border-gray-400 bg-gray-400 w-0 h-0"></Group>

                {/* <div className="border-2 border-gray-300 h-60 w-96">
                  {previews}
                </div> */}
              </Stack>
            </Group>
          </Stack>
        ) : (
          <></>
        )}

        {step === 1 ? (
          <div
            className={`w-[100vw] h-[100vh] bg-gradient-to-r from-orange-500 to-yellow-500`}
          >
            <Center className="m-auto">
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
          </div>
        ) : (
          <></>
        )}

        {step === 2 ? (
          <div
            className={`w-[100vw] h-[100vh] bg-gradient-to-r from-orange-500 to-yellow-500`}
          >
            <Center className="m-auto">
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
          </div>
        ) : (
          <></>
        )}
      </main>
    </>
  );
};

export default Home;

{
  /*
<Group>
          <Stack>
            <Group spacing={0} className="w-[60vw]">
              <Stack>
                <Stack className="p-10 bg-white shadow-lg sm:rounded-3xl backdrop-blur-xl bg-opacity-50">
                  <h2 className="text-amber-500 font-semibold">퀴즈 정보</h2>
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
                                      subjectIdx + (subjectIdx === 0 ? 4 : 0)
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
                    <Stack>
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
                <Stack>
                  <Stack className="p-10 bg-white shadow-lg sm:rounded-3xl backdrop-blur-xl bg-opacity-50">
                    <h2 className="text-amber-500 font-semibold">과목 선택</h2>
                    <Group className="mx-2">
                      <Tabs
                        id="subjectTab"
                        allowTabDeactivation={true}
                        defaultValue="0"
                        variant="outline"
                      >
                        <Tabs.List>
                          {subjectInfo.map(
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

              <Stack className="w-[20vw] p-10 bg-white shadow-lg sm:rounded-3xl backdrop-blur-xl bg-opacity-50">
                <h2 className="text-amber-500 font-semibold">
                  시간 및 배점 설정
                </h2>
                <Stack className="w-[20vw]">
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
                  <Slider
                    disabled
                    color="orange"
                    label={(val) =>
                      MARKSTIME.find((mark) => mark.value === val)?.label
                    }
                    defaultValue={50}
                    step={25}
                    marks={MARKSTIME}
                    styles={{ markLabel: { display: "none" } }}
                  />
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
                    <p className="font-semibold">점수 일괄 설정</p>
                  </Group>
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
              </Stack>
            </Group>
          </Stack>
        </Group>
                  */
}
