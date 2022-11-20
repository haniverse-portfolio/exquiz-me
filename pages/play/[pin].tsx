import Router, { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

import { Button, Stack, Grid, Container, Loader, Center } from "@mantine/core";

import {
  connectMainServerApiAddress,
  playOption,
  playProblem,
} from "../../components/ConstValues";
import { Alarm } from "tabler-icons-react";

const Home: NextPage = () => {
  /* initialization */
  const router = useRouter();
  /* *** core initialization *** */

  /* *** web socket *** */
  var socket = new SockJS(connectMainServerApiAddress + "stomp");
  let client: Stomp.Client;
  client = Stomp.over(socket);

  let connect = () => {
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
            getRoomOpened();
            setStep(1);
          } else if (JSON.parse(message.body).messageType === "STOP") {
            setStep(0);
          }
        });
      },
      function (error) {}
    );

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
  const [answer, setAnswer] = useState(-1);
  const [uuid, setUuid] = useState("");
  const [curIdx, setCurIdx] = useState(0);

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
                src={problemOption.picture || "/white.png"}
                alt="logo"
                width={232}
                height={145}
              />
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
                  setStep(0);
                  setTimeout(() => {
                    var cat = localStorage.getItem("fromSession");
                    client.send(
                      "/pub/room/" + router.query.pin + "/submit",
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
