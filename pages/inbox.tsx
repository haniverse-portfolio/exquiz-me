import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
import React, { useEffect } from "react";
import Image from "next/image";
import InboxNavigation from "../components/inbox/InboxNavigation";
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

  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const [problemsetIdx, setProblemsetIdx] = useRecoilState(inboxProblemsetIdx);
  const [modalOpened, setModalOpened] = useRecoilState(inboxIsModalOpened);

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
        setRoom(result.data);
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
  const [maxpart, setMaxpart] = useRecoilState(inboxMaxpart);
  const [room, setRoom] = useRecoilState(inboxRoom);

  useEffect(() => {
    if (localStorage.getItem("access_token") === null)
      router.push("https://api.exquiz.me/api/google/login");
    else getProblemsets();
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
      <IndexNavigation />
      <main style={{ height: "calc(100vh - 70px)" }}>
        <section style={{ height: "calc(100vh - 70px)" }}>
          <Stack className="h-[20vh] bg-gradient-to-r from-[#ffc069] to-[#fa751e]"></Stack>
          <Grid
            style={{ height: "calc(80vh - 70px)" }}
            gutter="md"
            columns={24}
          >
            <Grid.Col span={3} />
            <Grid.Col span={4}>
              <Stack className="relative bottom-32">
                <InboxProfileMenu
                  image={"/../../public/halla.png"}
                  name={"임준현"}
                  job={"인하대학교 컴퓨터공학과 교수"}
                  stats={[
                    { label: "전체 문제", value: "100" },
                    { label: "팔로잉", value: "150" },
                    { label: "팔로워", value: "150" },
                  ]}
                />
                <InboxProblemsetMenu
                  image={"/../../public/halla.png"}
                  name={problemsets[problemsetIdx].title}
                  job={problemsets[problemsetIdx].description}
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
            <Grid.Col span={12}>
              <Stack className="h-[80vh] relative bottom-32">
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
                            borderColor:
                              theme.colors.violet[theme.fn.primaryShade()],
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
                    icon={<IconSearch color="white" size={26} />}
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
                <ScrollArea scrollbarSize={0} className="80vh">
                  <Grid style={{ height: 2500 }} gutter={0} columns={2}>
                    {problemsets.map(
                      ({ title, description, closingMent }, i) => {
                        return (
                          <Grid.Col
                            span={1}
                            key={i}
                            className={`h-80 cursor-pointer`}
                            onClick={async () => {
                              await getProblem(i + 1);
                              await setProblemsetIdx((prevState) => i);
                            }}
                            // className="border-solid border-2 border-amber-500"
                          >
                            <Stack className="m-4">
                              <Stack spacing={0}>
                                <Grid columns={10}>
                                  <Grid.Col
                                    className={`${
                                      problemsetIdx === i
                                        ? "border-x-2 border-t-2 border-solid border-blue-500"
                                        : ""
                                    } h-16 rounded-t-xl bg-[#FFD178]`}
                                    span={6}
                                  ></Grid.Col>
                                  <Grid.Col
                                    className={`${
                                      problemsetIdx === i
                                        ? "border-t-2 border-r-2 border-solid border-blue-500"
                                        : ""
                                    } shadow-xl mt-4 h-12 rounded-t-xl bg-[#F8D385]`}
                                    span={4}
                                  ></Grid.Col>
                                </Grid>
                                <Grid
                                  className={`${
                                    problemsetIdx === i
                                      ? "shadow-xl border-x-2 border-t-0 border-b-2 border-solid border-blue-500"
                                      : ""
                                  } h-60 rounded-b-xl bg-[#FFD178]`}
                                  columns={10}
                                >
                                  <Grid.Col span={10}>
                                    <Stack
                                      className="mx-4"
                                      spacing={0}
                                      justify="flex-end"
                                    >
                                      <p className="m-0 mt-28 text-lg text-left text-gray-500">
                                        22년 10월 24일
                                      </p>
                                      <p className="mb-4 text-2xl font-bold text-left text-gray-600">
                                        {title}
                                      </p>
                                    </Stack>
                                  </Grid.Col>
                                </Grid>
                              </Stack>
                              {/* <Image
                                src="/../public/folder.png"
                                width="700"
                                height="500"
                                alt="error"
                              ></Image> */}
                            </Stack>
                          </Grid.Col>
                        );
                      }
                    )}
                  </Grid>
                </ScrollArea>
              </Stack>
            </Grid.Col>
            <Grid.Col span={5} />
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

// {problemsets.map(({ title, description, closingMent }, i) => {
//   return Math.trunc(i / 4) !== activePage - 1 ? (
