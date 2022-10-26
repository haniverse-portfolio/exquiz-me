import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import IndexNavigation from "../components/index/IndexNavigation";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useScrollIntoView } from "@mantine/hooks";
import {
  Button,
  Group,
  useMantineTheme,
  Stack,
  ActionIcon,
  Modal,
  ScrollArea,
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
import { AuthenticationForm } from "../components/googleLogin";
import { IndexHero1 } from "../components/index/IndexHero1";
import { IndexHero2 } from "../components/index/IndexHero2";
import { IndexHero3 } from "../components/index/IndexHero3";
import { FooterLinks } from "../components/index/indexFooter";

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
    if (navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)) {
      location.replace("/enter");
    }
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
        router.push("/inbox");
      })
      .catch(() => {});
  };

  const viewport = useRef<HTMLDivElement>() as any;

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });
  /* *** axios end *** */
  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal
        withCloseButton={false}
        centered
        opened={modalOpened === "0" ? false : true}
        onClose={() => setModalOpened("0")}
      >
        <AuthenticationForm></AuthenticationForm>
      </Modal>
      {/* navigation bar */}
      <ScrollArea
        style={{ width: "100vw", height: "100vh" }}
        viewportRef={viewport}
        scrollbarSize={0}
      >
        <IndexNavigation />
        <section style={{ height: "calc(100vh - 70px)" }}>
          <Stack spacing={0} className="items-center flex contents-between">
            {/* banner-start */}
            <Stack className="items-center h-[40vh] w-[100vw] bg-gradient-to-l from-amber-500 via-amber-500 to-orange-500 animate-textSlow">
              <Group className="my-auto px-10" position="apart">
                <Stack spacing={0}>
                  <p className="mx-auto text-white drop-shadow-lg font-bold text-6xl">
                    퀴즈의 새로운 경험을 제시하다
                  </p>
                  <p className="mx-auto text-white drop-shadow-lg font-bold text-2xl">
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
                  {/* <Group spacing="xl" className="mt-10">
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
                  </Group> */}
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
                  <Group
                    onClick={() => {
                      viewport.current.scrollTo({
                        top: viewport.current.scrollHeight,
                        // top: viewport.current.scrollHeight / 2,
                        behavior: "smooth",
                      });
                    }}
                    className="cursor-pointer w-36 h-36 rounded-full bg-gradient-to-r from-red-500 to-orange-500 ease-in-out duration-300 hover:scale-105 shadow-md"
                  >
                    <ActionIcon
                      size={64}
                      className="m-auto"
                      variant="transparent"
                    >
                      <Pencil color="white"> </Pencil>
                    </ActionIcon>
                  </Group>
                  <p className="m-auto font-bold text-xl text-black">
                    문제 출제
                  </p>
                </Stack>
                <Stack>
                  <Group
                    onClick={() => {
                      viewport.current.scrollTo({
                        top: "200vh",
                        behavior: "smooth",
                      });
                    }}
                    className="cursor-pointer w-36 h-36 mx-28 rounded-full bg-gradient-to-r from-blue-500 to-green-500 ease-in-out duration-300 hover:scale-105 shadow-md"
                  >
                    <ActionIcon
                      size={64}
                      className="m-auto"
                      variant="transparent"
                    >
                      <BuildingSkyscraper color="white"> </BuildingSkyscraper>
                    </ActionIcon>
                  </Group>
                  <p className="m-auto font-bold text-xl text-black">
                    관리 배포
                  </p>
                </Stack>
                <Stack>
                  <Group
                    onClick={() => {
                      viewport.current.scrollTo({
                        top: "300vh",
                        behavior: "smooth",
                      });
                    }}
                    // onClick={() => scrollIntoView({ alignment: "center" })}
                    className="cursor-pointer w-36 h-36 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 ease-in-out duration-300 hover:scale-105 shadow-md"
                  >
                    <ActionIcon
                      size={64}
                      className="m-auto"
                      variant="transparent"
                    >
                      <Puzzle color="white"> </Puzzle>
                    </ActionIcon>
                  </Group>
                  <p className="m-auto font-bold text-xl text-black">
                    참여 활동
                  </p>
                </Stack>
              </Group>
            </Stack>
            {/* category-end */}
          </Stack>
        </section>
        <section className="h-screen">
          <IndexHero1></IndexHero1>
        </section>
        <section className="h-screen">
          <IndexHero2></IndexHero2>
        </section>
        <section className="h-screen">
          <IndexHero3></IndexHero3>
        </section>
        <FooterLinks
          data={[
            {
              title: "서비스 정보",
              links: [
                {
                  label: "기능 구성",
                  link: "#",
                },
                {
                  label: "가격 정책",
                  link: "#",
                },
                {
                  label: "고객 지원",
                  link: "#",
                },
                {
                  label: "패치 노트",
                  link: "#",
                },
              ],
            },
            {
              title: "회사 정보",
              links: [
                {
                  label: "회사 소개",
                  link: "#",
                },
                {
                  label: "팀원 소개",
                  link: "#",
                },
                {
                  label: "자회사 소개",
                  link: "#",
                },
                {
                  label: "우리집 소개",
                  link: "#",
                },
              ],
            },
            {
              title: "개발자 연락처",
              links: [
                {
                  label: "디스코드",
                  link: "#",
                },
                {
                  label: "카카오톡",
                  link: "#",
                },
                {
                  label: "인스타그램",
                  link: "#",
                },
                {
                  label: "G메일",
                  link: "#",
                },
              ],
            },
          ]}
        ></FooterLinks>
      </ScrollArea>
    </div>
  );
};

export default Home;
