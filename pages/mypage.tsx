import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
import React, { useEffect } from "react";
// import IndexNavigation from "../components/IndexNavigation";
import Image from "next/image";
import { useRecoilState } from "recoil";
import {
  Button,
  Grid,
  Group,
  Stack,
  TextInput,
  Badge,
  Tabs,
  Loader,
} from "@mantine/core";

import {
  indexIsLogined,
  indexUserInfo,
  signupTabIdx,
} from "../components/States";

import { Logout, Pencil, Plus } from "tabler-icons-react";
import { NavbarSimpleColored } from "../components/mypageNavbar";

const Home: NextPage = () => {
  const router = useRouter();
  /* ****** dropzone ****** */
  const [files, setFiles] = useState<File[]>([]);

  const [userInfo, setUserInfo] = useRecoilState(indexUserInfo);
  const [isLogined, setIsLogined] = useRecoilState(indexIsLogined);
  const [tabIdx, setTabIdx] = useRecoilState(signupTabIdx);
  return (
    <div>
      <Head>
        <title>exquiz.me - 프로필 설정</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <IndexNavigation /> */}
      <NavbarSimpleColored></NavbarSimpleColored>
      <main className="h-[87vh] ">
        <Tabs
          className="h-[87vh]"
          color="orange"
          orientation="vertical"
          defaultValue="0"
          value={tabIdx}
        >
          <Tabs.List className="w-[20vw]">
            <Tabs.Tab
              onClick={() => {
                setTabIdx("0");
              }}
              value="0"
              icon={
                <Pencil color={tabIdx === "0" ? "orange" : "gray"} size={24} />
              }
            >
              <p
                className={`text-lg font-semibold ${
                  tabIdx === "0" ? "text-amber-500" : "text-gray-400"
                }`}
              >
                프로필 수정
              </p>
            </Tabs.Tab>
            <Tabs.Tab
              onClick={() => {
                setTabIdx("1");
              }}
              value="1"
              icon={
                <Plus color={tabIdx === "1" ? "orange" : "gray"} size={24} />
              }
            >
              <p
                className={`text-lg font-semibold ${
                  tabIdx === "1" ? "text-amber-500" : "text-gray-400"
                }`}
              >
                탭2
              </p>
            </Tabs.Tab>
            <Tabs.Tab
              onClick={() => {
                setTabIdx("2");
                location.replace("/");
              }}
              value="2"
              icon={
                <Logout color={tabIdx === "2" ? "orange" : "gray"} size={24} />
              }
            >
              <p
                className={`text-lg font-semibold ${
                  tabIdx === "2" ? "text-amber-500" : "text-gray-400"
                }`}
              >
                로그아웃
              </p>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="0" pl="xs">
            <Grid className="" columns={24}>
              <Grid.Col span={2} />
              <Grid.Col span={20}>
                <Stack className="mt-10">
                  <p className="text-2xl text-center font-semibold">
                    환영합니다!
                  </p>
                  <p className="text-lg text-gray-500 text-center font-semibold">
                    간단한 정보 입력을 통해 exquiz.me의 서비스를 이용해보세요!
                  </p>
                  <Group>
                    <Stack>
                      <TextInput
                        label="닉네임"
                        placeholder="닉네임"
                      ></TextInput>
                      <TextInput
                        label="회사 및 기관"
                        placeholder="회사 및 기관"
                      ></TextInput>
                    </Stack>
                  </Group>
                  <TextInput
                    label="추천인 코드"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                  ></TextInput>
                  <p>관심 분야</p>
                  <Group>
                    <Badge
                      className="cursor-pointer"
                      size="lg"
                      variant="gradient"
                      gradient={{ from: "indigo", to: "cyan" }}
                    >
                      사교육 및 공교육
                    </Badge>
                    <Badge
                      className="cursor-pointer"
                      size="lg"
                      variant="gradient"
                      gradient={{ from: "teal", to: "lime", deg: 105 }}
                    >
                      직장 및 비즈니스
                    </Badge>

                    <Badge
                      className="cursor-pointer"
                      size="lg"
                      variant="gradient"
                      gradient={{ from: "orange", to: "red" }}
                    >
                      개인 취미
                    </Badge>
                    <Badge
                      className="cursor-pointer"
                      size="lg"
                      variant="gradient"
                      gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
                    >
                      재활 등 특수목적
                    </Badge>
                  </Group>
                  <Button
                    onClick={() => {
                      setIsLogined("1");
                      router.push("/inbox");
                    }}
                    color="orange"
                  >
                    수정하기
                  </Button>
                </Stack>
              </Grid.Col>
              <Grid.Col span={2} />
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="1" pl="xs">
            Messages tab content
          </Tabs.Panel>

          <Tabs.Panel value="2" pl="xs">
            <Loader size="xl" />
          </Tabs.Panel>
        </Tabs>
      </main>

      <footer className={styles.footer}>
        <a
          className="no-underline text-black text-md font-semibold"
          href="https://mumomu.tistory.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Team MUMOMU
        </a>
      </footer>
    </div>
  );
};

export default Home;
