import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
import React, { useEffect } from "react";
import Image from "next/image";
import IndexNavigation from "../components/IndexNavigation";

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
  Pagination,
  Text,
} from "@mantine/core";
import { Pencil, Plus } from "tabler-icons-react";

import { useRecoilState } from "recoil";
import { playProblem } from "../components/States";
import { connectMainServerApiAddress } from "../components/ConstValues";

const rightEnvelope = (subject: number) => {
  const subjectInfo = [
    { name: "미분류", startColor: "gray", endColor: "gray" },
    { name: "언어", startColor: "orange", endColor: "red" },
    { name: "수리과학", startColor: "blue", endColor: "green" },
    { name: "인문사회", startColor: "violet", endColor: "pink" },
    { name: "예체능", startColor: "yellow", endColor: "orange" },
  ];

  return (
    <Group className="m-auto" spacing={0}>
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
      .post(connectMainServerApiAddress + "/api/room/newRoom", {
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

  let [problem, setProblem] = useRecoilState(playProblem);

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
          color="orange"
          className="mx-4 h-[60px] w-[370px]"
          variant="outline"
          leftIcon={<Plus size={38} />}
        >
          방 만들기
        </Button>
      </Modal>
      <IndexNavigation />
      <main style={{ margin: "" }}>
        <section className="h-[86vh]">
          <Stack className="flex contents-between">
            <Grid gutter={0} columns={24}>
              <Grid.Col span={24}>
                <Stack>
                  <Stack className="h-[20vh] bg-gradient-to-r from-amber-500 via-amber-500 to-orange-500"></Stack>
                  <Stack className="h-[20vh]"></Stack>
                  <Stack>
                    <Grid columns={48}>
                      <Grid.Col span={16}></Grid.Col>
                      <Grid.Col span={29}>
                        <Stack className="h-[40vh]">
                          <TextInput placeholder="찾으시는 퀴즈를 검색해보세요"></TextInput>
                          <Button
                            className="h-24"
                            size="lg"
                            onClick={() => {
                              location.replace("/create_rf");
                            }}
                            color="orange"
                            leftIcon={<Plus></Plus>}
                          >
                            퀴즈 생성
                          </Button>
                          <Grid className="h-[30vh]">
                            {" "}
                            {problemsets.map(
                              ({ id, title, description, closingMent }, i) => {
                                return Math.trunc(i / 8) !== activePage - 1 ? (
                                  <></>
                                ) : (
                                  <Grid.Col span={3} key={i}>
                                    <Stack
                                      className={`py-4 cursor-pointer border-2 ${
                                        curIdx === i
                                          ? "border-amber-500 radius-lg"
                                          : "border-white radius-lg"
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
            <Button className="shadow-md" color="orange">
              팔로우
            </Button>
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
                  <p className=" text-xl">
                    <strong className="text-xl font-bold">문제 수</strong> :{" "}
                    {problem.length}개{" "}
                    <strong className="text-xl font-bold">
                      예상 소요 시간
                    </strong>{" "}
                    : {Math.trunc(totalTime() / 60)}분
                  </p>
                  <Group>
                    <Button
                      leftIcon={<Plus></Plus>}
                      onClick={() => {
                        setModalOpened(true);
                      }}
                      className="shadow-md"
                      color="orange"
                    >
                      방 만들기
                    </Button>
                    <Button
                      leftIcon={<Pencil></Pencil>}
                      variant="outline"
                      className="shadow-md"
                      color="orange"
                    >
                      수정하기
                    </Button>
                  </Group>
                </Stack>
              </Group>
              {/* <ScrollArea>
                {problem.map(({ title }, i) => {
                  return (
                    <p key={i} className="text-2xl font-bold">
                      {i + 1}.&nbsp;
                      {title}
                    </p>
                  );
                })}
              </ScrollArea> */}
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
