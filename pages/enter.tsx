import Router, { useRouter } from "next/router";
import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
  enterNotificationInfo,
  playAnimal,
  playColor,
  playPin,
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
} from "@mantine/core";

import {
  connectMainServerApiAddress,
  adj,
  noun,
  avatarAnimal,
  avatarColor,
} from "../components/ConstValues";
import { useScrollIntoView } from "@mantine/hooks";
import { Refresh, ArrowNarrowLeft, StepInto, Dice2 } from "tabler-icons-react";
import { useRef } from "react";
import { FooterCentered } from "../components/footer";
import { FooterCenteredUser } from "../components/footer_user";

const Home: NextPage = () => {
  const [pin, setPin] = useRecoilState(playPin);
  const ref = useRef<HTMLInputElement>(null);

  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView();
  const [step, setStep] = useState(0);
  const [animal, setAnimal] = useRecoilState(playAnimal);
  const [color, setColor] = useRecoilState(playColor);

  const [notiInfo, setNotiInfo] = useRecoilState(enterNotificationInfo);

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
        setStep((prevstate) => step + 1);
      })
      .catch((error) => {
        alert("error" + error.status);
      });
    return;
  };

  let [nickname, setNickname] = useState("");
  let [name, setName] = useState("");
  let createRand = () => {};

  let client: Stomp.Client;

  let connect = () => {
    const headers = {};
    let socket = new SockJS(connectMainServerApiAddress + "stomp");
    client = Stomp.over(socket);

    let reconnect = 0;
    client.connect(
      {},
      function (frame) {
        client.subscribe(
          "/topic/room/" + pin ?? "000000",
          function (message) {}
        );
      },
      function (error) {
        console.log("fucking" + error);
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
          <Container className="h-[65vh]" size={800}>
            <Stack className="mt-32 flex ">
              {/* <Group spacing="sm">
              <NumberInput
                color="orange"
                className=" w-[11vw]"
                hideControls
                maxLength={1}
              ></NumberInput>

              <NumberInput
                className="w-[11vw]"
                hideControls
                maxLength={1}
              ></NumberInput>

              <NumberInput
                className="w-[11vw]"
                hideControls
                maxLength={1}
              ></NumberInput>

              <NumberInput
                className="w-[11vw]"
                hideControls
                maxLength={1}
              ></NumberInput>

              <NumberInput
                className="w-[11vw]"
                hideControls
                maxLength={1}
              ></NumberInput>

              <NumberInput
                className="w-[11vw]"
                hideControls
                maxLength={1}
              ></NumberInput>
            </Group> */}

              <p className="text-lg font-bold cursor-pointer ">
                세상의 모든 퀴즈
              </p>
              <p className="text-2xl font-bold cursor-pointer transition ease-in-out text-transparent bg-clip-text bg-gradient-to-l from-amber-500 via-amber-500 to-orange-500 animate-text">
                익스퀴즈미
              </p>
              <Notification disallowClose color="orange" title="알림">
                6자리의 숫자로 된 핀 번호를 입력하세요.
              </Notification>
              <TextInput
                maxLength={6}
                size="xl"
                value={pin}
                onChange={(e) => {
                  /* validation */
                  if (
                    e.target.value !== "" &&
                    parseInt(e.target.value).toString().length !==
                      e.target.value.length
                  ) {
                    setNotiInfo("잘못된 입력값입니다.");
                  }
                  setPin(e.target.value);
                }}
                ref={ref}
                placeholder="핀 번호를 입력하세요"
              ></TextInput>
              <Button
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
          </Container>
          <FooterCenteredUser
            links={[
              {
                link: "https://retro5pect.tistory.com",
                label: "2022 exquiz.me | Team MUMOMU",
              },
              // { link: "https://www.naver.com", label: "네이버" },
            ]}
          />
        </>
      ) : (
        <></>
      )}

      {/* main */}
      {step === 1 ? (
        <>
          <Container className="h-[90vh]" size={800}>
            <Stack className="mt-4 flex ">
              <ActionIcon
                onClick={() => {
                  setStep((prevState) => 0);
                }}
              >
                <ArrowNarrowLeft></ArrowNarrowLeft>
              </ActionIcon>

              <Notification disallowClose color="orange" title="알림">
                {notiInfo}
              </Notification>
              {/* Navigation Bar */}
              <p className="font-bold text-md text-left">이름 설정</p>
              {
                <TextInput
                  maxLength={14}
                  size="lg"
                  value={name}
                  onChange={(event) => {
                    setName((prevState) => event.target.value);
                  }}
                  placeholder="이름을 입력하세요"
                ></TextInput>
              }
              <p className="font-bold text-md text-left">닉네임 설정</p>
              {
                <TextInput
                  maxLength={14}
                  size="lg"
                  value={nickname}
                  onChange={(event) => {
                    setNickname((prevState) => event.target.value);
                  }}
                  placeholder="닉네임을 입력하세요"
                ></TextInput>
              }
              <Button
                size="lg"
                onClick={() => {
                  let randAdjective =
                    adj[Math.floor(Math.random() * (adj.length - 1)) + 1];
                  let randNoun =
                    noun[Math.floor(Math.random() * (noun.length - 1)) + 1];
                  let randNum1 = Math.floor(Math.random() * (99 - 1)) + 1;
                  let randNum2 = Math.floor(Math.random() * (100 - 1)) + 1;
                  setNickname(randNum1 + randAdjective + randNoun + randNum2);
                  setNotiInfo("닉네임이 생성되었습니다!");
                }}
                color="orange"
                variant="outline"
                leftIcon={<Refresh />}
              >
                랜덤 닉네임 생성
              </Button>
              <p className="font-bold text-md text-left">아바타 선택</p>
              <Grid columns={12}>
                <Grid.Col span={2}></Grid.Col>
                <Grid.Col span={8}>
                  <Center>
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
                  </Center>
                </Grid.Col>
                <Grid.Col span={2}></Grid.Col>
              </Grid>
              <Button
                size="lg"
                color="orange"
                variant="light"
                leftIcon={<Dice2 />}
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
                주사위 굴리기
              </Button>

              <Divider my="xs" />

              <Button
                size="lg"
                onClick={() => {
                  connect();
                  setTimeout(() => {
                    client.send(
                      "/pub/room/" + pin + "/signup",
                      {},
                      JSON.stringify({
                        name: nickname,
                        nickname: nickname,
                        imageNumber: animal,
                        colorNumber: color,
                      })
                    );
                  }, 3000);
                  // Router.push(`/play/${pin}`);
                }}
                color="orange"
                variant="filled"
              >
                준비 완료
              </Button>
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
