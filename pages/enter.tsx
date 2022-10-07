import Router, { useRouter } from "next/router";
import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRecoilState } from "recoil";
import { playColor, playPin } from "../components/States";

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
} from "@mantine/core";

import { connectMainServerApiAddress } from "../components/ConstValues";
import { useScrollIntoView } from "@mantine/hooks";
import { Refresh, ArrowNarrowLeft, StepInto } from "tabler-icons-react";
import { useRef } from "react";

const Home: NextPage = () => {
  const adj = [
    "성찰하는",
    "고뇌하는",
    "엉뚱한",
    "활기찬",
    "명랑한",
    "정의로운",
    "창의적인",
    "사색하는",
    "부유한",
    "정직한",
    "슬기로운",
    "유능한",
    "전설적인",
    "전략적인",
    "신박한",
    "듬직한",
    "명석한",
    "건강한",
    "용감한",
    "공평한",
    "신속한",
    "뛰어난",
    "비장한",
    "신들린",
    "감각적인",
    "독보적인",
    "헌신적인",
    "위대한",
    "입체적인",
    "성스러운",
  ];

  const noun = [
    "소크라테스",
    "니체",
    "튜링",
    "뉴턴",
    "브라헤",
    "보어",
    "레오나르도",
    "공자",
    "스미스",
    "데카르트",
    "세종",
    "한신",
    "칸",
    "제갈공명",
    "유레카",
    "테슬라",
    "칼세이건",
    "클레오파트라",
    "이순신",
    "링컨",
    "나폴레옹",
    "워렌버핏",
    "스티브잡스",
    "모차르트",
    "고흐",
    "내쉬",
    "테레사",
    "스티븐호킹",
    "피카소",
    "잔다르크",
  ];

  const [pin, setPin] = useRecoilState(playPin);
  const ref = useRef<HTMLInputElement>(null);

  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView();
  const [step, setStep] = useState(0);
  const [color, setColor] = useRecoilState(playColor);

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

  const getRoomOpened = (pin: string) => {
    axios
      .get(connectMainServerApiAddress + `api/room/${pin.toString()}/open`)
      .then((result) => {
        // validation
        if (result.data.currentState !== "READY") return;
        // connect();
        // client.send("/pub/room/" + pin, {}, JSON.stringify({}));
        // scene change
        setStep((prevstate) => step + 1);

        // JSON.stringify({})
        // client.activate();
        //  onConnect:()=>{client.publish({
        //    destination: "/room" + pin,
        //    body: {},
        //    headers: { priority: "9" },
        //  });}

        // test
        alert("success" + result.status);
      })
      .catch((error) => {
        alert("error" + error.status);
      });
    return;
  };

  let [nickname, setNickname] = useState("");
  let createRand = () => {};

  let client: Stomp.Client;

  let connect = () => {
    // client.debug = null;
    const headers = {
      // connect, subscribe에 쓰이는 headers
    };
    let socket = new SockJS(connectMainServerApiAddress + "stomp");
    client = Stomp.over(socket);

    let reconnect = 0;
    client.connect(
      {},
      function (frame) {
        client.subscribe("/topic/room/" + pin ?? "000000", function (message) {
          // var recv = JSON.parse(message.body);
        });
        // client.send(
        //   "/pub/room/" + pin + "/start",
        //   {},
        //   JSON.stringify({ uuid: 123 })
        // );
      },
      function (error) {
        console.log("fucking" + error);
        //connect();
        // if (reconnect++ <= 5) {
        //   setTimeout(function () {
        //     console.log("connection reconnect");
        //     socket = new SockJS(`https://dist.exquiz.me/stomp`);
        //     client = Stomp.over(socket);
        //     connect();
        //   }, 10 * 1000);
        // }
      }
    );

    // client.connect(
    //   headers,
    //   (frame) => {
    //     console.log("연결됨");
    //     client.subscribe("/topic/room" + pin, function (message) {
    //       console.log("성공 ㅎㅎ" + JSON.parse(message.body).content);
    //     });
    //   },
    //   () => {
    //     console.log("연결안됨");
    //   }
    // );
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

      <Stack>
        <Center>
          <Stack>
            {/* main */}
            {step === 0 ? (
              <Stack className="w-[100vw] h-[100vh] bg-gradient-to-l from-amber-500 via-amber-500 to-orange-500 animate-text">
                <Center>
                  <Stack>
                    {/* Navigation Bar */}
                    <p className="font-bold text-white text-2xl text-left">
                      exquiz.me
                    </p>
                  </Stack>
                </Center>
                <Stack justify="space-between">
                  <Stack>
                    <Center>
                      <Group spacing={0}>
                        <Group className="shadow-lg" spacing={0}>
                          <Group className="border-r-2 border-gray-300 shadow-lg h-28 w-4 bg-amber-200" />
                          <Group>
                            <Stack spacing={0}>
                              <Group className="border-b-2 border-gray-300 m-0 p-0 h-14 w-40 bg-amber-200"></Group>
                              <Group
                                spacing={2}
                                className=" m-0 p-0 h-14 w-40 bg-amber-200"
                              >
                                <Group
                                  className={`mx-1 text-white cursor-pointer w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full`}
                                >
                                  <p className="text-xs m-auto">학생용</p>
                                </Group>
                                <Group
                                  className={`mx-0 text-white cursor-pointer w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full`}
                                >
                                  <p className="text-xs m-auto">모바일</p>
                                </Group>
                              </Group>
                            </Stack>
                          </Group>
                        </Group>
                        <Group className="shadow-lg m-0 p-0 h-24 w-6 bg-white"></Group>
                      </Group>
                    </Center>
                    <Center>
                      <Stack>
                        <TextInput
                          value={pin}
                          onChange={(e) => {
                            setPin(e.target.value);
                            console.log(pin);
                          }}
                          ref={ref}
                          placeholder="핀 번호를 입력하세요"
                        ></TextInput>
                        <Button
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
                        {/* <Button
                            onClick={() => {
                              setPin("888");
                              alert(pin);
                            }}
                          >
                            111 에서 888
                          </Button> */}
                      </Stack>
                    </Center>
                  </Stack>
                </Stack>
              </Stack>
            ) : (
              <></>
            )}

            {/* main */}
            {step === 1 ? (
              <Group>
                <Stack>
                  <Stack>
                    <ActionIcon
                      onClick={() => {
                        setStep((prevState) => 0);
                      }}
                    >
                      <ArrowNarrowLeft></ArrowNarrowLeft>
                    </ActionIcon>
                    {/* Navigation Bar */}
                    <p className="font-bold text-md text-left">닉네임 설정</p>
                    {
                      <TextInput
                        value={nickname}
                        onChange={(event) => {
                          setNickname((prevState) => event.currentTarget.value);
                        }}
                        placeholder="똑똑한 소크라테스"
                      ></TextInput>
                    }
                    <Button
                      onClick={() => {
                        let randAdjective =
                          adj[Math.floor(Math.random() * (adj.length - 1)) + 1];
                        let randNoun =
                          noun[
                            Math.floor(Math.random() * (noun.length - 1)) + 1
                          ];
                        let randNum1 = Math.floor(Math.random() * (99 - 1)) + 1;
                        let randNum2 =
                          Math.floor(Math.random() * (100 - 1)) + 1;
                        setNickname(
                          randNum1 + randAdjective + randNoun + randNum2
                        );
                      }}
                      color="orange"
                      variant="outline"
                      leftIcon={<Refresh />}
                    >
                      랜덤 닉네임 생성
                    </Button>
                  </Stack>
                  <Stack>
                    <Stack>
                      <p className="px-14 font-bold text-md text-left">
                        아바타 선택
                      </p>
                      <Button
                        color="orange"
                        variant="outline"
                        leftIcon={<Refresh />}
                        onClick={() => {
                          var randomColor = require("randomcolor"); // import the script
                          var randColor = randomColor();
                          setColor(randColor);
                        }}
                      >
                        색상 바꾸기
                      </Button>
                      <Stack>
                        <ScrollArea scrollbarSize={0} style={{ width: 180 }}>
                          <Group style={{ width: 700 }}>
                            <Image
                              alt="hello"
                              className="cursor-pointer rounded-full"
                              src="/../public/rat.png"
                              width={"50px"}
                              height={"50px"}
                            ></Image>
                            <Image
                              alt="hello"
                              className={`cursor-pointer rounded-full bg-[${color}]`}
                              src="/../public/fox.png"
                              width={"50px"}
                              height={"50px"}
                            ></Image>
                            <Image
                              alt="hello"
                              className="cursor-pointer rounded-full"
                              src="/../public/dog.png"
                              width={"50px"}
                              height={"50px"}
                            ></Image>
                            <Image
                              alt="hello"
                              className="cursor-pointer rounded-full"
                              src="/../public/dog2.png"
                              width={"50px"}
                              height={"50px"}
                            ></Image>
                            <Image
                              alt="hello"
                              className="cursor-pointer rounded-full"
                              src="/../public/koala.png"
                              width={"50px"}
                              height={"50px"}
                            ></Image>
                            <Image
                              alt="hello"
                              className="cursor-pointer rounded-full"
                              src="/../public/monkey.png"
                              width={"50px"}
                              height={"50px"}
                            ></Image>
                          </Group>
                        </ScrollArea>
                      </Stack>
                      <Stack>
                        <Link href="/play">
                          <Button
                            onClick={() => {
                              connect();
                              setTimeout(() => {
                                client.send(
                                  "/pub/room/" + pin + "/signup",
                                  {},
                                  JSON.stringify({
                                    name: nickname,
                                    nickname: nickname,
                                  })
                                );
                              }, 3000);
                              Router.push(`/lobby_user/${pin}`);
                            }}
                            color="orange"
                            variant="filled"
                          >
                            준비 완료
                          </Button>
                        </Link>
                      </Stack>
                    </Stack>
                    <footer className={styles.footer}>
                      <a
                        className="text-gray-700 no-underline text-black text-sm font-semibold"
                        href="/apiTest"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Team MUMOMU
                      </a>
                    </footer>
                  </Stack>
                </Stack>
              </Group>
            ) : (
              <></>
            )}
          </Stack>
        </Center>
      </Stack>
    </div>
  );
};

export default Home;
function sleep(arg0: number) {
  throw new Error("Function not implemented.");
}
