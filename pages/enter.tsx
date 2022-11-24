import { useEffect, useState, useRef } from "react";
import styles from "../styles/Home.module.css";
{
  /* next */
}
import Router, { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
{
  /* call */
}
import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
{
  /* ui Library */
}
import {
  Button,
  Center,
  Group,
  Stack,
  TextInput,
  Modal,
  ActionIcon,
  Container,
  Divider,
  Loader,
  Grid,
} from "@mantine/core";
import { Backspace, Refresh, ZoomQuestion } from "tabler-icons-react";
{
  /* imbedding value */
}
import {
  connectMainServerApiAddress,
  adj,
  noun,
  avatarAnimal,
  avatarColor,
  enterUserInfoInput,
} from "../components/ConstValues";

const Home: NextPage = () => {
  const router = useRouter();

  {
    /* *** usestate start *** */
  }

  const [pin, setPin] = useState("");
  const [pinStep, setPinStep] = useState(0);
  const ref = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(0);
  const [pinInputBar, setPinInputBar] = useState(true);
  const [visible, setVisible] = useState(false);

  const [userCurInfo, setUserCurInfo] = useState(enterUserInfoInput);
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [animal, setAnimal] = useState(0);
  const [color, setColor] = useState(0);

  const [playRoom, setPlayRoom] = useState({});

  const [socketManager, setSocketManager] = useState<any>(null);

  const [modalOpened, setModalOpened] = useState(false);

  {
    /* localstorage removeItem userInfo */
  }
  useEffect(() => {
    let randAnimal = Math.floor(Math.random() * (avatarAnimal.length - 1)) + 1;
    let randAvatarColor =
      Math.floor(Math.random() * (avatarColor.length - 1)) + 1;
    setAnimal(randAnimal);
    setColor(randAvatarColor);
    localStorage.removeItem("fromSession");
    localStorage.setItem("imageNumber", randAnimal.toString());
    localStorage.setItem("colorNumber", randAvatarColor.toString());
    localStorage.removeItem("name");
    localStorage.removeItem("nickname");
  }, [router.isReady]);

  {
    /* websocekt connect */
  }
  useEffect(() => {
    if (step !== 1) return;
    connect();
  }, [step]);

  {
    /* pin validation */
  }
  useEffect(() => {
    let len = pin.length;
    if (len === 0) setPinStep(0);
    else if (len >= 1 && len <= 5) setPinStep(1);
    else if (len === 6) {
      getPinValid(pin);
    }
  }, [pin]);

  {
    /* axios call */
  }
  const getPinValid = (pin: string) => {
    axios
      .get(connectMainServerApiAddress + `api/room/${pin.toString()}/open`)
      .then((result) => {
        // validation
        if (result.data.currentState === "READY") {
          setPlayRoom(result.data);
          setPinStep(2);
          return;
        } else {
          setPinStep((prevstate) => 3);
        }
      })
      .catch((error) => {
        setPinStep(3);
      });
  };

  const getRoomOpened = (pin: string) => {
    axios
      .get(connectMainServerApiAddress + `api/room/${pin.toString()}/open`)
      .then((result) => {
        setPlayRoom(result.data);
        // validation
        if (result.data.currentState !== "READY") return;
        setStep((prevstate) => 1);
      })
      .catch((error) => {});
    return;
  };

  let connect = () => {
    let client: Stomp.Client;
    let socket = new SockJS(connectMainServerApiAddress + "stomp");
    client = Stomp.over(socket);
    const headers = {};
    let reconnect = 0;
    client.connect(
      {},
      function (frame) {
        client.subscribe(
          "/topic/room/" + pin + "/host",
          function (message) {
            // socket ready?
            // if (socket.readyState !== 1) {
            //   setVisible(false);
            //   return;
            // }
            let data = JSON.parse(message.body);
            if (data.messageType === "PARTICIPANT") {
              if (localStorage.getItem("fromSession") === null) {
                if (data.name !== localStorage.getItem("name")) return;
                if (data.nickname !== localStorage.getItem("nickname")) return;
                if (
                  data.imageNumber.toString() !==
                  localStorage.getItem("imageNumber")
                )
                  return;
                if (
                  data.colorNumber.toString() !==
                  localStorage.getItem("colorNumber")
                )
                  return;
                setUserCurInfo(data);
                localStorage.setItem("fromSession", data.fromSession);
                //client.unsubscribe("enter");
                setTimeout(() => {
                  Router.push(`/play/${pin}`);
                  setVisible(false);
                }, 2000);
              }
            }
          },
          { id: "enter" }
        );
      },
      function (error) {}
    );
    setSocketManager(client);
    socket.onclose = function () {
      setTimeout(() => {
        socket = connect();
      }, 1);
    };
    return socket;
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

      {/* main */}
      {step === 0 ? (
        <>
          {/* size={800} */}
          <Container className="animate-textSlow bg-gradient-to-r from-[#FF9B3F] to-[#ffd178] h-[100vh]">
            <Stack className="flex">
              <Group className="mt-6 my-2 cursor-pointer">
                <Image
                  src="/logo_all_white.png"
                  alt="logo"
                  width={150}
                  height={30}
                />
              </Group>
              <Stack className="p-8 rounded-xl shadow-lg bg-white">
                <p className="animate-fadeIn text-center text-2xl font-bold text-black">
                  퀴즈방 입장하기
                </p>
                <p className="animate-fadeIn text-center text-lg font-semibold text-gray-500">
                  공유 받은 PIN 번호로 입장해주세요
                </p>
                <Stack
                  align="center"
                  className="flex items-center justify-center h-[208px]"
                >
                  {pinStep === 0 ? (
                    <Stack align="flex-start">
                      <Stack align="flex-start">
                        <Group spacing={8} align="flex-start">
                          <img
                            className="!overflow-visible animate-[spin_4s_ease-in-out_infinite]"
                            src="/index/rectangle_right.svg"
                            alt="rectangle"
                            width={100}
                            height={100}
                          ></img>
                          <Stack spacing={8}>
                            <img
                              className="!overflow-visible animate-[bounce_2s_ease-in-out_infinite]"
                              src="/index/circle.svg"
                              alt="circle"
                              width={15}
                              height={15}
                            ></img>
                            <img
                              className="!overflow-visible animate-[bounce_3s_ease-in-out_infinite]"
                              src="/index/circle.svg"
                              alt="circle"
                              width={25}
                              height={25}
                            ></img>
                          </Stack>
                        </Group>
                      </Stack>
                      <Stack>
                        <Group align="flex-end">
                          <Stack>
                            <img
                              className="!overflow-visible animate-[bounce_2s_ease-in-out_infinite]"
                              src="/index/circle.svg"
                              alt="rectangle"
                              width={15}
                              height={15}
                            ></img>
                            <img
                              className="!overflow-visible animate-[bounce_3s_ease-in-out_infinite]"
                              src="/index/circle.svg"
                              alt="rectangle"
                              width={25}
                              height={25}
                            ></img>
                          </Stack>
                          <img
                            className="!overflow-visible animate-[spin_3s_ease-in-out_infinite]"
                            src="/index/rectangle_left.svg"
                            alt="rectangle"
                            width={60}
                            height={60}
                          ></img>
                        </Group>
                      </Stack>
                    </Stack>
                  ) : (
                    <></>
                  )}
                  {pinStep === 1 ? (
                    <Stack className="animate-fadeIn" align="center">
                      <Loader color="orange" />
                      <p className="text-center text-xl text-gray-500 font">
                        검색중...
                      </p>
                    </Stack>
                  ) : (
                    <></>
                  )}
                  {pinStep === 2 ? (
                    <Stack
                      onClick={() => {
                        getRoomOpened(pin);
                      }}
                      className="cursor-pointer animate-fadeIn px-4 rounded-3xl h-[160px] w-[260px] bg-contain bg-no-repeat bg-center bg-[url('/inbox/folder_orange_highlight.svg')]"
                    >
                      <Stack className="h-[3px]"></Stack>
                      <Stack className="h-[100px]"></Stack>
                      <Stack className="ml-4 mb-4">
                        <p className="text-[24px] text-[#5E5E5E]">
                          {(playRoom as any).roomName || ""}
                          {/* {playRoom === undefined
                            ? ""
                            : (playRoom as any).problemsetDto.title} */}
                        </p>
                      </Stack>
                    </Stack>
                  ) : (
                    <></>
                  )}
                  {pinStep === 3 ? (
                    <Stack align="center">
                      <ActionIcon size={40}>
                        <ZoomQuestion size={40}></ZoomQuestion>
                      </ActionIcon>
                      <p className="animate-fadeIn text-center text-xl text-gray-500">
                        존재하지 않는 방입니다.
                      </p>
                    </Stack>
                  ) : (
                    <></>
                  )}
                </Stack>
                <TextInput
                  disabled
                  rightSection={
                    pin === "" ? (
                      <></>
                    ) : (
                      <ActionIcon
                        className="mr-8"
                        size="xl"
                        onClick={() => {
                          let copy = pin;
                          setPin(copy.slice(0, copy.length - 1));
                        }}
                      >
                        <Backspace size="xl"></Backspace>
                      </ActionIcon>
                    )
                  }
                  maxLength={6}
                  size="xl"
                  value={pin}
                  ref={ref}
                  placeholder="6자리 숫자를 입력하세요"
                ></TextInput>
                <Button
                  disabled={pinStep === 2 ? false : true}
                  size="lg"
                  fullWidth
                  onClick={() => {
                    getRoomOpened(pin);
                  }}
                  color="orange"
                  variant="light"
                >
                  입장하기
                </Button>
              </Stack>
            </Stack>
            <Stack
              spacing={0}
              className=" w-full bg-white fixed bottom-0 left-0 rounded-t-xl"
            >
              <Stack
                onClick={() => {
                  setPinInputBar(!pinInputBar);
                }}
                className="cursor-pointer"
                align="center"
                justify="center"
              >
                <Group className="mb-4 mt-2 w-14 h-2 bg-gray-300 rounded-xl"></Group>
              </Stack>
              {pinInputBar === true ? (
                <Grid className="p-4 pt-0" columns={5} gutter="sm">
                  {"1234567890".split("").map((cur, i) => {
                    let color = ["red", "blue", "green", "orange"];
                    let bgColor = "hover:bg-" + color[i] + "-500";
                    return (
                      <>
                        <Grid.Col key={i} span={1} offset={0}>
                          <Button
                            fullWidth
                            style={{ height: "80px" }}
                            onClick={() => {
                              if (pin.length < 6) setPin(pin + cur);
                            }}
                            color="orange"
                            className="shadow-inner"
                            variant="light"
                          >
                            <p className="text-3xl font-bold">{cur}</p>
                          </Button>
                        </Grid.Col>
                      </>
                    );
                  })}
                </Grid>
              ) : (
                <></>
              )}
            </Stack>
          </Container>
        </>
      ) : (
        <></>
      )}

      {/* main */}
      {step === 1 ? (
        <>
          <Container className="h-[100vh] animate-textSlow bg-gradient-to-r from-[#FF9B3F] to-[#ffd178]">
            <Modal
              withCloseButton={false}
              overlayOpacity={0.55}
              overlayBlur={3}
              centered
              opened={visible}
              onClose={() => {}}
              className="animate-fadeIn"
            >
              <Center>
                <Stack align="center">
                  <Loader color="orange" />
                  <p className="text-center text-xl text-gray-500">
                    {(playRoom as any).roomName}에 입장하는 중...
                  </p>
                </Stack>
              </Center>
            </Modal>
            <Stack>
              <Group className="mt-6 my-2 cursor-pointer">
                <Image
                  onClick={() => {
                    location.replace("/enter");
                  }}
                  src="/logo_all_white.png"
                  alt="logo"
                  width={150}
                  height={30}
                />
              </Group>
              <Stack className="p-8 rounded-xl shadow-lg bg-white">
                <p className="animate-fadeIn font-bold text-2xl text-md text-center">
                  프로필 설정
                </p>
                <Center>
                  {/* "⚡️이미지를 클릭해 랜덤 프로필을 생성하세요!⚡️" */}
                  <Center
                    onClick={() => {
                      let randAnimal =
                        Math.floor(Math.random() * (avatarAnimal.length - 1)) +
                        1;
                      let randAvatarColor =
                        Math.floor(Math.random() * (avatarColor.length - 1)) +
                        1;
                      setAnimal(randAnimal);
                      setColor(randAvatarColor);
                      localStorage.setItem(
                        "imageNumber",
                        randAnimal.toString()
                      );
                      localStorage.setItem(
                        "colorNumber",
                        randAvatarColor.toString()
                      );
                    }}
                    className={`w-[160px] h-[160px] ${avatarColor[color]} rounded-full shadow-lg`}
                  >
                    <Image
                      alt="hello"
                      className={`cursor-pointer rounded-full`}
                      src={avatarAnimal[animal]}
                      width={"120px"}
                      height={"120px"}
                    ></Image>
                  </Center>
                </Center>
                <p className="m-0 mt-16 font-bold text-md text-left text-gray-400">
                  이름
                </p>
                {
                  <TextInput
                    maxLength={14}
                    size="xl"
                    value={name}
                    onChange={(event) => {
                      setName((prevState) => event.target.value);
                      localStorage.setItem("name", event.target.value);
                    }}
                    placeholder="이름을 적어주세요"
                  ></TextInput>
                }
                <p className="m-0 font-bold text-md text-left text-gray-400">
                  닉네임
                </p>
                {
                  <TextInput
                    rightSection={
                      <ActionIcon
                        radius="xl"
                        className="mr-8"
                        size="xl"
                        onClick={() => {
                          let randAdjective =
                            adj[
                              Math.floor(Math.random() * (adj.length - 1)) + 1
                            ];
                          let randNoun =
                            noun[
                              Math.floor(Math.random() * (noun.length - 1)) + 1
                            ];
                          setNickname(randAdjective + randNoun);
                          localStorage.setItem(
                            "nickname",
                            randAdjective + randNoun
                          );
                        }}
                        variant="transparent"
                        color="orange"
                      >
                        <Refresh size="xl"></Refresh>
                      </ActionIcon>
                    }
                    maxLength={10}
                    size="xl"
                    value={nickname}
                    onChange={(event) => {
                      setNickname((prevState) => event.target.value);
                      localStorage.setItem("nickname", event.target.value);
                    }}
                    placeholder="닉네임을 적어주세요"
                  ></TextInput>
                }

                <Divider my="xs" />

                <Button
                  size="lg"
                  onClick={() => {
                    socketManager.send(
                      "/pub/room/" + pin + "/signup",
                      {},
                      JSON.stringify({
                        name: name,
                        nickname: nickname,
                        imageNumber: animal,
                        colorNumber: color,
                      })
                    );
                    setVisible(true);
                  }}
                  color="orange"
                  variant="filled"
                >
                  준비 완료
                </Button>
              </Stack>
            </Stack>
          </Container>
        </>
      ) : (
        <></>
      )}

      <Group className="h-0 w-0 bg-amber-500"></Group>
    </div>
  );
};

export default Home;
