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
  ScrollArea,
  SimpleGrid,
  Divider,
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
import { ControlBar } from "./ControlBar";
import { useDebouncedState } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { GradientSegmentedControl } from "./createTabBar";
import { Editor } from "@tinymce/tinymce-react";
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
  const [cur, setCur] = useRecoilState(createTargetIdx);
  const [active, setActive] = useRecoilState(createActive);
  const [slideProblem, setSlideProblem] = useRecoilState(createSlideProblem);
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

  useEffect(() => {
    setImageWord(imageTmpWord);
  }, [imageTmpWord]);

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
    <Stack justify="space-between">
      <ScrollArea style={{ height: "calc(100vh - 70px)" }}>
        {problem.map(({ dtype, description }, i) => {
          return (
            <Group
              key={i}
              spacing={0}
              className="border-x-2 border-gray-300 bg-[#F7F9FB]"
            >
              <Center>
                {/* slide */}
                {/* <Stack>{ControlBar(0)}</Stack> */}

                <Stack spacing="xl" className="w-10/12 mx-2">
                  <Stack className="py-4 mx-auto" spacing={0}>
                    <Center>
                      <Group
                        classNames="bg-amber-500 mx-auto"
                        spacing={12}
                        className="items-center"
                      >
                        {dtypeName.map((name, i) => {
                          return (
                            <Tooltip
                              className="ease-in-out"
                              transition="pop"
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
                                  i === tabIdx
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
                    </Center>
                    <Stack className={` bg-white items-center shadow-lg`}>
                      <Stack className="p-10">
                        {/* 입력 - 문제 설명 */}
                        {/* 입력 - 문제 사진 및 동영상 */}
                        {/* <Editor
                            apiKey="your-api-key"
                            onInit={(evt, editor) =>
                              (editorRef.current = editor)
                            }
                            initialValue="<p>This is the initial content of the editor.</p>"
                            init={{
                              language: "ko_KR",
                              content_langs: [
                                { title: "Korean", code: "ko" },
                                { title: "English", code: "en" },
                              ],
                              height: 500,
                              menubar: false,
                              plugins: [
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                              ],
                              toolbar:
                                "undo redo | blocks | " +
                                "bold italic forecolor | alignleft aligncenter " +
                                "alignright alignjustify | bullist numlist outdent indent | " +
                                "removeformat | help",
                              content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            }}
                          /> */}
                        {/* <Group>
                            <ActionIcon variant="outline">
                              <FileUpload></FileUpload>
                            </ActionIcon>
                            <ActionIcon variant="outline">
                              <Copy></Copy>
                            </ActionIcon>
                            <ActionIcon
                              onClick={async () => {
                                if (problem.length === 1) return;
                                if (problem.length - 1 === active)
                                  await setactive((prevState) => active - 1);
                                let copy1 = [...problem];
                                copy1.splice(active, 1);
                                setProblem(copy1);

                                let copy2 = [...option];
                                copy2.splice(active, 1);
                                setOption(copy2);
                              }}
                              className="bg-red-200 hover:bg-red-200"
                              variant="outline"
                            >
                              <X></X>
                            </ActionIcon>
                          </Group> */}
                        <Stack spacing={0}>
                          <Group className="ml-2 rounded-t-xl h-8 w-16 bg-amber-500">
                            <p className=" m-auto text-center text-white font-semibold">
                              문제 {i + 1}
                            </p>
                          </Group>
                          <TextInput
                            className="!border-2 !border-amber-500"
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
                              setImageTmpWord(problem[active].description);
                            }}
                            onChange={(event) => {
                              let copy = JSON.parse(JSON.stringify(problem));
                              copy[active].description =
                                event.currentTarget.value;
                              // let copy2 = JSON.parse(
                              //   JSON.stringify(slideProblem)
                              // );
                              // copy2[active].label = event.currentTarget.value;
                              setProblem(copy);
                              // setSlideProblem(copy2);
                              setImageLoading(true);
                              setImageTmpWord(copy[active].description);
                            }}
                            value={problem[active].description}
                            color="orange"
                            placeholder="문제 설명을 입력하세요"
                          ></TextInput>
                        </Stack>
                        <div>
                          <Dropzone
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
                          </Dropzone>

                          <SimpleGrid
                            cols={4}
                            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
                            mt={previews.length > 0 ? "xl" : 0}
                          >
                            {previews}
                          </SimpleGrid>
                        </div>
                        {/* 입력 - 선지 정보 */}
                        <Center>
                          {tabIdx === 0 ? (
                            <Grid>
                              {option[active].map(
                                (
                                  { description, idx, picture, problemId },
                                  i
                                ) => {
                                  const ans = problem[active].answer;
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
                                            copy[active].answer = i.toString();
                                            setProblem(copy);
                                          }}
                                          checked={
                                            problem[active].answer ===
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
                                            setImageTmpWord(
                                              option[active][i].description
                                            );
                                          }}
                                          onChange={(event) => {
                                            let copy = JSON.parse(
                                              JSON.stringify(option)
                                            );
                                            copy[active][i].description =
                                              event.currentTarget.value;
                                            setOption(copy);
                                            setImageLoading(true);
                                            setImageTmpWord(
                                              copy[active][i].description
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
                            <Grid grow columns={4}>
                              {option[active].map(
                                (
                                  { description, idx, picture, problemId },
                                  i
                                ) => {
                                  const ans = problem[active].answer;
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
                                            copy[active].answer = i.toString();
                                            setProblem(copy);
                                          }}
                                          checked={
                                            problem[active].answer ===
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
                                            setImageTmpWord(
                                              option[active][i].description
                                            );
                                          }}
                                          onChange={(event) => {
                                            let copy = [...option];
                                            copy[active][i].description =
                                              event.currentTarget.value;
                                            setOption(copy);
                                            setImageLoading(true);
                                            setImageTmpWord(
                                              copy[active][i].description
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
                              {option[active].map(
                                (
                                  { description, idx, picture, problemId },
                                  i
                                ) => {
                                  const ans = problem[active].answer;
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
                                            copy[active].answer = i.toString();
                                            setProblem(copy);
                                          }}
                                          checked={
                                            problem[active].answer ===
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
                                            setImageTmpWord(
                                              option[active][i].description
                                            );
                                          }}
                                          onChange={(event) => {
                                            let copy = [...option];
                                            copy[active][i].description =
                                              event.currentTarget.value;
                                            setOption(copy);
                                            setImageLoading(true);
                                            setImageTmpWord(
                                              copy[active][i].description
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
                        </Center>
                        <Divider my="xs" />
                        <Group position="apart">
                          <Stack>
                            <Text>
                              <strong className="text-amber-500">배점</strong>
                              &nbsp;
                              <span className="text-gray-500">
                                {problem[active].score}점
                              </span>
                            </Text>
                            <Slider
                              className="w-[20vw]"
                              onChangeEnd={setScoreValue}
                              color="orange"
                              label={(val) =>
                                MARKSCORE.find((mark) => mark.value === val)
                                  ?.label
                              }
                              defaultValue={50}
                              value={Math.trunc(
                                ((problem[active].score - 100) / 100) * 25
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
                                {problem[active].timelimit}초
                              </span>
                            </p>
                            <Slider
                              defaultValue={50}
                              className="w-[20vw]"
                              onChangeEnd={setTimelimit}
                              color="orange"
                              label={(val) =>
                                MARKSTIME.find((mark) => mark.value === val)
                                  ?.label
                              }
                              value={Math.trunc(
                                ((problem[active].timelimit - 10) / 10) * 25
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
                {/* {ControlBar(30)} */}
              </Center>
            </Group>
          );
        })}
      </ScrollArea>
    </Stack>
  );
};
