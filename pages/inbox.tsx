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
  Tooltip,
} from "@mantine/core";
import { AlertTriangle, BrandAsana, Pencil, Plus, X } from "tabler-icons-react";

import { useRecoilState } from "recoil";
import {
  inboxIsDeleteAlertModalOpened,
  inboxIsModalOpened,
  inboxMaxpart,
  inboxOption,
  inboxProblem,
  inboxProblemset,
  inboxProblemsetIdx,
  inboxRoom,
  indexIsLogined,
  indexUserInfo,
  playOption,
  playProblem,
} from "../components/States";
import { connectMainServerApiAddress } from "../components/ConstValues";
import { InboxProblemsetMenu } from "../components/inbox/InboxProblemsetMenu";
import { InboxProfileMenu } from "../components/inbox/InboxProfileMenu";

const Home: NextPage = () => {
  const router = useRouter();
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];
  // cur state
  const [problemsetIdx, setProblemsetIdx] = useRecoilState(inboxProblemsetIdx);
  const [modalOpened, setModalOpened] = useRecoilState(inboxIsModalOpened);
  const [deleteAlertModalOpened, setDeleteAlertModalOpened] = useRecoilState(
    inboxIsDeleteAlertModalOpened
  );
  // login
  const [isLogined, setIsLogined] = useRecoilState(indexIsLogined);
  const [userInfo, setUserInfo] = useRecoilState(indexUserInfo);
  // problem
  const [problemsets, setProblemsets] = useRecoilState(inboxProblemset);
  const [problem, setProblem] = useRecoilState(playProblem);
  const [option, setOption] = useRecoilState(playOption);
  // room
  const [room, setRoom] = useRecoilState(inboxRoom);

  useEffect(() => {
    // already logined
    if (isLogined === true) {
      getProblemsets();
      return;
    }
    // access_token validation
    if (
      router.query.access_token !== null &&
      router.query.access_token !== undefined
    ) {
      localStorage.setItem("access_token", router.query.access_token as string);
      localStorage.setItem("host_id", router.query.host_id as string);
      setTimeout(() => {
        router.push("/inbox");
      }, 100);
    }

    // not logined
    if (
      localStorage.getItem("access_token") === null ||
      localStorage.getItem("access_token") === "undefined"
    ) {
      router.push("/");
      return;
    }
    // auto login(access token validation)
    login(localStorage.getItem("access_token") as string);
  }, [router.isReady]);

  const deleteProblemset = () => {
    axios
      .post(
        connectMainServerApiAddress +
          "api/problemset/" +
          (problemsets[problemsetIdx] as any).id
      )
      .then((result) => {
        setProblemsetIdx(-1);
        getProblemsets();
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
        setProblemsets(result.data);
      })
      .catch((error) => {
        alert(error);
      });
    return;
  };

  const getProblem = (id: number) => {
    axios
      .get(connectMainServerApiAddress + "api/problems/" + id?.toString())
      .then((result) => {
        setProblem(result.data);
        getOption(result.data[0].id);
        // setOption
      })
      .catch((error) => {
        alert(error.data);
      });
    return;
  };

  const getOption = (id: number) => {
    axios
      .get(
        connectMainServerApiAddress + "api/problem_options/" + id?.toString()
      )
      .then((result) => {
        setOption(result.data);
        // setOption
      })
      .catch((error) => {
        alert(error.data);
      });
    return;
  };

  // const getProblem = (idx: number) => {
  //   axios
  //     .get(connectMainServerApiAddress + "api/problems/" + idx)
  //     .then((result) => {
  //       setProblem(result.data);
  //     })
  //     .catch((error) => {
  //       alert(error);
  //     });
  //   return;
  // };

  const postRoom = async () => {
    let rt = Infinity;
    await axios
      .post(connectMainServerApiAddress + "api/room/newRoom", {
        maxParticipantCount: room.maxParticipantCount,
        problemsetId: (problemsets[problemsetIdx] as any).id,
        roomName: room.roomName,
      })
      .then((result) => {
        setRoom(result.data);
        setTimeout(() => {
          // alert(room.problemsetDto.id);
          getProblem(result.data.problemsetDto.id);
        }, 500);
        console.log(`/lobby/${result.data.pin}`);
        console.log(result);
        setTimeout(() => {
          router.push(`/lobby/${result.data.pin}`);
        }, 1500);
      })
      .catch((error) => {
        alert("newRoom_error");
      });
    return rt;
  };

  let validateQueryString = (p_string: string) => {
    var field = p_string;
    var url = window.location.href;
    if (url.indexOf("?" + field + "=") != -1) return true;
    else if (url.indexOf("&" + field + "=") != -1) return true;
    return false;
  };

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
        // alert("login failed");
        // localStorage.removeItem("access_token");
        // localStorage.removeItem("host_id");
      });
  };

  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <IndexNavigation />
      <main style={{ height: "calc(100vh - 60px)" }}>
        <section style={{ height: "calc(100vh - 60px)" }}>
          <Stack className="h-[20vh] bg-gradient-to-r from-[#ffc069] to-[#fa751e] text-slow"></Stack>
          <Grid gutter={0} columns={24}>
            {/* left margin */}
            <Grid.Col span={3} />
            {/* profile, problemSet vertical */}
            <Grid.Col span={4}>
              <Stack className="relative bottom-32">
                <InboxProfileMenu />
                <InboxProblemsetMenu />
              </Stack>
            </Grid.Col>
            {/* main */}
            <Grid.Col span={14}>
              <Stack
                style={{ height: "calc(80vh - 60px)" }}
                className="ml-8 relative bottom-32"
              >
                <Stack className="h-[260px]"></Stack>
                {/* search textinput */}
                {/* <MantineProvider
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
                </MantineProvider> */}
                {/* filter select */}
                <Group position="right">
                  <Select
                    placeholder="정렬 필터"
                    data={[{ value: "시간 순", label: "시간 순" }]}
                  />
                </Group>
                <Divider size="sm"></Divider>
                {/* problemset grid */}
                <ScrollArea style={{ height: 1000 }} scrollbarSize={0}>
                  <Grid gutter={0} columns={3}>
                    {problemsets.map(
                      ({ title, description, closingMent }, i) => {
                        return (
                          <Grid.Col
                            span={1}
                            key={i}
                            className="animate-fadeUp h-[240px] cursor-pointer"
                          >
                            {/* 208 298 */}
                            <Stack
                              onClick={async () => {
                                setProblemsetIdx(i);
                              }}
                              className={`px-4 rounded-3xl h-[220px] w-[310px] bg-no-repeat bg-center ${
                                problemsetIdx === i
                                  ? "bg-[url('/inbox/folder_highlight.svg')] "
                                  : "bg-[url('/inbox/folder.svg')]"
                              } hover:bg-[url('/inbox/folder_highlight.svg')]`}
                            >
                              <Stack className="h-[3px]"></Stack>
                              <Group position="right">
                                <Tooltip label="삭제하기">
                                  <ActionIcon
                                    onClick={() => {
                                      setProblemsetIdx(i);
                                      setDeleteAlertModalOpened(true);
                                    }}
                                    size={20}
                                    color="red"
                                    radius="xl"
                                    variant="filled"
                                  ></ActionIcon>
                                </Tooltip>
                                <Tooltip label="수정하기">
                                  <ActionIcon
                                    onClick={() => {
                                      setProblemsetIdx(i);
                                    }}
                                    size={20}
                                    color="yellow"
                                    radius="xl"
                                    variant="filled"
                                  ></ActionIcon>
                                </Tooltip>
                                <Tooltip label="방 만들기">
                                  <ActionIcon
                                    onClick={() => {
                                      setProblemsetIdx(i);
                                      setModalOpened(true);
                                    }}
                                    size={20}
                                    color="green"
                                    radius="xl"
                                    variant="filled"
                                  ></ActionIcon>
                                </Tooltip>
                              </Group>
                              <Stack className="h-[40px]"></Stack>
                              <Stack className="ml-2">
                                <p className="text-[14px] text-[#818181]">
                                  2022/11/25
                                </p>
                                <p className="text-[24px] text-[#5E5E5E]">
                                  {(problemsets[i] as any)?.title}
                                </p>
                              </Stack>
                            </Stack>
                          </Grid.Col>
                        );
                      }
                    )}
                  </Grid>
                </ScrollArea>
              </Stack>
            </Grid.Col>
            {/* margin right */}
            <Grid.Col span={3} />
          </Grid>
        </section>
      </main>
      {/* postRoom modal */}
      <Modal
        withCloseButton={false}
        centered
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      >
        <Stack>
          <Group position="apart">
            <ActionIcon className="cursor-default" variant="transparent">
              <X className="cursor-default" color="white"></X>
            </ActionIcon>
            <p className="m-0 text-xl text-center">퀴즈방 생성하기</p>
            <ActionIcon
              onClick={() => {
                setModalOpened(false);
              }}
            >
              <X></X>
            </ActionIcon>
          </Group>
          <p className="m-0 font-bold">방 정보</p>
          <Textarea
            onChange={(event) => {
              let copy = { ...room, roomName: event.currentTarget.value };
              setRoom(copy);
            }}
            placeholder={`${userInfo.nickname}님의 퀴즈`}
          ></Textarea>

          <p className="m-0 font-bold">참가 인원</p>
          <Select
            size="md"
            onChange={(event) => {
              let copy = JSON.parse(JSON.stringify(room));
              copy.maxParticipantCount = event;
              setRoom(copy);
            }}
            label=""
            placeholder="참가 인원을 선택하세요"
            value={room.maxParticipantCount.toString()}
            data={[
              { value: "10", label: "10명" },
              { value: "20", label: "20명" },
              { value: "30", label: "30명" },
              { value: "40", label: "40명" },
              { value: "50", label: "50명" },
            ]}
          />
          <br></br>
          <Button
            size="lg"
            className="mx-12"
            onClick={async () => {
              setModalOpened(false);
              // if (room.roomName === "") {
              //   let copy = {
              //     ...room,
              //     roomName: `${userInfo.nickname}님의 퀴즈`,
              //   };
              //   setRoom(JSON.parse(JSON.stringify(copy)));
              // }
              setTimeout(() => {
                postRoom();
              }, 500);
            }}
            color="orange"
            variant="outline"
            leftIcon={<BrandAsana size={38} />}
          >
            방 만들기
          </Button>
        </Stack>
      </Modal>
      {/* deleteAlert modal */}
      <Modal
        title={
          <ActionIcon>
            <AlertTriangle color="red"></AlertTriangle>
          </ActionIcon>
        }
        withCloseButton={true}
        centered
        opened={deleteAlertModalOpened}
        onClose={() => setDeleteAlertModalOpened(false)}
      >
        <Stack>
          <p className="m-0 text-xl text-center">
            정말 삭제하시겠습니까?<br></br>퀴즈를 삭제하면 다시 복구할 수
            없습니다.
          </p>
          <Button
            color="red"
            onClick={() => {
              setModalOpened(false);
              deleteProblemset();
              setDeleteAlertModalOpened(false);
            }}
          >
            삭제하기
          </Button>
        </Stack>
      </Modal>
    </div>
  );
};

export default Home;
