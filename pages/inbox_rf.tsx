import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
import React, { useEffect } from "react";
import NavIndex from "../components/navIndex";
import Image from "next/image";

import {
  Button,
  Grid,
  Group,
  useMantineTheme,
  Center,
  Stack,
  TextInput,
  Drawer,
  Modal,
  Slider,
  Select,
  Pagination,
  ScrollArea,
  Text,
  ActionIcon,
  Avatar,
} from "@mantine/core";
import { ArrowNarrowLeft, Link, Login, Pencil, Plus } from "tabler-icons-react";

const rightEnvelope = (subject: number) => {
  const subjectInfo = [
    { name: "미분류", startColor: "gray", endColor: "gray" },
    { name: "언어", startColor: "orange", endColor: "red" },
    { name: "수리과학", startColor: "blue", endColor: "green" },
    { name: "인문사회", startColor: "violet", endColor: "pink" },
    { name: "예체능", startColor: "yellow", endColor: "orange" },
  ];

  return (
    <Group
      className="m-auto transition ease-in-out hover:scale-105"
      spacing={0}
    >
      <Group className="shadow-lg" spacing={0}>
        <Group
          className={`bg-${subjectInfo[subject].startColor} border-r-2 border-gray-300 shadow-lg h-24 w-4 bg-amber-200`}
        />
        <Group>
          <Stack spacing={0}>
            <Group
              className={`bg-gradient-to-r from-${subjectInfo[subject].startColor} to-${subjectInfo[subject].endColor} border-b-2 border-gray-300 m-0 p-0 h-12 w-32 bg-amber-200`}
            />
            <Group
              className={`bg-gradient-to-r from-${subjectInfo[subject].startColor} to-${subjectInfo[subject].endColor} m-0 p-0 h-12 w-32 bg-amber-200`}
            />
          </Stack>
        </Group>
      </Group>
      <Group
        className={`bg-gradient-to-r from-${subjectInfo[subject].startColor} to-${subjectInfo[subject].endColor} shadow-lg m-0 p-0 h-20 w-6 bg-white`}
      ></Group>
    </Group>
  );
};

const leftEnvelope = (subject: number) => {
  const subjectInfo = [
    { name: "미분류", startColor: "gray", endColor: "gray" },
    { name: "언어", startColor: "orange", endColor: "red" },
    { name: "수리과학", startColor: "blue", endColor: "green" },
    { name: "인문사회", startColor: "violet", endColor: "pink" },
    { name: "예체능", startColor: "yellow", endColor: "orange" },
  ];

  return (
    <Group className="transition ease-in-out hover:scale-105" spacing={0}>
      <Group
        className={`bg-gradient-to-r shadow-lg m-0 p-0 h-20 w-6 bg-white`}
      ></Group>
      <Group className="shadow-lg" spacing={0}>
        <Group>
          <Stack spacing={0}>
            <Group
              className={`bg-gradient-to-r from-${subjectInfo[subject].startColor}-500 to-${subjectInfo[subject].endColor}-500 m-0 p-0 h-12 w-32 bg-amber-200`}
            />
            <Group
              className={`bg-gradient-to-r from-${subjectInfo[subject].startColor}-500 to-${subjectInfo[subject].endColor}-500 m-0 p-0 h-12 w-32 bg-amber-200`}
            />
          </Stack>
        </Group>
        <Group
          className={`bg-${subjectInfo[subject].endColor}-500 border-l-2 border-gray-300 shadow-lg h-24 w-4 bg-amber-200`}
        />
      </Group>
    </Group>
  );
};

