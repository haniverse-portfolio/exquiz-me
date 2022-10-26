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
} from "@mantine/core";

import { useScrollIntoView } from "@mantine/hooks";

import {
  avatarAnimal,
  connectMainServerApiAddress,
  testPlayOption,
  testPlayProblem,
} from "../../components/ConstValues";

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
            setStep(step + 1);
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
        <Stack className="bg-orange-400 h-[100vh]">
          <Center>
            <Stack>
              <Center>
                <Loader color="yellow" size="xl" />
              </Center>
              <p className="text-xl text-white font-semibold">
                start 들어올때까지 대기중
              </p>
            </Stack>
          </Center>
        </Stack>
      ) : (
        <></>
      )}

      {step === 1 ? (
        <Container size={1200}>
          <Stack className="mt-32 flex ">
            <Group position="apart">
              <Group>
                <Image
                  alt="hello"
                  className={`cursor-pointer rounded-full`}
                  src={avatarAnimal[0]}
                  width={"80px"}
                  height={"80px"}
                ></Image>
                <Stack spacing={0}>
                  <p>정직한 데카르트</p>
                  {/* <p>2350 / 1위</p> */}
                </Stack>
              </Group>
              <p className="text-lg font-semibold">PIN : {pin}</p>
            </Group>
            <Divider size="xs"></Divider>
            <p className="text-lg font-semibold"> 문제 {curIdx + 1 + "번"}</p>
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
                        style={{ height: "200px" }}
                        onClick={() => {
                          setAnswer(answer === i ? -1 : i);
                        }}
                        color={color[i]}
                        className={`${
                          answer === i ? "shadow-inner text-white" : ""
                        } shadow-md ${answer === i ? bgColor : ""} ${
                          answer === i ? bgColor : ""
                        }`}
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
                  client.send(
                    "/pub/room/" + pin + "/submit",
                    {},
                    JSON.stringify({
                      messageType: "ANSWER", // 반드시 "ANSWER"
                      fromSession: localStorage.getItem("fromSession"), // 사용자 session id - google login시 발급
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
              color="orange"
            >
              제출하기
            </Button>
          </Stack>
        </Container>
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
