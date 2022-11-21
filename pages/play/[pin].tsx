import Router, { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
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
  Group,
  TextInput,
  ActionIcon,
} from "@mantine/core";

import {
  connectMainServerApiAddress,
  playOption,
  playProblem,
  playSubjectiveOption,
} from "../../components/ConstValues";
import { Alarm, Trash } from "tabler-icons-react";

const Home: NextPage = () => {
  /* initialization */
  const router = useRouter();
  /* *** core initialization *** */

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
        console.log(router.query.pin);
        if (router.query.pin === undefined) router.push("/404");

        client.subscribe("/topic/room/" + router.query.pin, function (message) {
          if (JSON.parse(message.body).messageType === "NEW_PROBLEM") {
            setProblemOption(JSON.parse(message.body));
            setCurIdx(JSON.parse(message.body).idx);
            setStep(1);
          } else if (JSON.parse(message.body).messageType === "STOP") {
            setStep(0);
          }
        });
      },
      function (error) {}
    );
    setSocketManager(client);
    socket.onclose = function () {
      setTimeout(() => {
        socket = connect();
      }, 1000);
    };

    return socket;
  };

  /* *** use-state *** */
  const [step, setStep] = useState(0);
  const [problemOption, setProblemOption] = useState({
    messageType: "",
    fromSession: "",
    id: "",
    title: "",
    description: "",
    dtype: "",
    timelimit: 0,
    score: 0,
    picture: "",
    answer: "",
    idx: 0,
    problemOptions: [
      {
        id: 0,
        idx: 0,
        description: "",
        picture: "",
        pickCount: 0,
      },
    ],
  });
  const [answer, setAnswer] = useState("");
  const [uuid, setUuid] = useState("");
  const [curIdx, setCurIdx] = useState(0);
  const [subjectiveOption, setSubjectiveOption] =
    useState(playSubjectiveOption);

  /* *** use-effect *** */
  useEffect(() => {
    if (!router.isReady) return;
    connect();
  }, [router.isReady]);

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

  const getLeaderboard = async () => {
    const { data: result } = await axios.get(
      "https://api.exquiz.me/api/room/100310/mq/leaderboard"
    );
    return result.data;
  };

  const submit = async () => {
    const { data: result } = await axios.post(
      "https://dist.exquiz.me/api/room/100310/mq/submit",
      {
        answerText: answer,
        problemIdx: curIdx,
        uuid: uuid,
      }
    );
    return result.data;
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
          className="flex items-center justify-center bg-orange-400 h-[100vh]"
        >
          <Stack>
            <Center>
              <Loader color="yellow" size="xl" />
            </Center>
            <p className="text-center text-xl text-white font-semibold">
              다음 퀴즈 대기 중...
            </p>
          </Stack>
          {/* <Button
            onClick={() => {
              setStep(1);
            }}
          >
            다음 스텝으로
          </Button> */}
        </Stack>
      ) : (
        <></>
      )}

      {step === 1 ? (
        <>
          <Stack className="bg-[#ffd178]"></Stack>
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
              <Image
                className="rounded-xl"
                src={problemOption.picture || "/white.png"}
                alt="logo"
                width={232}
                height={145}
              />
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
                                  answer === i.toString() ? "-1" : i.toString()
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
                  <Button
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
                      // client.send(
                      //   "/pub/room/" + pin + "/submit",
                      //   {},
                      //   JSON.stringify({
                      //     messageType: "ANSWER", // 반드시 "ANSWER"
                      //     fromSession: "", // 사용자 session id - google login시 발급
                      //     problemIdx: 0, // 제출한 문제의 번호
                      //     answerText: answer.toString,
                      //   })
                      // );
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
                  <Stack spacing={10}>
                    <Button
                      fullWidth
                      style={{ height: "150px" }}
                      onClick={() => {
                        setAnswer(answer === "0" ? "-1" : "0");
                      }}
                      color="blue.6"
                      className={`!max-w-[100%] !basis-4/4 ${
                        answer === "0" ? "shadow-inner text-white" : ""
                      } shadow-md`}
                      variant={answer === "0" ? "filled" : "outline"}
                    >
                      <span className="text-6xl font-bold">O</span>
                    </Button>
                    <Button
                      fullWidth
                      style={{ height: "150px" }}
                      onClick={() => {
                        setAnswer(answer === "1" ? "-1" : "1");
                      }}
                      color="red.6"
                      className={`${
                        answer === "1" ? "shadow-inner text-white" : ""
                      } shadow-md`}
                      variant={answer === "1" ? "filled" : "outline"}
                    >
                      <span className="text-6xl font-bold">X</span>
                    </Button>
                  </Stack>
                  <Button
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
                    size="xl"
                    rightSection={
                      <ActionIcon
                        onClick={() => {
                          setAnswer("");
                          setSubjectiveOption(playSubjectiveOption);
                        }}
                      >
                        <Trash></Trash>
                      </ActionIcon>
                    }
                    value={answer}
                    placeholder="아래 자판에서 정답을 완성해보세요"
                  ></TextInput>
                  <Grid columns={5} className="" justify="center" gutter="sm">
                    {problemOption.problemOptions.map(
                      ({ description, idx, picture }, i) => {
                        let color = ["red", "blue", "green", "orange"];
                        let bgColor = "hover:bg-" + color[i] + "-500";
                        return (
                          <>
                            <Grid.Col
                              className="!max-w-[20%] !basis-1/5"
                              key={i}
                              span={1}
                              offset={0}
                            >
                              <Button
                                fullWidth
                                style={{ height: "150px" }}
                                onClick={() => {
                                  if (subjectiveOption[i] === false)
                                    setAnswer(answer + description);
                                }}
                                color="blue"
                                className={`${
                                  subjectiveOption[i] === true
                                    ? "shadow-inner text-white"
                                    : ""
                                } shadow-md`}
                                variant={
                                  subjectiveOption[i] === true
                                    ? "filled"
                                    : "outline"
                                }
                              >
                                <p className="text-lg"> {description}</p>
                              </Button>
                            </Grid.Col>
                          </>
                        );
                      }
                    )}
                  </Grid>
                  <Button
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
                      // client.send(
                      //   "/pub/room/" + pin + "/submit",
                      //   {},
                      //   JSON.stringify({
                      //     messageType: "ANSWER", // 반드시 "ANSWER"
                      //     fromSession: "", // 사용자 session id - google login시 발급
                      //     problemIdx: 0, // 제출한 문제의 번호
                      //     answerText: answer.toString,
                      //   })
                      // );
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
