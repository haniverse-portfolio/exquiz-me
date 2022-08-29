import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import React, { useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

import { Button, Center, Group, Stack } from "@mantine/core";

import {} from "tabler-icons-react";
const Home: NextPage = () => {
  /* submit form */
  let submitForm = {
    answerText: "1",
    problemIdx: 1,
    uuid: "d7a23266-6fc7-421a-9ed8-aad169013e52",
  };

  const submit = async () => {
    const { data: result } = await axios.post(
      "https://dist.exquiz.me/api/room/100310/mq/submit",
      submitForm
    );
    return result.data;
  };

  useEffect(() => {
    console.log("페이지 진입");
    connect();
    connect();
  }, []);

  let stompClient: Stomp.Client;

  let connect = () => {
    // stompClient.debug = null;
    const headers = {
      // connect, subscribe에 쓰이는 headers
    };
    var socket = new SockJS(`https://dist.exquiz.me/stomp`);
    stompClient = Stomp.over(socket);

    stompClient.connect(
      headers,
      (frame) => {
        console.log("연결됨");
      },
      () => {
        console.log("연결안됨");
      }
    );
  };

  let send = (data: Object) => {
    const headers = {
      // connect, subscribe에 쓰이는 headers
    };

    stompClient.send("/pub/test", {}, JSON.stringify(data));
  };

  let subscribe = () => {
    const headers = {
      // connect, subscribe에 쓰이는 headers
    };

    stompClient.subscribe(
      "/topic/room",
      (frame) => {
        // subscribe 후 실행하는 곳
      },
      headers
    );
  };

  let unsubscribe = () => {
    const headers = {
      // connect, subscribe에 쓰이는 headers
    };

    stompClient.subscribe(
      "/topic/room",
      (frame) => {
        // subscribe 후 실행하는 곳
      },
      headers
    ).unsubscribe;
  };

  let disConnect = () => {
    if (stompClient !== null) {
      const headers = {
        // disconnect에 쓰이는 headers
      };
      stompClient.disconnect(function () {
        // disconnect 후 실행하는 곳
      }, headers);
    }
  };

  // function connection() {
  //   let socket = new SockJS("https://dist.exquiz.me/stomp");
  //   // let stompClient = Stomp.over(socket);

  //   //stompClient.debug = null;

  //   let body = JSON.stringify({
  //     uuid: "1",
  //     problemIdx: "1",
  //     answerText: "1",
  //   });

  //   stompClient.connect({}, () => {});
  //   // stompClient.subscribe(`sub/test`, () => {},{})
  //   // stompClient.subscribe(`sub/test`, () => {},{}).unsubscribe()
  //   stompClient.send("/pub/test", {}, body);
  //   // stompClient.disconnect();
  // }
  // subscribe : topic/room
  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
        {/* <script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script> */}
        <script src="/webjars/sockjs-client/1.1.2/sockjs.min.js" async></script>
        <script
          src="/webjars/stomp-websocket/2.3.3-1/stomp.min.js"
          async
        ></script>
      </Head>

      <section className={`w-full h-full`}>
        <Center>
          <Center className=" my-2 h-[98.3vh]">
            <Stack>
              {/* main */}
              <Group>
                <Center>
                  <Stack>
                    <Center>
                      <Stack>
                        <Group className="justify-between">
                          <Group spacing={0}>
                            <Group className="shadow-lg" spacing={0}>
                              <Group className="border-r-2 border-gray-300 shadow-lg h-8 w-2 bg-amber-200" />
                              <Group>
                                <Stack spacing={0}>
                                  <Group className="m-0 p-0 h-8 w-10 bg-amber-200">
                                    <p className="pl-1 font-sm">3/8</p>
                                  </Group>
                                </Stack>
                              </Group>
                            </Group>
                            <Group className="shadow-lg m-0 p-0 h-6 w-3 bg-white"></Group>
                          </Group>
                          <Stack>
                            <p className="text-red-500">00:05</p>
                          </Stack>
                        </Group>
                        {/* Navigation Bar */}
                        <p className="underline decoration-amber-500 font-bold text-2xl text-left">
                          우리나라에서 가장 높은 산은?
                        </p>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                      </Stack>
                    </Center>
                    <Stack>
                      <Center>
                        <Stack>
                          <Group>
                            <Button
                              onClick={() => {
                                send(submitForm);
                              }}
                              color="orange"
                              className="h-28 w-32"
                              variant="outline"
                            >
                              지리산
                            </Button>
                            <Button
                              className="h-28 w-32"
                              color="orange"
                              variant="outline"
                            >
                              설악산
                            </Button>
                          </Group>
                          <Group>
                            <Button
                              className="h-28 w-32"
                              color="orange"
                              variant="outline"
                            >
                              한라산
                            </Button>
                            <Button
                              className="h-28 w-32"
                              color="orange"
                              variant="filled"
                            >
                              백두산
                            </Button>
                          </Group>
                        </Stack>
                      </Center>

                      <footer className={styles.footer}>
                        <a
                          className="text-gray-700 no-underline text-black text-sm font-semibold"
                          target="_blank"
                          rel="noopener noreferrer"
                        ></a>
                      </footer>
                    </Stack>
                  </Stack>
                </Center>
              </Group>

              {/* caching tailwind css */}
              <Group className=" bg-gradient-to-r shadow-[inset_0_-2px_4px_rgba(128,128,128,0.8)] border-gray-500 from-gray-500 to-gray-500 w-0 h-0" />
              <Group className="bg-gradient-to-r border-orange-500 from-orange-500 to-red-500 w-0 h-0" />
              <Group className="bg-gradient-to-r border-blue-500 from-blue-500 to-green-500 w-0 h-0" />
              <Group className="bg-gradient-to-r border-violet-500 from-violet-500 to-orange-500 w-0 h-0" />
              <Group className="bg-gradient-to-r border-yellow-500 from-yellow-500 to-orange-500 w-0 h-0" />
              <Group className="bg-gradient-to-r border-gray-500 from-gray-400 to-gray-400 w-0 h-0" />
              <Group className="bg-gradient-to-r border-red-500 from-red-500 to-orange-500 w-0 h-0" />
              <Group className="bg-gradient-to-r border-blue-500 from-blue-700 to-blue-500 w-0 h-0" />
              <Group className="bg-gradient-to-r border-green-500 from-green-500 to-lime-500 w-0 h-0" />
              <Group className="bg-gradient-to-r border-amber-500 from-amber-500 to-yellow-400 w-0 h-0" />
              <Group className="bg-gradient-to-r border-violet-500 from-violet-700 to-fuchsia-600 w-0 h-0" />
            </Stack>
          </Center>
        </Center>
      </section>
    </div>
  );
};

export default Home;
function sleep(arg0: number) {
  throw new Error("Function not implemented.");
}
