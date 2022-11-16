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
  Group,
  useMantineTheme,
  Stack,
  Grid,
  Container,
  Divider,
  Loader,
  Center,
  ActionIcon,
  MantineProvider,
  Progress,
} from "@mantine/core";

import { useScrollIntoView } from "@mantine/hooks";

import {
  avatarAnimal,
  connectMainServerApiAddress,
  testPlayOption,
  testPlayProblem,
} from "../../components/ConstValues";
import { Alarm } from "tabler-icons-react";

const Home: NextPage = () => {
  const router = useRouter();
  const pin = router.query.pin;

  let client: Stomp.Client;
  let socket = new SockJS(connectMainServerApiAddress + "stomp");
  client = Stomp.over(socket);

  let connect = () => {
    const headers = {};

    let reconnect = 0;
    client.connect(
      {},
      function (frame) {
        client.subscribe("/topic/room/" + pin ?? "000000", function (message) {
          if (JSON.parse(message.body).messageType === "NEW_PROBLEM") {
            setStep(1);
          }
        });
      },
      function (error) {
        console.log("websocket error");
      }
    );
  };
  useEffect(() => {
    if (!router.isReady) return;
    connect();
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
  }, [router.isReady]);

  let [curIdx, setCurIdx] = useState(0);
  const [step, setStep] = useState(0);
  {
    /* *** main state *** */
  }
  let [problemSet, setProblemSet] = useState({
    closingMent: "",
    description: "",
    hostId: 1,
    title: "",
  });

  let [problem, setProblem] = useState(testPlayProblem);
  let [option, setOption] = useState(testPlayOption);
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView();
  const [answer, setAnswer] = useState(-1);

  {
    /* mantine statement */
  }
  const theme = useMantineTheme();
  const getColor = (color: string) =>
    theme.colors[color][theme.colorScheme === "dark" ? 5 : 7];

  {
    /* 2. 문제 추가 - subNav - tab */
  }

  {
    /* 1. 퀴즈 설정 - 메인 #과목 선택 */
  }

  {
    /* 1. 퀴즈 설정 - 사이드바 - #stepper */
  }

  /* submit form */
  let submitForm = {
    answerText: "1",
    problemIdx: 1,
    uuid: "d7a23266-6fc7-421a-9ed8-aad169013e52",
  };

  const getLeaderboard = async () => {
    const { data: result } = await axios.get(
      "https://api.exquiz.me/api/room/100310/mq/leaderboard"
    );
    return result.data;
  };

  const getProblemsets = () => {
    let rt = [{ id: -1, title: "", description: "", closingMent: "" }];
    axios
      .get("https://api.exquiz.me/api/problemsets/1")
      .then((result) => {
        setProblemSet(result.data);
      })
      .catch((error) => {
        alert(error);
      });
    return;
  };

  const submit = async () => {
    const { data: result } = await axios.post(
      "https://dist.exquiz.me/api/room/100310/mq/submit",
      submitForm
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
              퀴즈 시작 대기 중...
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
          <Stack className="bg-[#ffd178]">
            <Stack spacing={0} className="rounded-b-xl bg-[#273248] h-[10vh]">
              <Group className="my-2" position="center">
                <ActionIcon variant="transparent" size={40}>
                  <Alarm size={40} color="orange"></Alarm>
                </ActionIcon>

                <p className="font-semibold text-amber-500 text-3xl">30</p>
              </Group>
              <Center>
                <MantineProvider
                  inherit
                  theme={{
                    defaultGradient: { from: "red", to: "orange", deg: 45 },
                  }}
                >
                  <Progress
                    className="w-[70vw]"
                    size="xl"
                    color="orange"
                    // color={theme.fn.gradient({
                    //   from: "red",
                    //   to: "orange",
                    //   deg: 45,
                    // })}
                    value={50}
                  />
                </MantineProvider>
              </Center>
            </Stack>
          </Stack>
          <Container className="bg-[#ffd178] h-[100vh]" size={1200}>
            <Stack className="h-8"></Stack>
            <Stack className="relative p-8 rounded-xl shadow-lg bg-white">
              <Stack
                align="center"
                className=" absolute -top-6 rounded-full bg-orange-500 h-12 w-40"
              >
                <p className="m-auto text-center text-2xl text-white font-semibold">
                  문제 1/5
                </p>
              </Stack>
              <p className=" text-4xl text-orange-500 font-bold">Q. </p>
              <p className="m-auto text-center text-2xl font-semibold">
                우리나라에서 가장 높은 산은?
              </p>
              <Image
                src="/halla_mountain.svg"
                alt="logo"
                width={232}
                height={145}
              />
              <Grid className="" justify="center" gutter="sm">
                {option[curIdx].map(
                  ({ description, idx, picture, problemId }, i) => {
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
                            setAnswer(answer === i ? -1 : i);
                          }}
                          color="blue"
                          className={`${
                            answer === i ? "shadow-inner text-white" : ""
                          } shadow-md`}
                          variant={answer === i ? "filled" : "outline"}
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
                  setTimeout(() => {
                    var cat = localStorage.getItem("fromSession");
                    client.send(
                      "/pub/room/" + pin + "/submit",
                      {},
                      JSON.stringify({
                        messageType: "ANSWER", // 반드시 "ANSWER"
                        fromSession: cat, // 사용자 session id - google login시 발급
                        problemIdx: 0, // 제출한 문제의 번호
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
              {/* <Button
              onClick={() => {
                var cat = localStorage.getItem("fromSession");
                alert(cat);
              }}
            >
              세션 값 확인
            </Button> */}
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
function sleep(arg0: number) {
  throw new Error("Function not implemented.");
}
