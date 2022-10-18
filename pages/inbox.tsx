import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
import React, { useEffect } from "react";
import Image from "next/image";
import InboxNavigation from "../components/inbox/InboxNavigation";

import { IconSearch } from "@tabler/icons";

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
  inboxIsModalOpened,
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
import { InboxProblemsetMenu } from "../components/inbox/InboxProblemsetMenu";
import { InboxProfileMenu } from "../components/inbox/InboxProfileMenu";

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
  const [modalOpened, setModalOpened] = useRecoilState(inboxIsModalOpened);
  const [drawerOpened, setDrawerOpened] = useState(false);

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
        opened={modalOpened === "0" ? false : true}
        onClose={() => setModalOpened("0")}
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
            setModalOpened("0");
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
      <InboxNavigation />
      <main>
        <section className="h-[81vh]">
          <Stack className="h-[20vh] bg-gradient-to-r from-[#ffc069] to-[#fa751e]"></Stack>
          <Grid gutter="md" columns={24}>
            <Grid.Col span={3} />
            <Grid.Col span={4}>
              <Stack className="relative bottom-24">
                <InboxProblemsetMenu
                  image={"/../../public/halla.png"}
                  name={problemsets[problemsetIdx].title}
                  job={problemsets[problemsetIdx].description}
                  stats={[
                    { label: "문제 수", value: problem.length.toString() },
                    {
                      label: "소요 시간",
                      value: Math.trunc(totalTime() / 60).toString(),
                    },
                  ]}
                />
                <InboxProfileMenu
                  image={"/../../public/halla.png"}
                  name={"임준현"}
                  job={"@aimhigher77"}
                  stats={[
                    { label: "전체 문제", value: "100" },
                    { label: "팔로잉", value: "150" },
                    { label: "팔로워", value: "150" },
                  ]}
                />
              </Stack>
            </Grid.Col>
            <Grid.Col span={14}>
              <Stack className="h-[40vh] relative bottom-24">
                <TextInput
                  icon={<IconSearch size={14} />}
                  variant="unstyled"
                  placeholder="찾으시는 퀴즈를 검색해보세요"
                ></TextInput>
                <Button
                  variant="filled"
                  className="h-24"
                  size="xl"
                  onClick={() => {
                    router.push("/create");
                  }}
                  color="orange"
                >
                  퀴즈 생성
                </Button>
                <Grid className="h-[30vh]">
                  {" "}
                  {problemsets.map(({ title, description, closingMent }, i) => {
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
                            await setProblemsetIdx((prevState) => i);
                          }}
                          align="center"
                          // className="border-solid border-2 border-amber-500"
                        >
                          <Group key={i} spacing={0}>
                            <Group className="shadow-lg" spacing={0}>
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
                          <p className="text-xl font-bold m-auto">{title}</p>
                        </Stack>
                      </Grid.Col>
                    );
                  })}
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
            <Grid.Col span={3} />
          </Grid>
        </section>
      </main>
    </div>
  );
};

export default Home;

// new Promise((resolve, reject) => {
//   resolve(true);
// }).then(() => {
//   alert(pin);
// });

// relative bottom-24

{
  /* <Button
leftIcon={<X></X>}
onClick={() => {
  deleteProblemset();
}}
variant="outline"
className="shadow-md"
color="red"
>
삭제하기
</Button> */
}
