import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
import React, { useEffect } from "react";
import IndexNavigation from "../components/IndexNavigation";
import Image from "next/image";
import { useRecoilState } from "recoil";
import {
  Button,
  Grid,
  Group,
  useMantineTheme,
  Center,
  Stack,
  TextInput,
  Drawer,
  Modal,
  Slider,
  Select,
  Pagination,
  ScrollArea,
  Text,
  ActionIcon,
  Avatar,
  Badge,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

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
  language,
} from "../components/States";

import { ArrowNarrowLeft, Link, Login, Pencil, Plus } from "tabler-icons-react";

const Home: NextPage = () => {
  /* ****** dropzone ****** */
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div>
      <Head>
        <title>exquiz.me - 프로필 설정</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <IndexNavigation />
      <main className="h-[87vh]">
        <Grid
          className="h-[87vh] bg-gradient-to-l from-amber-500 via-amber-500 to-orange-500 animate-textSlow"
          columns={24}
        >
          <Grid.Col span={8} />
          <Grid.Col span={8}>
            <Stack className="bg-white shadow-lg rounded-lg p-4">
              <p className="text-2xl text-center font-semibold">환영합니다!</p>
              <p className="text-lg text-gray-500 text-center font-semibold">
                간단한 회원 가입을 통해 exquiz.me의 서비스를 이용해보세요!
              </p>
              <Group>
                <Dropzone
                  className="h-32 w-32"
                  radius={100}
                  accept={IMAGE_MIME_TYPE}
                  onDrop={setFiles}
                >
                  <Text className="my-auto" color="gray" align="center">
                    프로필 사진
                  </Text>
                </Dropzone>
                <Stack>
                  <TextInput label="닉네임" placeholder="닉네임"></TextInput>
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
                  size="lg"
                  variant="gradient"
                  gradient={{ from: "indigo", to: "cyan" }}
                >
                  사교육 및 공교육
                </Badge>
                <Badge
                  size="lg"
                  variant="gradient"
                  gradient={{ from: "teal", to: "lime", deg: 105 }}
                >
                  직장 및 비즈니스
                </Badge>

                <Badge
                  size="lg"
                  variant="gradient"
                  gradient={{ from: "orange", to: "red" }}
                >
                  개인 취미
                </Badge>
                <Badge
                  size="lg"
                  variant="gradient"
                  gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
                >
                  재활 등 특수목적
                </Badge>
              </Group>
              <Button
                onClick={() => {
                  location.replace("/inbox");
                }}
                color="orange"
              >
                exquiz.me 시작하기
              </Button>
            </Stack>
          </Grid.Col>
          <Grid.Col span={8} />
        </Grid>
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
