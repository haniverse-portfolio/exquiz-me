import Router, { useRouter } from "next/router";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

import {
  Button,
  Stack,
  Grid,
  Container,
  Loader,
  Center,
  TextInput,
  ActionIcon,
  Divider,
  Group,
  RingProgress,
} from "@mantine/core";

import {
  avatarAnimal,
  avatarColor,
  connectMainServerApiAddress,
  playCorrectAnswerList,
  playSubjectiveOption,
  playUserInfoInput,
  problemOptionInput,
} from "../../components/ConstValues";
import { X } from "tabler-icons-react";
import { alternativeImage } from "../../components/play/alternativeImage";

const Home: NextPage = () => {
  /* initialization */
  const router = useRouter();
  /* *** core initialization *** */

  /* *** use-state *** */
  const [step, setStep] = useState(0);
  const [problemOption, setProblemOption] = useState(problemOptionInput);
  const [answer, setAnswer] = useState("");
  const [curIdx, setCurIdx] = useState(0);
  const [subjectiveOption, setSubjectiveOption] =
    useState(playSubjectiveOption);

  const [correctAnswerList, setCorrectAnswerList] = useState(
    playCorrectAnswerList
  );

  /* *** use-effect *** */
  useEffect(() => {
    connect();
  }, [router.isReady]);

  const [userBeforeInfo, setUserBeforeInfo] = useState(playUserInfoInput);
  const [userCurrentInfo, setUserCurrentInfo] = useState(playUserInfoInput);
  let getUserProgress = (userProgress: any) => {
    userProgress.participantInfo.forEach(
      (
        cur: SetStateAction<{
          id: number;
          sessionId: string;
          name: string;
          nickname: string;
          entryDate: string;
          currentScore: number;
          beforeScore: number;
          imageNumber: number;
          colorNumber: number;
          correct: boolean;
          totalCorrect: number;
          continuousCorrect: number;
          continuousFailure: number;
        }>,
        i: any
      ) => {
        if ((cur as any).sessionId === localStorage.getItem("fromSession")) {
          setUserBeforeInfo(cur);
        }
        if ((cur as any).sessionId === localStorage.getItem("fromSession")) {
          setUserCurrentInfo(cur);
        }
      }
    );
  };

  /* *** axios call *** */
  const getRoomOpened = () => {
    axios
      .get(connectMainServerApiAddress + `api/room/${router.query.pin}/open`)
      .then((result) => {
        setCurIdx(result.data.currentProblemNum);
        // validation
        if (result.data.currentState !== "READY") return;
      })
      .catch((error) => {});
    return;
  };

  const getCorrectAnswerList = () => {
    axios
      .get(
        connectMainServerApiAddress +
          "api/room/" +
          router.query.pin +
          "/submit_list"
      )
      .then((result) => {
        setCorrectAnswerList(result.data);
        getUserProgress(result.data);
        console.log(result.data);
      })
      .catch((error) => {});
    return;
  };

  // const getLeaderboard = async () => {
  //   const { data: result } = await axios.get(
  //     connectMainServerApiAddress +
  //       `api/room/${router.query.pin}/mq/leaderboard`
  //   );
  //   return result.data;
  // };

  /* *** web socket *** */
  const [socketManager, setSocketManager] = useState<any>(null);
  let connect = () => {
    var socket = new SockJS(connectMainServerApiAddress + "stomp");
    let client: Stomp.Client;
    client = Stomp.over(socket);

    const headers = {};
    var reconnect = 0;
    client.connect(
      {},
      function (frame) {
        if (router.query.pin === undefined) router.push("/404");
        client.subscribe(
          "/topic/room/" + router.query.pin,
          function (message) {
            // socket ready?
            // if (socket.readyState !== 1) return;
            if (JSON.parse(message.body).messageType === "NEW_PROBLEM") {
              setSubjectiveOption([
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
              ]);
              setProblemOption(JSON.parse(message.body));
              setCurIdx(JSON.parse(message.body).idx);
              setTimeout(() => {
                setUserBeforeInfo({
                  id: 0,
                  sessionId: "",
                  name: "",
                  nickname: "",
                  entryDate: "",
                  currentScore: 0,
                  beforeScore: 0,
                  imageNumber: 0,
                  colorNumber: 0,
                  correct: false,
                  totalCorrect: 0,
                  continuousCorrect: 0,
                  continuousFailure: 0,
                });
                setUserCurrentInfo({
                  id: 0,
                  sessionId: "",
                  name: "",
                  nickname: "",
                  entryDate: "",
                  currentScore: 0,
                  beforeScore: 0,
                  imageNumber: 0,
                  colorNumber: 0,
                  correct: false,
                  totalCorrect: 0,
                  continuousCorrect: 0,
                  continuousFailure: 0,
                });
                setStep(1);
              }, 1500);
            } else if (JSON.parse(message.body).messageType === "STOP") {
              setAnswer("");
              getCorrectAnswerList();
              setStep(2);
            } else if (JSON.parse(message.body).messageType === "FINISH") {
              setAnswer("");
              getCorrectAnswerList();
              setStep(3);
            }
          },
          { id: "play" }
        );
      },
      function (error) {}
    );
    setSocketManager(client);
    socket.onclose = function () {
      client.unsubscribe("play");
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
      {step === 0 ? (
        <Stack
          align="center"
          className="flex items-center justify-center animate-textSlow bg-gradient-to-r from-[#FF9B3F] to-[#ffd178] h-[100vh]"
        >
          <Stack>
            <Center>
              <Loader color="orange" size="xl" />
            </Center>
            <p className="text-center text-xl text-white font-semibold">
              다음 퀴즈 대기 중...
            </p>
          </Stack>
        </Stack>
      ) : (
        <></>
      )}

      {step === 1 ? (
        <>
          <Container className="bg-[#ffd178] h-[100vh]" size={1200}>
            <Stack className="h-8"></Stack>
            <Stack className="relative p-8 rounded-xl shadow-lg bg-white">
              <Stack
                align="center"
                className=" absolute -top-6 rounded-full bg-orange-500 h-12 w-40"
              >
                <p className="m-auto text-center text-2xl text-white font-semibold">
                  문제 {curIdx + 1}
                </p>
              </Stack>
              <p className=" text-4xl text-orange-500 font-bold">Q. </p>
              <p className="m-auto text-center text-2xl font-semibold">
                {problemOption.description || ""}
              </p>
              {/* {problemOption.picture === "" ? (
                alternativeImage()
              ) : (
                <Image
                  layout="responsive"
                  className="rounded-xl"
                  src={problemOption.picture || "/white.png"}
                  alt="logo"
                  width={232}
                  height={145}
                />
              )} */}
              {problemOption.dtype === "MultipleChoiceProblem" ? (
                <>
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
                            <Button
                              fullWidth
                              style={{ height: "150px" }}
                              onClick={() => {
                                setAnswer(
                                  answer === i.toString() ? "" : i.toString()
                                );
                              }}
                              color="blue"
                              className={`${
                                answer === i.toString()
                                  ? "shadow-inner text-white"
                                  : ""
                              } shadow-md`}
                              variant={
                                answer === i.toString() ? "filled" : "outline"
                              }
                            >
                              <p className="text-lg"> {description}</p>
                            </Button>
                          </Grid.Col>
                        );
                      }
                    )}
                  </Grid>
                  <Divider size="xs"></Divider>
                  <Button
                    disabled={answer === "" ? true : false}
                    onClick={() => {
                      //connect();
                      setStep(0);
                      setTimeout(() => {
                        var cat = localStorage.getItem("fromSession");
                        socketManager.send(
                          "/pub/room/" + router.query.pin + "/submit",
                          {},
                          JSON.stringify({
                            messageType: "ANSWER",
                            fromSession: cat, // 사용자 session id - google login시 발급
                            problemIdx: curIdx, // 제출한 문제의 번호
                            answerText: answer.toString(),
                          })
                        );
                      }, 500);
                    }}
                    size="lg"
                    color="blue"
                  >
                    제출하기
                  </Button>
                </>
              ) : (
                <></>
              )}

              {problemOption.dtype === "OXProblem" ? (
                <>
                  <Grid gutter="xl" columns={2}>
                    <Grid.Col span={1}>
                      <Button
                        fullWidth
                        style={{ height: "150px" }}
                        onClick={() => {
                          setAnswer(answer === "0" ? "" : "0");
                        }}
                        color="blue.6"
                        className={`!max-w-[100%] !basis-4/4 ${
                          answer === "0" ? "shadow-inner text-white" : ""
                        } shadow-md`}
                        variant={answer === "0" ? "filled" : "outline"}
                      >
                        <span className="text-6xl font-bold">O</span>
                      </Button>
                    </Grid.Col>
                    <Grid.Col span={1}>
                      <Button
                        fullWidth
                        style={{ height: "150px" }}
                        onClick={() => {
                          setAnswer(answer === "1" ? "" : "1");
                        }}
                        color="red.6"
                        className={`${
                          answer === "1" ? "shadow-inner text-white" : ""
                        } shadow-md`}
                        variant={answer === "1" ? "filled" : "outline"}
                      >
                        <span className="text-6xl font-bold">X</span>
                      </Button>
                    </Grid.Col>
                  </Grid>
                  <Divider size="xs"></Divider>
                  <Button
                    disabled={answer === "" ? true : false}
                    onClick={() => {
                      //connect();
                      setStep(0);
                      setTimeout(() => {
                        var cat = localStorage.getItem("fromSession");
                        socketManager.send(
                          "/pub/room/" + router.query.pin + "/submit",
                          {},
                          JSON.stringify({
                            messageType: "ANSWER", // 반드시 "ANSWER"
                            fromSession: cat, // 사용자 session id - google login시 발급
                            problemIdx: curIdx, // 제출한 문제의 번호
                            answerText: answer.toString(),
                          })
                        );
                      }, 500);
                    }}
                    size="lg"
                    color="orange"
                  >
                    제출하기
                  </Button>
                </>
              ) : (
                <></>
              )}
              {problemOption.dtype === "SubjectiveProblem" ? (
                <>
                  <TextInput
                    disabled
                    size="xl"
                    rightSection={
                      <ActionIcon
                        className=" mr-8"
                        size="xl"
                        onClick={() => {
                          setAnswer("");
                          setSubjectiveOption([
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                          ]);
                        }}
                      >
                        <X size="xl"></X>
                      </ActionIcon>
                    }
                    value={answer}
                    placeholder="글자를 터치해서 조합해보세요"
                  ></TextInput>
                  <Stack className=" w-full bg-[#273248] fixed bottom-0 left-0 rounded-t-xl">
                    <Grid className="p-4" columns={5} gutter="sm">
                      {problemOption.problemOptions.map(
                        ({ description, idx, picture }, i) => {
                          let color = ["red", "blue", "green", "orange"];
                          let bgColor = "hover:bg-" + color[i] + "-500";
                          return (
                            <>
                              <Grid.Col key={i} span={1} offset={0}>
                                <Button
                                  fullWidth
                                  style={{ height: "80px" }}
                                  onClick={() => {
                                    if (subjectiveOption[i] === false) {
                                      setAnswer(answer + description);
                                    }
                                    let copy = subjectiveOption;
                                    copy[i] = true;
                                    setSubjectiveOption(copy);
                                  }}
                                  color="orange"
                                  className={`${
                                    subjectiveOption[i] === true
                                      ? "shadow-inner text-white"
                                      : ""
                                  } shadow-md !overflow-visible`}
                                  variant={
                                    subjectiveOption[i] === true
                                      ? "filled"
                                      : "default"
                                  }
                                >
                                  <p className="!overflow-visible text-3xl font-bold">
                                    {" "}
                                    {description}
                                  </p>
                                </Button>
                              </Grid.Col>
                            </>
                          );
                        }
                      )}
                    </Grid>
                  </Stack>
                  <Divider size="xs"></Divider>
                  <Button
                    disabled={answer === "" ? true : false}
                    onClick={() => {
                      //connect();
                      setStep(0);
                      setTimeout(() => {
                        var cat = localStorage.getItem("fromSession");
                        socketManager.send(
                          "/pub/room/" + router.query.pin + "/submit",
                          {},
                          JSON.stringify({
                            messageType: "ANSWER", // 반드시 "ANSWER"
                            fromSession: cat, // 사용자 session id - google login시 발급
                            problemIdx: curIdx, // 제출한 문제의 번호
                            answerText: answer.toString(),
                          })
                        );
                      }, 500);
                    }}
                    size="lg"
                    color="blue"
                  >
                    제출하기
                  </Button>
                </>
              ) : (
                <></>
              )}
            </Stack>
          </Container>
        </>
      ) : (
        <></>
      )}
      {step === 2 ? (
        <>
          <Container className="bg-[#ffd178] h-[100vh]" size={1200}>
            <Stack className="h-8"></Stack>
            <Stack className="relative p-8 rounded-xl shadow-lg bg-white">
              {userCurrentInfo.correct === true ? (
                <p className="m-auto text-center text-2xl font-semibold text-green-700">
                  맞았습니다!!
                </p>
              ) : (
                <p className="m-auto text-center text-2xl font-semibold text-red-700">
                  틀렸습니다
                </p>
              )}
            </Stack>
            <Stack className="relative p-8 mt-8 rounded-xl shadow-lg bg-white">
              <Center>
                <Stack
                  className={`w-6/12 m-2 rounded-xl bg-white shadow-lg ${
                    userCurrentInfo.correct === true ? "" : "opacity-25"
                  }`}
                >
                  <Center
                    className={` rounded-t-xl h-[160px] ${
                      avatarColor[userCurrentInfo.colorNumber]
                    }  shadow-lg`}
                  >
                    <img
                      alt="hello"
                      className={` cursor-pointer rounded-full ${
                        userCurrentInfo.correct === true
                          ? "!overflow-visible animate-bounce"
                          : ""
                        // animate-[bounce_1.5s_ease-in-out_infinite]
                      }`}
                      src={avatarAnimal[userCurrentInfo.imageNumber]}
                      width={"120px"}
                      height={"120px"}
                    ></img>
                  </Center>
                  <p className="font-semibold 2xl:text-lg md:text-sm pb-4 text-center text-black">
                    {userCurrentInfo.nickname}
                  </p>
                </Stack>
              </Center>
              {userCurrentInfo.correct === true ? (
                <p className="m-auto text-center text-2xl font-semibold text-green-700">
                  +{userCurrentInfo.currentScore - userCurrentInfo.beforeScore}
                  점
                </p>
              ) : (
                <></>
              )}
            </Stack>
          </Container>
        </>
      ) : (
        <></>
      )}
      {step === 3 ? (
        <>
          <Container className="bg-[#ffd178] h-[100vh]" size={1200}>
            <Stack className="h-8"></Stack>
            <Stack className="relative p-8 rounded-xl shadow-lg bg-white">
              <p className="m-auto text-center text-2xl font-semibold text-green-700">
                퀴즈 결과
              </p>
            </Stack>
            <Stack className="relative p-8 mt-8 rounded-xl shadow-lg bg-white">
              <Center>
                <Stack
                  className={`w-6/12 m-2 rounded-xl bg-white shadow-lg ${
                    userCurrentInfo.correct === true ? "" : "opacity-25"
                  }`}
                >
                  <Center
                    className={` rounded-t-xl h-[160px] ${
                      avatarColor[userCurrentInfo.colorNumber]
                    }  shadow-lg`}
                  >
                    <img
                      alt="hello"
                      className={` cursor-pointer rounded-full ${
                        userCurrentInfo.correct === true
                          ? "!overflow-visible animate-bounce"
                          : "animate-dropCustomSpin"
                        // animate-[bounce_1.5s_ease-in-out_infinite]
                      }`}
                      src={avatarAnimal[userCurrentInfo.imageNumber]}
                      width={"120px"}
                      height={"120px"}
                    ></img>
                  </Center>
                  <p className="font-semibold 2xl:text-lg md:text-sm pb-4 text-center text-black">
                    {userCurrentInfo.nickname}
                  </p>
                </Stack>
              </Center>
              {userCurrentInfo.correct === true ? (
                <p className="m-auto text-center text-2xl font-semibold text-green-700">
                  {userCurrentInfo.totalCorrect}점
                </p>
              ) : (
                <></>
              )}
            </Stack>
          </Container>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Home;

// setTimeout(() => {
//   var cat = localStorage.getItem("fromSession");
//   client.send(
//     "/pub/room/" + pin + "/submit",
//     {},
//     JSON.stringify({
//       messageType: "ANSWER", // 반드시 "ANSWER"
//       fromSession: cat, // 사용자 session id - google login시 발급
//       problemIdx: 0, // 제출한 문제의 번호
//       answerText: answer.toString(),
//     })
//   );
// }, 500);
