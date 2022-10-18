import Router, { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import axios from "axios";
import { useRef } from "react";
import { useTimeout } from "@mantine/hooks";
import { useRecoilState } from "recoil";

import {
  Button,
  Center,
  Group,
  useMantineTheme,
  Stack,
  Grid,
  Alert,
  Container,
  Progress,
} from "@mantine/core";

import { useScrollIntoView } from "@mantine/hooks";

import { AlertCircle, BuildingSkyscraper } from "tabler-icons-react";
import {
  avatarAnimal,
  testPlayOption,
  testPlayProblem,
} from "../../components/ConstValues";

const Home: NextPage = () => {
  let [curIdx, setCurIdx] = useState(0);
  const [step, setStep] = useState(0);
  {
    /* *** main state *** */
  }
  let [problemSet, setProblemSet] = useState({
    closingMent: "",
    description: "",
    hostId: 1,
    title: "",
  });

  let [problem, setProblem] = useState(testPlayProblem);
  let [option, setOption] = useState(testPlayOption);

  {
    /* mantine statement */
  }
  const theme = useMantineTheme();
  const getColor = (color: string) =>
    theme.colors[color][theme.colorScheme === "dark" ? 5 : 7];

  {
    /* 2. 문제 추가 - subNav - tab */
  }

  {
    /* 1. 퀴즈 설정 - 메인 #과목 선택 */
  }

  {
    /* 1. 퀴즈 설정 - 사이드바 - #stepper */
  }
  const router = useRouter();
  const pin = router.query.pin;
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView();
  const [answer, setAnswer] = useState(-1);

  /* 2. modal */
  const [modalOpened, setModalOpened] = useState(false);
  /* submit form */
  let submitForm = {
    answerText: "1",
    problemIdx: 1,
    uuid: "d7a23266-6fc7-421a-9ed8-aad169013e52",
  };

  const getLeaderboard = async () => {
    const { data: result } = await axios.get(
      "https://api.exquiz.me/api/room/100310/mq/leaderboard"
    );
    return result.data;
  };

  const getProblemsets = () => {
    let rt = [{ id: -1, title: "", description: "", closingMent: "" }];
    axios
      .get("https://api.exquiz.me/api/problemsets/1")
      .then((result) => {
        setProblemsets(result.data);
      })
      .catch((error) => {
        alert(error);
      });
    return;
  };

  let [problemsets, setProblemsets] = useState([
    { id: -1, title: "", description: "", closingMent: "" },
  ]);

  const submit = async () => {
    const { data: result } = await axios.post(
      "https://dist.exquiz.me/api/room/100310/mq/submit",
      submitForm
    );
    return result.data;
  };

  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {step === 0 ? <></> : <></>}

      {step === 1 ? (
        <></>
      ) : (
        <Container size={1200}>
          <Stack className="mt-32 flex ">
            <Group position="apart">
              <Group>
                <Image
                  alt="hello"
                  className={`cursor-pointer rounded-full`}
                  src={avatarAnimal[0]}
                  width={"100px"}
                  height={"100px"}
                ></Image>
              </Group>
              <p className="text-lg font-semibold">PIN : {pin}</p>
            </Group>
            <Progress
              color="orange"
              className=""
              value={curIdx / problem.length}
              animate
            />
            <p className="text-lg font-semibold"> 문제 {curIdx + 1 + "번"}</p>
            <Grid className="" justify="center" gutter="sm">
              {option[curIdx].map(
                ({ description, idx, picture, problemId }, i) => {
                  let color = ["red", "blue", "green", "orange"];
                  let bgColor = "hover:bg-" + color[i] + "-500";
                  return (
                    <Grid.Col
                      className="!max-w-[50%] !basis-2/4"
                      key={i}
                      span={5}
                      offset={0}
                    >
                      <Button
                        fullWidth
                        style={{ height: "200px" }}
                        onClick={() => {
                          setAnswer(answer === i ? -1 : i);
                        }}
                        color={color[i]}
                        className={`${
                          answer === i ? "shadow-inner text-white" : ""
                        } shadow-md ${answer === i ? bgColor : ""} ${
                          answer === i ? bgColor : ""
                        }`}
                        variant={answer === i ? "filled" : "outline"}
                      >
                        <p className="text-lg"> {description}</p>
                      </Button>
                    </Grid.Col>
                  );
                }
              )}
            </Grid>
            <Button size="lg" color="orange">
              제출하기
            </Button>
          </Stack>
        </Container>
      )}
    </div>
  );
};

export default Home;
function sleep(arg0: number) {
  throw new Error("Function not implemented.");
}
