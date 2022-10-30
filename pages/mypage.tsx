import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
import React, { useEffect } from "react";
import MypageNavigation from "../components/index/IndexNavigation";
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

import { indexIsLogined, indexUserInfo } from "../components/States";

import { Logout, Pencil, Plus } from "tabler-icons-react";
import { NavbarSimpleColored } from "../components/mypage/MypageNavbar";
import IndexNavigation from "../components/index/IndexNavigation";
import { connectMainServerApiAddress } from "../components/ConstValues";

const Home: NextPage = () => {
  const router = useRouter();
  /* ****** dropzone ****** */
  const [files, setFiles] = useState<File[]>([]);

  const [userInfo, setUserInfo] = useRecoilState(indexUserInfo);
  const [isLogined, setIsLogined] = useRecoilState(indexIsLogined);

  useEffect(() => {
    // already logined
    if (isLogined === true) {
      return;
    }
    // not logined
    if (localStorage.getItem("access_token") === null) router.push("/");
    // auto login(access token validation)
    login(localStorage.getItem("access_token") as string);
  }, [router.isReady]);

  const login = async (tk: string) => {
    const config = {
      headers: { Authorization: `Bearer ${tk}` },
    };

    axios
      .get(connectMainServerApiAddress + "api/user", config)
      .then((result) => {
        setUserInfo(result.data);
        setIsLogined(true);
      })
      .catch(() => {
        // localStorage.removeItem("access_token");
        // localStorage.removeItem("host_id");
      });
    // localStorage.removeItem("access_token");
    // localStorage.removeItem("host_id");
  };
  return (
    <div>
      <Head>
        <title>exquiz.me - 프로필 설정</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <IndexNavigation />
      <NavbarSimpleColored></NavbarSimpleColored>
    </div>
  );
};

export default Home;
