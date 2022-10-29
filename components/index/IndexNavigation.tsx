import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRecoilState } from "recoil";

import { ActionIcon, Group, Switch, ThemeIcon, Tooltip } from "@mantine/core";
import { World } from "tabler-icons-react";

import {
  indexIsLogined,
  indexIsModalOpened,
  indexMembership,
  indexUserInfo,
  language,
} from "../States";

import {} from "../ConstValues";
import axios from "axios";

const IndexNavigation = () => {
  const router = useRouter();
  const [langValue, setLangValue] = useRecoilState(language);
  const [membership, setMembership] = useRecoilState(indexMembership);
  const [isLogined, setIsLogined] = useRecoilState(indexIsLogined);
  const [userInfo, setUserInfo] = useRecoilState(indexUserInfo);
  const [modalOpened, setModalOpened] = useRecoilState(indexIsModalOpened);

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
    <header className="bg-white sticky top-0 z-50">
      <Group position="apart" className="h-[60px] px-4 shadow">
        <Link href="/">
          <Group className="cursor-pointer">
            <Image
              className="rounded-full"
              src="/index/bulb_bg.png"
              alt="logo"
              width={50}
              height={50}
            />
            <span className="font-semibold text-[24px]">exquiz.me</span>
          </Group>
        </Link>
        <Group>
          {membershipComponent(membership)}
          {isLogined === "0" ? (
            <span
              onClick={() => {
                setModalOpened("1");
                // google auth2
                // googleLogin();
                // page convertion
                // router.push("/signup");
              }}
              className="p-4 text-lg font-bold cursor-pointer transition ease-in-out"
            >
              로그인
            </span>
          ) : (
            <Image
              alt=""
              onClick={() => {
                router.push("/mypage");
              }}
              className="h-10 w-auto cursor-pointer rounded-full"
              src={userInfo.picture}
            ></Image>
          )}
          <Switch
            checked={langValue == "KO" ? true : false}
            onChange={(event) => {
              setLangValue(event.currentTarget.checked == true ? "KO" : "EN");
            }}
            defaultChecked={true}
            onLabel="KO"
            offLabel="EN"
            className="text-lg font-bold cursor-pointer transition ease-in-out"
            size="lg"
            color="orange"
          />
          <ActionIcon size={40}>
            <World color="gray" size={40}></World>
          </ActionIcon>
        </Group>
      </Group>
    </header>
  );
};

export default IndexNavigation;
