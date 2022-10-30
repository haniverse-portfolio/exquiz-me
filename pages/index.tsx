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
  ScrollArea,
  Container,
} from "@mantine/core";
import { indexIsLogined, indexUserInfo } from "../components/States";
import { useRecoilState } from "recoil";
import { connectMainServerApiAddress } from "../components/ConstValues";
import { GridDots, HandFinger, Photo } from "tabler-icons-react";

const Home: NextPage = () => {
  /* *** initialization start *** */
  const router = useRouter();
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];
  /* *** initialization end *** */

  /* *** states start *** */
  const [isLogined, setIsLogined] = useRecoilState(indexIsLogined);
  const [userInfo, setUserInfo] = useRecoilState(indexUserInfo);
  /* *** states end *** */

  /* *** effect start *** */
  useEffect(() => {
    // mobile
    if (navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)) {
      location.replace("/enter");
    }
    // already logined
    if (isLogined === true) return;
    // auto login
    login(localStorage.getItem("access_token") as string);

    // access_token validation
    if (validateQueryString("host_id")) {
      localStorage.setItem("host_id", router.query.host_id as string);
    }
    if (validateQueryString("access_token")) {
      localStorage.setItem("access_token", router.query.access_token as string);
      login(router.query.access_token as string);
    }
  }, [router.isReady]);
  /* *** effect start *** */

  /* *** function start *** */
  let validateQueryString = (p_string: string) => {
    var field = p_string;
    var url = window.location.href;
    if (url.indexOf("?" + field + "=") != -1) return true;
    else if (url.indexOf("&" + field + "=") != -1) return true;
    return false;
  };
  /* *** function end *** */

  /* *** axios start *** */
  const login = async (tk: string) => {
    const config = {
      headers: { Authorization: `Bearer ${tk}` },
    };

    axios
      .get(connectMainServerApiAddress + "api/user", config)
      .then((result) => {
        setUserInfo(result.data);
        setIsLogined(true);
        router.push("/inbox");
      })
      .catch(() => {
        // localStorage.removeItem("access_token");
        // localStorage.removeItem("host_id");
      });
    // localStorage.removeItem("access_token");
    // localStorage.removeItem("host_id");
  };
  /* *** axios end *** */
  const viewport = useRef<HTMLDivElement>() as any;
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });
  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ScrollArea
        style={{ width: "100vw", height: "100vh" }}
        viewportRef={viewport}
        scrollbarSize={0}
      >
        {/* navigation bar */}
        <IndexNavigation />
        <section
          className="bg-[#F9F5F4]"
          style={{ height: "calc(100vh - 60px)" }}
        >
          {/* original-160px */}
          <Stack className="h-[100px]" />
          <Stack spacing={0} className=" flex contents-between">
            {/* banner-start */}
            <Stack>
              <Stack spacing={0}>
                <h2 className="text-[#121212] text-center font-bold text-[40px]">
                  퀴즈의 새로운 경험을 제시하다
                </h2>
                <Stack className="h-[34px]" />
                <h3 className="text-[#818181] text-[24px] text-center">
                  <p>
                    <span className="text-[#F9761E]">학교 선생님</span>,&nbsp;
                    <span className="text-[#85B6FF]">회사 팀장님</span>,&nbsp;
                    <span className="text-[#4CAF50]">퀴즈 애호가</span> 누구든
                  </p>
                  <p>퀴즈를 만들고 참여하여 다함께 즐겨보세요!</p>
                </h3>
              </Stack>
            </Stack>
            {/* banner-end */}
            <Stack className="h-[80px]" />
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
          <Stack className="h-[48px]" />
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
        <section className="h-screen">
          <Stack className="h-[87px]" />
          <h3 className="text-[#EF8E54] text-[24px] text-center">
            익스퀴즈미의 퀴즈
          </h3>
          <Stack className="h-[18px]" />
          <h2 className="text-[#121212] text-center text-[40px]">
            퀴즈의 출제를 편리하게
          </h2>
          <Stack className="h-[42px]" />
          <h3 className="text-[#818181] text-[24px] text-center">
            <p>이제까지 없었던 편리하고 직관적인 퀴즈 출제를 만나보세요!</p>
            <p>다양한 퀴즈 유형과 편리한 조작, 그리고 이미지 크롤링까지</p>
            <p>퀴즈 제작의 모든 기능이 갖추어져 있습니다.</p>
          </h3>
          <Stack className="h-[107px]" />
          <Group spacing={0} className=" relative m-0 p-0" position="center">
            <Image
              className="m-0 p-0 !z-0 !absolute"
              src="/index/section2_create.svg"
              alt="section2_create"
              width={437}
              height={311}
            ></Image>
            <Image
              className="m-0 p-0 !z-10 !absolute !top-[140px] !-left-[80px]"
              src="/index/section2_play.svg"
              alt="section2_play"
              width={435}
              height={310}
            ></Image>
          </Group>
        </section>
        <section className="h-screen">
          <Stack className="bg-[#EDF4F7] h-[363px]">
            <Stack className="h-[72px]"></Stack>
            <Group spacing={256} position="center">
              <Stack align="center">
                <Group
                  position="center"
                  className="bg-white rounded-full h-[96px] w-[96px]"
                >
                  <ActionIcon variant="transparent" size={48}>
                    <HandFinger color="orange" size={48}></HandFinger>
                  </ActionIcon>
                </Group>
                <h2 className="text-[#5E5E5E] text-[24px] text-center">
                  원터치 UI
                </h2>
                <h3 className="text-[#818181] font-normal text-[20px] text-center">
                  <p>익스퀴즈미의 퀴즈는</p>
                  <p>손쉽게 제작할 수 있습니다.</p>
                </h3>
              </Stack>
              <Stack align="center">
                <Group
                  position="center"
                  className="bg-white rounded-full h-[96px] w-[96px]"
                >
                  <ActionIcon variant="transparent" size={48}>
                    <Photo color="orange" size={48}></Photo>
                  </ActionIcon>
                </Group>
                <h2 className="text-[#5E5E5E] text-[24px] text-center">
                  강력한 이미지 크롤링
                </h2>
                <h3 className="text-[#818181] font-normal text-[20px] text-center">
                  <p>익스퀴즈미에서만 제공하는 기능으로</p>
                  <p>퀴즈를 더욱 풍성하게 만들어보세요.</p>
                </h3>
              </Stack>
              <Stack align="center">
                <Group
                  position="center"
                  className="bg-white rounded-full h-[96px] w-[96px]"
                >
                  <ActionIcon variant="transparent" size={48}>
                    <GridDots color="orange" size={48}></GridDots>
                  </ActionIcon>
                </Group>
                <h2 className="text-[#5E5E5E] text-[24px] text-center">
                  드래그 앤 드롭 UX
                </h2>
                <h3 className="text-[#818181] font-normal text-[20px] text-center">
                  <p>퀴즈 툴을 보다 더 간편하고</p>
                  <p>직관적으로 사용할 수 있습니다.</p>
                </h3>
              </Stack>
            </Group>
            <Stack className="h-[72px]"></Stack>
          </Stack>
          <Stack>
            <Stack className="h-[100px]"></Stack>
            <h3 className="text-[#EF8E54] text-[24px] text-center">
              익스퀴즈미의 퀴즈
            </h3>
            <Stack className="h-[18px]" />
            <h2 className="text-[#121212] text-center text-[40px]">
              퀴즈의 참여를 더 재미있게
            </h2>
            <Stack className="h-[42px]" />
            <h3 className="text-[#818181] text-[24px] text-center">
              <p>이제까지 없었던 편리하고 직관적인 퀴즈 출제를 만나보세요!</p>
              <p>다양한 퀴즈 유형과 편리한 조작, 그리고 이미지 크롤링까지</p>
              <p>퀴즈 제작의 모든 기능이 갖추어져 있습니다.</p>
            </h3>
            <Stack className="h-[36px]"></Stack>
            <Container className="w-[20vw] text-center">
              <Button
                fullWidth
                radius="xl"
                className="shadow"
                size="xl"
                variant="outline"
                color="orange.6"
              >
                퀴즈 만들어보기
              </Button>
            </Container>
          </Stack>
        </section>
        <footer className="h-[313px]">
          <Stack className="px-8 flex items-center justify-center bg-[#FFD178] h-[213px]">
            <Group>
              <p className="text-[18px]">서비스 정보</p>{" "}
              <Group position="center">
                <p className="text-[#DA662C] text-[16px]">기능 구성</p>
                <p className="text-[#DA662C] text-[16px]">가격 정책</p>
                <p className="text-[#DA662C] text-[16px]">고객 지원</p>
                <p className="text-[#DA662C] text-[16px]">패치 노트</p>
              </Group>
            </Group>
            <Group>
              <p className="text-[18px]">회사 정보</p>{" "}
              <Group position="center">
                <p className="text-[#DA662C] text-[16px]">회사 소개</p>
                <p className="text-[#DA662C] text-[16px]">팀원 소개</p>
                <p className="text-[#DA662C] text-[16px]">자회사 소개</p>
                <p className="text-[#DA662C] text-[16px]">우리집 소개</p>
              </Group>
            </Group>
            <Group>
              <p className="text-[18px]">개발자 정보</p>{" "}
              <Group position="center">
                <p className="text-[#DA662C] text-[16px]">디스코드</p>
                <p className="text-[#DA662C] text-[16px]">카카오톡</p>
                <p className="text-[#DA662C] text-[16px]">인스타그램</p>
                <p className="text-[#DA662C] text-[16px]">지메일</p>
              </Group>
            </Group>
          </Stack>
          <Stack className="px-8 flex items-center justify-center bg-[#273248] h-[100px]">
            <Group position="apart">
              <p className="text-[16px] text-[#85B6FF]">
                2022 Co.exquiz.me. All rights reserved.
              </p>
              <Group position="center">
                <p className="text-[24px] text-white">exquiz.me</p>
                <p className="text-[16px] text-[#85B6FF]">
                  교육 평등의 가치를 실현해 나갑니다.
                </p>
              </Group>
            </Group>
          </Stack>
        </footer>
      </ScrollArea>
      {/* modal */}
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
