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
} from "@mantine/core";
import {
  Emphasis,
  FileX,
  Login,
  ReportMoney,
  UserCircle,
  Pencil,
  Archive,
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
        opened={opened}
        onClose={() => setOpened(false)}
        title="퀴즈 설정"
        padding="xl"
        size="100%"
      >
        <div style={{ margin: "0px 30vw" }}>
          <br />
          <TextInput
            placeholder="퀴즈 제목을 입력해주세요"
            label="퀴즈 제목"
            required
          />
          <br />
          <TextInput
            placeholder="퀴즈 설명을 입력해주세요"
            label="퀴즈 설명"
            required
          />
          <br />
          <Select
            label="과목 선택"
            placeholder="과목을 선택해주세요"
            nothingFound="검색 결과 없음"
            data={["미분류", "국어", "수학", "영어", "과학"]}
          />
        </div>

        <button
          onClick={() => {
            axios
              .post("http://api/room/100000/signup", {
                params: { name: "강상진", ninkname: "브랜든캉" },
              })
              .then((result) => {
                alert(result.data);
              })
              .catch((error) => {
                alert(error);
              });
          }}
        >
          post
        </button>

        <button
          onClick={() => {
            axios
              .get("http://13.209.24.56/api/room/100000/participants", {})
              .then((result) => {
                alert(result.data);
              })
              .catch((error) => {
                alert(error);
              });
          }}
        >
          get
        </button>
      </Drawer>
      <span style={{ textAlign: "center" }}>
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
        <Button
          onClick={() => {
            alert("구독 연장까지 90일 남았습니다.");
          }}
          variant="outline"
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
              color: "orange",
              border: "2px solid orange",
              backgroundColor: "white",
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
          멤버십
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
              marginLeft: 5,
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
          로그인
        </Button>
      </span>
    </div>
  );
}

export default NavCreate;
