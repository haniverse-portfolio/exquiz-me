import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import NavIndex from "../components/navIndex";
import { useState } from "react";

import { Button, Group, useMantineTheme, Stack, Text } from "@mantine/core";
import { Pencil, Folders } from "tabler-icons-react";

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
  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>{NavIndex()}</header>

      <main style={{ margin: "0px" }}>
        <section className="h-[86vh]">
          <Stack className="items-center flex contents-between">
            <Stack className="items-center h-[40vh] w-[100vw] bg-gradient-to-r from-amber-500 via-amber-500 to-orange-500">
              <p className="mx-auto text-white drop-shadow-lg font-bold text-6xl mt-10">
                퀴즈의 새로운 경험을 제시하다
              </p>
            </Stack>
            <p className="mx-auto font-bold drop-shadow-md underline decoration-amber-500 text-6xl mb-10">
              exquiz.me
            </p>
            {/* <Image
                        src="https://exquiz-image.s3.ap-northeast-2.amazonaws.com/static/KakaoTalk_Photo_2022-08-25-00-59-41.png"
                        alt="Picture of the author"
                        width={500}
                        height={500}
                      /> */}
          </Stack>
          <br />
          <br />
          <br />
        </section>
      </main>

      <footer className={styles.footer}>
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
        <Group className="bg-gray-500 w-0 h-0" />
        <Group className="bg-red-500 w-0 h-0" />
        <Group className="bg-green-500 w-0 h-0" />
        <Group className="bg-pink-500 w-0 h-0" />
        <Group className="bg-orange-500 w-0 h-0" />
        <a
          className="no-underline text-black text-sm font-semibold"
          href="/apiTest"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright ⓒ 2022 exquiz.me | Team MUMOMU
        </a>
      </footer>
    </div>
  );
};

export default Home;
