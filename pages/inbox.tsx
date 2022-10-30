import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
import React, { useEffect } from "react";
import Image from "next/image";
import IndexNavigation from "../components/index/IndexNavigation";

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
  ThemeIcon,
  ActionIcon,
  Textarea,
  ScrollArea,
  Divider,
  MantineProvider,
  Select,
} from "@mantine/core";
import { BrandAsana, Pencil, Plus, X } from "tabler-icons-react";

import { useRecoilState } from "recoil";
import {
  inboxIsModalOpened,
  inboxMaxpart,
  inboxOption,
  inboxProblem,
  inboxProblemset,
  inboxProblemsetIdx,
  inboxRoom,
  indexIsLogined,
  indexUserInfo,
  playPin,
  playProblem,
} from "../components/States";
import { connectMainServerApiAddress } from "../components/ConstValues";
import { FooterCentered } from "../components/footer";
import { InboxProblemsetMenu } from "../components/inbox/InboxProblemsetMenu";
import { InboxProfileMenu } from "../components/inbox/InboxProfileMenu";

const Home: NextPage = () => {
  const MARKS = [
    { value: 0, label: "10명" },
    { value: 25, label: "20명" },
    { value: 50, label: "30명" },
    { value: 75, label: "50명" },
    { value: 100, label: "100명" },
  ];
  const router = useRouter();
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];
  // cur state
  const [problemsetIdx, setProblemsetIdx] = useRecoilState(inboxProblemsetIdx);
  const [modalOpened, setModalOpened] = useRecoilState(inboxIsModalOpened);
  // login
  const [isLogined, setIsLogined] = useRecoilState(indexIsLogined);
  const [userInfo, setUserInfo] = useRecoilState(indexUserInfo);
  // problem
  const [problemsets, setProblemsets] = useRecoilState(inboxProblemset);
  const [problem, setProblem] = useRecoilState(inboxProblem);
  // room
  const [maxpart, setMaxpart] = useRecoilState(inboxMaxpart);
  const [room, setRoom] = useRecoilState(inboxRoom);

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
      .get(
        connectMainServerApiAddress +
          "api/problemsets/" +
          localStorage.getItem("host_id")?.toString()
      )
      .then((result) => {
        if (result.data.size > 0) setProblemsets(result.data);
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

  const postRoom = async () => {
    let rt = Infinity;
    await axios
      .post(connectMainServerApiAddress + "api/room/newRoom", {
        maxParticipantCount: maxpart,
        problemsetId: problemsets[problemsetIdx].id,
      })
      .then(async (result) => {
        setRoom(result.data);
        router.push(`/lobby/${result.data.pin}`);
      })
      .catch((error) => {
        alert("newRoom_error");
      });
    return rt;
  };
  useEffect(() => {
    // already logined
    if (isLogined === true) {
      getProblemsets();
      return;
    }
    // not logined
    if (localStorage.getItem("access_token") === null) router.push("/");
    // auto login(access token validation)
    login(localStorage.getItem("access_token") as string);
  }, [router.isReady]);

  const login = async (tk: string) => {
    const config = {
      headers: { Authorization: `Bearer ${tk}` },
    };

    axios
      .get(connectMainServerApiAddress + "api/user", config)
      .then((result) => {
        setUserInfo(result.data);
        setIsLogined(true);
        getProblemsets();
      })
      .catch(() => {
        // localStorage.removeItem("access_token");
        // localStorage.removeItem("host_id");
      });
    // localStorage.removeItem("access_token");
    // localStorage.removeItem("host_id");
  };

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

      <IndexNavigation />
      <main style={{ height: "calc(100vh - 70px)" }}>
        <section style={{ height: "calc(100vh - 70px)" }}>
          <Stack className="h-[20vh] bg-gradient-to-r from-[#ffc069] to-[#fa751e] text-slow"></Stack>
          <Grid
            style={{ height: "calc(80vh - 70px)" }}
            gutter="md"
            columns={24}
          >
            <Grid.Col span={3} />
            <Grid.Col span={4}>
              <Stack className="relative bottom-32">
                <InboxProfileMenu
                  image={""}
                  name={"이상빈"}
                  job={"소마고등학교 정보 과목 교사입니다"}
                  stats={[
                    { label: "만든 문제", value: "100" },
                    { label: "팔로잉", value: "150" },
                    { label: "팔로워", value: "150" },
                  ]}
                />
                <InboxProblemsetMenu
                  image={"/../../public/halla.png"}
                  name={
                    problemsetIdx === -1 ? "" : problemsets[problemsetIdx].title
                  }
                  job={
                    problemsetIdx === -1
                      ? ""
                      : problemsets[problemsetIdx].description
                  }
                  stats={[
                    {
                      label: "전체 문제 개수",
                      value: problem.length.toString(),
                    },
                    {
                      label: "예상 소요 시간",
                      value: Math.trunc(totalTime() / 60).toString(),
                    },
                  ]}
                />
              </Stack>
            </Grid.Col>
            <Grid.Col span={14}>
              <Stack className="ml-8 h-[80vh] relative bottom-32">
                <MantineProvider
                  inherit
                  theme={{
                    components: {
                      InputWrapper: {
                        styles: (theme) => ({
                          label: {
                            backgroundColor:
                              theme.colorScheme === "dark"
                                ? "rgba(255, 255, 255, .1)"
                                : "rgba(0, 0, 0, .1)",
                          },
                        }),
                      },

                      Input: {
                        styles: (theme) => ({
                          input: {
                            color: "white",
                            fontSize: "32px",
                            fontWeight: "bold",
                          },
                        }),
                      },
                    },
                  }}
                >
                  <TextInput
                    id="inbox_textinput"
                    className="!placeholder-white py-12"
                    icon={<IconSearch color="white" size={30} />}
                    variant="unstyled"
                    placeholder="찾으시는 퀴즈를 검색해보세요"
                  ></TextInput>
                </MantineProvider>
                <Group position="right">
                  <Select
                    placeholder="정렬 필터"
                    data={[
                      { value: "시간 순", label: "시간 순" },
                      { value: "인기 순", label: "인기 순" },
                    ]}
                  />
                </Group>
                <Divider size="sm"></Divider>
                <ScrollArea scrollbarSize={0} className="80vh">
                  <Grid style={{ height: 2500 }} gutter={0} columns={3}>
                    {problemsets.map(
                      ({ title, description, closingMent }, i) => {
                        return (
                          <Grid.Col
                            span={1}
                            key={i}
                            className={`h-80 cursor-pointer`}
                            onClick={async () => {
                              if (problemsetIdx === -1) {
                                await getProblem(i + 1);
                                await setProblemsetIdx((prevState) => i);
                              } else {
                                await setProblemsetIdx(-1);
                              }
                            }}
                            // className="border-solid border-2 border-amber-500"
                          >
                            <Image
                              src={
                                problemsetIdx === i
                                  ? "/inbox/folder_highlight.svg"
                                  : "/inbox/folder.svg"
                              }
                              alt="folder"
                              height={208}
                              width={298}
                            ></Image>
                          </Grid.Col>
                        );
                      }
                    )}
                  </Grid>
                </ScrollArea>
              </Stack>
            </Grid.Col>
            <Grid.Col span={3} />
          </Grid>
        </section>
      </main>
      <Modal
        withCloseButton={false}
        centered
        opened={modalOpened === "0" ? false : true}
        onClose={() => setModalOpened("0")}
      >
        <Stack>
          <Group position="apart">
            <ActionIcon className="cursor-default" variant="transparent">
              <X className="cursor-default" color="white"></X>
            </ActionIcon>
            <p className="m-0 text-xl text-center">퀴즈방 생성하기</p>
            <ActionIcon
              onClick={() => {
                setModalOpened("0");
              }}
            >
              <X></X>
            </ActionIcon>
          </Group>
          <p className="m-0 font-bold">추가 정보</p>
          <Textarea placeholder="A학년 B반의 퀴즈방입니다."></Textarea>

          <p className="m-0 font-bold">참가 인원</p>
          <Slider
            showLabelOnHover={false}
            onChangeEnd={setMaxpart}
            color="orange"
            defaultValue={50}
            step={25}
            marks={MARKS}
          />
          <br></br>
          <Button
            size="lg"
            className="mx-12"
            onClick={async () => {
              setModalOpened("0");
              await postRoom();
            }}
            color="orange"
            variant="outline"
            leftIcon={<BrandAsana size={38} />}
          >
            방 만들기
          </Button>
        </Stack>
      </Modal>
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

// {problemsets.map(({ title, description, closingMent }, i) => {
//   return Math.trunc(i / 4) !== activePage - 1 ? (

//   <p className="m-0 mt-28 text-lg text-left text-gray-500">
//   22년 10월 24일
// </p>
// <p className="mb-4 text-2xl font-bold text-left text-gray-600">
//   {title}
// </p>
