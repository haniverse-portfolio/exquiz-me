import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRef } from "react";
import React, { useEffect } from "react";
import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useRecoilState } from "recoil";
import {
  createImageList,
  createImageURL,
  createIsImageLoading,
  createOption,
  createProblem,
  createProblemIdx,
  createProblemset,
  createScore,
  createStep,
  createTabCurrentIdx,
  createTabNextIdx,
  createTargetIdx,
  createTimelimit,
  partPin,
} from "../components/States";

import {
  dtypeName,
  tabTooltip,
  MARKSCORE,
  MARKSTIME,
} from "../components/ConstValues";

const connectMainServerApiAddress = "https://api.exquiz.me/";

import {
  Button,
  Group,
  useMantineTheme,
  Stack,
  CopyButton,
} from "@mantine/core";
import { ArrowBigRightLines, Qrcode, Copy } from "tabler-icons-react";

const rightEnvelope = (subject: number) => {
  const subjectInfo = [
    { name: "미분류", startColor: "gray", endColor: "gray" },
    { name: "언어", startColor: "orange", endColor: "red" },
    { name: "수리과학", startColor: "blue", endColor: "green" },
    { name: "인문사회", startColor: "violet", endColor: "pink" },
    { name: "예체능", startColor: "yellow", endColor: "orange" },
  ];

  return (
    <Group className="transition ease-in-out hover:scale-105" spacing={0}>
      <Group className="shadow-lg" spacing={0}>
        <Group
          className={`bg-${subjectInfo[subject].startColor} border-r-2 border-gray-300 shadow-lg h-24 w-4 bg-amber-200`}
        />
        <Group>
          <Stack spacing={0}>
            <Group
              className={`bg-gradient-to-r from-${subjectInfo[subject].startColor} to-${subjectInfo[subject].endColor} border-b-2 border-gray-300 m-0 p-0 h-12 w-32 bg-amber-200`}
            />
            <Group
              className={`bg-gradient-to-r from-${subjectInfo[subject].startColor} to-${subjectInfo[subject].endColor} m-0 p-0 h-12 w-32 bg-amber-200`}
            />
          </Stack>
        </Group>
      </Group>
      <Group
        className={`bg-gradient-to-r from-${subjectInfo[subject].startColor} to-${subjectInfo[subject].endColor} shadow-lg m-0 p-0 h-20 w-6 bg-white`}
      ></Group>
    </Group>
  );
};

const leftEnvelope = (subject: number) => {
  const subjectInfo = [
    { name: "미분류", startColor: "gray", endColor: "gray" },
    { name: "언어", startColor: "orange", endColor: "red" },
    { name: "수리과학", startColor: "blue", endColor: "green" },
    { name: "인문사회", startColor: "violet", endColor: "pink" },
    { name: "예체능", startColor: "yellow", endColor: "orange" },
  ];

  return (
    <Group className="transition ease-in-out hover:scale-105" spacing={0}>
      <Group
        className={`bg-gradient-to-r shadow-lg m-0 p-0 h-20 w-6 bg-white`}
      ></Group>
      <Group className="shadow-lg" spacing={0}>
        <Group>
          <Stack spacing={0}>
            <Group
              className={`bg-gradient-to-r from-${subjectInfo[subject].startColor}-500 to-${subjectInfo[subject].endColor}-500 m-0 p-0 h-12 w-32 bg-amber-200`}
            />
            <Group
              className={`bg-gradient-to-r from-${subjectInfo[subject].startColor}-500 to-${subjectInfo[subject].endColor}-500 m-0 p-0 h-12 w-32 bg-amber-200`}
            />
          </Stack>
        </Group>
        <Group
          className={`bg-${subjectInfo[subject].endColor}-500 border-l-2 border-gray-300 shadow-lg h-24 w-4 bg-amber-200`}
        />
      </Group>
    </Group>
  );
};

