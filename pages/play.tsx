import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import axios from "axios";
import { useRef } from "react";
import { useTimeout } from "@mantine/hooks";

import {
  Button,
  Center,
  Group,
  useMantineTheme,
  Stack,
  Grid,
  Alert,
} from "@mantine/core";

import { useScrollIntoView } from "@mantine/hooks";

import { AlertCircle } from "tabler-icons-react";

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
      answer: "3",
      description: "우리나라에서 가장 높은 산은?",
      dtype: "MultipleChoiceProblem",
      idx: 0,
      picture: "string",
      problemsetId: 0,
      score: 0,
      timelimit: 0,
      title: "string",
    },
  ]);

  let [option, setOption] = useState([
    {
      description: "지리산",
      idx: 0,
      picture: "string",
      problemId: 0,
    },
    {
      description: "설악산",
      idx: 1,
      picture: "string",
      problemId: 0,
    },
    {
      description: "한라산",
      idx: 2,
      picture: "string",
      problemId: 0,
    },
    {
      description: "백두산",
      idx: 3,
      picture: "string",
      problemId: 0,
    },
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
  const subjectInfo = [
    { name: "미분류", startColor: "gray", endColor: "gray" },
    { name: "언어", startColor: "orange", endColor: "red" },
    { name: "수리과학", startColor: "blue", endColor: "green" },
    { name: "인문사회", startColor: "violet", endColor: "pink" },
    { name: "예체능", startColor: "yellow", endColor: "orange" },
  ];

  {
    /* 1. 퀴즈 설정 - 사이드바 - #stepper */
  }

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
      "https://dist.exquiz.me/api/room/100310/mq/leaderboard"
    );
    return result.data;
  };

  const getProblemsets = () => {
    let rt = [{ id: -1, title: "", description: "", closingMent: "" }];
    axios
      .get("https://prod.exquiz.me/api/problemsets/1")
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

      <Center className="w-full h-full">
        <Center className="h-[100vh]">
          {/* main */}
          <Stack>
            <Grid justify="center" gutter="sm">
              {option.map((description, i) => {
                let color = ["red", "blue", "green", "orange"];
                let bgColor = "bg-" + color[i] + "-500";
                let hoverColor = "hover:" + bgColor;
                return (
                  <Grid.Col key={i} span={5}>
                    <Button
                      onClick={() => {
                        setAnswer(answer === i ? -1 : i);
                      }}
                      color={color[i]}
                      className={`${
                        answer === i ? "shadow-inner text-white" : ""
                      } shadow-lg h-28 ${
                        answer === i ? hoverColor : ""
                      } w-full  ${answer === i ? bgColor : ""}`}
                      variant="outline"
                    >
                      {option[i].description}
                    </Button>
                  </Grid.Col>
                );
              })}
            </Grid>
          </Stack>
        </Center>
      </Center>
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
