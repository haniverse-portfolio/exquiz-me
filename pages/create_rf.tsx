import axios from "axios";
import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRecoilState } from "recoil";
import {
  createImageList,
  createImageURL,
  createIsImageLoading,
  createOption,
  createProblem,
  createProblemIdx,
  createProblemset,
  createScore,
  createStep,
  createTabCurrentIdx,
  createTabNextIdx,
  createTargetIdx,
  createTimelimit,
} from "../components/States";
import {
  dtypeName,
  connectServerApiAddress,
  tabTooltip,
  MARKSCORE,
  MARKSTIME,
} from "../components/ConstValues";
import { useDebouncedState } from "@mantine/hooks";
import {
  Button,
  Tooltip,
  Textarea,
  Center,
  Checkbox,
  Group,
  useMantineTheme,
  ActionIcon,
  Slider,
  Stack,
  Grid,
  TextInput,
  Modal,
  Text,
  Notification,
  Drawer,
  ScrollArea,
  Select,
  Skeleton,
  Accordion,
  ThemeIcon,
  Avatar,
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
  AlertTriangle,
  CornerDownRight,
  ArrowNarrowLeft,
} from "tabler-icons-react";

const Home: NextPage = () => {
  /* ****** routes ****** */
  const [step, setStep] = useRecoilState(createStep);

  /* ****** pop-over ****** */
  /* modal */
  const [createModalOpened, setCreateModalOpened] = useState(false);
  const [tabChangeModalOpened, setTabChangeModalOpened] = useState(false);
  /* drawer */
  const [drawerOpened, setDrawerOpened] = useState(true);

  /* ****** mantine ****** */
  const [files, setFiles] = useState<File[]>([]);

  /* ****** state-start ****** */

  /* *** slide *** */
  const [cur, setCur] = useRecoilState(createTargetIdx);
  const [curIdx, setCurIdx] = useRecoilState(createProblemIdx);
  /* *** form *** */
  const [tabIdx, setTabIdx] = useRecoilState(createTabCurrentIdx);
  const [tabChangeIdx, setTabChangeIdx] = useRecoilState(createTabNextIdx);

  /* *** common *** */
  const [problemSet, setProblemSet] = useRecoilState(createProblemset);
  const [problem, setProblem] = useRecoilState(createProblem);
  const [option, setOption] = useRecoilState(createOption);
  /* score, time */
  const [scoreValue, setScoreValue] = useRecoilState(createScore);
  const [timelimit, setTimelimit] = useRecoilState(createTimelimit);
  /* image */
  const [imageURL, setImageURL] = useRecoilState(createImageURL);
  const [imageList, setImageList] = useRecoilState(createImageList);
  const [imageLoading, setImageLoading] = useRecoilState(createIsImageLoading);
  const [imageWord, setImageWord] = useDebouncedState("", 500);

  /* ****** state-end ****** */

  /* ****** effect-start ****** */

  /* image */
  useEffect(() => {
    getImageList(imageWord);
    setImageLoading(false);
  }, [imageWord]);

  /* score */
  useEffect(() => {
    let copy = JSON.parse(JSON.stringify(problem));
    copy[curIdx].score = Math.trunc(100 + (scoreValue / 25) * 100);
    setProblem((prevstate) => copy);
  }, [scoreValue]);

  /* time */
  useEffect(() => {
    let copy = JSON.parse(JSON.stringify(problem));
    copy[curIdx].timelimit = Math.trunc(10 + (timelimit / 25) * 10);
    setProblem((prevstate) => copy);
  }, [timelimit]);

  /* ****** effect-end****** */

  function tabIcon(idx: number) {
    if (idx == 0) return <SquareCheck className="m-auto" size={"30px"} />;
    if (idx == 1) return <Parentheses className="m-auto" size={"30px"} />;
    if (idx == 2) return <AB className="m-auto" size={"30px"} />;
    if (idx == 3) return <QuestionMark className="m-auto" size={"30px"} />;
    if (idx == 4) return <Apps className="m-auto" size={"30px"} />;
    if (idx == 5) return <MathAvg className="m-auto" size={"30px"} />;
  }

  const postImage = async () => {
    console.log(imageURL);
    let rt = Infinity;
    await axios
      .post(connectServerApiAddress + "api/image/upload", imageURL)
      .then((result) => {})
      .catch((error) => {
        // alert(error.response.messages);
        alert("imagePost_error");
      });
    return rt;
  };

  const getImageList = async (name: string) => {
    let rt = Infinity;
    await axios
      .get(connectServerApiAddress + "api/crawl/" + name)
      .then((result) => {
        setImageList(result.data);
        console.log(result.data);
      })
      .catch((error) => {});
    return rt;
  };

  const getProblemsetId = async () => {
    let rt = Infinity;
    await axios
      .post(
        //const { data: result } =
        connectServerApiAddress + "api/problemset",
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

  const getImage = async (word: string) => {
    let rt = []!;
    await axios
      .get(connectServerApiAddress + "api/problem")
      .then((result) => {
        rt = result.data;
      })
      .catch((error) => {
        alert("image_error");
      });
    return rt;
  };

  const getProblemId = async (idx: number) => {
    let rt = Infinity;
    await axios
      .post(connectServerApiAddress + "api/problem", problem[idx])
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
      .post(connectServerApiAddress + "api/problem_option", option[idx1][idx2])
      .then((result) => {})
      .catch((error) => {
        // alert(error);
      });
    return;
  };

  const theme = useMantineTheme();

  let nextPlus = async () => {
    await setProblem((prevstate) => [
      ...prevstate,
      {
        answer: "-1",
        description: "",
        dtype: dtypeName[tabIdx],
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

  let prevPlus = async () => {
    await setProblem((prevstate) => [
      {
        answer: "-1",
        description: "",
        dtype: dtypeName[tabIdx],
        idx: 0,
        picture: "",
        problemsetId: 0,
        score: 300,
        timelimit: 30,
        title: "",
      },
      ...prevstate,
    ]);

    await setOption((prevstate) => [
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
      ...prevstate,
    ]);
  };

  const [data, setData] = useState([
    { value: "korean", label: "국어" },
    { value: "math", label: "수학" },
  ]);

  let controlBar = (size: number) => {
    return (
      <Stack spacing={200} className=" flex flex-col justify-between">
        {/* 추가 */}
        <ActionIcon variant="transparent">
          <Plus
            onClick={() => {
              prevPlus();
            }}
            size={size}
            color="gray"
          />
        </ActionIcon>
        {/* 이동 */}
        <ActionIcon variant="transparent">
          <GridDots size={size} color="gray" />
        </ActionIcon>
        {/* 추가 */}
        <ActionIcon variant="transparent">
          <Plus
            onClick={() => {
              nextPlus();
            }}
            size={size}
            color="gray"
          />
        </ActionIcon>
      </Stack>
    );
  };

  let tabChangeModalSection = () => {
    return (
      <Modal
        title={
          <ActionIcon color="red">
            <AlertTriangle></AlertTriangle>
          </ActionIcon>
        }
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        centered
        opened={tabChangeModalOpened}
        onClose={() => setTabChangeModalOpened(false)}
      >
        <Stack>
          <p>퀴즈 유형을 변경하시겠습니까?</p>
          <p>현재까지 작성된 내용이 사라집니다.</p>
          <Group>
            <Button
              variant="outline"
              color="orange"
              onClick={() => {
                let nxt = tabChangeIdx;
                problem[curIdx].description = "";
                option[curIdx] = [
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
                ];
                if (tabIdx !== nxt) setTabIdx((prevState) => nxt);
                problem[curIdx].dtype = dtypeName[nxt];
                setTabChangeModalOpened(false);
                setImageWord("");
                setImageList([]);
              }}
            >
              네
            </Button>
            <Button
              variant="outline"
              color="orange"
              onClick={() => {
                setCreateModalOpened(false);
              }}
            >
              아니오
            </Button>
          </Group>
        </Stack>
      </Modal>
    );
  };

  let createModalSection = () => {
    return (
      <Modal
        centered
        size="80%"
        opened={createModalOpened}
        onClose={() => setCreateModalOpened(false)}
      >
        <Stack className="mx-2">
          <Stack>
            <p className="border-b-2 border-gray-300 text-amber-500 font-bold">
              미리보기
            </p>
            {/* ../public/globe_banner.png */}
            <p className="underline decoration-amber-500 font-bold text-3xl text-center mt-10">
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
                  className="h-[15vh] w-[35vw]"
                  variant="outline"
                >
                  <p className="text-2xl">지리산</p>
                </Button>
                <Button
                  className="h-[15vh] w-[35vw]"
                  color="blue"
                  variant="outline"
                >
                  <p className="text-2xl">설악산</p>
                </Button>
              </Group>
              <Group>
                <Button
                  className="h-[15vh] w-[35vw]"
                  color="green"
                  variant="outline"
                >
                  <p className="text-2xl">한라산</p>
                </Button>
                <Button
                  className="h-[15vh] w-[35vw]"
                  color="yellow"
                  variant="outline"
                >
                  <p className="text-2xl">백두산</p>
                </Button>
              </Group>
            </Stack>
          </Stack>

          <br></br>
          <Stack>
            <Group className="justify-between">
              <p className="font-bold text-4xl text-red-500">00:05</p>
            </Group>
          </Stack>
        </Stack>
        <Button
          variant="outline"
          color="orange"
          onClick={async () => {
            setCreateModalOpened(false);
            setStep((prevState) => step + 1);

            let problemsetId = await getProblemsetId();
            // await delay(1500);
            let copyProblem = JSON.parse(JSON.stringify(problem));
            let copyOption = JSON.parse(JSON.stringify(option));
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
            location.replace("/inbox");
          }}
        >
          배포하기
        </Button>
      </Modal>
    );
  };

  let titleDrawer = () => {
    return (
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
        overlayBlur={3}
      >
        <Center>
          <Stack align="center" spacing={0}>
            <Stack className="bg-white w-[46vw] h-12 shadow-lg"></Stack>
            <Stack className="bg-amber-200 w-[50vw] h-[80vh] shadow-lg">
              <TextInput
                onChange={(event) => {
                  let copy = JSON.parse(JSON.stringify(problemSet));
                  copy.title = event.currentTarget.value;
                  setProblemSet(copy);
                }}
                value={problemSet.title}
                variant="unstyled"
                placeholder="제목을 입력해주세요"
                size="xl"
              ></TextInput>

              <Textarea
                onChange={(event) => {
                  let copy = JSON.parse(JSON.stringify(problemSet));
                  copy.description = event.currentTarget.value;
                  setProblemSet(copy);
                }}
                variant="unstyled"
                placeholder="설명을 입력해주세요"
                size="xl"
              ></Textarea>
              <h2 className="text-amber-500 font-semibold">과목 선택</h2>

              <Select
                className="w-52"
                data={data}
                placeholder="분야를 입력해주세요"
                nothingFound="새로운 입력값 만들기"
                searchable
                creatable
                getCreateLabel={(query) => `+ Create ${query}`}
                onCreate={(query) => {
                  const item = { value: query, label: query };
                  setData((current) => [...current, item]);
                  return item;
                }}
              />
              <Center>
                <Button variant="outline" className="w-20" color="orange">
                  완료
                </Button>
              </Center>
            </Stack>
          </Stack>
        </Center>
      </Drawer>
    );
  };

  let navCreate = () => {
    return (
      <Grid className="h-[60px] border-b-2 border-gray-300" columns={24}>
        <Grid.Col span={5}>
          <Group>
            <Link href="/">
              <ActionIcon>
                <ArrowNarrowLeft size="xl"></ArrowNarrowLeft>
              </ActionIcon>
            </Link>
            <Avatar
              radius="xl"
              src={"h".concat(
                "ttps://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
              )}
            />
            <Text>반가워요! 임준현님.</Text>
          </Group>
        </Grid.Col>
        <Grid.Col span={14}>
          {" "}
          <Group
            onClick={() => {
              setDrawerOpened(true);
            }}
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
                        className={`mx-1 text-white w-5 h-5 rounded-full`}
                      ></Group>
                      <Group
                        className={`mx-0 text-white w-5 h-5 rounded-full`}
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
        </Grid.Col>
        <Grid.Col span={5}>
          <Group className="border-l-2 border-gray-300">
            <Button variant="outline" color="orange" onClick={() => {}}>
              미리보기
            </Button>
            <Button
              variant="outline"
              color="orange"
              onClick={() => {
                setCreateModalOpened(true);
              }}
            >
              완성하기
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    );
  };

  const getColor = (color: string) =>
    theme.colors[color][theme.colorScheme === "dark" ? 5 : 7];

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
      {createModalSection()}
      {tabChangeModalSection()}
      {/* title */}
      {titleDrawer()}

      {/* 퀴즈 제작 */}
      <main>
        {step === 0 ? (
          <Stack spacing={0}>
            {/* navigation bar */}
            {navCreate()}
            {/* slide + create + image */}
            <Grid columns={24} className="h-[80vh]">
              <Grid.Col span={5}>
                <Stack justify="space-between">
                  <Accordion defaultValue="0" variant="contained">
                    {problem.map(({ dtype, description }, i) => {
                      return (
                        <Accordion.Item
                          value={i.toString()}
                          // className={`cursor-pointer border-2 border-${
                          //   curIdx === i ? "amber" : "gray"
                          // }-300`}
                          onClick={() => {
                            setCurIdx((prevstate) => i);
                          }}
                          key={i}
                        >
                          <Accordion.Control
                            icon={<AlertTriangle color={getColor("red")} />}
                          >
                            {i + 1}
                            &nbsp;{problem[i].description}
                          </Accordion.Control>
                          <Accordion.Panel>
                            <Group>
                              <ActionIcon variant="transparent">
                                <CornerDownRight />
                              </ActionIcon>
                              <Text>해설</Text>
                            </Group>
                          </Accordion.Panel>
                        </Accordion.Item>
                      );
                    })}
                  </Accordion>
                  <Stack>
                    <Group position="apart">
                      <Stack>
                        <p> 예상 소요 시간</p>
                        <p> 36:00 </p>
                      </Stack>
                      <Stack>
                        <p> 문제 수</p>
                        <p> {problem.length + "개"} </p>
                      </Stack>
                    </Group>
                  </Stack>
                </Stack>
              </Grid.Col>
              <Grid.Col span={14}>
                <Group
                  spacing={0}
                  className="border-x-2 border-gray-300 bg-[#F7F9FB]"
                >
                  <Center>
                    {/* slide */}
                    <Stack>{controlBar(0)}</Stack>

                    <Stack spacing="xl" className="w-10/12 mx-2">
                      <Stack
                        onClick={() => {
                          if (curIdx !== 0)
                            setCurIdx((prevState) => curIdx - 1);
                        }}
                        className="shadow-lg cursor-pointer hover:bg-gray-200 h-16 bg-white"
                        // hover:animate-bounce
                      ></Stack>
                      <Stack className="py-10" spacing={0}>
                        <Group
                          align="center"
                          spacing={0}
                          className="ml-4 items-center"
                        >
                          {dtypeName.map((name, i) => {
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
                                    setTabChangeIdx((prevstate) => i);
                                    setTabChangeModalOpened(true);
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
                                      color="orange"
                                      className={`w-24 ${
                                        i === tabIdx
                                          ? "text-white"
                                          : "text-gray-400"
                                      } `}
                                      variant="filled"
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
                        <Stack className={` bg-white items-center shadow-lg`}>
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
                                      await setCurIdx(
                                        (prevState) => curIdx - 1
                                      );
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
                              // onKeyUp={
                              //   throttle(() => {
                              //     alert("hello");
                              //   }, 500);
                              // }
                              onClick={() => {
                                setCur(0);
                              }}
                              onMouseDown={(event) => {
                                setImageLoading(true);
                                setImageWord(problem[curIdx].description);
                              }}
                              onChange={(event) => {
                                let copy = JSON.parse(JSON.stringify(problem));
                                copy[curIdx].description =
                                  event.currentTarget.value;
                                setProblem(copy);
                                setImageLoading(true);
                                setImageWord(copy[curIdx].description);
                              }}
                              value={problem[curIdx].description}
                              color="orange"
                              placeholder="문제 설명"
                              icon={<Plus size={14} />}
                            ></TextInput>
                            <p className="text-amber-500 font-bold">
                              선지 정보
                            </p>
                            {/* 입력 - 선지 정보 */}
                            {tabIdx === 0 ? (
                              <Grid>
                                {option[curIdx].map(
                                  (
                                    { description, idx, picture, problemId },
                                    i
                                  ) => {
                                    const ans = problem[curIdx].answer;
                                    return (
                                      <Grid.Col
                                        onClick={() => {
                                          setCur(i);
                                        }}
                                        key={i}
                                        span={5}
                                      >
                                        <Group
                                          className={`bg-amber-100 rounded-lg border-solid border-2 border-amber-500`}
                                        >
                                          <Checkbox
                                            className="pl-2"
                                            defaultChecked={false}
                                            onClick={(event) => {
                                              let copy = [...problem];
                                              // (this.checked === true)?:"":
                                              copy[curIdx].answer =
                                                i.toString();
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
                                            onMouseDown={(event) => {
                                              setImageLoading(true);
                                              setImageWord(
                                                option[curIdx][i].description
                                              );
                                            }}
                                            onChange={(event) => {
                                              let copy = JSON.parse(
                                                JSON.stringify(option)
                                              );
                                              copy[curIdx][i].description =
                                                event.currentTarget.value;
                                              setOption(copy);
                                              setImageLoading(true);
                                              setImageWord(
                                                copy[curIdx][i].description
                                              );
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
                            ) : (
                              <></>
                            )}

                            {tabIdx === 1 ? (
                              <Grid>
                                {option[curIdx].map(
                                  (
                                    { description, idx, picture, problemId },
                                    i
                                  ) => {
                                    const ans = problem[curIdx].answer;
                                    return (
                                      <Grid.Col key={i} span={2}>
                                        <Group
                                          className={`bg-amber-100 rounded-lg border-solid border-2 border-amber-500`}
                                        >
                                          <Checkbox
                                            defaultChecked={false}
                                            onClick={(event) => {
                                              let copy = [...problem];
                                              // (this.checked === true)?:"":
                                              copy[curIdx].answer =
                                                i.toString();
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
                                          <TextInput
                                            className=""
                                            variant="unstyled"
                                            onMouseDown={(event) => {
                                              setImageLoading(true);
                                              setImageWord(
                                                option[curIdx][i].description
                                              );
                                            }}
                                            onChange={(event) => {
                                              let copy = [...option];
                                              copy[curIdx][i].description =
                                                event.currentTarget.value;
                                              setOption(copy);
                                              setImageLoading(true);
                                              setImageWord(
                                                copy[curIdx][i].description
                                              );
                                            }}
                                            value={description}
                                            placeholder={`선지 ${i + 1}`}
                                          />
                                        </Group>
                                      </Grid.Col>
                                    );
                                  }
                                )}
                              </Grid>
                            ) : (
                              <></>
                            )}

                            {tabIdx === 2 ? (
                              <Grid>
                                {option[curIdx].map(
                                  (
                                    { description, idx, picture, problemId },
                                    i
                                  ) => {
                                    const ans = problem[curIdx].answer;
                                    return (
                                      <Grid.Col key={i} span={2}>
                                        <Group
                                          className={`bg-amber-100 rounded-lg border-solid border-2 border-amber-500`}
                                        >
                                          <Checkbox
                                            defaultChecked={false}
                                            onClick={(event) => {
                                              let copy = [...problem];
                                              // (this.checked === true)?:"":
                                              copy[curIdx].answer =
                                                i.toString();
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
                                            onMouseDown={(event) => {
                                              setImageLoading(true);
                                              setImageWord(
                                                option[curIdx][i].description
                                              );
                                            }}
                                            onChange={(event) => {
                                              let copy = [...option];
                                              copy[curIdx][i].description =
                                                event.currentTarget.value;
                                              setOption(copy);
                                              setImageLoading(true);
                                              setImageWord(
                                                copy[curIdx][i].description
                                              );
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
                            ) : (
                              <></>
                            )}
                            <Group position="left">
                              <Stack>
                                <p>
                                  <strong className="text-amber-500">
                                    배점
                                  </strong>
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
                                  <strong className="text-amber-500">
                                    시간
                                  </strong>
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
                          if (curIdx === problem.length - 1) nextPlus();
                          else setCurIdx((prevState) => curIdx + 1);
                          console.log(curIdx);
                        }}
                        className="shadow-lg cursor-pointer hover:bg-gray-200 h-16 bg-white"
                      ></Stack>
                    </Stack>
                    {controlBar(30)}
                  </Center>
                </Group>
              </Grid.Col>
              <Grid.Col span={5}>
                <Stack className="w-[20vw]">
                  <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
                    <Text color="gray" align="center">
                      이미지나 동영상을 첨부하세요
                    </Text>
                  </Dropzone>
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
                    onChange={(event) => {
                      let copy = event.currentTarget.value;
                      setImageLoading(true);
                      setImageWord(copy);
                    }}
                    value={imageWord}
                  />
                  {imageLoading === true ? (
                    <Stack>
                      <Stack className="mx-2">
                        <Group>
                          <Skeleton height={100} width="30%" radius="sm" />
                          <Skeleton height={100} width="30%" radius="sm" />
                          <Skeleton height={100} width="30%" radius="sm" />
                        </Group>
                        <Group>
                          <Skeleton height={100} width="45%" radius="sm" />
                          <Skeleton height={100} width="45%" radius="sm" />
                        </Group>
                      </Stack>
                      <Center>
                        <p className="text-gray-500"> 이미지 검색 중...</p>
                      </Center>
                      <Stack className="mx-2">
                        <Group>
                          <Skeleton height={100} width="30%" radius="sm" />
                          <Skeleton height={100} width="30%" radius="sm" />
                          <Skeleton height={100} width="30%" radius="sm" />
                        </Group>
                        <Group>
                          <Skeleton height={100} width="45%" radius="sm" />
                          <Skeleton height={100} width="45%" radius="sm" />
                        </Group>
                      </Stack>
                    </Stack>
                  ) : (
                    <Center>
                      {imageList.length === 0 ? (
                        <p className="text-gray-500">검색결과 없음.</p>
                      ) : (
                        <ScrollArea className="h-[50vh]">
                          <Stack className="h-[1500vh]">
                            {imageList.map((link, i) => {
                              return i < 20 ? (
                                <></>
                              ) : (
                                <img
                                  className="cursor-pointer"
                                  onClick={async () => {
                                    if (cur == 0)
                                      problem[curIdx].picture = link;
                                    else option[curIdx][cur].picture = link;
                                    let copy = imageURL;
                                    copy.url = link;
                                    setImageURL((prevstate) => copy);
                                    await postImage();
                                  }}
                                  key={i}
                                  src={link}
                                  alt="alt"
                                  width={350}
                                  height={800}
                                ></img>
                              );
                            })}
                          </Stack>
                        </ScrollArea>
                      )}
                    </Center>
                  )}

                  <Group className="bg-amber-500 text-white w-0 h-0"></Group>
                  <Group className="border-blue-400 text-black bg-blue-400 w-0 h-0"></Group>
                  <Group className="border-green-400 bg-green-400 w-0 h-0"></Group>
                  <Group className="border-amber-400 bg-amber-400 w-0 h-0"></Group>
                  <Group className="border-b-2 border-amber-300 w-0 h-0"></Group>
                  <Group className="border-gray-400 bg-gray-400 w-0 h-0"></Group>

                  {/* <div className="border-2 border-gray-300 h-60 w-96">
                  {previews}
                </div> */}
                </Stack>
              </Grid.Col>
            </Grid>
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
                color="orange"
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
                color="orange"
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
              </ㅌStack>

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
