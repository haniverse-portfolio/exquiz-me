import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRecoilState } from "recoil";
import { playPin } from "../components/States";

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
} from "@mantine/core";

import { connectMainServerApiAddress } from "../components/ConstValues";
import { useScrollIntoView } from "@mantine/hooks";
import { Refresh, ArrowNarrowLeft } from "tabler-icons-react";
import { useRef } from "react";
const Home: NextPage = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [pin, setPin] = useRecoilState(playPin);

  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView();
  const [step, setStep] = useState(0);

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
      "https://dist.exquiz.me/api/room/100310/mq/leaderboard"
    );
    return result.data;
  };

  const getProblemsets = () => {
    let rt = [{ id: -1, title: "", description: "", closingMent: "" }];
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

  let [problemsets, setProblemsets] = useState([
    { id: -1, title: "", description: "", closingMent: "" },
  ]);

  const getRoomOpened = () => {
    alert("axios get: " + pin);
    axios
      .get(connectMainServerApiAddress + `api/room/${pin}/open`)
      .then((result) => {
        console.log("success" + result.status);
      })
      .catch((error) => {
        console.log("error" + error.status);
      });
    return;
  };

  let [nickname, setNickname] = useState("");
  let createRand = () => {};

  let stompClient: Stomp.Client;

  let connect = () => {
    // stompClient.debug = null;
    const headers = {
      // connect, subscribe에 쓰이는 headers
    };
    var socket = new SockJS(connectMainServerApiAddress + "stomp");
    //var socket = new SockJS("https://api.exquiz.me/stomp");
    stompClient = Stomp.over(socket);

    // jwt
    //var headers = {
    // Authorization : 'Bearer ' + token.access_token,
    //};
    var reconnect = 0;
    stompClient.connect(
      {},
      function (frame) {
        stompClient.subscribe("/topic/room" + pin, function (message) {
          var recv = JSON.parse(message.body);
          console.log("hellooooooo" + message.body);
        });
        // stompClient.send(
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
        //     stompClient = Stomp.over(socket);
        //     connect();
        //   }, 10 * 1000);
        // }
      }
    );

    // stompClient.connect(
    //   headers,
    //   (frame) => {
    //     console.log("연결됨");
    //     stompClient.subscribe("/topic/room" + pin, function (message) {
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
              <Stack className="bg-gradient-to-l from-amber-500 via-amber-500 to-orange-500 animate-textSlow">
                <Center>
                  <Stack>
                    {/* Navigation Bar */}
                    <p className="font-bold text-white text-2xl text-left">
                      exquiz.me
                    </p>
                  </Stack>
                </Center>
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
                        ref={ref}
                        placeholder="핀 번호를 입력하세요"
                      ></TextInput>
                      <Button
                        onClick={() => {
                          // ref.current?.value ?? "000000"
                          setPin(ref.current?.value ?? "000000");
                          alert("Button: " + pin);
                          getRoomOpened();
                          // connect();

                          // is room exist : validation check needed
                          setStep((prevState) => step + 1);
                        }}
                        color="orange"
                        variant="outline"
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
                        let arr = [
                          "성찰하는소크라테스",
                          "고뇌하는니체",
                          "엉뚱한튜링",
                          "활기찬뉴턴",
                          "명랑한브라헤",
                          "정의로운보어",
                          "창의적인레오나르도",
                          "사색하는공자",
                          "부유한스미스",
                          "정직한데카르트",
                          "슬기로운세종",
                          "유능한한신",
                          "전설적인칸",
                          "전략적인제갈공명",
                          "신박한유레카",
                          "듬직한테슬라",
                          "명석한칼세이건",
                          "건강한클레오파트라",
                          "용감한이순신",
                          "공평한링컨",
                          "신속한나폴레옹",
                          "뛰어난워렌버핏",
                          "비장한스티브잡스",
                          "신들린모차르트",
                          "감각적인고흐",
                          "독보적인내쉬",
                          "헌신적인테레사",
                          "위대한스티븐호킹",
                          "입체적인피카소",
                          "성스러운잔다르크",
                        ];
                        setNickname(
                          arr[Math.floor(Math.random() * (arr.length - 1)) + 1]
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
                              className="cursor-pointer rounded-full"
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
                          <Button color="orange" variant="filled">
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
