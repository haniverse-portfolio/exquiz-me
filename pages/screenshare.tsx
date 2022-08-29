import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
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
  ColorSwatch,
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
  Refresh,
} from "tabler-icons-react";

import { copyFileSync } from "fs";
import { errorMonitor } from "events";
import { resourceLimits } from "worker_threads";
// 85vh 20vw
// 빈 슬라이드 객관식 주관식 O/X 넌센스 다이나믹
const Home: NextPage = () => {
  const [swatchChecked, setSwatchChecked] = useState(true);
  let swatch = () => {
    const swatches = Object.keys(theme.colors).map((color) => (
      <ColorSwatch size={20} key={color} color={theme.colors[color][6]} />
    ));

    return (
      <Group className="px-8" position="center" spacing="xs">
        {swatches}
      </Group>
    );

    // const theme = useMantineTheme();
    // let color = [
    //   "theme.colors.grape[6]",
    //   "red[6]",
    //   "orange[6]",
    //   "yellow[6]",
    //   "green[6]",
    //   "blue[6]",
    //   "grape[6]",
    //   "pink[6]",
    //   "black[6]",
    // ];
    // return (
    //   <Group position="center" spacing="xs">
    //     {color.map((cur, i) => {
    //       return (
    //         <ColorSwatch
    //           key={i}
    //           component="button"
    //           color={cur[0]}
    //           onClick={() => setSwatchChecked((c) => !c)}
    //           sx={{ color: "#fff", cursor: "pointer" }}
    //         >
    //           {swatchChecked && <Check width={10} />}
    //         </ColorSwatch>
    //       );
    //     })}
    //     ;
    // </Group>
    // );
  };

  /* slide */
  let [curIdx, setCurIdx] = useState(0);
  /* form */
  let [tabIdx, setTabIdx] = useState(0);

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
    let rt = [{ id: -1, title: "", description: "", closingMent: "" }];
    axios
      .get("https://prod.exquiz.me/api/problemsets/1")
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

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="핀 번호를 입력해주세요"
      ></Modal>

      <section className={`w-full h-full`}>
        <Center>
          <Center className=" my-2 h-[98.3vh]">
            <Stack>
              {/* main */}
              {step === 0 ? (
                <Group>
                  <Center>
                    <Stack>
                      <Center>
                        <Stack>
                          <Group className="justify-between">
                            <Group spacing={0}>
                              <Group className="shadow-lg" spacing={0}>
                                <Group className="border-r-2 border-gray-300 shadow-lg h-8 w-2 bg-amber-200" />
                                <Group>
                                  <Stack spacing={0}>
                                    <Group className="m-0 p-0 h-8 w-10 bg-amber-200">
                                      <p className="pl-1 font-sm">3/8</p>
                                    </Group>
                                  </Stack>
                                </Group>
                              </Group>
                              <Group className="shadow-lg m-0 p-0 h-6 w-3 bg-white"></Group>
                            </Group>
                            <Stack>
                              <p className="text-red-500">00:05</p>
                            </Stack>
                          </Group>
                          {/* Navigation Bar */}
                          <p className="underline decoration-amber-500 font-bold text-6xl text-center">
                            우리나라에서 가장 높은 산은?
                          </p>
                          <br></br>
                          <br></br>
                          <br></br>
                          <br></br>
                          <br></br>
                        </Stack>
                      </Center>
                      <Center>
                        <Stack>
                          <Group>
                            <Button
                              color="orange"
                              className="h-[20vh] w-[40vw]"
                              variant="outline"
                            >
                              지리산
                            </Button>
                            <Button
                              className="h-[20vh] w-[40vw]"
                              color="orange"
                              variant="outline"
                            >
                              설악산
                            </Button>
                          </Group>
                          <Group>
                            <Button
                              className="h-28 w-32"
                              color="orange"
                              variant="outline"
                            >
                              한라산
                            </Button>
                            <Button
                              className="h-28 w-32"
                              color="orange"
                              variant="filled"
                            >
                              백두산
                            </Button>
                          </Group>
                        </Stack>
                      </Center>

                      <footer className={styles.footer}>
                        <a
                          className="text-gray-700 no-underline text-black text-sm font-semibold"
                          target="_blank"
                          rel="noopener noreferrer"
                        ></a>
                      </footer>
                    </Stack>
                  </Center>
                </Group>
              ) : (
                <></>
              )}

              {/* main */}
              {step === 1 ? (
                <Group>
                  <Center>
                    <Stack>
                      <Center>
                        <Stack>
                          {/* Navigation Bar */}
                          <p className="font-bold text-md text-left">
                            닉네임 설정
                          </p>
                          <TextInput placeholder="똑똑한 소크라테스"></TextInput>
                          <Button
                            color="orange"
                            variant="outline"
                            leftIcon={<Refresh />}
                          >
                            랜덤 닉네임 생성
                          </Button>
                        </Stack>
                      </Center>
                      <Stack>
                        <Center>
                          <Stack>
                            <Center>
                              <p className="font-bold text-md text-left">
                                아바타 선택
                              </p>
                            </Center>
                            {swatch()}
                            <Stack className="w-[90vw] ">
                              <ScrollArea style={{ width: 300 }}>
                                <Group>
                                  {/* <Image
                                    className="rounded-full"
                                    src="../public/rat.png"
                                    width={"100px"}
                                    height={"100px"}
                                  ></Image> */}
                                </Group>
                              </ScrollArea>
                            </Stack>

                            <Center>
                              <Stack>
                                <Button color="orange" variant="outline">
                                  준비 완료
                                </Button>
                              </Stack>
                            </Center>
                          </Stack>
                        </Center>
                        <Center>
                          <footer className={styles.footer}>
                            <a
                              className="text-gray-700 no-underline text-black text-sm font-semibold"
                              href="/apiTest"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Team MUMOMU
                            </a>
                          </footer>
                        </Center>
                      </Stack>
                    </Stack>
                  </Center>
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
