import { useRouter } from "next/router";
import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import axios from "axios";
import { useRef } from "react";
import { useRecoilState } from "recoil";

import {
  Button,
  Container,
  Group,
  useMantineTheme,
  ActionIcon,
  Stack,
  Card,
  Text,
  Badge,
} from "@mantine/core";

import { ArrowBigLeft } from "tabler-icons-react";
import { indexMembership } from "../components/States";
import { HeroImageRight } from "../components/membership/membershipHero";

const Home: NextPage = () => {
  const router = useRouter();
  const theme = useMantineTheme();
  const getColor = (color: string) =>
    theme.colors[color][theme.colorScheme === "dark" ? 5 : 7];
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const [membership, setMembership] = useRecoilState(indexMembership);

  let membershipInfo = (type: string) => {
    if (type === "0") {
      if (membership === "0")
        return (
          <Button
            disabled
            variant="light"
            color="gray"
            fullWidth
            style={{ marginTop: 14 }}
          >
            현재 이용 중
          </Button>
        );
      else
        return (
          <Button
            onClick={() => {
              setMembership("0");
            }}
            variant="light"
            color="gray"
            fullWidth
            style={{ marginTop: 14 }}
          >
            무료
          </Button>
        );
    }
    if (type === "1") {
      if (membership === "1")
        return (
          <Button
            disabled
            variant="light"
            color="blue"
            fullWidth
            style={{ marginTop: 14 }}
          >
            현재 이용 중
          </Button>
        );
      else
        return (
          <Button
            onClick={() => {
              setMembership("1");
            }}
            variant="light"
            color="blue"
            fullWidth
            style={{ marginTop: 14 }}
          >
            <span
              style={{
                color: "gray",
                textDecoration: "line-through",
              }}
            >
              월 5,990
            </span>
            &nbsp;→ 월 3,990원
          </Button>
        );
    }
    if (type === "2") {
      if (membership === "2")
        return (
          <Button
            disabled
            variant="light"
            color="orange"
            fullWidth
            style={{ marginTop: 14 }}
          >
            현재 이용 중
          </Button>
        );
      else
        return (
          <Button
            onClick={() => {
              setMembership("2");
            }}
            variant="light"
            color="orange"
            fullWidth
            style={{ marginTop: 14 }}
          >
            월 7,990원
          </Button>
        );
    }
  };
  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeroImageRight></HeroImageRight>
    </div>
  );
};

export default Home;

{
  /* <section className="">
<Stack>
  <Group>
    <ActionIcon
      onClick={() => {
        router.push("/");
      }}
      variant="transparent"
    >
      <ArrowBigLeft color="black"></ArrowBigLeft>
    </ActionIcon>
  </Group>
  <p className="text-center font-semibold text-2xl">
    익스퀴즈미의 다양한 상품을 둘러보세요!
  </p>
  <Group>
    <FeaturesCard1 />
    <FeaturesCard2 />
    <FeaturesCard3 />
  </Group>
  <Group className="h-[100vh]">
    <Container className="m-10 p-2 h-10/12 w-3/12 bg-white shadow-lg sm:rounded-3xl backdrop-blur-xl bg-opacity-60">
      <Card className="bg-opacity-0" shadow="sm" p="lg">
        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text style={{ display: "block" }} weight={500}>
            무료 플랜
          </Text>
          <Badge color="gray" variant="light">
            익스퀴즈미 회원 무료 제공
          </Badge>
        </Group>

        <Text
          size="sm"
          style={{ color: secondaryColor, lineHeight: 1.5 }}
        >
          익스퀴즈미가 제공하는 무료 서비스 입니다.
        </Text>

        {membershipInfo("0")}
      </Card>
    </Container>
    <Container className="m-10 p-2 h-10/12 w-3/12 bg-white shadow-lg sm:rounded-3xl backdrop-blur-xl bg-opacity-60">
      <Card shadow="sm" p="lg">
        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text weight={500}>스탠다드 플랜 (실속형)</Text>
          <Badge color="blue" variant="light">
            30% 할인 특가
          </Badge>
        </Group>

        <Text
          size="sm"
          style={{ color: secondaryColor, lineHeight: 1.5 }}
        >
          퀴즈 제작 및 참여의 필수적인 기능을 합리적인 가격에
          제공합니다.
        </Text>
        {membershipInfo("1")}
      </Card>
    </Container>
    <Container className="m-10 p-2 h-10/12 w-3/12 bg-white shadow-lg sm:rounded-3xl backdrop-blur-xl bg-opacity-60">
      <Card shadow="sm" p="lg">
        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text weight={500}>프리미엄 플랜</Text>
          <Badge color="orange" variant="light">
            모든 서비스 이용 가능
          </Badge>
        </Group>

        <Text
          size="sm"
          style={{ color: secondaryColor, lineHeight: 1.5 }}
        >
          퀴즈 제작 및 참여의 모든 과정에서 최고의 서비스를 제공합니다.
        </Text>

        {membershipInfo("2")}
      </Card>
    </Container>
  </Group>
</Stack>
</section> */
}
