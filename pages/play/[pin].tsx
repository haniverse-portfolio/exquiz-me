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
import { avatarAnimal } from "../../components/ConstValues";

const Home: NextPage = () => {
  let [curIdx, setCurIdx] = useState(0);
  {
    /* *** main state *** */
  }
  let [problemSet, setProblemSet] = useState({
    closingMent: "",
    description: "",
    hostId: 1,
    title: "",
  });

  let [problem, setProblem] = useState([
    {
      answer: "0",
      description: "우리나라에서 가장 높은 산은?",
      dtype: "MultipleChoiceProblem",
      idx: 0,
      picture: "",
      problemsetId: 0,
      score: 125,
      timelimit: 30,
      title: "",
    },
    {
      answer: "0",
      description: "아이스크림을 영어로 하면?",
      dtype: "MultipleChoiceProblem",
      idx: 0,
      picture: "",
      problemsetId: 0,
      score: 125,
      timelimit: 30,
      title: "",
    },
    {
      answer: "0",
      description: "소프트웨어 마에스트로가 있는 빌딩은?",
      dtype: "MultipleChoiceProblem",
      idx: 0,
      picture: "",
      problemsetId: 0,
      score: 125,
      timelimit: 30,
      title: "",
    },
    {
      answer: "0",
      description: "🌋이 중 가장 무시무시한 공룡은?🏔",
      dtype: "MultipleChoiceProblem",
      idx: 0,
      picture: "",
      problemsetId: 0,
      score: 125,
      timelimit: 30,
      title: "",
    },
  ]);

  let [option, setOption] = useState([
    [
      {
        description: "설악산",
        idx: 0,
        picture: "",
        problemId: 0,
      },
      {
        description: "지리산",
        idx: 1,
        picture: "",
        problemId: 0,
      },
      {
        description: "한라산",
        idx: 2,
        picture: "",
        problemId: 0,
      },
      {
        description: "백두산",
        idx: 3,
        picture: "",
        problemId: 0,
      },
    ],
    [
      {
        description: "icecoffee",
        idx: 0,
        picture: "",
        problemId: 0,
      },
      {
        description: "icekekki",
        idx: 1,
        picture: "",
        problemId: 0,
      },
      {
        description: "icecream",
        idx: 2,
        picture: "",
        problemId: 0,
      },
      {
        description: "iceball",
        idx: 3,
        picture: "",
        problemId: 0,
      },
    ],
    [
      {
        description: "황해주택",
        idx: 0,
        picture: "",
        problemId: 0,
      },
      {
        description: "인하주택",
        idx: 1,
        picture: "",
        problemId: 0,
      },
      {
        description: "아남타워",
        idx: 2,
        picture: "",
        problemId: 0,
      },
      {
        description: "코엑스",
        idx: 3,
        picture: "",
        problemId: 0,
      },
    ],
    [
      {
        description: "티라노사우루스",
        idx: 0,
        picture: "",
        problemId: 0,
      },
      {
        description: "트리케라톱스",
        idx: 1,
        picture: "",
        problemId: 0,
      },
      {
        description: "랩터",
        idx: 2,
        picture: "",
        problemId: 0,
      },
      {
        description: "스피노사우루스",
        idx: 3,
        picture: "",
        problemId: 0,
      },
    ],
  ]);

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

      {/* main */}
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
      {/* caching tailwind css */}
      <Group className="hover:bg-red-500 bg-red-500 w-0 h-0" />
      <Group className="hover:bg-blue-500 bg-blue-500 w-0 h-0" />
      <Group className="hover:bg-green-500 bg-green-500 w-0 h-0" />
      <Group className="hover:bg-orange-500 bg-orange-500 w-0 h-0" />
      <Group className="bg-gradient-to-r border-orange-500 from-orange-500 to-red-500 bg-red-500 w-0 h-0" />
      <Group className="bg-gradient-to-r border-blue-500 from-blue-500 to-green-500 w-0 h-0" />
      <Group className="bg-gradient-to-r border-violet-500 from-violet-500 to-orange-500 w-0 h-0" />
      <Group className="bg-gradient-to-r border-yellow-500 from-yellow-500 to-orange-500 w-0 h-0" />
      <Group className="bg-gradient-to-r border-gray-500 from-gray-400 to-gray-400 w-0 h-0" />
      <Group className="bg-gradient-to-r border-red-500 from-red-500 to-orange-500 w-0 h-0" />
      <Group className="bg-gradient-to-r border-blue-500 from-blue-700 to-blue-500 w-0 h-0" />
      <Group className="bg-gradient-to-r border-green-500 from-green-500 to-lime-500 w-0 h-0" />
      <Group className="bg-gradient-to-r border-amber-500 from-amber-500 to-yellow-400 w-0 h-0" />
      <Group className="bg-gradient-to-r border-violet-500 from-violet-700 to-fuchsia-600 w-0 h-0" />
    </div>
  );
};

export default Home;
function sleep(arg0: number) {
  throw new Error("Function not implemented.");
}
