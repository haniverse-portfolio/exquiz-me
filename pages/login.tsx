import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
{
  /* ui Library*/
}
import { Button, Group, Stack, Container } from "@mantine/core";
import { BrandGoogle } from "tabler-icons-react";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>exquiz.me - 로그인</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* modal */}
      <Stack
        align="center"
        className="flex items-center justify-center h-[100vh]"
      >
        <Stack
          align="center"
          spacing={100}
          className="flex items-center justify-center h-[100vh] w-[21vw] h-[61vh] shadow-xl rounded-xl"
        >
          <Stack>
            <Group
              onClick={() => {
                router.push("/");
              }}
              position="center"
              className="cursor-pointer"
            >
              <Image
                src="/logo_orange.png"
                alt="logo"
                width={150}
                height={30}
              />
            </Group>
            <h3 className="font-normal text-[#818181] text-[20px] text-center">
              <p>퀴즈에 새로운 경험을 더하다</p>
            </h3>
          </Stack>
          <Container>
            <Button
              size="md"
              variant="outline"
              onClick={() => {
                router.push("https://api.exquiz.me/api/google/login/local");
                // 배포 시 : /prod
              }}
              color="orange"
              leftIcon={<BrandGoogle size={14} />}
            >
              구글 계정으로 시작하기
            </Button>
          </Container>
        </Stack>
      </Stack>
    </div>
  );
};

export default Home;
