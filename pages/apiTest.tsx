import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import axios from "axios";
import React, { useState } from "react";

import {
  Box,
  Accordion,
  Button,
  Grid,
  SimpleGrid,
  Input,
  TextInput,
  Center,
} from "@mantine/core";
import {
  Emphasis,
  FileX,
  Login,
  ReportMoney,
  UserCircle,
  Pencil,
  CloudDownload,
  CloudUpload,
} from "tabler-icons-react";

const Home: NextPage = () => {
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

  let [problemset, setProblemset] = useState([
    {
      closingMent: "",
      createdAt: "",
      deleted: true,
      deletedAt: "",
      description: "",
      id: 0,
      problems: [
        {
          answer: "",
          createdAt: "",
          deleted: true,
          deletedAt: "",
          description: "",
          dtype: "",
          id: 0,
          index: 0,
          picture: "",
          score: 0,
          timelimit: 0,
          title: "",
          totalCorrect: 0,
          totalTry: 0,
          updatedAt: "",
        },
      ],
      problemsetTags: [{}],
      rooms: [
        {
          currentProblemNum: 0,
          currentState: "",
          endDate: "",
          id: 0,
          maxParticipantCount: 0,
          pin: "",
          startDate: "",
        },
      ],
      title: "",
      totalParticipant: 0,
      updatedAt: "",
    },
  ]);

  function componentDidMount() {
    // Simple POST request with a JSON body using axios
    const userData = { name: "kangsangjin", nickname: "brandonkang" };
    axios
      .post("https://exquiz.net/api/room/100000/signup", userData)
      .then((result) => {
        alert("성공!");
      })
      .catch((error) => {
        alert(error);
      });
  }

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

      <main>
        <section style={{ margin: "0px 20px" }}>
          <Center>
            <div style={{ fontSize: "30px", fontWeight: "bold" }}>
              {" "}
              레트로스펙트의 private 스웩한-ui
            </div>
          </Center>
          <p>상빈이형의 퀴즈 배포 파트</p>
          <Accordion defaultValue="customization" variant="separated">
            <Accordion.Item
              value="customization"
              style={{
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.05)",
              }}
            >
              <Accordion.Control icon={<CloudDownload />}>
                GET /api/room/roomPin/participants (방 참여자 목록 조회){" "}
              </Accordion.Control>

              <Accordion.Panel>
                <>
                  <Button
                    onClick={() => {
                      axios
                        .get("https://exquiz.net/api/room/100000/participants")
                        .then((result) => {
                          setGetData(result.data);
                        })
                        .catch((error) => {
                          alert(error);
                        });
                    }}
                  >
                    GET
                  </Button>
                  <Center></Center>

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
                </>
              </Accordion.Panel>

              <Accordion.Control icon={<CloudUpload />}>
                POST /api/room/roomPin/singup (익명사용자 정보 등록 후 방 입장){" "}
              </Accordion.Control>

              <Accordion.Panel>
                <Button
                  color="green"
                  onClick={() => {
                    componentDidMount();
                  }}
                >
                  POST
                </Button>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
          <p>민겸이형의 퀴즈 제작 파트</p>
          <Accordion defaultValue="customization" variant="separated">
            <Accordion.Item
              value="customization"
              style={{
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.05)",
              }}
            >
              <Accordion.Control icon={<CloudDownload />}>
                POST /api/problemsets/hostID (호스트가 가지고 있는 problemset
                목록 조회){" "}
              </Accordion.Control>

              <Accordion.Panel>
                {" "}
                <Button
                  onClick={() => {
                    axios
                      .get("https://prod.exquiz.net/api/problemsets/1")
                      .then((result) => {
                        setProblemset(result.data);
                      })
                      .catch((error) => {
                        alert(error);
                      });
                  }}
                >
                  GET
                </Button>
                <p>closingMent : </p>
                {problemset[0].closingMent}
                <p>createAt : </p>
                <p>{problemset[0].createdAt}</p>
                <p>deleted : </p>
                <p>{problemset[0].deleted}</p>
                <p>deletedAt : </p>
                <p>{problemset[0].deletedAt}</p>
                <p>description : </p>
                <p>{problemset[0].description}</p>
                <p>id : </p>
                <p> {problemset[0].id}</p>
                <p>title : </p>
                <p> {problemset[0].title}</p>
                <p>totalParticipant : </p>
                <p> {problemset[0].totalParticipant}</p>
                <p>updatedAt : </p>
                <p> {problemset[0].updatedAt}</p>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </section>
      </main>

      <footer className={styles.footer}>
        <a
          style={{
            backgroundColor: "white",
            textDecoration: "none",
            color: "black",
          }}
          href="/apiTest"
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
