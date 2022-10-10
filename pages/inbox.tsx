import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
import React, { useEffect } from "react";
import Image from "next/image";
import IndexNavigation2 from "../components/IndexNavigation2";

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
import { Pencil, Plus, X } from "tabler-icons-react";

import { useRecoilState } from "recoil";
import {
  inboxMaxpart,
  inboxOption,
  inboxProblem,
  inboxProblemset,
  inboxProblemsetIdx,
  playPin,
  playProblem,
} from "../components/States";
import { connectMainServerApiAddress } from "../components/ConstValues";
import { FooterCentered } from "../components/footer";
import { UserCardImage } from "../components/inboxCreator";

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

  const [problemsetIdx, setProblemsetIdx] = useRecoilState(inboxProblemsetIdx);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  const [pin, setPin] = useRecoilState(playPin);

  const deleteProblemset = () => {
    alert(problemsets[problemsetIdx].id);
    axios
      .delete(
        connectMainServerApiAddress +
          "api/problemset/" +
          problemsets[problemsetIdx].id
      )
      .then((result) => {
        setProblemsets(result.data);
      })
      .catch((error) => {
        alert(error);
      });
    return;
  };

  const getProblemsets = () => {
    axios
      .get(connectMainServerApiAddress + "api/problemsets/1")
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
      .get("https:/api.exquiz.me/api/problems/" + idx)
      .then((result) => {
        setProblem(result.data);
      })
      .catch((error) => {
        alert(error);
      });
    return;
  };

  const setPinFunction = (p: string) => {
    setPin((prevstate) => p);
  };

  const postRoom = async () => {
    let rt = Infinity;
    await axios
      .post(connectMainServerApiAddress + "api/room/newRoom", {
        maxParticipantCount: maxpart,
        problemsetId: problemsets[problemsetIdx].id,
      })
      .then(async (result) => {
        setPin(result.data.pin);
        router.push(`/lobby/${result.data.pin}`);
      })
      .catch((error) => {
        alert("newRoom_error");
      });
    return rt;
  };

  const [problemsets, setProblemsets] = useRecoilState(inboxProblemset);
  const [problem, setProblem] = useRecoilState(inboxProblem);
  const [problemOption, setProblemOption] = useRecoilState(inboxOption);
  const [activePage, setPage] = useState(1);
  const [maxpart, setMaxpart] = useRecoilState(inboxMaxpart);
  let [room, setRoom] = useState({
    id: -1,
    pin: "0",
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

  const totalTime = () => {
    let sum = 0;
    for (let i = 0; i < problem.length; i++) sum += problem[i].timelimit;
    return sum;
  };

  const router = useRouter();

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

            //router.push("/lobby_display");

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
      <IndexNavigation2 />
      <main>
        <section className="h-[81vh]">
          <Stack className="flex contents-between">
            <Grid gutter={0} columns={24}>
              <Grid.Col span={24}>
                <Stack>
                  <Stack className="h-[20vh] bg-gradient-to-l from-amber-500 via-amber-500 to-orange-500 animate-text"></Stack>
                  <Stack className="h-[20vh]"></Stack>
                  <Stack>
                    <Grid columns={48}>
                      <Grid.Col span={16}></Grid.Col>
                      <Grid.Col span={29}>
                        <Stack className="h-[40vh]">
                          <TextInput placeholder="찾으시는 퀴즈를 검색해보세요"></TextInput>
                          <Button
                            variant="light"
                            className="h-24"
                            size="xl"
                            onClick={() => {
                              router.push("/create");
                            }}
                            color="orange"
                            leftIcon={<Plus></Plus>}
                          >
                            새 퀴즈 생성
                          </Button>
                          <Grid className="h-[30vh]">
                            {" "}
                            {problemsets.map(
                              ({ title, description, closingMent }, i) => {
                                return Math.trunc(i / 4) !== activePage - 1 ? (
                                  <></>
                                ) : (
                                  <Grid.Col span={3} key={i}>
                                    <Stack
                                      className={`py-4 cursor-pointer border-2 ${
                                        problemsetIdx === i
                                          ? "border-amber-500 radius-lg"
                                          : "border-white radius-lg"
                                      }`}
                                      onClick={async () => {
                                        await getProblem(i + 1);
                                        await setProblemsetIdx(
                                          (prevState) => i
                                        );
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
          <UserCardImage
            image={"/../../public/halla.png"}
            avatar={"/../../public/dog2.png"}
            name={"임준현"}
            job={"인하대학교 컴퓨터공학과 교수"}
            stats={[
              { label: "구독자 수", value: "12" },
              { label: "구독 수", value: "187" },
              { label: "제작 문제 수", value: "36" },
            ]}
          />
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
                    {problemsets[problemsetIdx].title === ""
                      ? "아래에서 퀴즈를 선택하세요"
                      : problemsets[problemsetIdx].title}
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
                    <Button
                      leftIcon={<X></X>}
                      onClick={() => {
                        deleteProblemset();
                      }}
                      variant="outline"
                      className="shadow-md"
                      color="red"
                    >
                      삭제하기
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

      <FooterCentered
        links={[
          {
            link: "https://retro5pect.tistory.com",
            label: "Copyright 2022 exquiz.me Co. all rights reserved.",
          },
          // { link: "https://www.naver.com", label: "네이버" },
        ]}
      />
    </div>
  );
};

export default Home;

// new Promise((resolve, reject) => {
//   resolve(true);
// }).then(() => {
//   alert(pin);
// });
