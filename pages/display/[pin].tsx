import { useState, useRef } from "react";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import SockJS from "sockjs-client";
import Stomp from "stompjs";
import axios from "axios";
import {
  Button,
  Group,
  useMantineTheme,
  Stack,
  Grid,
  Progress,
  Center,
  ActionIcon,
  ScrollArea,
  MantineProvider,
  Loader,
} from "@mantine/core";
import { Alarm } from "tabler-icons-react";

import { useInterval } from "@mantine/hooks";
import {
  avatarAnimal,
  avatarColor,
  connectMainServerApiAddress,
  playCorrectAnswerList,
  problemOptionInput,
} from "../../components/ConstValues";
import { indexIsLogined } from "../../components/States";
import { alternativeImage } from "../../components/display/alternativeImage";

const Home: NextPage = () => {
  /* initialization */
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];
  const router = useRouter();
  /* *** core initialization *** */
  const bgAudio = useRef(null) as any;
  // bgAudio.loop = true;
  const endingEffectAudio = useRef(null) as any;
  const interval = useInterval(() => setSeconds((s) => s - 0.05), 50);

  /* *** usestate start *** */
  const [seconds, setSeconds] = useState<number>(30);
  const [step, setStep] = useState(-1);
  const [submitCount, setSubmitCount] = useState(0);
  const [correctAnswerList, setCorrectAnswerList] = useState(
    playCorrectAnswerList
  );

  const [curIdx, setCurIdx] = useState(0);
  const [problemOption, setProblemOption] = useState(problemOptionInput);

  const [partlist, setPartlist] = useState([]);
  const [socketManager, setSocketManager] = useState<any>(null);

  const [isLogined, setIsLogined] = useRecoilState(indexIsLogined);

  /* *** useeffect start *** */

  useEffect(() => {
    if (!router.isReady) return;
    connect();
    getParticipants();
  }, [router.isReady]);

  useEffect(() => {
    if (Math.floor(seconds) === 0) {
      interval.stop();
      socketManager.send("/pub/room/" + router.query.pin + "/stop", {});
      bgAudio.current.pause();
      endingEffectAudio.current.play();
    }
  }, [seconds]);

  /* *** axios call *** */
  // const getRoomOpened = () => {
  //   axios
  //     .get(connectMainServerApiAddress + `api/room/${router.query.pin}/open`)
  //     .then((result) => {
  //       setCurIdx(result.data.currentProblemNum);
  //       // validation
  //       if (result.data.currentState !== "READY") return;
  //       setStep((prevstate) => step + 1);
  //     })
  //     .catch((error) => {});
  //   return;
  // };

  const getCorrectAnswerList = () => {
    axios
      .get(
        connectMainServerApiAddress +
          "api/room/" +
          router.query.pin +
          "/submit_list"
      )
      .then((result) => {
        console.log(result.data);
        setCorrectAnswerList(result.data);
      })
      .catch((error) => {});
    return;
  };

  const getParticipants = () => {
    axios
      .get(
        connectMainServerApiAddress +
          "api/room/" +
          router.query.pin +
          "/participants"
      )
      .then((result) => {
        setPartlist(result.data);
      })
      .catch((error) => {
        alert(error);
      });
    return;
  };

  /* *** web socket *** */

  let connect = () => {
    var socket = new SockJS(connectMainServerApiAddress + "stomp");
    let client: Stomp.Client;
    client = Stomp.over(socket);

    const headers = {};
    var reconnect = 0;
    client.connect(
      {},
      function (frame) {
        console.log("web socket connected");
        if (router.query.pin === undefined) router.push("/404");
        client.subscribe(
          "/topic/room/" + router.query.pin + "/host",
          function (message) {
            // socket ready?
            if (socket.readyState !== 1) return;
            if (JSON.parse(message.body).messageType === "ANSWER") {
              // if (submitCount + 1 === partlist.length) {
              //   setSeconds(0);
              // } else {
              //   setSubmitCount(submitCount + 1);
              // }
            } else if (JSON.parse(message.body).messageType === "NEW_PROBLEM") {
              setSubmitCount(0);
              bgAudio.currentTime = 0;
              bgAudio.current.play();
              if (JSON.parse(message.body).idx === 0) {
                setStep(-1);
                setProblemOption(JSON.parse(message.body));
                setSeconds(JSON.parse(message.body).timelimit);
              }

              setTimeout(() => {
                setStep(0);
                interval.start();
                setCurIdx(JSON.parse(message.body).idx);
              }, 1500);
            } else if (JSON.parse(message.body).messageType === "STOP") {
              setProblemOption(JSON.parse(message.body));
              setSeconds(JSON.parse(message.body).timelimit);
              getCorrectAnswerList();
              setStep(1);
            } else if (JSON.parse(message.body).messageType === "FINISH") {
              setStep(2);
            }
          }
        );
      },
      function (error) {}
    );
    setSocketManager(client);
    socket.onclose = function () {
      setTimeout(() => {
        getParticipants();
        socket = connect();
      }, 1);
    };

    return socket;
  };

  let displayOptionComponent = () => {
    return (
      <>
        {problemOption.dtype === "MultipleChoiceProblem" ? (
          <Grid className="" justify="center" gutter="sm">
            {problemOption.problemOptions.map(
              ({ description, idx, picture }, i) => {
                let color = ["red", "blue", "green", "orange"];
                let bgColor = "hover:bg-" + color[i] + "-500";
                return (
                  <Grid.Col
                    className="!max-w-[50%] !basis-2/4"
                    key={i}
                    span={5}
                    offset={0}
                  >
                    <Stack
                      justify="space-between"
                      color="blue"
                      className="bg-white rounded-xl h-[300px] shadow-md"
                    >
                      <Group
                        position="center"
                        className="h-16 w-16 bg-blue-300 rounded-xl"
                      >
                        <span className="text-center text-4xl text-white">
                          {i + 1}
                        </span>
                      </Group>
                      <p className="text-center font-semibold text-4xl">
                        {description}
                      </p>
                      <Group className="h-16 w-16"></Group>
                    </Stack>
                  </Grid.Col>
                );
              }
            )}
          </Grid>
        ) : (
          <></>
        )}
        {problemOption.dtype === "SubjectiveProblem" ? (
          <Stack align="flex-start" spacing={120}>
            <Grid
              className="rounded-xl bg-[#85B6FF] border-2 border-solid border-[#447EFF]"
              columns={problemOption.answer.length}
              gutter={"xl"}
            >
              {problemOption.answer
                .split("")
                .map((i: React.Key | null | undefined) => {
                  return (
                    <Grid.Col key={i} span={1}>
                      <Group
                        position="center"
                        className="border-2 border-solid border-gray-300 h-36 w-36 bg-white rounded-xl"
                      >
                        <p className="text-6xl text-center text-gray-300"></p>
                      </Group>
                    </Grid.Col>
                  );
                })}
            </Grid>
            <Grid columns={5} gutter="xl">
              {problemOption.problemOptions.map(({ description }, i) => {
                return (
                  <Grid.Col key={i} span={1}>
                    <Group
                      position="center"
                      className="border-2 border-solid border-gray-300 h-36 w-36 bg-white rounded-xl"
                    >
                      <p className="text-6xl text-center">{description}</p>
                    </Group>
                  </Grid.Col>
                );
              })}
            </Grid>
          </Stack>
        ) : (
          <></>
        )}
        {problemOption.dtype === "OXProblem" ? (
          <Grid gutter="xl" className="!m-0 h-[50vh]" columns={2}>
            <Grid.Col
              span={1}
              color="blue.6"
              className=" flex items-center justify-center border-2 border-solid border-blue-500 rounded-xl bg-white shadow-md"
            >
              <span className="text-9xl font-bold text-blue-500">O</span>
            </Grid.Col>
            <Grid.Col
              span={1}
              color="red.6"
              className=" flex items-center justify-center border-2 border-solid border-red-500 rounded-xl bg-white shadow-md"
            >
              <span className="text-9xl font-bold text-red-500">X</span>
            </Grid.Col>
          </Grid>
        ) : (
          <></>
        )}
      </>
    );
  };

  let displayLoadingScene = () => {
    return (
      <Stack
        align="center"
        className="flex items-center justify-center bg-gradient-to-r from-[#ffc069] to-[#FF9B3F] text h-[100vh]"
      >
        <Stack>
          <Center>
            <Loader color="orange" size="xl" />
          </Center>
          <p className="text-center text-xl text-white font-semibold">
            잠시 후 퀴즈가 시작됩니다...
          </p>
        </Stack>
      </Stack>
    );
  };

  let displayProblemScene = () => {
    return (
      <>
        <Stack align="center" className=" h-[140px] bg-[#273248]">
          <header className="flex items-center jusitfy-center h-[140px] bg-[#273248]">
            <Grid columns={20}>
              <Grid.Col span={2}>
                <ActionIcon variant="transparent" size={60}>
                  <Alarm
                    size={60}
                    color={seconds <= 11 ? "red" : "orange"}
                  ></Alarm>
                </ActionIcon>
              </Grid.Col>
              <Grid.Col className="flex items-center jusitfy-center" span={16}>
                <MantineProvider
                  inherit
                  theme={{
                    defaultGradient: { from: "red", to: "orange", deg: 45 },
                  }}
                >
                  <Progress
                    className="w-[70vw]"
                    size={30}
                    color={seconds <= 11 ? "red" : "orange"}
                    value={
                      ((seconds - 1) / problemOption.timelimit || 30) * 100.0
                    }
                  />
                </MantineProvider>
              </Grid.Col>
              <Grid.Col className="flex items-center jusitfy-center" span={2}>
                <Group className="ml-8 w-[40px] flex items-center jusitfy-center">
                  <p
                    className={`font-semibold ${
                      seconds <= 11 ? "text-red-500" : "text-amber-500"
                    } text-4xl`}
                  >
                    {Math.floor(seconds)}
                  </p>
                </Group>
              </Grid.Col>
            </Grid>
          </header>
        </Stack>

        {/* <Group position="right">
          <Group
            position="center"
            className="mr-16 h-16 w-72 bg-white rounded-b-xl shaodw-2xl"
          >
            <p className="text-center text-xl">문제 풀이 현황</p>
            <ActionIcon color="orange" variant="transparent">
              <Pencil></Pencil>
            </ActionIcon>
            <p className="text-xl font-bold text-center">
              <strong className="text-orange-500">{submitCount}</strong>
              &nbsp;/&nbsp;
              {participants.length}명
            </p>
          </Group>
        </Group> */}
        <Stack
          style={{ height: "calc(100vh - 140px)" }}
          className="flex justify-center"
        >
          <Grid className="!m-0 flex  justify-center" columns={2}>
            <Grid.Col span={1}>
              <Stack className="h-[70vh] relative bg-white mx-16 rounded-xl shadow-xl">
                <Stack
                  align="center"
                  className="ml-16 absolute -top-8 rounded-full bg-orange-500 h-12 w-40"
                >
                  <p className="m-auto text-center text-2xl text-white font-semibold">
                    문제 {curIdx + 1}
                  </p>
                </Stack>
                <Group>
                  <p className="ml-16 text-4xl text-orange-500 font-bold">
                    Q.{" "}
                  </p>
                  <p className="font-bold text-4xl text-left mt-10">
                    {problemOption.description || ""}
                  </p>
                </Group>
                {problemOption.picture === "" ? (
                  alternativeImage()
                ) : (
                  <Image
                    layout="responsive"
                    className="rounded-xl"
                    src={problemOption.picture || "/white.png"}
                    width={300}
                    height={500}
                  ></Image>
                )}
              </Stack>
            </Grid.Col>
            <Grid.Col className="my-auto" span={1}>
              <Stack>{displayOptionComponent()}</Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </>
    );
  };

  let displayLeaderboardScene = () => {
    return (
      <Grid style={{ height: "calc(100vh)" }} gutter={0} columns={20}>
        <Grid.Col
          style={{ height: "calc(100vh)" }}
          className="bg-[#273248]"
          span={6}
        >
          <Stack justify="space-around">
            <Stack>
              <p className="text-white py-16 m-0 font-semibold text-6xl text-center">
                정답자 수는?
              </p>
              <p className="text-white font-bold text-6xl text-center">
                {partlist.length}명 중{" "}
                <strong className="text-6xl text-orange-500 font-bold">
                  {correctAnswerList.totalCorrectCount}명
                </strong>
              </p>
            </Stack>
            <Button
              className="mx-16 mt-[55vh]"
              onClick={() => {
                socketManager.send(
                  "/pub/room/" + router.query.pin + "/next",
                  {}
                );
              }}
              color="orange"
              variant="filled"
              size="xl"
            >
              다음으로
            </Button>
          </Stack>
        </Grid.Col>
        <Grid.Col
          style={{ height: "calc(100vh)" }}
          className="bg-[#F9F5F4]"
          span={14}
        >
          <Stack>
            <ScrollArea style={{ height: "calc(100vh)" }}>
              <Grid columns={6} gutter={0}>
                {correctAnswerList.participantInfo.map((cur: any, i) => {
                  return (
                    <Grid.Col
                      className={`${
                        cur.correct === false ? "opacity-25" : ""
                      } flex items-center justify-center h-60 animate-fadeUp`}
                      span={1}
                      key={i}
                    >
                      <Stack className="w-full m-2 rounded-xl bg-white shadow-lg">
                        <Center
                          className={` rounded-t-xl h-[160px] ${
                            avatarColor[cur.colorNumber]
                          }  shadow-lg`}
                        >
                          <img
                            alt="hello"
                            className={` cursor-pointer rounded-full ${
                              cur.correct === true
                                ? "!overflow-visible animate-bounce"
                                : "animate-drop"
                              // animate-[bounce_1.5s_ease-in-out_infinite]
                            }`}
                            src={avatarAnimal[cur.imageNumber]}
                            width={"120px"}
                            height={"120px"}
                          ></img>
                        </Center>
                        <p className="font-semibold 2xl:text-lg md:text-sm pb-4 text-center text-black">
                          {cur.nickname}
                        </p>
                      </Stack>
                    </Grid.Col>
                  );
                })}
              </Grid>
            </ScrollArea>
          </Stack>
        </Grid.Col>
      </Grid>
    );
  };

  let displayResultScene = () => {
    return (
      <Stack spacing={0}>
        <header className="h-[140px] bg-[#273248]">
          <Group
            position="center"
            style={{
              height: "140px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <p className="text-4xl text-white font-semibold">퀴즈 결과</p>
          </Group>
        </header>

        <Stack
          align="center"
          style={{
            height: "calc(100vh - 140px)",
          }}
          className="flex items-center justify-center bg-[#ffd178]"
        >
          <Stack className=" h-[76vh] w-[50vw] rounded-xl bg-[#ffffff] bg-opacity-50">
            <Stack className="m-8">
              <Stack className="h-[10vh]">
                <p className="text-4xl font-semibold text-center">
                  <strong className=" text-[#447EFF]">입체적인 피카소</strong>님
                  축하드립니다!
                </p>
                <p className="text-2xl text-center">
                  더 많은 정답을 맞춰서 상위 자리를 노려보세요!
                </p>
              </Stack>
              <Stack>
                <Group
                  className="animate-fadeIn bg-white rounded-xl p-4"
                  position="apart"
                >
                  <Image
                    src="/medal_first.svg"
                    width={103}
                    height={126}
                  ></Image>
                  <p className="text-4xl font-semibold text-center text-[#DA662C]">
                    입체적인 피카소
                  </p>
                  <Image
                    className="rounded-xl"
                    src="/dog.png"
                    width={120}
                    height={120}
                  ></Image>
                </Group>
                <Group
                  className="animate-fadeIn bg-white rounded-xl p-4"
                  position="apart"
                >
                  <Image
                    src="/medal_second.svg"
                    width={103}
                    height={126}
                  ></Image>
                  <p className="text-4xl font-semibold text-center text-[#EF8E54]">
                    독보적인 내쉬
                  </p>
                  <Image
                    className="rounded-xl"
                    src="/rabbit.png"
                    width={120}
                    height={120}
                  ></Image>
                </Group>
                <Group
                  className="animate-fadeIn bg-white rounded-xl p-4"
                  position="apart"
                >
                  <Image
                    src="/medal_third.svg"
                    width={103}
                    height={126}
                  ></Image>
                  <p className="text-4xl font-semibold text-center text-[#E7A276]">
                    고뇌하는 니체
                  </p>
                  <Image
                    className="rounded-xl"
                    src="/panda.png"
                    width={120}
                    height={120}
                  ></Image>
                </Group>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <img
          className="absolute top-40 left-0 z-50"
          src="/confetti.gif"
          width={300}
          height={300}
        ></img>
        <img
          className="absolute bottom-20 left-20 z-50"
          src="/confetti.gif"
          width={240}
          height={240}
        ></img>
        <img
          className="absolute top-40 right-10 z-50"
          src="/confetti.gif"
          width={240}
          height={240}
        ></img>
        <img
          className="absolute bottom-0 right-0 z-50"
          src="/confetti.gif"
          width={350}
          height={350}
        ></img>
      </Stack>
    );
  };

  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* audio */}
      <audio
        ref={bgAudio}
        className="invisible"
        src="/sounds/play_music.wav"
      ></audio>
      <audio
        ref={endingEffectAudio}
        className="invisible"
        src="/sounds/boom_short.mp3"
      ></audio>
      <Group className="absolute bottom-0 right-0 z-50">
        <Button
          className="shadow-xl"
          color="orange"
          onClick={() => {
            setStep(-1);
          }}
        >
          대기중
        </Button>
        <Button
          className="shadow-xl"
          color="orange"
          onClick={() => {
            setStep(0);
          }}
        >
          문제 표시
        </Button>
        <Button
          className="shadow-xl"
          color="orange"
          onClick={() => {
            setStep(1);
          }}
        >
          정답자 표시
        </Button>
        <Button
          className="shadow-xl"
          color="orange"
          onClick={() => {
            setStep(2);
          }}
        >
          결과 표시
        </Button>
        <Button
          className="shadow-xl"
          color="blue"
          onClick={() => {
            setSeconds(seconds + 30);
          }}
        >
          시간 추가
        </Button>
        <Button
          className="shadow-xl"
          color="blue"
          onClick={() => {
            setSeconds(10000);
          }}
        >
          시간 정지
        </Button>
        <Button
          className="shadow-xl"
          color="blue"
          onClick={() => {
            setSeconds(0);
          }}
        >
          시간 종료
        </Button>
        <Button
          className="shadow-xl"
          color="green"
          onClick={() => {
            alert(submitCount);
          }}
        >
          제출자 수
        </Button>
      </Group>
      {/* audio */}
      <main className="h-[100vh] bg-[#EDF4F7]">
        <section>
          {/* step : 0 */}
          {step === -1 ? displayLoadingScene() : <></>}
          {step === 0 ? displayProblemScene() : <></>}
          {step === 1 ? displayLeaderboardScene() : <></>}
          {step === 2 ? displayResultScene() : <></>}
        </section>
      </main>
    </div>
  );
};

export default Home;
