import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRecoilState } from "recoil";

import {
  Button,
  Grid,
  SimpleGrid,
  Input,
  TextInput,
  Center,
  Container,
  Group,
  Switch,
  Tooltip,
  Modal,
} from "@mantine/core";
import {
  Emphasis,
  FileX,
  Login,
  ReportMoney,
  UserCircle,
  Pencil,
  Archive,
  Folders,
} from "tabler-icons-react";

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
  indexIsLogined,
  indexIsModalOpened,
  indexMembership,
  indexUserInfo,
  language,
} from "./States";

import {
  connectMainServerApiAddress,
  dtypeName,
  problemInput,
  optionInput,
  problemsetInput,
} from "./ConstValues";
import axios from "axios";
import { useState } from "react";

const IndexNavigation = () => {
  const router = useRouter();
  const [langValue, setLangValue] = useRecoilState(language);
  const [membership, setMembership] = useRecoilState(indexMembership);
  const [isLogined, setIsLogined] = useRecoilState(indexIsLogined);
  const [isModalOpened, setModalOpened] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(indexUserInfo);

  const googleLogin = () => {
    axios.get("https://api.exquiz.me/api/google/login");
    return;
  };

  let membershipComponent = (mtype: string) => {
    if (mtype === "0")
      return (
        <span
          onClick={() => {
            router.push("/membership");
          }}
          className="text-lg font-bold cursor-pointer"
        >
          멤버십
        </span>
      );
    if (mtype === "1")
      return (
        <span
          onClick={() => {
            router.push("/membership");
          }}
          className="text-lg font-bold cursor-pointer transition ease-in-out text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-600 animate-text"
        >
          스탠다드 플랜
        </span>
      );
    if (mtype === "2")
      return (
        <span
          onClick={() => {
            router.push("/membership");
          }}
          className="text-lg font-bold cursor-pointer transition ease-in-out text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-text"
        >
          프리미엄 플랜
        </span>
      );
    return <></>;
  };

  return (
    <header>
      <Group
        style={{
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 3px 4px -4px gray",
        }}
      >
        <Link href="/">
          <Image
            className="cursor-pointer pl-8"
            src="/../public/favicon.ico"
            alt="Picture of the author"
            width={50}
            height={50}
          />
        </Link>
        <Group>
          <Tooltip
            offset={15}
            label="구독 연장까지 60일 남았습니다."
            color="black"
            position="bottom"
            withArrow
          >
            {membershipComponent(membership)}
          </Tooltip>
          {isLogined === "0" ? (
            <span
              onClick={() => {
                setModalOpened(true);
                // google auth2
                // googleLogin();
                router.push("https://api.exquiz.me/api/google/login");
                // page convertion
                // router.push("/signup");
              }}
              className="p-4 text-lg font-bold cursor-pointer transition ease-in-out"
            >
              로그인
            </span>
          ) : (
            <img
              alt=""
              onClick={() => {
                router.push("/signup");
              }}
              className="h-10 w-auto cursor-pointer rounded-full"
              src={userInfo.picture}
            ></img>
          )}
          <Switch
            checked={langValue == "KO" ? true : false}
            onChange={(event) => {
              setLangValue(event.currentTarget.checked == true ? "KO" : "EN");
            }}
            defaultChecked={true}
            onLabel="KO"
            offLabel="EN"
            className="pr-4 text-lg font-bold cursor-pointer transition ease-in-out"
            size="lg"
            color="orange"
            label="언어"
          />
        </Group>
      </Group>
      <Modal
        centered
        opened={isModalOpened}
        onClose={() => setModalOpened(false)}
      >
        내용물
      </Modal>
    </header>
  );
};

export default IndexNavigation;
