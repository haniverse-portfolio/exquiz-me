import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
import React, { useEffect } from "react";
import Image from "next/image";
import IndexNavigation from "../../components/m/index/IndexNavigation";

import { IconPlus, IconBrandAsana } from "@tabler/icons";

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
  inboxProblemset,
  inboxProblemsetIdx,
  indexIsLogined,
  indexUserInfo,
} from "../../components/States";
import {
  connectMainServerApiAddress,
  inboxRoomInput,
} from "../../components/ConstValues";
import { InboxProblemsetMenu } from "../../components/inbox/InboxProblemsetMenu";
import { InboxProfileMenu } from "../../components/inbox/InboxProfileMenu";

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
  // room
  const [room, setRoom] = useState(inboxRoomInput);

  useEffect(() => {
    // already logined
    if (isLogined === true) {
      getProblemsets();
      return;
    }
    // access_token validation

    if (router.query.access_token !== "undefined") {
      localStorage.setItem("access_token", router.query.access_token as string);
      localStorage.setItem("host_id", router.query.host_id as string);
      setTimeout(() => {
        if (navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)) {
          router.push("/m/inbox");
        } else {
          router.push("/inbox");
        }
      }, 1000);
    }

    setTimeout(() => {
      // not logined
      if (
        localStorage.getItem("access_token") === null ||
        localStorage.getItem("access_token") === "undefined" ||
        (localStorage.getItem("access_token") as string).length < 10
      ) {
        router.push("/");
        return;
      }
    }, 1500);
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
      .catch((error) => {});
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
      .catch((error) => {});
    return;
  };

  const postRoom = async () => {
    let rt = Infinity;
    await axios
      .post(connectMainServerApiAddress + "api/room/newRoom", {
        maxParticipantCount: room.maxParticipantCount,
        problemsetId: (problemsets[problemsetIdx] as any).id,
        roomName:
          room.roomName === ""
            ? `${userInfo.nickname}님의 퀴즈방`
            : room.roomName,
      })
      .then((result) => {
        setRoom(result.data);
        setTimeout(() => {
          router.push(`/lobby/${result.data.pin}`);
        }, 1500);
      })
      .catch((error) => {});
    return rt;
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
      <main>
        <section>
          <Stack align="center" className="h-[20vh] bg-[#ffc069]">
            <Button
              className="mx-16"
              onClick={() => {
                router.push("/m/create");
              }}
              leftIcon={
                <ThemeIcon
                  size={32}
                  radius="xl"
                  color="orange"
                  variant="filled"
                >
                  <IconPlus size={18} stroke={1.5} />
                </ThemeIcon>
              }
              radius="xl"
              mt="xl"
              size="xl"
              color={theme.colorScheme === "dark" ? undefined : "orange"}
            >
              퀴즈 만들기
            </Button>
            <Button
              onClick={() => {
                router.push("/m/play");
              }}
              variant="light"
              leftIcon={
                <ThemeIcon variant="light" color="orange" size={32} radius="xl">
                  <IconBrandAsana size={18} stroke={1.5} />
                </ThemeIcon>
              }
              radius="xl"
              mt="xl"
              size="xl"
              color="orange"
            >
              오프라인 퀴즈 풀기
            </Button>
          </Stack>
          <Stack align="center" className="">
            {/* search textinput */}

            {/* filter select */}
            {/* problemset grid */}
            <ScrollArea style={{ height: 480 }} scrollbarSize={0}>
              <Grid className="" gutter={0} columns={1}>
                {problemsets.map(({ title, description, closingMent }, i) => {
                  return (
                    <Grid.Col
                      span={1}
                      key={i}
                      className=" animate-fadeUp h-[240px] cursor-pointer"
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
                })}
              </Grid>
            </ScrollArea>
          </Stack>
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
              let copy = JSON.parse(JSON.stringify(room));
              copy.roomName = event.currentTarget.value;
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

// const getProblem = (id: number) => {
//   axios
//     .get(connectMainServerApiAddress + "api/problems/" + id?.toString())
//     .then((result) => {
//       setProblem(result.data);
//       getOption(result.data[0].id);
//       // setOption
//     })
//     .catch((error) => {
//       alert(error.data);
//     });
//   return;
// };

// const getOption = (id: number) => {
//   axios
//     .get(
//       connectMainServerApiAddress + "api/problem_options/" + id?.toString()
//     )
//     .then((result) => {
//       setOption(result.data);
//       // setOption
//     })
//     .catch((error) => {
//       alert(error.data);
//     });
//   return;
// };
