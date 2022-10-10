import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import IndexNavigation1 from "../components/IndexNavigation1";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  Button,
  Group,
  useMantineTheme,
  Stack,
  ActionIcon,
  Modal,
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
  Pencil,
  BuildingSkyscraper,
  Puzzle,
} from "tabler-icons-react";
import {
  indexIsLogined,
  indexIsModalOpened,
  indexUserInfo,
} from "../components/States";
import { useRecoilState } from "recoil";
import { connectMainServerApiAddress } from "../components/ConstValues";
import { FooterCentered } from "../components/footer";
import { AuthenticationForm } from "../components/googleLogin";

const Home: NextPage = () => {
  const router = useRouter();
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];
  /* *** states start *** */
  const [isLogined, setIsLogined] = useRecoilState(indexIsLogined);
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useRecoilState(indexUserInfo);
  const [modalOpened, setModalOpened] = useRecoilState(indexIsModalOpened);
  /* *** states end *** */

  /* *** effect start *** */
  useEffect(() => {
    if ((router.query.access_token as string) !== "/") {
      getTest(router.query.access_token as string);
    }
  }, [router.query.access_token as string]);
  /* *** effect start *** */

  /* *** axios start *** */
  const getTest = async (tk: string) => {
    const config = {
      headers: { Authorization: `Bearer ${tk}` },
    };

    axios
      .get(connectMainServerApiAddress + "api/user", config)
      .then((result) => {
        setUserInfo(result.data);
        setIsLogined("1");
        router.push("/");
      })
      .catch(() => {});
  };
  /* *** axios end *** */
  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* navigation bar */}
      <IndexNavigation1 />
      <Modal
        withCloseButton={false}
        centered
        opened={modalOpened === "0" ? false : true}
        onClose={() => setModalOpened("0")}
      >
        <AuthenticationForm></AuthenticationForm>
      </Modal>
      <main>
        <section className="h-[82vh]">
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
                        router.push("/inbox");
                      }}
                      size="lg"
                      className="ease-in-out duration-300 hover:scale-105 shadow-md"
                      variant="filled"
                      color="orange"
                    >
                      ✍️ &nbsp;&nbsp;내 퀴즈 관리하기
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
                  <Group className="cursor-pointer w-36 h-36 rounded-full bg-gradient-to-r from-red-500 to-orange-500 ease-in-out duration-300 hover:scale-105 shadow-md">
                    <ActionIcon
                      size={64}
                      className="m-auto"
                      variant="transparent"
                    >
                      <Pencil color="white"> </Pencil>
                    </ActionIcon>
                  </Group>
                  <p className="m-auto font-bold text-xl text-black">
                    학교 및 학원
                  </p>
                </Stack>
                <Stack>
                  <Group className="cursor-pointer w-36 h-36 mx-28 rounded-full bg-gradient-to-r from-blue-500 to-green-500 ease-in-out duration-300 hover:scale-105 shadow-md">
                    <ActionIcon
                      size={64}
                      className="m-auto"
                      variant="transparent"
                    >
                      <BuildingSkyscraper color="white"> </BuildingSkyscraper>
                    </ActionIcon>
                  </Group>
                  <p className="m-auto font-bold text-xl text-black">
                    회사 및 기관
                  </p>
                </Stack>
                <Stack>
                  <Group className="cursor-pointer w-36 h-36 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 ease-in-out duration-300 hover:scale-105 shadow-md">
                    <ActionIcon
                      size={64}
                      className="m-auto"
                      variant="transparent"
                    >
                      <Puzzle color="white"> </Puzzle>
                    </ActionIcon>
                  </Group>
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
      <FooterCentered
        links={[
          {
            link: "https://retro5pect.tistory.com",
            label: "Copyright 2022 exquiz.me Co. all rights reserved.",
          },
          // { link: "https://www.naver.com", label: "네이버" },
        ]}
      />
    </div>
  );
};

export default Home;
