import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { useScrollLock, useScrollIntoView } from "@mantine/hooks";
import { useRecoilState } from "recoil";

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
} from "@mantine/core";
import { Circle, Copy, Photo, Plus, Trash, X } from "tabler-icons-react";

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
} from "../States";
import {
  dtypeName,
  tabTooltip,
  MARKSCORE,
  MARKSTIME,
  tabColor,
  tabIcon,
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

  /* *** common *** */
  const [problemSet, setProblemSet] = useRecoilState(createProblemset);
  const [problem, setProblem] = useRecoilState(createProblem);
  const [option, setOption] = useRecoilState(createOption);
  /* score, time */
  /* image */
  // const [imageTmpWord, setImageTmpWord] = useDebouncedState("", 500);

  const problemDelete = () => {
    if (problem.length === 1) return;
    if (problem.length - 1 === curIdx) setCurIdx((prevState) => curIdx - 1);
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

  useEffect(() => {
    console.log("problem" + problem);
    console.log("score: " + problem[0].score);
    console.log("timelimit: " + problem[0].timelimit);
  }, [problem]);

  return (
    <Grid gutter={0} columns={20} style={{ height: "calc(100vh - 120px)" }}>
      <Grid.Col className="shadow-xl bg-[#273248]" span={3}>
        <ScrollArea scrollbarSize={10} className="80vh">
          <Stack style={{ height: "80vh" }} spacing={0}>
            {problem.map((cur, i) => {
              return (
                <Stack
                  onClick={() => {
                    viewport.current.scrollTo({
                      top: (viewport.current.scrollHeight * i) / problem.length,
                      behavior: "smooth",
                    });
                    setCurIdx(i);
                  }}
                  className={`${
                    curIdx === i ? "bg-[#85b6ff]/[0.15]" : ""
                  } cursor-pointer hover:bg-[#85b6ff]/[0.15]`}
                  key={i}
                >
                  <Grid columns={20}>
                    <Grid.Col span={3}>
                      <span className="text-[#F9761E] text-[16px] ">
                        {i + 1}
                      </span>
                    </Grid.Col>
                    <Grid.Col span={14}>
                      <Image
                        layout="responsive"
                        className="rounded-xl"
                        src="/halla_mountain.svg"
                        width={"200px"}
                        height="100px"
                        alt="image"
                      ></Image>
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <Stack>
                        <ActionIcon
                          color="blue"
                          variant={curIdx === i ? "light" : "transparent"}
                        >
                          <Copy></Copy>
                        </ActionIcon>
                        <ActionIcon
                          color="blue"
                          variant={curIdx === i ? "light" : "transparent"}
                        >
                          <Trash
                            onClick={() => {
                              problemDelete();
                            }}
                          ></Trash>
                        </ActionIcon>
                      </Stack>
                    </Grid.Col>
                    <Stack spacing={0} className="h-[20px] w-[180px]">
                      <p className="text-white text-[16px]">
                        {cur.description}
                      </p>
                    </Stack>
                  </Grid>
                  <Stack spacing={0} className="h-[20px] w-[180px]">
                    <p className="text-white text-[16px]">{cur.description}</p>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </ScrollArea>
        <Center>
          <Button
            onClick={() => {
              problemPlus();
            }}
            size="xl"
            leftIcon={<Plus></Plus>}
            radius="md"
            color="orange"
            variant="filled"
          >
            퀴즈 추가하기
          </Button>
        </Center>
      </Grid.Col>
      <Grid.Col className="bg-[#EDF4F7]" span={17}>
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
                <Center key={i}>
                  <Stack
                    spacing="xl"
                    style={{ height: "calc(100vh - 120px)" }}
                    className="w-full mx-60"
                  >
                    <Stack className="py-8" spacing={0}>
                      {/* *** 퀴즈 종류 고르는 곳 *** */}
                      <Group
                        position="right"
                        classNames="shadow-xl bg-amber-500"
                        spacing={12}
                      >
                        {dtypeName.map((name, j) => {
                          return (
                            <Group
                              key={j}
                              onClick={() => {
                                setTabChangeIdx((prevstate) => j);
                                setTabModalOpened(true);
                              }}
                              className={`${
                                j.toString() === problem[i].dtype
                                  ? "bg-orange-500 shadow-[inset_0_-2px_4px_rgba(128,128,128,0.8)]"
                                  : "bg-white text-gray-500"
                              }
        hover:shadow-none cursor-pointer rounded-t-xl h-12 w-24`}
                            >
                              <p
                                className={` m-auto text-center ${
                                  j.toString() === problem[i].dtype
                                    ? "text-white"
                                    : "text-gray-500"
                                } font-semibold`}
                              >
                                {name}
                              </p>
                            </Group>
                          );
                        })}
                      </Group>
                      {/* *** white bg zone *** */}
                      <Stack
                        className={`p-8 shadow-lg rounded-xl bg-white items-center shadow-lg`}
                      >
                        <Group className="ml-2 rounded-full h-8 w-16 bg-orange-500">
                          <p className=" m-auto text-center text-white font-semibold">
                            퀴즈 {i + 1}
                          </p>
                        </Group>
                        <Grid columns={8}>
                          <Grid.Col span={5}>
                            <Stack spacing={0}>
                              <TextInput
                                variant="unstyled"
                                className="!border-2 !border-amber-500"
                                size="xl"
                                onChange={(event) => {
                                  let copy = JSON.parse(
                                    JSON.stringify(problem)
                                  );
                                  copy[i].description =
                                    event.currentTarget.value;
                                  setProblem(copy);
                                }}
                                value={problem[i].description}
                                color="orange"
                                placeholder="퀴즈를 입력해주세요."
                              ></TextInput>
                            </Stack>
                          </Grid.Col>
                          <Grid.Col span={3}>
                            <Stack
                              onClick={() => {
                                setImageModalOpened(true);
                              }}
                              className="flex items-center justify-center cursor-pointer border-2 border-dotted border-gray-300 rounded-xl bg-[#FBFBFB] w-[20vw] h-[20vh]"
                            >
                              <Group position="center">
                                <ActionIcon>
                                  <Photo color="gray"></Photo>
                                </ActionIcon>
                                <p className="text-gray-500">사진 업로드</p>
                              </Group>
                            </Stack>
                          </Grid.Col>
                        </Grid>
                        {/* 입력 - 선지 정보 */}
                        {problem[i].dtype === "0" ? (
                          <Grid columns={4}>
                            {option[i].map(
                              ({ description, idx, picture, problemId }, j) => {
                                const ans = problem[i].answer;
                                return (
                                  <Grid.Col
                                    className=" h-[20vh]"
                                    key={j}
                                    span={1}
                                  >
                                    <Stack className="p-4 bg-blue-100 rounded-lg border-solid border-2 border-blue-500">
                                      <Group position="apart">
                                        <Checkbox
                                          className="pl-2"
                                          defaultChecked={false}
                                          onClick={(event) => {
                                            //alert(JSON.stringify(problem));
                                            let copy = JSON.parse(
                                              JSON.stringify(problem)
                                            );
                                            copy[i].answer =
                                              problem[i].answer ===
                                              j.toString();
                                            setProblem(copy);
                                          }}
                                          checked={
                                            problem[i].answer === j.toString()
                                              ? true
                                              : false
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
                                        className=""
                                        variant="unstyled"
                                        onChange={(event) => {
                                          let copy = JSON.parse(
                                            JSON.stringify(option)
                                          );
                                          copy[i][j].description =
                                            event.currentTarget.value;
                                          setOption(copy);
                                        }}
                                        value={description}
                                        placeholder={`선지 ${i + 1}`}
                                        autosize
                                        minRows={4}
                                        maxRows={4}
                                      />
                                    </Stack>
                                  </Grid.Col>
                                );
                              }
                            )}
                          </Grid>
                        ) : (
                          <></>
                        )}

                        {problem[i].dtype === "1" ? (
                          <TextInput
                            className=""
                            variant="unstyled"
                            onChange={(event) => {
                              alert(event.currentTarget.value);
                              let copy = [...problem];
                              copy.splice(curIdx, 1, {
                                ...copy[curIdx],
                                answer: event.currentTarget.value,
                              });
                              setProblem(copy);
                            }}
                            value={problem[i].answer}
                            placeholder={"정답을 입력해주세요"}
                          />
                        ) : (
                          <></>
                        )}

                        {problem[i].dtype === "2" ? (
                          <Grid columns={2}>
                            <Grid.Col className=" h-[20vh]" span={1}>
                              <Stack
                                align="center"
                                className="p-4 h-[20vh] bg-blue-100 rounded-lg border-solid border-2 border-blue-500"
                              >
                                <Group position="apart">
                                  <ActionIcon size={30}>
                                    <Photo size={30} color="blue"></Photo>
                                  </ActionIcon>
                                </Group>
                                <ActionIcon variant="transparent" size={60}>
                                  <Circle color="blue" size={60}></Circle>
                                </ActionIcon>
                              </Stack>
                            </Grid.Col>
                            <Grid.Col className=" h-[20vh]" span={1}>
                              <Stack
                                align="center"
                                className="p-4 h-[20vh] bg-blue-100 rounded-lg border-solid border-2 border-blue-500"
                              >
                                <Group position="left">
                                  <ActionIcon variant="transparent" size={30}>
                                    <Photo size={30} color="blue"></Photo>
                                  </ActionIcon>
                                </Group>
                                <ActionIcon size={60}>
                                  <X color="blue" size={60}></X>
                                </ActionIcon>
                              </Stack>
                            </Grid.Col>
                          </Grid>
                        ) : (
                          <></>
                        )}

                        {problem[i].dtype === "3" ? <p>적을거</p> : <></>}
                      </Stack>
                      <Group spacing={50} className="mt-16" position="left">
                        <Group>
                          <span className="text-gray-500">문제 배점</span>
                          <Slider
                            className="w-[10vw]"
                            onChangeEnd={(value) => {
                              const changedProblem = problem.map(
                                (curProblem, problemIdx) => {
                                  let copyProblem = { ...curProblem };
                                  if (i === problemIdx) {
                                    copyProblem.score = 100 + value * 4;
                                    console.log(100 + value * 4);
                                  }
                                  return copyProblem;
                                }
                              );
                              setProblem(changedProblem);
                            }}
                            color="blue"
                            label={(val) =>
                              MARKSCORE.find((mark) => mark.value === val)
                                ?.label
                            }
                            defaultValue={50}
                            value={Math.trunc(
                              ((problem[i].score - 100) / 100) * 25
                            )}
                            step={25}
                            marks={MARKSCORE}
                            styles={{ markLabel: { display: "none" } }}
                          />
                        </Group>
                        <Group>
                          <span className="text-gray-500">시간 배점</span>
                          <Slider
                            defaultValue={50}
                            className="w-[10vw]"
                            onChangeEnd={(value) => {
                              const changedProblem = problem.map(
                                (curProblem, problemIdx) => {
                                  let copyProblem = { ...curProblem };
                                  if (i === problemIdx) {
                                    copyProblem.timelimit =
                                      10 + (value / 25) * 10;
                                    console.log(10 + (value / 25) * 10);
                                  }
                                  return copyProblem;
                                }
                              );
                              setProblem(changedProblem);
                            }}
                            color="blue"
                            label={(val) =>
                              MARKSTIME.find((mark) => mark.value === val)
                                ?.label
                            }
                            value={Math.trunc(
                              ((problem[i].timelimit - 10) / 10) * 25
                            )}
                            step={25}
                            marks={MARKSTIME}
                            styles={{ markLabel: { display: "none" } }}
                          />
                        </Group>
                      </Group>
                    </Stack>
                  </Stack>
                  {/* {ControlBar(30)} */}
                </Center>
              );
            })}
          </ScrollArea>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

{
  /* <Dropzone
className="cursor-default"
accept={IMAGE_MIME_TYPE}
onDrop={setFiles}
>
<Stack>
  <Center>
    <Group>
      <Button color="orange">이미지 검색</Button>
      <Button color="orange">이미지 업로드</Button>
    </Group>
  </Center>
  <Text color="gray" align="center">
    이미지를 검색하거나 직접 업로드할 수 있어요
  </Text>
</Stack>
</Dropzone> */
}
