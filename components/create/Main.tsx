import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { RichTextEditor } from "@mantine/rte";
import { useScrollIntoView } from "@mantine/hooks";
import { useRecoilState } from "recoil";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

import {
  Stack,
  Group,
  Text,
  Center,
  Button,
  Checkbox,
  Textarea,
  TextInput,
  Grid,
  Slider,
  ScrollArea,
  SimpleGrid,
  Divider,
  ActionIcon,
  Container,
  HoverCard,
  Menu,
  Select,
  BackgroundImage,
  Popover,
} from "@mantine/core";
import {
  AB,
  BrandYoutube,
  Circle,
  Copy,
  HandClick,
  ListCheck,
  Photo,
  Plus,
  QuestionMark,
  Refresh,
  SquareCheck,
  Trash,
  X,
} from "tabler-icons-react";

import {
  createOption,
  createProblem,
  createProblemIdx,
  createTabCurrentIdx,
  createTabNextIdx,
  createTargetIdx,
  createTabModal,
  createIsImageLoading,
  createProblemset,
  createImageURL,
  createImageList,
  createImageWord,
  createStep,
  createCompleteModal,
  createProblemsetDrawer,
  createSlideProblem,
  createActive,
  createImageModal,
  createNonsense,
} from "../States";
import {
  dtypeName,
  tabTooltip,
  MARKSCORE,
  MARKSTIME,
  tabColor,
  tabIcon,
  connectMainServerApiAddress,
} from "../ConstValues";
import { useDebouncedState } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";

