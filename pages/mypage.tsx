import { useRouter } from "next/router";
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

      <IndexNavigation />
      <NavbarSimpleColored></NavbarSimpleColored>
    </div>
  );
};

export default Home;
