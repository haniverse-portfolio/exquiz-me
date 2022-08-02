import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import axios from "axios";

import {
  Button,
  Grid,
  SimpleGrid,
  Input,
  TextInput,
  Center,
  Drawer,
  Select,
  Container,
  ActionIcon,
} from "@mantine/core";
import {
  Emphasis,
  FileX,
  Login,
  ReportMoney,
  UserCircle,
  Pencil,
  Archive,
  Home2,
  Menu2,
  Folder,
} from "tabler-icons-react";

function NavCreate() {
  let [title, setTitle] = useState("");
  const [opened, setOpened] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 3px 4px -4px black",
      }}
    >
      <Drawer
        transition={"slide-down"}
        transitionDuration={1500}
        transitionTimingFunction="ease"
        opened={opened}
        onClose={() => setOpened(false)}
        position="top"
        size="100%"
      >
        <Container style={{ display: "flex", alignItems: "center" }}>
          <Container style={{ textAlign: "center" }}>
            <br />
            <TextInput
              placeholder="퀴즈 제목을 입력해주세요"
              label="퀴즈 제목"
            />
            <br />
            <TextInput
              placeholder="퀴즈 설명을 입력해주세요"
              label="퀴즈 설명"
            />
            <br />
            <Select
              label="과목 선택"
              placeholder="과목을 선택해주세요"
              nothingFound="검색 결과 없음"
              data={["미분류", "국어", "수학", "영어", "과학"]}
            />
          </Container>
        </Container>
      </Drawer>
      <span style={{ textAlign: "center" }}>
        <Button
          component="a"
          rel="noopener noreferrer"
          href="/"
          leftIcon={<Home2 size={32} />}
          styles={(theme: any) => ({
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
        ></Button>
        <Button
          variant="default"
          color="black"
          style={{ border: "none", textAlign: "center" }}
          onClick={() => {
            setOpened(true);
          }}
        >
          title 들어갈 예정{title}
        </Button>
      </span>
      <span>
        <ActionIcon>
          <Folder></Folder>
        </ActionIcon>

        <ActionIcon>
          <Menu2></Menu2>
        </ActionIcon>
      </span>
    </div>
  );
}

export default NavCreate;
