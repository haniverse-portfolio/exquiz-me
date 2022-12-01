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
  Switch,
} from "@mantine/core";
import { World } from "tabler-icons-react";

import {
  indexIsLogined,
  indexMembership,
  indexUserInfo,
  language,
} from "../../States";

import {} from "../../ConstValues";
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

  return (
    <header className="bg-white sticky top-0 z-50">
      <Group position="apart" className="h-[60px] px-4 shadow">
        <Link href={isLogined === false ? "/" : "/inbox"}>
          <Group className="cursor-pointer">
            <Image src="/logo_orange.png" alt="logo" width={150} height={30} />
          </Group>
        </Link>
        <Group>
          <Button radius="xl" color="orange" size="lg" variant="light">
            내 정보
          </Button>
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
