import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRecoilState } from "recoil";

import {
  Stack,
  ActionIcon,
  Accordion,
  Group,
  Text,
  useMantineTheme,
  Center,
  Tooltip,
  Button,
  Checkbox,
  Textarea,
  TextInput,
  Grid,
  Slider,
} from "@mantine/core";
import {
  Plus,
  GridDots,
  CornerDownRight,
  AlertTriangle,
  FileUpload,
  Copy,
  X,
  SquareCheck,
  Parentheses,
  AB,
  QuestionMark,
  Apps,
  MathAvg,
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
  createScore,
  createTimelimit,
  createImageURL,
  createImageList,
  createImageWord,
  createStep,
  createCompleteModal,
  createProblemsetDrawer,
} from "../States";
import { dtypeName, tabTooltip, MARKSCORE, MARKSTIME } from "../ConstValues";
import { ControlBar } from "./ControlBar";
import { useDebouncedState } from "@mantine/hooks";

export const Main = () => {
  const tabColor = [
    "bg-gradient-to-r from-red-500 to-orange-500",
    "bg-gradient-to-r from-orange-500 to-amber-500",
    "bg-gradient-to-r from-green-500 to-green-500",
    "bg-gradient-to-r from-blue-700 to-blue-500",
    "bg-gradient-to-r from-purple-500 to-pink-500",
    "bg-gradient-to-r from-gray-500 to-gray-400",
  ];

  function tabIcon(idx: number) {
    if (idx == 0)
      return <SquareCheck color="white" className="m-auto" size={"30px"} />;
    if (idx == 1)
      return <Parentheses color="white" className="m-auto" size={"30px"} />;
    if (idx == 2) return <AB color="white" className="m-auto" size={"30px"} />;
    if (idx == 3)
      return <QuestionMark color="white" className="m-auto" size={"30px"} />;
    if (idx == 4)
      return <Apps color="white" className="m-auto" size={"30px"} />;
    if (idx == 5)
      return <MathAvg color="white" className="m-auto" size={"30px"} />;
  }
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
  const [imageTmpWord, setImageTmpWord] = useDebouncedState("", 500);
  const [imageWord, setImageWord] = useRecoilState(createImageWord);

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

  return (
    <Stack justify="space-between">
      <Accordion defaultValue="0" variant="contained">
        {problem.map(({ dtype, description }, i) => {
          return (
            <Group
              key={i}
              spacing={0}
              className="border-x-2 border-gray-300 bg-[#F7F9FB]"
            >
              <Center>
                {/* slide */}
                <Stack>{ControlBar(0)}</Stack>

                <Stack spacing="xl" className="w-10/12 mx-2">
                  <Stack className="py-4 mx-auto" spacing={0}>
                    <Group
                      classNames="mx-auto"
                      spacing={12}
                      className="items-center"
                    >
                      {dtypeName.map((name, i) => {
                        return (
                          <Tooltip
                            color="black"
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
                                setTabModalOpened("1");
                              }}
                              className={`${
                                i !== tabIdx
                                  ? "shadow-[inset_0_-2px_4px_rgba(128,128,128,0.8)]"
                                  : ""
                              }
            hover:shadow-none ${
              tabColor[i]
            } rounded-lg cursor-pointer w-16 h-16`}
                            >
                              {tabIcon(i)}
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
                        <Group
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <p className="text-amber-500 font-bold">문제 정보</p>
                          <Group>
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
                        <p className="text-amber-500 font-bold">선지 정보</p>
                        {/* 입력 - 선지 정보 */}
                        {tabIdx === 0 ? (
                          <Grid>
                            {option[curIdx].map(
                              ({ description, idx, picture, problemId }, i) => {
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
                                          let copy = JSON.parse(
                                            JSON.stringify(problem)
                                          );
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
                              ({ description, idx, picture, problemId }, i) => {
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
                              ({ description, idx, picture, problemId }, i) => {
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
                </Stack>
                {ControlBar(30)}
              </Center>
            </Group>
          );
        })}
      </Accordion>
      <Group className="w-0 h-0 bg-gradient-to-r from-red-500 to-orange-500"></Group>
      <Group className="w-0 h-0 bg-gradient-to-r from-blue-500 to-green-500"></Group>
      <Group className="w-0 h-0 bg-gradient-to-r from-red-500 to-orange-500"></Group>
      <Group className="w-0 h-0 bg-gradient-to-r from-red-500 to-orange-500"></Group>
      <Group className="w-0 h-0 bg-gradient-to-r from-red-500 to-orange-500"></Group>
      <Group className="w-0 h-0 bg-gradient-to-r from-red-500 to-orange-500"></Group>
    </Stack>
  );
};
