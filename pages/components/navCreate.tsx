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

function componentDidMount() {
  // Simple POST request with a JSON body using axios
  const userData = { name: "kangsangjin", ninkname: "brandonkang" };
  axios
    .post("https://exquiz.net/api/room/100000/signup", userData)
    .then((result) => {
      alert("성공!");
    })
    .catch((error) => {
      alert(error);
    });
}

function NavCreate() {
  let [title, setTitle] = useState("");
  const [opened, setOpened] = useState(true);
  let [getData, setGetData] = useState([
    {
      id: null,
      uuid: "",
      name: "",
      nickname: "",
      roomDto: {
        id: null,
        pin: "",
        maxParticipantCount: null,
        startDate: null,
        endDate: null,
        currentState: null,
        currentProblemNum: null,
      },
      entryDate: null,
      currentScore: null,
    },
  ]);
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
        transition="rotate-left"
        transitionDuration={250}
        transitionTimingFunction="ease"
        opened={opened}
        onClose={() => setOpened(false)}
        title="퀴즈 설정"
        position="left"
        size="xl"
      >
        <Container
          style={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Container style={{ textAlign: "center" }}>
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
          </Container>
        </Container>
        <button
          onClick={() => {
            componentDidMount();
          }}
        ></button>
        <button
          onClick={() => {
            axios
              .get("https://exquiz.net/api/room/100000/participants", {})
              .then((result) => {
                setGetData(result.data);
              })
              .catch((error) => {
                alert(error);
              });
          }}
        >
          10만번째방에 참가한 참가자들 정보 GET하기
        </button>

        <p>방에 참가한 학생1 정보</p>
        <p>id : </p>
        {getData[0].id}
        <p>uuid : </p>
        {getData[0].uuid}
        <p>name : </p>
        {getData[0].name}

        <p>nickname : </p>
        {getData[0].nickname}
        <p>entryDate : </p>
        {getData[0].entryDate}
        <p>currentScore : </p>
        {getData[0].currentScore}

        <br></br>
        <p>이제 roomDto 정보입니다.</p>
        <p>id : </p>
        {getData[0].roomDto.id}
        <p>pin : </p>
        {getData[0].roomDto.pin}
        <p>maxParticipantCount : </p>
        {getData[0].roomDto.maxParticipantCount}
        <p>startDate : </p>
        {getData[0].roomDto.startDate}
        <p>endDate : </p>
        {getData[0].roomDto.endDate}
        <p>currentState : </p>
        {getData[0].roomDto.currentState}
        <p>currentProblemNum : </p>
        {getData[0].roomDto.currentProblemNum}
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
