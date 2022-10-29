import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
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
  Container,
} from "@mantine/core";
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

  let validateQueryString = (p_string: string) => {
    var field = p_string;
    var url = window.location.href;
    if (url.indexOf("?" + field + "=") != -1) return true;
    else if (url.indexOf("&" + field + "=") != -1) return true;
    return false;
  };

  /* *** effect start *** */
  useEffect(() => {
    // break;
    if (!router.isReady) return;

    if (navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)) {
      location.replace("/enter");
    }
    if (validateQueryString("access_token")) {
      getTest(router.query.access_token as string);
      localStorage.setItem("access_token", router.query.access_token as string);
    }
    if (validateQueryString("host_id")) {
      localStorage.setItem("host_id", router.query.host_id as string);
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
      {/* navigation bar */}
      <ScrollArea
        style={{ width: "100vw", height: "100vh" }}
        viewportRef={viewport}
        scrollbarSize={0}
      >
        <IndexNavigation />
        <section
          className="bg-[#F9F5F4]"
          style={{ height: "calc(100vh - 60px)" }}
        >
          {/* original-160px */}
          <Stack className="h-[120px]"></Stack>
          <Stack spacing={0} className=" flex contents-between">
            {/* banner-start */}
            <Stack>
              <Stack spacing={0}>
                <h1 className="text-[#121212] text-center font-bold text-[40px]">
                  퀴즈의 새로운 경험을 제시하다
                </h1>
                <Stack className="h-[34px]"></Stack>
                <h2 className="text-[#818181] text-[24px] text-center">
                  <p>
                    <span className="text-[#F9761E]">학교 선생님</span>,&nbsp;
                    <span className="text-[#85B6FF]">회사 팀장님</span>,&nbsp;
                    <span className="text-[#4CAF50]">퀴즈 애호가</span> 누구든
                  </p>
                  <p>퀴즈를 만들고 참여하여 다함께 즐겨보세요!</p>
                </h2>
              </Stack>
            </Stack>
            {/* banner-end */}
            <Stack className="h-[100px]"></Stack>
            {/* demo-image-start */}
            <Group position="center">
              <Image
                className="hover:scale-125"
                src="/index/demo1.svg"
                alt="demo1"
                width={477}
                height={339}
              ></Image>
              <Image
                src="/index/demo2.svg"
                alt="demo2"
                width={476}
                height={338}
              ></Image>
              <Image
                src="/index/demo3.svg"
                alt="demo3"
                width={477}
                height={339}
              ></Image>
            </Group>
          </Stack>
          <Stack className="h-[48px]"></Stack>
          <Container className="w-[20vw] text-center">
            <Button
              fullWidth
              radius="xl"
              className="shadow"
              size="xl"
              variant="outline"
              color="orange.6"
            >
              퀴즈 맛보기
            </Button>
          </Container>
        </section>
        <section className="h-screen"></section>
      </ScrollArea>
      {/* modal */}
      <Modal
        withCloseButton={false}
        centered
        opened={modalOpened === "0" ? false : true}
        onClose={() => setModalOpened("0")}
      >
        <AuthenticationForm></AuthenticationForm>
      </Modal>
    </div>
  );
};

export default Home;

// onClick={() => {
//   viewport.current.scrollTo({
//     top: "200vh",
//     behavior: "smooth",
//   });
// }}

// onClick={() => {
//   viewport.current.scrollTo({
//     top: viewport.current.scrollHeight,
//     // top: viewport.current.scrollHeight / 2,
//     behavior: "smooth",
//   });
// }}

{
  /* <Group spacing="xl" className="mt-10">
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
                  </Group> */
}

// <Button
//   onClick={() => {
//     localStorage.removeItem("access_token");
//   }}
// >
//   액세스 토큰 삭제
// </Button>
// <Button
//   onClick={() => {
//     localStorage.removeItem("host_id");
//   }}
// >
//   호스트 아이디 삭제
// </Button>

{
  /* <Group>
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
                  </Group> */
}

{
  /* <ScrollArea
style={{ width: "100vw", height: "100vh" }}
viewportRef={viewport}
scrollbarSize={0}
> */
}