const Home: NextPage = () => {
  const MARKS = [
    { value: 0, label: "10명" },
    { value: 25, label: "20명" },
    { value: 50, label: "30명" },
    { value: 75, label: "50명" },
    { value: 100, label: "100명" },
  ];

  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const [active, setActive] = useState(0);

  const [drawerOpened, setDrawerOpened] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const connectServerApiAddress = "https://api.exquiz.me";

  const getProblemsets = () => {
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

  const getProblem = (idx: number) => {
    axios
      .get("https://prod.exquiz.me/api/problems/" + idx)
      .then((result) => {
        setProblem(result.data);
      })
      .catch((error) => {
        alert(error);
      });
    return;
  };

  const postRoom = async () => {
    let rt = Infinity;
    await axios
      .post(connectServerApiAddress + "/api/room/newRoom", {
        maxParticipantCount: maxpart,
        problemsetId: problemsets[curIdx].id,
      })
      .then((result) => {
        rt = result.data;
        setRoom(result.data);
        localStorage.setItem("room", JSON.stringify(result.data));
        alert("success" + JSON.parse(localStorage.getItem("room") ?? "0").pin);
      })
      .catch((error) => {
        alert("newRoom_error");
      });
    return rt;
  };

  let [problemsets, setProblemsets] = useState([
    { id: -1, title: "", description: "", closingMent: "" },
  ]);

  let [problem, setProblem] = useState([
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
  ]);

  let [problemOption, setProblemOption] = useState([
    { problemId: -1, idx: 0, description: "", picture: "" },
  ]);

  let [curIdx, setCurIdx] = useState(0);
  let [maxpart, setMaxpart] = useState(30);
  let [room, setRoom] = useState({
    id: -1,
    pin: "-1",
    maxParticipantCount: -1,
    startDate: "-1",
    endDate: null,
    problemsetDto: {
      id: -1,
      title: "-1",
      description: "-1",
      closingMent: "-1",
    },
    currentState: "NOT READY",
    currentProblemNum: -1,
  });

  useEffect(() => {
    getProblemsets();
    // localStorage.setItem("pin", "333333");
    // problemsets.sort((a, b) => {
    //   return b.id - a.id;
    // });
  }, []);

  const [activePage, setPage] = useState(1);

  const totalTime = () => {
    let sum = 0;
    for (let i = 0; i < problem.length; i++) sum += problem[i].timelimit;
    return sum;
  };

  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Drawer
        position="bottom"
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        title="퀴즈 설정"
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
        {rightEnvelope(0)}
      </Drawer>

      <Modal
        centered
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="방 생성하기"
      >
        <p className="font-bold">기관 정보</p>
        <Select
          searchable
          placeholder="기관 이름"
          data={[
            { value: "1", label: "이천고등학교" },
            { value: "2", label: "인덕원고등학교" },
            { value: "3", label: "이화여자고등학교" },
          ]}
        />
        <br></br>
        <p className="font-bold">추가 정보</p>

        <TextInput placeholder="a학년 b반"></TextInput>
        <br></br>
        <p className="font-bold">참가 인원</p>
        <Slider
          onChangeEnd={setMaxpart}
          labelAlwaysOn
          color="orange"
          label={(val) => MARKS.find((mark) => mark.value === val)?.label}
          defaultValue={50}
          step={25}
          marks={MARKS}
          styles={{ markLabel: { display: "none" } }}
        />
        <br></br>
        <Button
          onClick={async () => {
            setModalOpened(false);
            await postRoom();
            // if (room.currentState !== "READY") {
            //   alert("something wrong");
            //   return;
            // }

            alert("before success" + room.pin);
            location.replace("/lobby_display");
            // {
            //   "id": 5,
            //   "pin": "100494",
            //   "maxParticipantCount": 5,
            //   "startDate": "2022-08-23T08:22:20.896+00:00",
            //   "endDate": null,
            //   "problemsetDto": {
            //     "id": 1,
            //     "title": "tempTitle",
            //     "description": "tempDescription",
            //     "closingMent": "Goodbye Command"
            //   },
            //   "currentState": "READY",
            //   "currentProblemNum": -1
            // }
          }}
          className="mx-4 h-[60px] w-[370px]"
          variant="outline"
          gradient={{ from: "orange", to: "red" }}
          component="a"
          rel="noopener noreferrer"
          leftIcon={<Plus size={38} />}
          styles={(theme: {
            fn: {
              darken: (arg0: string, arg1: number) => any;
            };
          }) => ({
            root: {
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: 20,
              marginRight: 10,
              color: "orange",
              backgroundColor: "white",
              border: "2px solid orange",
              height: 42,

              "&:hover": {
                backgroundColor: theme.fn.darken("#FFFFFF", 0.05),
              },
            },

            leftIcon: {
              marginRight: 5,
            },
          })}
        >
          방 만들기
        </Button>
      </Modal>

      <header>{NavIndex()}</header>

      <main style={{ margin: "" }}>
        <section className="h-[86vh]">
          <Stack className="flex contents-between">
            <Grid gutter={0} columns={24}>
              <Grid.Col
                className="h-[86vh] border-r-2 border-gray-500"
                span={3}
              >
                <Stack>
                  <Group>
                    <Avatar
                      radius="xl"
                      src={"h".concat(
                        "ttps://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                      )}
                    />
                    <Text>반가워요! 임준현님.</Text>
                  </Group>
                  <Button leftIcon={<Plus></Plus>} color="orange">
                    퀴즈 생성
                  </Button>
                  <TextInput placeholder="퀴즈를 탐색해보세요"></TextInput>
                </Stack>
              </Grid.Col>
              <Grid.Col span={21}>
                <Stack>
                  <Stack className="h-[20vh] bg-gradient-to-r from-amber-500 via-amber-500 to-orange-500"></Stack>
                  <Stack className="h-[20vh]"></Stack>
                  <Stack>
                    <Grid columns={48}>
                      <Grid.Col span={16}></Grid.Col>
                      <Grid.Col span={29}>
                        <Stack className="h-[40vh]">
                          <TextInput placeholder="찾으시는 퀴즈를 검색해보세요"></TextInput>
                          <Group>
                            <Text weight={500} size="xl">
                              최근 생성
                            </Text>
                            <Text weight={0} size="xl">
                              과목별
                            </Text>
                          </Group>
                          <Grid className="h-[30vh]">
                            {" "}
                            {problemsets.map(
                              ({ id, title, description, closingMent }, i) => {
                                return Math.trunc(i / 8) !== activePage - 1 ? (
                                  <></>
                                ) : (
                                  <Grid.Col span={3} key={i}>
                                    <Stack
                                      className={`py-4 cursor-pointer ${
                                        curIdx === i
                                          ? "border-2 border-amber-500 radius-lg"
                                          : ""
                                      }`}
                                      onClick={async () => {
                                        await getProblem(i + 1);
                                        await setCurIdx((prevState) => i);
                                      }}
                                      align="center"
                                      // className="border-solid border-2 border-amber-500"
                                    >
                                      <Group key={i} spacing={0}>
                                        <Group
                                          className="shadow-lg"
                                          spacing={0}
                                        >
                                          <Group className="border-r-2 border-gray-300 shadow-lg h-24 w-4 bg-amber-200" />
                                          <Group>
                                            <Stack spacing={0}>
                                              <Group className="border-b-2 border-gray-300 m-0 p-0 h-12 w-32 bg-amber-200" />
                                              <Group className=" m-0 p-0 h-12 w-32 bg-amber-200"></Group>
                                            </Stack>
                                          </Group>
                                        </Group>
                                        <Group className="shadow-lg m-0 p-0 h-20 w-4 bg-white"></Group>
                                      </Group>
                                      <p className="text-xl font-bold m-auto">
                                        {title}
                                      </p>
                                    </Stack>
                                  </Grid.Col>
                                );
                              }
                            )}
                          </Grid>
                          <Center>
                            <Pagination
                              color="orange"
                              page={activePage}
                              onChange={setPage}
                              total={problemsets.length / 8}
                            />
                          </Center>
                        </Stack>
                      </Grid.Col>
                      <Grid.Col span={3}></Grid.Col>
                    </Grid>
                  </Stack>
                </Stack>
              </Grid.Col>
            </Grid>
          </Stack>
        </section>
        <div className="fixed left-[20vw] top-[20vh]">
          <Stack>
            <Image
              alt="hello"
              className="shadow-lg cursor-pointer rounded-full"
              src="/../public/dog.png"
              width={"150px"}
              height={"150px"}
            ></Image>
            <Text weight={500} size="xl">
              임준현
            </Text>
            <Text weight={500} size="md">
              @AimHigher77
            </Text>
            <Button>팔로우</Button>
          </Stack>
        </div>
        <div className="fixed left-[40vw] top-[20vh]">
          <Stack className="h-[25vh] h-52 w-[55vw] rounded-xl shadow-lg bg-white">
            <Group className="justify-between">
              <Group>
                <Group>
                  <Stack>
                    <Group className="h-52 w-52 rounded-xl">
                      {rightEnvelope(0)}
                    </Group>
                  </Stack>
                </Group>
                <Stack>
                  <p className="font-bold text-2xl">
                    {problemsets[curIdx].title === ""
                      ? "아래에서 퀴즈를 선택하세요"
                      : problemsets[curIdx].title}
                  </p>
                  <p className=" text-2xl">
                    <strong className="text-2xl text-amber-500 font-bold">
                      문제 수
                    </strong>{" "}
                    : {problem.length}개{" "}
                    <strong className="text-2xl text-amber-500 font-bold">
                      예상 소요 시간
                    </strong>{" "}
                    : {Math.trunc(totalTime() / 60)}분
                  </p>
                  <Group>
                    <Button
                      onClick={() => {
                        setModalOpened(true);
                      }}
                      className="mx-4 h-[60px] w-[200px]"
                      variant="outline"
                      gradient={{ from: "orange", to: "red" }}
                      component="a"
                      rel="noopener noreferrer"
                      leftIcon={<Login size={38} />}
                      styles={(theme: {
                        fn: {
                          darken: (arg0: string, arg1: number) => any;
                        };
                      }) => ({
                        root: {
                          textDecoration: "none",
                          fontWeight: "bold",
                          fontSize: 20,
                          marginRight: 10,
                          color: "orange",
                          backgroundColor: "white",
                          border: "2px solid orange",
                          height: 42,

                          "&:hover": {
                            backgroundColor: theme.fn.darken("#FFFFFF", 0.05),
                          },
                        },

                        leftIcon: {
                          marginRight: 5,
                        },
                      })}
                    >
                      방 만들기
                    </Button>
                    <Button
                      className=" h-[60px] w-[200px] bg-orange-500"
                      variant="gradient"
                      gradient={{ from: "orange", to: "red" }}
                      component="a"
                      rel="noopener noreferrer"
                      href="/create_rf"
                      leftIcon={<Pencil size={38} />}
                      styles={(theme) => ({
                        root: {
                          fontWeight: "bold",
                          fontSize: 20,
                          marginLeft: 5,
                          color: "white",
                          backgroundColor: "orange",
                          border: 0,
                          height: 42,

                          "&:hover": {},
                        },

                        leftIcon: {
                          marginRight: 5,
                        },
                      })}
                    >
                      수정하기
                    </Button>
                  </Group>
                </Stack>
              </Group>
              <ScrollArea>
                {problem.map(({ title }, i) => {
                  return (
                    <p key={i} className="text-2xl font-bold">
                      {i + 1}.&nbsp;
                      {title}
                    </p>
                  );
                })}
              </ScrollArea>
            </Group>
          </Stack>
        </div>
      </main>

      <footer className={styles.footer}>
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
        <Group className="bg-gray-500 w-0 h-0" />
        <Group className="bg-red-500 w-0 h-0" />
        <Group className="bg-green-500 w-0 h-0" />
        <Group className="bg-pink-500 w-0 h-0" />
        <Group className="bg-orange-500 w-0 h-0" />
        <a
          className="no-underline text-black text-sm font-semibold"
          href="/apiTest"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright ⓒ 2022 exquiz.me | Team MUMOMU
        </a>
      </footer>
    </div>
  );
};

export default Home;