export const Main = () => {
  const viewport = useRef<HTMLDivElement>() as any;
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });
  /* ****** routes ****** */
  const [step, setStep] = useRecoilState(createStep);

  /* ****** pop-over ****** */
  /* modal */
  const [completeModalOpened, setCompleteModalOpened] =
    useRecoilState(createCompleteModal);
  const [tabModalOpened, setTabModalOpened] = useRecoilState(createTabModal);
  const [imageModalOpened, setImageModalOpened] =
    useRecoilState(createImageModal);
  /* drawer */
  const [problemsetDrawer, setProblemsetDrawer] = useRecoilState(
    createProblemsetDrawer
  );
  /* *** slide *** */
  const [curIdx, setCurIdx] = useRecoilState(createProblemIdx);
  /* *** form *** */
  const [tabIdx, setTabIdx] = useRecoilState(createTabCurrentIdx);
  const [tabChangeIdx, setTabChangeIdx] = useRecoilState(createTabNextIdx);

  /* *** non-sense *** */
  const [nonsense, setNonsense] = useRecoilState(createNonsense);

  /* *** common *** */
  const [problemSet, setProblemSet] = useRecoilState(createProblemset);
  const [problem, setProblem] = useRecoilState(createProblem);
  const [option, setOption] = useRecoilState(createOption);
  /* score, time */
  /* image */
  // const [imageTmpWord, setImageTmpWord] = useDebouncedState("", 500);

  const getNonsense = (idx: number) => {
    axios
      .get(connectMainServerApiAddress + "api/nonsense")
      .then((result) => {
        let copy = [...problem];
        copy.splice(curIdx, 1, {
          ...copy[curIdx],
          description: result.data.statement,
          answer: result.data.answer,
        });
        setProblem(copy);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const problemDelete = () => {
    if (problem.length === 1) return;
    setCurIdx((prevState) => curIdx - 1);
    let problemCopy = [...problem];
    problemCopy.splice(curIdx, 1);
    setProblem(problemCopy);

    let optionCopy = [...option];
    optionCopy.splice(curIdx, 1);
    setOption(optionCopy);
  };

  const problemPlus = () => {
    let copyProblem = [...problem];
    copyProblem.splice(curIdx + 1, 0, {
      answer: "0",
      description: "",
      dtype: "0",
      idx: 0,
      picture: "",
      problemsetId: 0,
      score: 300,
      timelimit: 30,
      title: "",
    });
    let copyOption = [...option];
    copyOption.splice(curIdx + 1, 0, [
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
    ]);
    setProblem(copyProblem);
    setOption(copyOption);
    setCurIdx(curIdx + 1);
  };

  const problemCopy = () => {
    let slicedProblem = problem[curIdx];
    let slicedOption = option[curIdx];
    let copyProblem = [...problem];
    copyProblem.splice(curIdx + 1, 0, slicedProblem);
    let copyOption = [...option];
    copyOption.splice(curIdx + 1, 0, slicedOption);
    setProblem(copyProblem);
    setOption(copyOption);
    setCurIdx(curIdx + 1);
  };

  useEffect(() => {
    console.log(problem[0].score);

    // alert(problem[curIdx].picture);
  }, [problem]);

  const changeSliderValue = (value: any, idx: number) => {
    console.log(problem[idx].score);
    const changedProblem = problem.map((curProblem, problemIdx) => {
      let copyProblem = { ...curProblem };
      if (idx === problemIdx) {
        copyProblem.score = 100 + value * 4;
      }
      return copyProblem;
    });
    setProblem(changedProblem);
  };

  return (
    <Grid gutter={0} columns={18} style={{ height: "calc(100vh - 120px)" }}>
      {/* *** left slide *** */}
      <Grid.Col className="z-50 shadow-xl bg-[#273248]" span={3}>
        <ScrollArea scrollbarSize={0} className="80vh">
          <Stack style={{ height: "80vh" }} spacing={0}>
            {problem.map((cur, i) => {
              return (
                <Stack
                  onClick={() => {
                    console.log(
                      "겉에거: " +
                        (viewport.current.scrollHeight * i) / problem.length
                    );
                    viewport.current.scrollTo({
                      top: (viewport.current.scrollHeight * i) / problem.length,
                      behavior: "smooth",
                    });
                    setCurIdx(i);
                  }}
                  className={`${
                    curIdx === i ? "bg-[#85b6ff]/[0.15]" : ""
                  } cursor-pointer border-0 border-b-2 border-gray-500 border-dotted hover:bg-[#85b6ff]/[0.15]`}
                  key={i}
                >
                  <Grid gutter={0} columns={10}>
                    <Grid.Col span={8}>
                      <Stack className="m-4">
                        <p className="m-0 p-0 text-white text-[20px]">
                          <span className="mr-2 text-[#F9761E] text-[24px]">
                            {i + 1}
                          </span>
                          {problem[i].description}
                        </p>
                      </Stack>
                      <Stack className="m-4">
                        {problem[i].picture === "" ? (
                          <Stack className="bg-[#FBFBFB] flex items-center justify-center h-[100px] rounded-xl">
                            <Center>
                              <ActionIcon>
                                <Photo></Photo>
                              </ActionIcon>
                            </Center>
                          </Stack>
                        ) : (
                          <Image
                            layout="responsive"
                            className="rounded-xl"
                            src={problem[i].picture}
                            width={"180px"}
                            height="100px"
                            alt="image"
                          ></Image>
                        )}
                      </Stack>
                    </Grid.Col>
                    <Grid.Col
                      className="!flex items-end justify-center"
                      span={2}
                    >
                      {curIdx === i ? (
                        <Stack className="mb-4">
                          <ActionIcon
                            color="blue"
                            variant={curIdx === i ? "light" : "transparent"}
                          >
                            <Copy
                              onClick={(event) => {
                                event.stopPropagation();
                                problemCopy();
                              }}
                            ></Copy>
                          </ActionIcon>
                          <ActionIcon
                            color="blue"
                            variant={curIdx === i ? "light" : "transparent"}
                          >
                            <Trash
                              onClick={(event) => {
                                event.stopPropagation();
                                viewport.current.scrollTo({
                                  top:
                                    (viewport.current.scrollHeight *
                                      (curIdx - 1)) /
                                    problem.length,
                                  behavior: "smooth",
                                });
                                setTimeout(() => {
                                  problemDelete();
                                }, 700);
                              }}
                            ></Trash>
                          </ActionIcon>
                        </Stack>
                      ) : (
                        <></>
                      )}
                    </Grid.Col>
                  </Grid>
                </Stack>
              );
            })}
          </Stack>
        </ScrollArea>
        <Center>
          <Button
            onClick={() => {
              problemPlus();
              setTimeout(() => {
                viewport.current.scrollTo({
                  top:
                    (viewport.current.scrollHeight * curIdx) / problem.length,
                  behavior: "smooth",
                });
              }, 200);
            }}
            size={"xl"}
            leftIcon={<Plus></Plus>}
            radius="md"
            color="orange"
            variant="filled"
          >
            퀴즈 추가하기
          </Button>
        </Center>
      </Grid.Col>
      {/* *** main problem option slider *** */}
      <Grid.Col className="bg-[#EDF4F7]" span={15}>
        <Stack
          style={{ height: "calc(100vh - 120px)" }}
          justify="space-between"
        >
          <ScrollArea
            viewportRef={viewport}
            scrollbarSize={0}
            className="bg-[#F7F9FB]"
            style={{ height: "calc(100vh - 120px)" }}
          >
            {problem.map((slicedProblem, i) => {
              return (
                <Grid columns={15} key={i}>
                  <Grid.Col span={12}>
                    <Center>
                      <Stack
                        spacing={0}
                        style={{ height: "calc(100vh - 120px)" }}
                        className="w-full mx-12"
                      >
                        <Stack className="py-8" spacing={0}>
                          {/* *** white bg zone *** */}
                          <Stack className="p-8 shadow-lg rounded-xl bg-white items-center shadow-lg">
                            <TextInput
                              rightSection={
                                problem[i].dtype === "3" ? (
                                  <ActionIcon
                                    onClick={() => {
                                      getNonsense(i);
                                    }}
                                    size="xl"
                                  >
                                    <Refresh color="orange" size="xl" />
                                  </ActionIcon>
                                ) : (
                                  <></>
                                )
                              }
                              variant="unstyled"
                              className="!border-2 !border-amber-500"
                              size="xl"
                              onChange={(event) => {
                                if (problem[i].dtype === "3") return;
                                let copy = JSON.parse(JSON.stringify(problem));
                                copy[i].description = event.currentTarget.value;
                                setProblem(copy);
                              }}
                              value={problem[i].description}
                              color="orange"
                              placeholder="문제 내용을 입력해주세요."
                            ></TextInput>
                            <Group
                              className={`h-[300px] border-2 border-dotted border-gray-300 bg-no-repeat bg-center
                              `}
                              style={{
                                backgroundImage: `url(${problem[i].picture})`,
                              }}
                              position="center"
                            >
                              <Button
                                onClick={() => {
                                  setImageModalOpened(true);
                                }}
                                size="md"
                                color="orange"
                                leftIcon={<Photo></Photo>}
                              >
                                사진 업로드
                              </Button>
                              <Popover
                                width={300}
                                trapFocus
                                position="bottom"
                                withArrow
                                shadow="md"
                              >
                                <Popover.Target>
                                  <Button
                                    size="md"
                                    color="orange"
                                    leftIcon={<BrandYoutube></BrandYoutube>}
                                  >
                                    영상 업로드
                                  </Button>
                                </Popover.Target>
                                <Popover.Dropdown
                                  sx={(theme) => ({
                                    background:
                                      theme.colorScheme === "dark"
                                        ? theme.colors.dark[7]
                                        : theme.white,
                                  })}
                                >
                                  <Stack>
                                    <TextInput
                                      label="유튜브 URL"
                                      placeholder="링크를 입력해주세요"
                                      size="md"
                                    />
                                    <Button fullWidth>업로드</Button>
                                  </Stack>
                                </Popover.Dropdown>
                              </Popover>

                              {/* <Group
                                onClick={() => {
                                  setImageModalOpened(true);
                                }}
                                className=" cursor-pointer border-2 border-dotted border-gray-300 rounded-xl bg-[#FBFBFB] hover:bg-[#85B6FF] h-[5vh]"
                              >
                                <ActionIcon variant="transparent">
                                  <Photo color="gray"></Photo>
                                </ActionIcon>
                                <p className="text-gray-500">사진 업로드</p>
                                <ActionIcon variant="transparent">
                                  <Photo color="gray"></Photo>
                                </ActionIcon>
                              </Group> */}
                              {/* <Group
                                onClick={() => {
                                }}
                                className="cursor-pointer border-2 border-dotted border-gray-300 rounded-xl bg-[#FBFBFB] hover:bg-[#ffc0cb] h-[5vh]"
                              >
                                <ActionIcon variant="transparent">
                                  <BrandYoutube color="gray"></BrandYoutube>
                                </ActionIcon>
                                <p className="text-gray-500">영상 업로드</p>
                                <ActionIcon variant="transparent">
                                  <BrandYoutube color="gray"></BrandYoutube>
                                </ActionIcon>
                              </Group> */}
                            </Group>

                            <Divider size="sm"></Divider>
                            {/* 입력 - 선지 정보 */}
                            {optionContents(problem[i].dtype, i)}
                          </Stack>
                        </Stack>
                        <Group spacing={50} className="mt-16" position="left">
                          <Group>
                            <span className="text-gray-500">문제 배점</span>
                            <Select
                              defaultValue={"300점"}
                              placeholder="문제 배점을 선택하세요"
                              data={[
                                { value: "100점", label: "100점" },
                                { value: "200점", label: "200점" },
                                { value: "300점", label: "300점" },
                                { value: "400점", label: "400점" },
                                { value: "500점", label: "500점" },
                              ]}
                            />
                          </Group>
                          <Group>
                            <span className="text-gray-500">시간 배점</span>
                            <Select
                              defaultValue={"30초"}
                              placeholder="제한 시간을 선택하세요"
                              data={[
                                { value: "10초", label: "10초" },
                                { value: "20초", label: "20초" },
                                { value: "30초", label: "30초" },
                                { value: "40초", label: "40초" },
                                { value: "50초", label: "50초" },
                              ]}
                            />
                          </Group>
                        </Group>
                      </Stack>
                    </Center>
                  </Grid.Col>
                  <Grid.Col
                    span={3}
                    className="flex items-center justify-center"
                  >
                    {/* *** 퀴즈 종류 고르는 곳 *** */}
                    <Stack
                      classNames="p-4 m-4 bg-black w-60 h-60  shadow-xl"
                      spacing={12}
                    >
                      {dtypeName.map((name, j) => {
                        let rtIcon = () => {
                          if (j === 0)
                            return (
                              <ActionIcon variant="transparent">
                                <SquareCheck
                                  color={
                                    problem[i].dtype === "0" ? "white" : "black"
                                  }
                                />
                              </ActionIcon>
                            );
                          if (j === 1)
                            return (
                              <ActionIcon variant="transparent">
                                <HandClick
                                  color={
                                    problem[i].dtype === "1" ? "white" : "black"
                                  }
                                />
                              </ActionIcon>
                            );
                          if (j === 2)
                            return (
                              <Group position="center" spacing={0}>
                                <ActionIcon>
                                  {" "}
                                  <AB
                                    color={
                                      problem[i].dtype === "2"
                                        ? "white"
                                        : "black"
                                    }
                                  ></AB>
                                </ActionIcon>
                              </Group>
                            );
                          if (j === 3)
                            return (
                              <ActionIcon variant="transparent">
                                <QuestionMark
                                  color={
                                    problem[i].dtype === "3" ? "white" : "black"
                                  }
                                ></QuestionMark>
                              </ActionIcon>
                            );
                        };
                        return (
                          <Group
                            position="center"
                            key={j}
                            onClick={() => {
                              setTabChangeIdx((prevstate) => j);
                              setTabModalOpened(true);
                            }}
                            className={`${
                              j.toString() === problem[i].dtype
                                ? "bg-orange-500 shadow-[inset_0_-2px_4px_rgba(128,128,128,0.8)]"
                                : "bg-white text-gray-500 shadow-lg"
                            }
        hover:shadow-none cursor-pointer rounded-xl h-16 w-16`}
                          >
                            {rtIcon()}
                          </Group>
                        );
                      })}
                    </Stack>
                  </Grid.Col>
                </Grid>
              );
            })}
          </ScrollArea>
        </Stack>
      </Grid.Col>
      {/* *** right dtype button *** */}
    </Grid>
  );
  {
    /* *** option *** */
  }
  function optionContents(optionType: string, pi: number) {
    if (optionType === "0")
      return (
        <Grid columns={4}>
          {option[pi].map(({ description, idx, picture, problemId }, j) => {
            const ans = problem[pi].answer;
            return (
              <Grid.Col className=" h-[20vh]" key={j} span={1}>
                <Stack className="h-[19vh] p-4 bg-blue-100 rounded-lg border-solid border-2 border-blue-500">
                  <Group position="apart">
                    <Checkbox
                      className="pl-2"
                      defaultChecked={false}
                      onClick={(event) => {
                        let copy = JSON.parse(JSON.stringify(problem));
                        copy[pi].answer =
                          problem[pi].answer === j.toString()
                            ? ""
                            : j.toString();
                        setProblem(copy);
                      }}
                      checked={
                        problem[pi].answer === j.toString() ? true : false
                      }
                      color="blue"
                      size="xl"
                    />
                    <ActionIcon
                      variant="transparent"
                      color="indigo.8"
                      size={30}
                    >
                      <Photo size={30}></Photo>
                    </ActionIcon>
                  </Group>
                  <Textarea
                    size="xl"
                    variant="unstyled"
                    onChange={(event) => {
                      let copy = JSON.parse(JSON.stringify(option));
                      copy[pi][j].description = event.currentTarget.value;
                      setOption(copy);
                    }}
                    value={description}
                    placeholder={`선지 ${j + 1}`}
                    autosize
                    minRows={4}
                    maxRows={4}
                  />
                </Stack>
              </Grid.Col>
            );
          })}
        </Grid>
      );
    if (optionType === "1")
      return (
        <TextInput
          size="xl"
          className="h-[200px] bg-blue-100 rounded-lg border-solid border-2 border-blue-500"
          variant="unstyled"
          onChange={(event) => {
            let copy = [...problem];
            copy.splice(curIdx, 1, {
              ...copy[curIdx],
              answer: event.currentTarget.value,
            });
            setProblem(copy);
          }}
          value={problem[pi].answer}
          placeholder={"문제 정답을 입력해주세요"}
        />
      );
    if (optionType === "2")
      return (
        <Grid columns={2}>
          <Grid.Col
            onClick={() => {
              let copy = [...problem];
              copy.splice(pi, 1, {
                ...copy[pi],
                answer: "0",
              });
              setProblem(copy);
            }}
            className=" h-[20vh] cursor-pointer"
            span={1}
          >
            <Stack
              align="center"
              className={`flex items-center justify-center p-4 h-[20vh] ${
                problem[pi].answer === "0" ? "bg-blue-100" : "bg-gray-100"
              } rounded-lg border-solid border-2 border-blue-500`}
            >
              <ActionIcon variant="transparent" size={60}>
                <Circle color="blue" size={60}></Circle>
              </ActionIcon>
            </Stack>
          </Grid.Col>
          <Grid.Col
            onClick={() => {
              let copy = [...problem];
              copy.splice(pi, 1, {
                ...copy[pi],
                answer: "1",
              });
              setProblem(copy);
            }}
            className=" h-[20vh] cursor-pointer"
            span={1}
          >
            <Stack
              align="center"
              className={`flex items-center justify-center p-4 h-[20vh] ${
                problem[pi].answer === "1" ? "bg-blue-100" : "bg-gray-100"
              } rounded-lg border-solid border-2 border-blue-500`}
            >
              <ActionIcon size={60}>
                <X color="blue" size={60}></X>
              </ActionIcon>
            </Stack>
          </Grid.Col>
        </Grid>
      );
    if (optionType === "3")
      return (
        <Stack className="h-[180px]">
          <TextInput
            size="xl"
            className="h-[200px] bg-blue-100 rounded-lg border-solid border-2 border-blue-500"
            variant="unstyled"
            value={problem[pi].answer}
            placeholder={"넌센스 정답"}
          />
        </Stack>
      );
    return <></>;
  }
};
