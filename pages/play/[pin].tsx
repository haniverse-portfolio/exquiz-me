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
  Divider,
} from "@mantine/core";

import {
  connectMainServerApiAddress,
  playOption,
  playProblem,
  playSubjectiveOption,
} from "../../components/ConstValues";
import { Alarm, Trash, X } from "tabler-icons-react";

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
        if (router.query.pin === undefined) router.push("/404");

        client.subscribe("/topic/room/" + router.query.pin, function (message) {
          // socket ready?
          if (socket.readyState !== 1) return;
          if (JSON.parse(message.body).messageType === "NEW_PROBLEM") {
            setSubjectiveOption(playSubjectiveOption);
            setProblemOption(JSON.parse(message.body));
            setCurIdx(JSON.parse(message.body).idx);
            setTimeout(() => {
              setStep(1);
            }, 1500);
          } else if (JSON.parse(message.body).messageType === "STOP") {
            setAnswer("");
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
      }, 1);
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
      connectMainServerApiAddress +
        `api/room/${router.query.pin}/mq/leaderboard`
    );
    return result.data;
  };

  let alternativeImage = () => {
    return (
      <Stack align="center" className="my-4 flex items-center justify-center">
        <Stack>
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
    );
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
          className="flex items-center justify-center bg-[#FF9B3F] h-[100vh]"
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
              {problemOption.picture === "" ? (
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
              )}
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
                                  style={{ height: "100px" }}
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
                                  } shadow-md`}
                                  variant={
                                    subjectiveOption[i] === true
                                      ? "filled"
                                      : "default"
                                  }
                                >
                                  <p className="text-3xl font-bold">
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