const Home: NextPage = () => {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const [active, setActive] = useState(0);

  let [partlist, setPartlist] = useState([
    {
      currentScore: 0,
      entryDate: "2022-08-23T08:34:54.994Z",
      id: 0,
      name: "string",
      nickname: "string",
      roomDto: {
        currentProblemNum: 0,
        currentState: "FINISH",
        endDate: "2022-08-23T08:34:54.994Z",
        id: 0,
        maxParticipantCount: 0,
        pin: "string",
        problemsetDto: {
          closingMent: "string",
          description: "string",
          id: 0,
          title: "string",
        },
        startDate: "2022-08-23T08:34:54.994Z",
      },
      uuid: "string",
    },
  ]);

  const getPartlist = () => {
    axios
      .get(connectMainServerApiAddress + "api/room/" + pin + "/participants")
      .then((result) => {
        alert("success");
        setPartlist(result.data);
      })
      .catch((error) => {
        alert("getParticipants_error");
      });
    return;
  };

  let [pin, setPin] = useState("0");

  useEffect(() => {
    pin = JSON.parse(localStorage.getItem("room") ?? "0").pin;
    setPin(pin);
    connect();
  }, []);
  {
    /* webSocket */
  }
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

  // let send = (data: Object) => {
  //   const headers = {
  //     // connect, subscribe에 쓰이는 headers
  //   };

  //   stompClient.send("/pub/test", {}, JSON.stringify(data));
  // };

  // let subscribe = () => {
  //   const headers = {
  //     // connect, subscribe에 쓰이는 headers
  //   };

  //   stompClient.subscribe(
  //     "/topic/room" + pin,
  //     (frame) => {
  //       alert(frame.body);
  //       // subscribe 후 실행하는 곳
  //     },
  //     headers
  //   );
  // };

  // let unsubscribe = () => {
  //   const headers = {
  //     // connect, subscribe에 쓰이는 headers
  //   };

  //   stompClient.subscribe(
  //     "/topic/room",
  //     (frame) => {
  //       // subscribe 후 실행하는 곳
  //     },
  //     headers
  //   ).unsubscribe;
  // };

  // let disConnect = () => {
  //   if (stompClient !== null) {
  //     const headers = {
  //       // disconnect에 쓰이는 headers
  //     };
  //     stompClient.disconnect(function () {
  //       // disconnect 후 실행하는 곳
  //     }, headers);
  //   }
  // };

  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ margin: "0px 10px" }}>
        <section className="h-[86vh]">
          <Stack className="items-center flex contents-between">
            <Stack>
              {/* 메인 배너 */}
              <Stack className="mx-40">
                <Stack>
                  {/* ../public/globe_banner.png */}
                  <p className="underline decoration-amber-500 font-bold text-6xl text-left mt-10">
                    참가 코드
                  </p>
                  <Group>
                    <p className="font-bold text-9xl text-left mb-10">
                      # {pin}
                    </p>{" "}
                    <CopyButton value={pin}>
                      {({ copied, copy }) => (
                        <Button
                          variant="outline"
                          leftIcon={<Copy></Copy>}
                          color={copied ? "teal" : "blue"}
                          onClick={copy}
                        >
                          {copied ? "복사됨!" : "복사하기"}
                        </Button>
                      )}
                    </CopyButton>
                  </Group>
                </Stack>
                <Stack>
                  <Group>
                    {partlist.map((cur, i) => {
                      let color;
                      return <Stack key={i}>{partlist[i].nickname}</Stack>;
                    })}
                  </Group>
                </Stack>
                <br></br>
                <Stack>
                  <Group className="justify-between">
                    <Button
                      color="orange"
                      variant="filled"
                      component="a"
                      href="/inbox"
                      leftIcon={<Qrcode size={38} />}
                    >
                      QR코드 화면
                    </Button>
                    <p className="font-bold text-4xl">
                      입장 인원 : &nbsp;
                      <strong className="text-amber-500"></strong>
                    </p>
                    <Button
                      color="orange"
                      variant="outline"
                      component="a"
                      href="/screenshare"
                      rightIcon={<ArrowBigRightLines size={16} />}
                    >
                      시작하기
                    </Button>
                  </Group>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <br />
          <br />
          <br />
        </section>
      </main>
    </div>
  );
};

export default Home;
