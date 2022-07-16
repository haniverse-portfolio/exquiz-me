import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

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
} from "@mantine/core";
import {
  Emphasis,
  FileX,
  Login,
  ReportMoney,
  UserCircle,
  Pencil,
} from "tabler-icons-react";

function Nav() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 3px 4px -4px black",
      }}
    >
      <Button
        component="a"
        rel="noopener noreferrer"
        href="/"
        leftIcon={<Emphasis size={32} />}
        styles={(theme) => ({
          root: {
            fontWeight: "bold",
            fontSize: 16,
            marginLeft: 10,
            paddingLeft: 0,
            color: "black",
            backgroundColor: "white",
            border: 0,
            height: 42,

            "&:hover": {
              backgroundColor: "white",
              //backgroundColor: theme.fn.darken("#ffffff", 0.05),
            },
          },

          leftIcon: {
            marginRight: 0,
          },
        })}
      >
        xquiz.me
      </Button>
      <span>
        <Button
          onClick={() => {
            alert("구독 연장까지 90일 남았습니다.");
          }}
          variant="gradient"
          gradient={{ from: "yellow", to: "orange" }}
          component="a"
          rel="noopener noreferrer"
          href="#"
          leftIcon={<ReportMoney size={32} />}
          styles={(theme) => ({
            root: {
              fontWeight: "bold",
              fontSize: 16,
              paddingLeft: 15,
              color: "white",
              backgroundColor: "white",
              border: 0,
              height: 42,

              "&:hover": {
                backgroundColor: theme.fn.darken("#ffffff", 0.05),
              },
            },

            leftIcon: {
              marginRight: 5,
            },
          })}
        >
          스탠다드 플랜 이용 중
        </Button>

        <Button
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          component="a"
          rel="noopener noreferrer"
          href="/login"
          leftIcon={<UserCircle size={32} />}
          styles={(theme) => ({
            root: {
              fontWeight: "bold",
              fontSize: 16,
              marginRight: 10,
              color: "white",
              backgroundColor: "white",
              border: 0,
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
          내 퀴즈
        </Button>
      </span>
    </div>
  );
}

function SchoolList() {
  let arr = [
    "양정여자고등학교",
    "인덕원고등학교",
    "서울과학고등학교",
    "하나고등학교",
    "민족사관고등학교",
    "대전과학고등학교",
    "휘문고등학교",
    "상산고등학교",
    "대기고등학교",
    "포항제철고등학교",
    "현대고등학교",
    "배재고등학교",
    "경북고등학교",
    "신성고등학교",
    "서문여자고등학교",
    "강서고등학교",
    "목동고등학교",
    "마포고등학교",
    "수지고등학교",
    "서울국제고등학교",
    "북일고등학교",
    "서라벌고등학교",
    "제주고등학교",
    "오현고등학교",
  ];
  let i = 0;
  return (
    <Grid grow gutter={30}>
      {arr.map((school, i) => {
        return (
          <Grid.Col
            key={i}
            style={{
              boxShadow:
                "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
              borderRadius: "10px",
            }}
            span={2}
          >
            {school}
          </Grid.Col>
        );
      })}
    </Grid>
  );
}

const Home: NextPage = () => {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];
  return (
    <div
      style={{
        scrollSnapAlign: "start",
        scrollSnapPointsY: "repeat(100vh)",
        scrollSnapType: "y mandatory",
      }}
    >
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header style={{ position: "sticky", zIndex: "100" }}>{Nav()}</header>

      <main style={{ marginLeft: 20, marginRight: 20 }}>
        <div style={{ height: "100vh" }}>
          <div
            style={{
              height: "55vh",
              textAlign: "center",
            }}
          >
            <p
              style={{ fontSize: 36, fontWeight: "bold", textAlign: "center" }}
            >
              퀴즈에 경험을 더하다<br></br> exquiz.me
            </p>
            <Button
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
              component="a"
              rel="noopener noreferrer"
              href="/create1"
              leftIcon={<Pencil size={32} />}
              styles={(theme) => ({
                root: {
                  fontWeight: "bold",
                  fontSize: 16,
                  marginRight: 10,
                  color: "white",
                  backgroundColor: "white",
                  border: 0,
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
              문제 제작하기
            </Button>
            <Button
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
              component="a"
              rel="noopener noreferrer"
              href="/host"
              leftIcon={<Login size={32} />}
              styles={(theme) => ({
                root: {
                  fontWeight: "bold",
                  fontSize: 16,
                  marginRight: 10,
                  color: "white",
                  backgroundColor: "white",
                  border: 0,
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
              방 생성하기
            </Button>
          </div>
          <div style={{ height: "40vh" }}>
            <p style={{ fontWeight: "bold", textAlign: "center" }}>
              약 3,677개의 학교들이<br></br> exquiz.me를 사용중입니다.
            </p>
            <div style={{ textAlign: "center" }}>{SchoolList()}</div>
          </div>
        </div>
        <div style={{ height: "100vh" }}>
          <div style={{ height: "40vh" }}>
            <p style={{ fontWeight: "bold", textAlign: "center" }}>
              아래에서 간단히 체험해보세요.
            </p>
          </div>
          <div style={{ height: "40vh" }}>
            <p style={{ fontWeight: "bold", textAlign: "left" }}>
              - exquiz.me는 직관적인 문제 제작 툴을 제공합니다. 직접 해보세요!
            </p>
            <div style={{ width: "60vw", textAlign: "center" }}>
              <SimpleGrid cols={2} spacing="xs">
                <div>
                  <Input variant="default" placeholder="선지 1" />
                </div>
                <div>
                  <Input variant="default" placeholder="선지 2" />
                </div>
                <div>
                  <Input variant="default" placeholder="선지 3" />
                </div>
                <div>
                  <Input variant="default" placeholder="선지 4" />
                </div>
              </SimpleGrid>
            </div>
          </div>
        </div>

        <div>
          <div style={{ height: "40vh" }}>
            <p style={{ fontWeight: "bold", textAlign: "right" }}>
              exquiz.me는 새로운 퀴즈 경험을 제시합니다 -
            </p>
          </div>

          <div style={{ height: "40vh" }}>
            <p style={{ fontWeight: "bold", textAlign: "left" }}>
              - exquiz.me는 재미있는 스코어보드와 통계를 제공합니다.
            </p>
          </div>
        </div>
        <div>
          <div style={{ height: "10vh" }}>
            <p style={{ fontWeight: "bold", textAlign: "center" }}>
              아래에서 나에게 가장 맞는 플랜을 선택해보세요.
            </p>
          </div>

          <div style={{ height: "50vh" }}>
            <div style={{ width: 340, margin: "auto" }}>
              <Card shadow="sm" p="lg">
                <Card.Section></Card.Section>

                <Group
                  position="apart"
                  style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
                >
                  <Text weight={500}>무료 플랜</Text>
                </Group>

                <Text
                  size="sm"
                  style={{ color: secondaryColor, lineHeight: 1.5 }}
                >
                  익스퀴즈미가 제공하는 무료 서비스 입니다.
                </Text>

                <Button
                  variant="light"
                  color="gray"
                  fullWidth
                  style={{ marginTop: 14 }}
                >
                  현재 이용 중
                </Button>
              </Card>
              <Card shadow="sm" p="lg">
                <Card.Section></Card.Section>

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
                  퀴즈 제작 및 참여의 필수적인 기능만 골라서 합리적인 가격에
                  제공합니다.
                </Text>

                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  style={{ marginTop: 14 }}
                >
                  <span
                    style={{ color: "gray", textDecoration: "line-through" }}
                  >
                    월 5,990
                  </span>{" "}
                  &nbsp;→ 월 3,990원
                </Button>
              </Card>
              <Card shadow="sm" p="lg">
                <Card.Section></Card.Section>

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

                <Button
                  variant="light"
                  color="orange"
                  fullWidth
                  style={{ marginTop: 14 }}
                >
                  월 7,990원
                </Button>
              </Card>
            </div>
          </div>
        </div>
        <div
          style={{
            position: "fixed",
            background: "white",
            boxShadow:
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
            borderRadius: "50%",
            height: "50px",
            width: "50px",
            right: "10px",
            bottom: "10px",
            cursor: "pointer",
          }}
        ></div>
      </main>

      <footer className={styles.footer}>
        <a
          style={{ textDecoration: "none", color: "black" }}
          href="https://retro5pect.tistory.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright ⓒ 2022 exquiz.me All rights reserved. | Team MUMOMU.
        </a>
      </footer>
    </div>
  );
};

export default Home;
