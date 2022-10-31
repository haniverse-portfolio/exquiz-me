import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
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
} from "@mantine/core";
import { Photo } from "tabler-icons-react";

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
  createScore,
  createTimelimit,
  createImageURL,
  createImageList,
  createImageWord,
  createStep,
  createCompleteModal,
  createProblemsetDrawer,
  createSlideProblem,
  createActive,
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
  /* ****** routes ****** */
  const [step, setStep] = useRecoilState(createStep);

  /* ****** pop-over ****** */
  /* modal */
  const [completeModalOpened, setCompleteModalOpened] =
    useRecoilState(createCompleteModal);
  const [tabModalOpened, setTabModalOpened] = useRecoilState(createTabModal);
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
  const [scoreValue, setScoreValue] = useRecoilState(createScore);
  const [timelimit, setTimelimit] = useRecoilState(createTimelimit);
  /* image */
  // const [imageTmpWord, setImageTmpWord] = useDebouncedState("", 500);

  const NextPlus = async () => {
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

  // const editorRef = useRef({});

  const [files, setFiles] = useState<FileWithPath[]>([]);

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

  return (
    <Stack style={{ height: "calc(100vh - 70px)" }} justify="space-between">
      <ScrollArea
        scrollbarSize={0}
        className="bg-[#F7F9FB]"
        style={{ height: "calc(100vh - 120px)" }}
      >
        {problem.map(({ dtype, description }, i) => {
          return (
            <Center key={i}>
              {/* slide */}
              {/* <Stack>{ControlBar(0)}</Stack> */}

              <Stack spacing="xl" className="w-full mx-60">
                <Stack className="py-8" spacing={0}>
                  {/* *** 퀴즈 종류 고르는 곳 *** */}
                  <Group
                    position="right"
                    classNames="shadow-xl bg-amber-500"
                    spacing={12}
                  >
                    {dtypeName.map((name, i) => {
                      return (
                        <Group
                          key={i}
                          onClick={() => {
                            setTabChangeIdx((prevstate) => i);
                            setTabModalOpened("1");
                          }}
                          className={`${
                            i === tabIdx
                              ? "bg-orange-500 shadow-[inset_0_-2px_4px_rgba(128,128,128,0.8)]"
                              : "bg-white text-gray-500"
                          }
        hover:shadow-none cursor-pointer rounded-t-xl h-12 w-24`}
                        >
                          <p
                            className={` m-auto text-center ${
                              i === tabIdx ? "text-white" : "text-gray-500"
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
                              let copy = JSON.parse(JSON.stringify(problem));
                              copy[i].description = event.currentTarget.value;
                              setProblem(copy);
                            }}
                            value={problem[i].description}
                            color="orange"
                            placeholder="퀴즈를 입력해주세요."
                          ></TextInput>
                        </Stack>
                      </Grid.Col>
                      <Grid.Col span={3}>
                        <Stack className="flex items-center justify-center cursor-pointer border-2 border-dotted border-gray-300 rounded-xl bg-[#FBFBFB] w-[20vw] h-[20vh]">
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
                    {tabIdx === 0 ? (
                      <Grid columns={4}>
                        {option[i].map(
                          ({ description, idx, picture, problemId }, j) => {
                            const ans = problem[i].answer;
                            return (
                              <Grid.Col className=" h-[20vh]" key={j} span={1}>
                                <Stack className="p-4 bg-blue-100 rounded-lg border-solid border-2 border-blue-500">
                                  <Group position="apart">
                                    <Checkbox
                                      className="pl-2"
                                      defaultChecked={false}
                                      onClick={(event) => {
                                        let copy = JSON.parse(
                                          JSON.stringify(problem)
                                        );
                                        copy[i].answer = i.toString();
                                        setProblem(copy);
                                      }}
                                      checked={
                                        problem[i].answer === i.toString()
                                          ? true
                                          : false
                                      }
                                      // checked={true}

                                      color="blue"
                                      size="xl"
                                    />
                                    <ActionIcon size={30}>
                                      <Photo size={30} color="blue"></Photo>
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

                    {tabIdx === 1 ? (
                      <Grid grow columns={4}>
                        {option[i].map(
                          ({ description, idx, picture, problemId }, j) => {
                            const ans = problem[i].answer;
                            return (
                              <Grid.Col key={j} span={2}>
                                <Group
                                  className={`bg-amber-100 rounded-lg border-solid border-2 border-amber-500`}
                                >
                                  <Checkbox
                                    defaultChecked={false}
                                    onClick={(event) => {
                                      let copy = [...problem];
                                      copy[i].answer = i.toString();
                                      setProblem(copy);
                                    }}
                                    checked={
                                      problem[i].answer === i.toString()
                                        ? true
                                        : false
                                    }
                                    color="orange"
                                    size="xl"
                                  />
                                  <TextInput
                                    className=""
                                    variant="unstyled"
                                    onChange={(event) => {
                                      let copy = [...option];
                                      copy[i][j].description =
                                        event.currentTarget.value;
                                      setOption(copy);
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
                        {option[i].map(
                          ({ description, idx, picture, problemId }, j) => {
                            const ans = problem[i].answer;
                            return (
                              <Grid.Col key={i} span={2}>
                                <Group
                                  className={`bg-amber-100 rounded-lg border-solid border-2 border-amber-500`}
                                >
                                  <Checkbox
                                    defaultChecked={false}
                                    onClick={(event) => {
                                      let copy = [...problem];
                                      copy[i].answer = i.toString();
                                      setProblem(copy);
                                    }}
                                    checked={
                                      problem[i].answer === i.toString()
                                        ? true
                                        : false
                                    }
                                    color="orange"
                                    size="xl"
                                  />
                                  <Textarea
                                    className=""
                                    variant="unstyled"
                                    onChange={(event) => {
                                      let copy = [...option];
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
                                </Group>
                              </Grid.Col>
                            );
                          }
                        )}
                      </Grid>
                    ) : (
                      <></>
                    )}
                  </Stack>
                  <Group spacing={50} className="mt-16" position="left">
                    <Group>
                      <span className="text-gray-500">문제 배점</span>
                      <Slider
                        className="w-[10vw]"
                        onChangeEnd={(event) => {
                          let copy = [...problem];
                          copy[i].score = 50;
                          // setProblem(copy);
                        }}
                        color="blue"
                        label={(val) =>
                          MARKSCORE.find((mark) => mark.value === val)?.label
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
                        onChangeEnd={() => {
                          let copy = [...problem];
                          copy[i].timelimit = 50;
                          // setProblem(copy);
                        }}
                        color="blue"
                        label={(val) =>
                          MARKSTIME.find((mark) => mark.value === val)?.label
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
