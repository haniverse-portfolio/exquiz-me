import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
  playAnimal,
  playColor,
  playPin,
  playUserCurInfo,
} from "../components/States";

import SockJS from "sockjs-client";
import Stomp from "stompjs";

import {
  Button,
  ScrollArea,
  Center,
  Group,
  Stack,
  TextInput,
  Modal,
  ActionIcon,
  Grid,
  Container,
  NumberInput,
  Notification,
  Divider,
  Tooltip,
  Loader,
} from "@mantine/core";

import {
  connectMainServerApiAddress,
  adj,
  noun,
  avatarAnimal,
  avatarColor,
} from "../components/ConstValues";
import { useScrollIntoView } from "@mantine/hooks";
import {
  Refresh,
  ArrowNarrowLeft,
  StepInto,
  Dice2,
  ZoomQuestion,
} from "tabler-icons-react";
import { useRef } from "react";
import { FooterCenteredUser } from "../components/footer_user";

const Home: NextPage = () => {
  const router = useRouter();

  const [pin, setPin] = useRecoilState(playPin);
  const ref = useRef<HTMLInputElement>(null);

  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView();
  const [step, setStep] = useState(0);
  const [animal, setAnimal] = useRecoilState(playAnimal);
  const [color, setColor] = useRecoilState(playColor);

  useEffect(() => {
    if (!router.isReady) return;
    if (step !== 1) return;
    connect();
  }, [step]);

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
      connectMainServerApiAddress + "api/room/100310/mq/leaderboard"
    );
    return result.data;
  };

  const getProblemsets = () => {
    let rt = [{ id: -1, title: "", description: "", closingMent: "" }];
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

  let [problemsets, setProblemsets] = useState([
    { id: -1, title: "", description: "", closingMent: "" },
  ]);
  const getPinValid = (pin: string) => {
    axios
      .get(connectMainServerApiAddress + `api/room/${pin.toString()}/open`)
      .then((result) => {
        // validation
        if (result.data.currentState !== "READY") {
          setPinStep(3);
          return;
        }
        setPinStep((prevstate) => 2);
      })
      .catch((error) => {
        setPinStep(3);
      });
  };

  const getRoomOpened = (pin: string) => {
    axios
      .get(connectMainServerApiAddress + `api/room/${pin.toString()}/open`)
      .then((result) => {
        // validation
        if (result.data.currentState !== "READY") return;
        setStep((prevstate) => step + 1);
      })
      .catch((error) => {
        alert("핀 번호를 다시 확인해보세요");
      });
    return;
  };

  const [nickname, setNickname] = useState("");
  const [userCurInfo, setUserCurInfo] = useRecoilState(playUserCurInfo);
  const [name, setName] = useState("");
  const [pinStep, setPinStep] = useState(0);
  let createRand = () => {};

  let client: Stomp.Client;
  let socket = new SockJS(connectMainServerApiAddress + "stomp");
  client = Stomp.over(socket);

  let connect = () => {
    const headers = {};

    let reconnect = 0;
    client.connect(
      {},
      function (frame) {
        client.subscribe("/topic/room/" + pin + "/host", function (message) {
          if (JSON.parse(message.body).messageType === "PARTICIPANT") {
            setUserCurInfo(JSON.parse(message.body));
            localStorage.setItem(
              "fromSession",
              JSON.parse(message.body).fromSession
            );
          }
        });
      },
      function (error) {
        console.log("websocket error");
      }
    );
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
          <Container className="bg-[#ffd178] h-[100vh]">
            <Stack className="flex">
              <p
                onClick={() => {
                  alert("개발자를 위해 잠시 풀어줬습니다 ._.");
                  setPinStep(2);
                }}
                className="cursor-pointer ml-4 my-8 text-2xl font-bold text-white"
              >
                exquiz.me
              </p>
              {/* <Notification disallowClose color="orange" title="알림">
                6자리의 숫자로 된 핀 번호를 입력하세요.
              </Notification> */}
              <Stack className="p-8 rounded-xl shadow-lg bg-white">
                <p className="text-center text-2xl font-bold text-black">
                  퀴즈방 입장하기
                </p>
                <p className="text-center text-lg font-semibold text-gray-500">
                  공유 받은 PIN 번호로 입장해주세요
                </p>
                <Stack
                  align="center"
                  className="flex items-center justify-center h-[208px]"
                >
                  {pinStep === 0 ? (
                    <Stack align="flex-start">
                      <Stack align="flex-start">
                        <Group align="flex-start">
                          <Image
                            src="/index/rectangle_right.svg"
                            alt="rectangle"
                            width={100}
                            height={100}
                          ></Image>
                          <Stack>
                            <Image
                              src="/index/circle.svg"
                              alt="rectangle"
                              width={15}
                              height={15}
                            ></Image>
                            <Image
                              src="/index/circle.svg"
                              alt="rectangle"
                              width={25}
                              height={25}
                            ></Image>
                          </Stack>
                        </Group>
                      </Stack>
                      <Stack>
                        <Group align="flex-end">
                          <Stack>
                            <Image
                              src="/index/circle.svg"
                              alt="rectangle"
                              width={15}
                              height={15}
                            ></Image>
                            <Image
                              src="/index/circle.svg"
                              alt="rectangle"
                              width={25}
                              height={25}
                            ></Image>
                          </Stack>
                          <Image
                            src="/index/rectangle_left.svg"
                            alt="rectangle"
                            width={60}
                            height={60}
                          ></Image>
                        </Group>
                      </Stack>
                    </Stack>
                  ) : (
                    <></>
                  )}
                  {pinStep === 1 ? (
                    <Stack align="center">
                      <Loader color="orange" />
                      <p className="text-center text-xl text-gray-500 font">
                        검색중...
                      </p>
                    </Stack>
                  ) : (
                    <></>
                  )}
                  {pinStep === 2 ? (
                    <Image
                      src="/inbox/folder.svg"
                      alt="folder"
                      width={298}
                      height={208}
                    ></Image>
                  ) : (
                    <></>
                  )}
                  {pinStep === 3 ? (
                    <Stack align="center">
                      <ActionIcon size={40}>
                        <ZoomQuestion size={40}></ZoomQuestion>
                      </ActionIcon>
                      <p className="text-center text-xl text-gray-500">
                        존재하지 않는 방입니다.
                      </p>
                    </Stack>
                  ) : (
                    <></>
                  )}
                </Stack>
                <TextInput
                  maxLength={6}
                  size="xl"
                  value={pin}
                  onChange={(e) => {
                    /* validation */
                    // if (
                    //   e.target.value !== "" &&
                    //   parseInt(e.target.value).toString().length !==
                    //     e.target.value.length
                    // ) {
                    // }
                    let len = e.target.value.length;
                    if (len === 0) setPinStep(0);
                    else if (len >= 1 && len <= 5) setPinStep(1);
                    else if (len === 6) {
                      getPinValid(e.target.value);
                    }
                    setPin(e.target.value);
                  }}
                  ref={ref}
                  placeholder="6자리 숫자를 입력하세요"
                ></TextInput>
                <p className="text-center text-lg font-semibold cursor-pointer text-orange-500 underline">
                  QR코드로 입장하기
                </p>
                <Button
                  disabled={pinStep === 2 ? false : true}
                  size="lg"
                  fullWidth
                  onClick={() => {
                    getRoomOpened(pin);
                    // connect();

                    // is room exist : validation check needed
                  }}
                  color="orange"
                  variant="light"
                >
                  입장하기
                </Button>
              </Stack>
              <Group
                className="rounded-full cursor-pointer h-4 w-4 border-1 border-solid border-orange-300 bg-[#ffd178]"
                onClick={() => {
                  alert("보이지 않는 검이 가장 무서운 법...");
                  setStep(1);
                }}
              ></Group>
            </Stack>
          </Container>
          {/* <FooterCenteredUser
            links={[
              {
                link: "https://retro5pect.tistory.com",
                label: "2022 exquiz.me | Team MUMOMU",
              },
              // { link: "https://www.naver.com", label: "네이버" },
            ]}
          /> */}
        </>
      ) : (
        <></>
      )}

      {/* main */}
      {step === 1 ? (
        <>
          <Container className="h-[100vh] bg-[#ffd178]" size={800}>
            <Stack>
              {/* <Notification disallowClose color="orange" title="알림">
                {notiInfo}
              </Notification> */}
              {/* Navigation Bar */}
              <p
                onClick={() => {
                  setStep((prevState) => 0);
                }}
                className="cursor-pointer ml-4 my-8 text-2xl font-bold text-white"
              >
                exquiz.me
              </p>
              <Stack className="p-8 rounded-xl shadow-lg bg-white">
                <p className="font-bold text-2xl text-md text-center">
                  프로필 설정
                </p>
                <Center>
                  <Tooltip
                    position="bottom"
                    offset={20}
                    opened={true}
                    label="⚡️이미지를 클릭해 랜덤 프로필을 생성하세요!⚡️"
                    withArrow
                    onClick={() => {
                      let randAnimal =
                        Math.floor(Math.random() * (avatarAnimal.length - 1)) +
                        1;
                      let randAvatarColor =
                        Math.floor(Math.random() * (avatarColor.length - 1)) +
                        1;
                      setAnimal(randAnimal);
                      setColor(randAvatarColor);
                    }}
                  >
                    <Center
                      className={`w-[140px] h-[140px] ${avatarColor[color]} rounded-full shadow-lg`}
                    >
                      <Image
                        alt="hello"
                        className={`cursor-pointer rounded-full`}
                        src={avatarAnimal[animal]}
                        width={"120px"}
                        height={"120px"}
                      ></Image>
                    </Center>
                  </Tooltip>
                </Center>
                {/* <p
                className="cursor-pointer text-center text-lg text-orange-500 font-semibold"
                onClick={() => {
                  let randAnimal =
                    Math.floor(Math.random() * (avatarAnimal.length - 1)) + 1;
                  let randAvatarColor =
                    Math.floor(Math.random() * (avatarColor.length - 1)) + 1;
                  setAnimal(randAnimal);
                  setColor(randAvatarColor);
                  setNotiInfo("아바타가 생성되었습니다!");
                }}
              >
                이미지를 클릭해 랜덤 프로필을 생성하세요!
              </p> */}
                <p className="m-0 mt-16 font-bold text-md text-left text-gray-400">
                  이름
                </p>
                {
                  <TextInput
                    maxLength={14}
                    size="lg"
                    value={name}
                    onChange={(event) => {
                      setName((prevState) => event.target.value);
                    }}
                    placeholder="본인 확인을 위한 이름을 적어주세요"
                  ></TextInput>
                }
                <p className="m-0 font-bold text-md text-left text-gray-400">
                  닉네임
                </p>
                {
                  <TextInput
                    rightSection={
                      <ActionIcon
                        onClick={() => {
                          let randAdjective =
                            adj[
                              Math.floor(Math.random() * (adj.length - 1)) + 1
                            ];
                          let randNoun =
                            noun[
                              Math.floor(Math.random() * (noun.length - 1)) + 1
                            ];
                          let randNum1 =
                            Math.floor(Math.random() * (99 - 1)) + 1;
                          let randNum2 =
                            Math.floor(Math.random() * (100 - 1)) + 1;
                          setNickname(
                            randNum1 + randAdjective + randNoun + randNum2
                          );
                        }}
                        variant="outline"
                        color="orange"
                      >
                        <Refresh></Refresh>
                      </ActionIcon>
                    }
                    maxLength={14}
                    size="lg"
                    value={nickname}
                    onChange={(event) => {
                      setNickname((prevState) => event.target.value);
                    }}
                    placeholder="퀴즈에 사용될 닉네임을 입력해주세요"
                  ></TextInput>
                }

                <Divider my="xs" />

                <Button
                  size="lg"
                  onClick={() => {
                    client.send(
                      "/pub/room/" + pin + "/signup",
                      {},
                      JSON.stringify({
                        name: name,
                        nickname: nickname,
                        imageNumber: animal,
                        colorNumber: color,
                      })
                    );
                    setTimeout(() => {
                      Router.push(`/play/${pin}`);
                    }, 500);
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
