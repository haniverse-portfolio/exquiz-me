import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import IndexNavigation from "../components/IndexNavigation";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  Button,
  Group,
  useMantineTheme,
  Stack,
  ActionIcon,
} from "@mantine/core";
import {
  User,
  Database,
  TrendingUp,
  BrandFacebook,
  BrandTwitter,
  BrandInstagram,
  BrandLinkedin,
  Circle,
} from "tabler-icons-react";
import {
  indexIsLogined,
  indexToken,
  indexUserInfo,
} from "../components/States";
import { useRecoilState } from "recoil";
import { connectMainServerApiAddress } from "../components/ConstValues";

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

// const Window = require("window");
// const window = new Window();

// const urlParams = new URL(window.location.href).searchParams;
// const access_token = urlParams.get("access_token");

const Home: NextPage = () => {
  useEffect(() => {
    getTest(router.query.access_token as string);
  }, []);

  const [isLogined, setIsLogined] = useRecoilState(indexIsLogined);
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useRecoilState(indexUserInfo);

  const getTest = async (tk: string) => {
    const config = {
      headers: { Authorization: `Bearer ${tk}` },
    };

    axios
      .get(connectMainServerApiAddress + "api/user", config)
      .then((result) => {
        setUserInfo(result.data);
        setIsLogined("1");
      })
      .catch(() => {
        setIsLogined("0");
      });
  };

  const router = useRouter();
  const theme = useMantineTheme();
  // const [access_token] = router.query.params || [];
  // const access_token = router.query.params.get("access_token");

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const [active, setActive] = useState(0);
  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* navigation bar */}
      <IndexNavigation />

      <main>
        <section className="h-[83vh]">
          <Stack spacing={0} className="items-center flex contents-between">
            {/* banner-start */}
            <Stack className="items-center h-[40vh] w-[100vw] bg-gradient-to-l from-amber-500 via-amber-500 to-orange-500 animate-textSlow">
              <Group className="my-auto px-10" position="apart">
                <Stack>
                  <p className="mx-auto text-white drop-shadow-lg font-bold text-6xl">
                    퀴즈의 새로운 경험을 제시하다
                  </p>
                  <p className="mx-auto text-white drop-shadow-lg font-bold text-2xl mt-2">
                    학교{" "}
                    <span className="text-transparent bg-clip-text bg-red-200">
                      선생님
                    </span>
                    , 회사{" "}
                    <span className="text-transparent bg-clip-text bg-blue-200">
                      팀장님
                    </span>
                    , 퀴즈{" "}
                    <span className="text-transparent bg-clip-text bg-lime-300">
                      애호가
                    </span>{" "}
                    누구든
                  </p>
                  <Button
                    onClick={() => {
                      getTest(router.query.access_token as string);
                    }}
                  >
                    what is params?
                  </Button>
                  <p className="mx-auto text-white drop-shadow-lg font-bold text-2xl">
                    퀴즈를 만들고 참여하여 다함께 즐겨보세요!
                  </p>
                  <Group spacing="xl" className="mt-10">
                    <Group position="left">
                      <ActionIcon variant="transparent">
                        <User color="white" />
                      </ActionIcon>
                      <p className="text-white drop-shadow-lg font-bold text-xl">
                        가입자 0명
                      </p>
                    </Group>
                    <Group position="left">
                      <ActionIcon variant="transparent">
                        <Database color="white" />
                      </ActionIcon>
                      <p className="text-white drop-shadow-lg font-bold text-xl">
                        문제 0개
                      </p>
                    </Group>
                    <Group position="left">
                      <ActionIcon variant="transparent">
                        <TrendingUp color="white" />
                      </ActionIcon>
                      <p className="text-white drop-shadow-lg font-bold text-xl">
                        개설된 방 0개
                      </p>
                    </Group>
                  </Group>
                </Stack>
                <Stack>
                  <Group>
                    <Button
                      size="lg"
                      className="ease-in-out duration-300 hover:scale-105 shadow-md"
                      variant="light"
                      color="orange"
                    >
                      🎉 &nbsp;&nbsp;데모 체험하기
                    </Button>
                    <Button
                      onClick={() => {
                        router.push("/create");
                      }}
                      size="lg"
                      className="ease-in-out duration-300 hover:scale-105 shadow-md"
                      variant="filled"
                      color="orange"
                    >
                      ✍️ &nbsp;&nbsp;퀴즈 만들어보기
                    </Button>
                  </Group>
                </Stack>
              </Group>
            </Stack>
            {/* banner-end */}

            {/* category-start */}
            <Stack className="items-center h-[40vh] w-[100vw]">
              <Group className="my-auto" spacing="xl" position="center">
                <Stack>
                  <Group className="cursor-pointer w-36 h-36 rounded-full bg-gradient-to-r from-red-500 to-orange-500 ease-in-out duration-300 hover:scale-105 shadow-md"></Group>
                  <p className="m-auto font-bold text-xl text-black">
                    학교 및 학원
                  </p>
                </Stack>
                <Stack>
                  <Group className="cursor-pointer w-36 h-36 mx-28 rounded-full bg-gradient-to-r from-blue-500 to-green-500 ease-in-out duration-300 hover:scale-105 shadow-md"></Group>
                  <p className="m-auto font-bold text-xl text-black">
                    회사 및 기관
                  </p>
                </Stack>
                <Stack>
                  <Group className="cursor-pointer w-36 h-36 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 ease-in-out duration-300 hover:scale-105 shadow-md"></Group>
                  <p className="m-auto font-bold text-xl text-black">
                    취미 활동
                  </p>
                </Stack>
              </Group>
            </Stack>
            {/* category-end */}
          </Stack>
        </section>
      </main>
      <footer className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col ">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <ActionIcon>
              <Circle></Circle>
            </ActionIcon>
            <span className="ml-3 text-xl">익스퀴즈미</span>
          </a>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            © 2022 익스퀴즈미 —
            <a
              href="https://retro5pect.tistory.com/"
              className="text-gray-600 ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              @retro5pect
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a className="text-gray-500">
              <ActionIcon>
                <BrandFacebook></BrandFacebook>
              </ActionIcon>
            </a>
            <a className="ml-3 text-gray-500">
              <ActionIcon>
                <BrandTwitter></BrandTwitter>
              </ActionIcon>
            </a>
            <a className="ml-3 text-gray-500">
              <ActionIcon>
                <BrandInstagram></BrandInstagram>
              </ActionIcon>
            </a>
            <a className="ml-3 text-gray-500">
              <ActionIcon>
                <BrandLinkedin></BrandLinkedin>
              </ActionIcon>
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
