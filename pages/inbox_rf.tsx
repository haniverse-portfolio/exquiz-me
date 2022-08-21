import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import NavIndex from "./components/navIndex";
import SchoolList from "./components/schoolList";
import { useState } from "react";
import { useRef } from "react";

import {
  Button,
  Grid,
  SimpleGrid,
  Input,
  Card,
  Text,
  Badge,
  Group,
  useMantineTheme,
  Center,
  Tabs,
  ThemeIcon,
  Container,
  Textarea,
  Tooltip,
  Stack,
  Stepper,
  ActionIcon,
  Autocomplete,
  TextInput,
  Drawer,
  Modal,
  Slider,
  Select,
} from "@mantine/core";
import {
  Emphasis,
  FileX,
  Login,
  ReportMoney,
  UserCircle,
  Pencil,
  Archive,
  BrowserPlus,
  SquareCheck,
  AB,
  QuestionMark,
  Apps,
  Checkbox,
  Parentheses,
  Settings,
  Plus,
  Check,
  Number1,
  Number2,
  Number3,
  Circle,
  Triangle,
  X,
  Folders,
} from "tabler-icons-react";

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
  const MARKS = [
    { value: 0, label: "10명" },
    { value: 25, label: "20명" },
    { value: 50, label: "30명" },
    { value: 75, label: "50명" },
    { value: 100, label: "100명" },
  ];

  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const [active, setActive] = useState(0);

  const [drawerOpened, setDrawerOpened] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Drawer
        position="bottom"
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        title="퀴즈 설정"
        padding="xl"
        size="93.8%"
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        // overlayBlur={3}
      >
        {rightEnvelope(0)}
      </Drawer>

      <Modal
        centered
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="방 생성하기"
      >
        <p className="font-bold">기관 정보</p>
        <Select
          searchable
          placeholder="기관 이름"
          data={[
            { value: "1", label: "이천고등학교" },
            { value: "2", label: "인덕원고등학교" },
            { value: "3", label: "이화여자고등학교" },
          ]}
        />
        <br></br>
        <p className="font-bold">추가 정보</p>

        <TextInput placeholder="a학년 b반"></TextInput>
        <br></br>
        <p className="font-bold">참가 인원</p>
        <Slider
          color="orange"
          label={(val) => MARKS.find((mark) => mark.value === val)?.label}
          defaultValue={50}
          step={25}
          marks={MARKS}
          styles={{ markLabel: { display: "none" } }}
        />
        <br></br>
        <Button
          onClick={() => {
            setModalOpened(true);
          }}
          className="mx-4 h-[60px] w-[370px]"
          variant="outline"
          gradient={{ from: "orange", to: "red" }}
          component="a"
          rel="noopener noreferrer"
          leftIcon={<Plus size={38} />}
          styles={(theme: {
            fn: {
              darken: (arg0: string, arg1: number) => any;
            };
          }) => ({
            root: {
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: 20,
              marginRight: 10,
              color: "orange",
              backgroundColor: "white",
              border: "2px solid orange",
              height: 42,

              "&:hover": {
                backgroundColor: theme.fn.darken("#FFFFFF", 0.05),
              },
            },

            leftIcon: {
              marginRight: 5,
            },
          })}
        >
          방 만들기
        </Button>
      </Modal>

      <header>{NavIndex()}</header>

      <main style={{ margin: "0px 10px" }}>
        <section className="h-[86vh]">
          <Stack className="items-center flex contents-between">
            <Stack>
              {/* 메인 배너 */}
              <Group spacing={100}>
                <Group>
                  <Group>
                    <Stack>
                      <p className="underline decoration-amber-500 font-bold text-4xl text-left mt-10">
                        퀴즈 정보
                      </p>
                      <Group className="justify-between">
                        <Group>
                          <Group>
                            <Stack>
                              <Group
                                className="h-52 w-52 rounded-xl border-2 bg-gray-200
                            "
                              >
                                {rightEnvelope(0)}
                              </Group>
                            </Stack>
                          </Group>
                          <Stack>
                            <p className="font-bold text-2xl">
                              우리나라의 다양한 하천
                            </p>
                            <p className=" text-2xl">
                              문제 수 : 25개 예상 소요 시간 : 30분
                            </p>
                            <Group>
                              <Button
                                onClick={() => {
                                  setModalOpened(true);
                                }}
                                className="mx-4 h-[60px] w-[200px]"
                                variant="outline"
                                gradient={{ from: "orange", to: "red" }}
                                component="a"
                                rel="noopener noreferrer"
                                leftIcon={<Pencil size={38} />}
                                styles={(theme: {
                                  fn: {
                                    darken: (arg0: string, arg1: number) => any;
                                  };
                                }) => ({
                                  root: {
                                    textDecoration: "none",
                                    fontWeight: "bold",
                                    fontSize: 20,
                                    marginRight: 10,
                                    color: "orange",
                                    backgroundColor: "white",
                                    border: "2px solid orange",
                                    height: 42,

                                    "&:hover": {
                                      backgroundColor: theme.fn.darken(
                                        "#FFFFFF",
                                        0.05
                                      ),
                                    },
                                  },

                                  leftIcon: {
                                    marginRight: 5,
                                  },
                                })}
                              >
                                방 만들기
                              </Button>
                              <Button
                                className=" h-[60px] w-[200px] bg-orange-500"
                                variant="gradient"
                                gradient={{ from: "orange", to: "red" }}
                                component="a"
                                rel="noopener noreferrer"
                                href="/create_rf"
                                leftIcon={<Login size={38} />}
                                styles={(theme) => ({
                                  root: {
                                    fontWeight: "bold",
                                    fontSize: 20,
                                    marginLeft: 5,
                                    color: "white",
                                    backgroundColor: "orange",
                                    border: 0,
                                    height: 42,

                                    "&:hover": {},
                                  },

                                  leftIcon: {
                                    marginRight: 5,
                                  },
                                })}
                              >
                                수정하기
                              </Button>
                            </Group>
                          </Stack>
                        </Group>
                        <Stack>
                          <p className="border-2 py-5 px-2 rounded-md border-gray-200 text-xl">
                            1. 우리나라에서 가장 높은 산은?
                          </p>
                          <p className="border-2 py-5 px-2 rounded-md border-gray-200 text-xl">
                            2. 우리나라는 삼면이 바다인 반도이다
                          </p>
                          <p className="border-2 py-5 px-2 rounded-md border-gray-200 text-xl">
                            3. 우리나라의 영토는 한반도와 그 부속도서로 한다
                          </p>
                        </Stack>
                      </Group>

                      {/* ../public/globe_banner.png */}
                    </Stack>
                  </Group>
                </Group>
                {/* 아미지 - 봉투 */}
              </Group>
              <Stack>
                <Center>
                  <Group spacing={100}>
                    {rightEnvelope(0)}
                    {rightEnvelope(1)}
                    {rightEnvelope(2)}
                    {rightEnvelope(3)}
                  </Group>
                </Center>
                <Center>
                  <Group>
                    {rightEnvelope(0)}
                    {rightEnvelope(1)}
                    {rightEnvelope(2)}
                    {rightEnvelope(3)}
                  </Group>
                  <Group>
                    {rightEnvelope(0)}
                    {rightEnvelope(1)}
                    {rightEnvelope(2)}
                    {rightEnvelope(3)}
                  </Group>
                </Center>
              </Stack>
            </Stack>
          </Stack>
          <p className="text-2xl font-bold">우리나라의 다양한 산</p>
          <p className="text-2xl font-bold">우리나라의 다양한 하천</p>
          <p className="text-2xl font-bold">우리나라의 다양한 바다</p>
          <p className="text-2xl font-bold">우리나라의 다양한 갯벌</p>
          <p className="text-2xl font-bold">우리나라의 다양한 암석</p>
          <p className="text-2xl font-bold">우리나라의 다양한 호수</p>
          <p className="text-2xl font-bold">우리나라의 다양한 해조류</p>
          <p className="text-2xl font-bold">우리나라의 다양한 동물</p>
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
      <Stack className="fixed bottom-[50vh] right-[2vw]">
        <Group className="h-4 w-4 bg-gray-500 rounded-full"></Group>
        <Group className="h-4 w-4 bg-gray-500 rounded-full"></Group>
        <Group className="h-4 w-4 bg-gray-500 rounded-full"></Group>
        <Group className="h-4 w-4 bg-gray-500 rounded-full"></Group>
      </Stack>
    </div>
  );
};

export default Home;
