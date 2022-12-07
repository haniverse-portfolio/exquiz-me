import Router, { useRouter } from "next/router";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import {
  Button,
  Stack,
  Grid,
  Container,
  Divider,
  Center,
  Loader,
  Progress,
  Group,
  ActionIcon,
} from "@mantine/core";

import { Checks, X } from "tabler-icons-react";
import { alternativeImage } from "../../components/display/alternativeImage";
import { avatarAnimal, avatarColor } from "../../components/ConstValues";

const Home: NextPage = () => {
  /* initialization */
  const router = useRouter();
  /* *** core initialization *** */

  /* *** use-state *** */
  const [ranking, setRanking] = useState(0);
  const [step, setStep] = useState(1);
  const [correct, setCorrect] = useState(false);
  const [problem, setProblem] = useState([
    { answer: "효율성", description: "efficiency" },
    { answer: "생산성", description: "productivity" },
    { answer: "찌르다", description: "to sting" },
    { answer: "보트를 흔들다", description: "to rock the boat" },
    { answer: "깁스", description: "a cast" },
    { answer: "무언가를 극복하다", description: "to get over something" },
    { answer: "병적인 비만", description: "morbidly obese" },
    { answer: "편리한", description: "convenient" },
    { answer: "격분한", description: "furious" },
    { answer: "직계 가족", description: "immediate family" },
    { answer: "대가족", description: "extended family" },
    { answer: "조상 숭배", description: "ancestral worship" },
    { answer: "비만", description: "obesity" },
    { answer: "부정행위를 하다", description: "to cheat on" },
    { answer: "사회 인류학자", description: "social anthropologist" },
    { answer: "침술", description: "acupuncture" },
    { answer: "임자가 되다/앞자리를 찜하다", description: "call shotgun" },
    { answer: "접근", description: "access" },
    { answer: "산업", description: "industry" },
    { answer: "현상", description: "phenomenal" },
    { answer: "추도식", description: "memorial service" },
    { answer: "줄이다", description: "to cut down on" },
    { answer: "무언가를 포기하다", description: "to give up something" },
    { answer: "짭짤한", description: "savoury" },
    { answer: "열정적인", description: "enthusiastic" },
    { answer: "자신 있다", description: "confident" },
    { answer: "탄수화물 식품", description: "carbs" },
    { answer: "강황의", description: "tumeric" },
    { answer: "아마씨", description: "flax seeds" },
    { answer: "통통한", description: "chunky" },
    { answer: "살을 빼다", description: "lose weight" },
    { answer: "무언가에 속다", description: "to fall for something" },
    { answer: "벼락치기로 공부하다", description: "to cram" },
    { answer: "칭찬", description: "compliment" },
    { answer: "앉아서 생활하는 생활 방식", description: "sedentary lifestyle" },
    { answer: "은행나무 열매", description: "ginkgo nuts" },
    { answer: "염좌", description: "twist or sprain" },
    { answer: "에 도전하다", description: "to try out for" },
    { answer: "당황한", description: "embarrassed" },
    { answer: "어찌할 바를 모르다", description: "be at a loss" },
    { answer: "황홀해 하는", description: "ecstatic" },
    { answer: "짓궃은", description: "mischievous" },
    { answer: "관습, 전통", description: "custom, tradition" },
    { answer: "다문화의", description: "multicultural" },
    { answer: "런닝머신", description: "treadmil" },
    { answer: "받아들이다", description: "to take up" },
    { answer: "한의학", description: "traditional korean medicine" },
    { answer: "등 근육", description: "back muscle" },
    {
      answer: "미안하지만 나는 동의하지 않는다",
      description: "i'm sorry but i disagree",
    },
    { answer: "내가 보기에", description: "if you ask me" },
    { answer: "손전등", description: "flashlight or torch" },
    { answer: "석류", description: "pomegranate" },
    { answer: "심장 강화 운동", description: "cardio" },
    { answer: "무술을 연마하다", description: "practice martial arts" },
    { answer: "생각해 내다", description: "to come down with" },
    { answer: "헬스 중독자", description: "gym rat" },
    { answer: "헬스 중독자", description: "fitness junkie/freak/enthusiast" },
  ]);
  const [correctCount, setCorrectCount] = useState(0);
  const [answerIdx, setAnswerIdx] = useState("");
  const [option, setOption] = useState(["Tmp", "tmp", "tmp", "tmp"]);
  const [answer, setAnswer] = useState("");
  const [curIdx, setCurIdx] = useState(0);

  useEffect(() => {
    let ans = problem[curIdx].answer;
    let arr = [];
    let tmpOption = [];
    for (let i = 0; i < problem.length; i++) {
      arr.push(false);
    }
    arr[curIdx] = true;
    tmpOption.push(ans);

    let cnt = 3;
    while (cnt--) {
      while (1) {
        let cur = Math.floor(Math.random() * (problem.length - 1) + 1);
        if (arr[cur] === true) continue;
        arr[cur] = true;
        tmpOption.push(problem[cur].answer);
        break;
      }
    }
    tmpOption.sort();
    setAnswerIdx((tmpOption.findIndex((v) => v === ans) as any).toString());

    setOption(tmpOption);
  }, [curIdx]);

  return (
    <div>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {step === 0 ? (
        <Stack
          align="center"
          className="flex items-center justify-center animate-textSlow bg-gradient-to-r from-[#FF9B3F] to-[#ffd178] h-[100vh]"
        >
          <Stack>
            <Center>
              <Loader color="orange" size="xl" />
            </Center>
            <p className="text-center text-xl text-white font-semibold">
              채점 중...
            </p>
          </Stack>
        </Stack>
      ) : (
        <></>
      )}

      {step === 1 ? (
        <>
          <Container
            className="animate-textSlow bg-gradient-to-r from-[#FF9B3F] to-[#ffd178] h-[100vh]"
            size={1200}
          >
            <Stack className="h-8"></Stack>
            <Stack className="relative p-8 rounded-xl shadow-lg bg-white">
              <Stack
                align="center"
                className=" absolute -top-6 rounded-full bg-orange-500 h-12 w-40"
              >
                <p className="m-auto text-center text-2xl text-white font-semibold">
                  문제 {curIdx + 1}
                </p>
              </Stack>
              <Progress
                color="orange"
                value={((curIdx + 1) / problem.length) * 100}
                size="xl"
              ></Progress>
              <Group position="apart">
                <Button
                  onClick={() => {
                    if (curIdx !== 0) setCurIdx(curIdx - 1);
                  }}
                  size="md"
                  color="orange"
                >
                  이전 문제
                </Button>
                <span className=" text-2xl text-gray-400 font-bold">
                  {curIdx + 1}/{problem.length}
                </span>
                <Button
                  onClick={() => {
                    if (curIdx !== problem.length) setCurIdx(curIdx + 1);
                  }}
                  size="md"
                  color="orange"
                >
                  다음 문제
                </Button>
              </Group>
              <Divider size="xs"></Divider>

              <span className=" text-4xl text-orange-500 font-bold">Q. </span>

              <p className="m-auto text-center text-2xl font-semibold">
                {problem[curIdx].description || ""}
              </p>
              <Grid className="" justify="center" gutter="sm">
                {option.map((cur, i) => {
                  let bgColor = ["red", "blue", "yellow", "green"];
                  return (
                    <Grid.Col
                      className="!max-w-[50%] !basis-2/4"
                      key={i}
                      span={5}
                      offset={0}
                    >
                      <Button
                        fullWidth
                        style={{ height: "150px" }}
                        onClick={() => {
                          setAnswer(
                            answer === i.toString() ? "" : i.toString()
                          );
                        }}
                        color={bgColor[i]}
                        className={`${
                          answer === i.toString()
                            ? "shadow-inner text-white"
                            : ""
                        } shadow-md`}
                        variant={answer === i.toString() ? "filled" : "outline"}
                      >
                        <p className="text-lg"> {cur}</p>
                      </Button>
                    </Grid.Col>
                  );
                })}
              </Grid>
              <Divider size="xs"></Divider>
              <Button
                disabled={answer === "" ? true : false}
                onClick={() => {
                  if (answer === answerIdx) setCorrectCount(correctCount + 1);
                  //connect();
                  setStep(0);
                  setTimeout(() => {
                    setStep(2);
                  }, 1000);
                }}
                size="lg"
                color="orange"
              >
                제출하기
              </Button>
            </Stack>
          </Container>
        </>
      ) : (
        <></>
      )}
      {step === 2 ? (
        <>
          <Container
            className="animate-textSlow bg-gradient-to-r from-[#FF9B3F] to-[#ffd178] h-[100vh]"
            size={1200}
          >
            <Stack className="h-8"></Stack>
            <Stack className="relative p-8 rounded-xl shadow-lg bg-white">
              {answer === answerIdx ? (
                <p className="m-auto text-center text-2xl font-semibold text-green-700">
                  맞았습니다!!
                </p>
              ) : (
                <p className="m-auto text-center text-2xl font-semibold text-red-700">
                  틀렸습니다
                </p>
              )}
            </Stack>
            <Stack className="relative p-8 mt-8 rounded-xl shadow-lg bg-white">
              <p className="m-auto text-center text-2xl font-semibold">
                {problem[curIdx].description || ""}의 뜻은...?
              </p>
              <p className="m-auto text-center text-2xl font-semibold ">
                정답은{" "}
                <strong className="text-orange-500">
                  {parseInt(answerIdx) + 1}
                </strong>
                번{" "}
                <strong className="text-orange-500">
                  {problem[curIdx].answer}
                </strong>
                입니다.
              </p>
              <Divider size="xs"></Divider>
              <Button
                onClick={() => {
                  //connect();
                  setAnswer("");
                  if (curIdx === problem.length - 1) setStep(3);
                  else {
                    setCurIdx(curIdx + 1);
                    setStep(1);
                  }
                }}
                size="lg"
                color="orange"
              >
                다음 문제
              </Button>
            </Stack>
          </Container>
        </>
      ) : (
        <></>
      )}
      {step === 3 ? (
        <>
          <Container className="bg-[#ffd178] h-[100vh]" size={1200}>
            <Stack className="h-8"></Stack>
            <Stack className="relative p-8 rounded-xl shadow-lg bg-white">
              <p className="m-auto text-center text-2xl font-semibold">
                퀴즈 결과
              </p>
            </Stack>
            <Stack className="relative p-8 mt-8 rounded-xl shadow-lg bg-white">
              <Center>
                <Stack
                  className={`w-6/12 m-2 rounded-xl bg-white shadow-lg
                  }`}
                >
                  <Center
                    className={` rounded-t-xl h-[160px] ${avatarColor[0]}  shadow-lg`}
                  >
                    <img
                      alt="hello"
                      className="cursor-pointer rounded-full !overflow-visible animate-bounce"
                      src={avatarAnimal[0]}
                      width={"120px"}
                      height={"120px"}
                    ></img>
                  </Center>
                  <p className="font-semibold 2xl:text-lg md:text-sm pb-4 text-center text-black">
                    {""}
                  </p>
                </Stack>
              </Center>
              <p className="m-auto text-center text-2xl font-semibold ">
                <strong className="text-orange-500">{correctCount}</strong> /{" "}
                {problem.length} 개
              </p>
              <p className="m-auto text-center text-2xl font-semibold ">
                의영 <strong className="text-orange-500">A+</strong> 각이네요{" "}
                <strong className="text-green-700">{""}</strong>
                &nbsp;
              </p>
              <Divider size="xs"></Divider>
              {ranking === 0 ? (
                <Group className="shadow-lg rounded-xl p-4">
                  <Image src="/medal_first.svg" width={50} height={50} />
                  <p className="m-auto text-center text-xl font-semibold ">
                    압도적인 1등
                  </p>
                  <Image src="/medal_first.svg" width={50} height={50} />
                </Group>
              ) : (
                <></>
              )}
              {ranking === 1 ? (
                <Group className="shadow-lg rounded-xl p-4">
                  <Image src="/medal_second.svg" width={50} height={50} />
                  <p className="m-auto text-center text-xl font-semibold ">
                    뛰어난 2등
                  </p>
                  <Image src="/medal_second.svg" width={50} height={50} />
                </Group>
              ) : (
                <></>
              )}
              {ranking === 2 ? (
                <Group className="shadow-lg rounded-xl p-4">
                  <Image src="/medal_third.svg" width={50} height={50} />
                  <p className="m-auto text-center text-xl font-semibold ">
                    선방한 3등
                  </p>
                  <Image src="/medal_third.svg" width={50} height={50} />
                </Group>
              ) : (
                <></>
              )}
              <Group className="shadow-lg rounded-xl p-4">
                <ActionIcon variant="transparent" color="green" size={50}>
                  <Checks color="green" size={50}></Checks>
                </ActionIcon>
                <p className="m-auto text-center text-xl font-semibold ">
                  연속 득점자
                </p>
                <ActionIcon variant="transparent" color="green" size={50}>
                  <Checks color="green" size={50}></Checks>
                </ActionIcon>
              </Group>
            </Stack>
          </Container>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Home;

// setTimeout(() => {
//   var cat = localStorage.getItem("fromSession");
//   client.send(
//     "/pub/room/" + pin + "/submit",
//     {},
//     JSON.stringify({
//       messageType: "ANSWER", // 반드시 "ANSWER"
//       fromSession: cat, // 사용자 session id - google login시 발급
//       problemIdx: 0, // 제출한 문제의 번호
//       answerText: answer.toString(),
//     })
//   );
// }, 500);
