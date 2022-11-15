import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useRecoilState } from "recoil";

import {
  ActionIcon,
  Button,
  Center,
  Container,
  Divider,
  Group,
  HoverCard,
  Stack,
} from "@mantine/core";
import { World } from "tabler-icons-react";

import {
  indexIsLogined,
  indexMembership,
  indexUserInfo,
  language,
} from "../States";

import {} from "../ConstValues";
import axios from "axios";
import { getRouteMatcher } from "next/dist/shared/lib/router/utils/route-matcher";

const IndexNavigation = () => {
  const router = useRouter();
  const [langValue, setLangValue] = useRecoilState(language);
  const [membership, setMembership] = useRecoilState(indexMembership);
  const [isLogined, setIsLogined] = useRecoilState(indexIsLogined);
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
    <header className="bg-white sticky top-0 z-50">
      <Group position="apart" className="h-[60px] px-4 shadow">
        <Link href={isLogined === false ? "/" : "/inbox"}>
          <Group className="cursor-pointer">
            <Image src="/logo_orange.png" alt="logo" width={150} height={30} />
          </Group>
        </Link>
        <Group>
          {isLogined === false ? (
            <span
              onClick={() => {
                router.push("/login");
              }}
              className="p-4 text-lg font-bold cursor-pointer transition ease-in-out"
            >
              로그인
            </span>
          ) : (
            <HoverCard transition="pop" offset={5} width={280} shadow="md">
              <HoverCard.Target>
                <span
                  onClick={() => {
                    router.push("/mypage");
                  }}
                  className="p-4 text-lg font-bold cursor-pointer transition ease-in-out"
                >
                  내 정보
                </span>
              </HoverCard.Target>
              <HoverCard.Dropdown className="h-[25vh] !p-0 !m-0">
                <Stack className="h-[60px] bg-[#FFD178]"></Stack>
                <Container className="p-0 m-0 relative bottom-10">
                  <Center>
                    <Image
                      width={60}
                      height={60}
                      alt="로그인"
                      onClick={() => {
                        router.push("/mypage");
                      }}
                      className="shadow-lg text-center relative bottom-32 -top-10 cursor-pointer rounded-full"
                      src={userInfo.picture}
                    ></Image>
                  </Center>
                </Container>
                <h2 className="p-0 m-0 text-[#818181] text-[16px] text-center">
                  <p className="text-black">{userInfo.nickname}</p>
                  <p className="font-normal">{userInfo.email}</p>
                </h2>
                <Divider size="sm"></Divider>
                <Group className="mt-4 justify-center" position="center">
                  <Button
                    onClick={() => {
                      setIsLogined(false);
                      localStorage.removeItem("access_token");
                      localStorage.removeItem("host_id");
                      location.replace("/");
                    }}
                    variant="light"
                    color="orange"
                  >
                    로그아웃
                  </Button>
                  <Button
                    onClick={() => {
                      router.push("/mypage");
                    }}
                    variant="light"
                    color="orange"
                  >
                    정보수정
                  </Button>
                </Group>
              </HoverCard.Dropdown>
            </HoverCard>
          )}
          {membershipComponent(membership)}
          {/* <Switch
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
          /> */}
          <ActionIcon size={40}>
            <World color="gray" size={40}></World>
          </ActionIcon>
        </Group>
      </Group>
    </header>
  );
};

export default IndexNavigation;

{
  /* <Link href={isLogined === false ? "/" : "/inbox"}>
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
        </Link> */
}
