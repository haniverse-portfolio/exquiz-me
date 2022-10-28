import { useRouter } from "next/router";
import axios from "axios";
import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRecoilState } from "recoil";
import {
  createCompleteModal,
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
  createTabModal,
  createTabNextIdx,
  createTargetIdx,
  createTimelimit,
  createProblemsetDrawer,
  createImageWord,
} from "../components/States";
import { useDebouncedState } from "@mantine/hooks";
import { Center, Stack, Grid, Notification } from "@mantine/core";

import { Main } from "../components/create/Main";
import { CreateNavigation } from "../components/create/CreateNavigation";
import { CompleteModal } from "../components/create/CompleteModal";
import { ProblemsetModal } from "../components/create/ProblemsetModal";

import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

import {
  Check,
  SquareCheck,
  AB,
  QuestionMark,
  Apps,
  Parentheses,
  MathAvg,
} from "tabler-icons-react";
import { TabChangeModal } from "../components/create/TabChangeModal";
import { ImageSection } from "../components/create/ImageSection";
import { connectMainServerApiAddress } from "../components/ConstValues";
import { NavbarMinimal } from "../components/create/slideProblemControlBar";
import { SearchSection } from "../components/create/SearchSection";

const Home: NextPage = () => {
  // const [files, setFiles] = useState<FileWithPath[]>([]);
  /* ****** routes ****** */
  const [step, setStep] = useRecoilState(createStep);

  /* ****** pop-over ****** */
  /* modal */
  const [completeModalOpened, setCompleteModalOpened] =
    useRecoilState(createCompleteModal);
  const [tabModalOpened, setTabModalOpened] = useRecoilState(createTabModal);
  /* drawer */
  const [problemsetDrawer, setProblemsetDrawer] = useRecoilState(
    createProblemsetDrawer
  );

  /* ****** dropzone ****** */
  const [localImageUpload, setLocalImageUpload] = useState<File[]>([]);

  /* ****** state-start ****** */

  /* *** slide *** */
  const [cur, setCur] = useRecoilState(createTargetIdx);
  const [curIdx, setCurIdx] = useRecoilState(createProblemIdx);
  /* *** form *** */
  const [tabIdx, setTabIdx] = useRecoilState(createTabCurrentIdx);
  const [tabChangeIdx, setTabChangeIdx] = useRecoilState(createTabNextIdx);

  /* *** common *** */
  const [problemSet, setProblemSet] = useRecoilState(createProblemset);
  const [problem, setProblem] = useRecoilState(createProblem);
  const [option, setOption] = useRecoilState(createOption);
  /* score, time */
  const [scoreValue, setScoreValue] = useRecoilState(createScore);
  const [timelimit, setTimelimit] = useRecoilState(createTimelimit);
  /* image */
  const [imageURL, setImageURL] = useRecoilState(createImageURL);
  const [imageList, setImageList] = useRecoilState(createImageList);
  const [imageLoading, setImageLoading] = useRecoilState(createIsImageLoading);
  const [imageWord, setImageWord] = useRecoilState(createImageWord);

  function replaceItemAtIndex(arr: any, index: number, newValue: any) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  }
  /* ****** state-end ****** */

  /* ****** effect-start ****** */

  /* image */
  useEffect(() => {
    setProblemsetDrawer("1");
  }, []);

  useEffect(() => {
    getImageList(imageWord);
    setImageLoading(false);
  }, [imageWord]);

  /* score */
  useEffect(() => {
    // setProblem((prevProblem) => {
    //   const copy = [...prevProblem];
    //   copy[curIdx].score = Math.trunc(100 + (scoreValue / 25) * 100);
    //   return copy;
    // });
    const value = Math.trunc(100 + (scoreValue / 25) * 100);
    const newProblem = replaceItemAtIndex(problem, curIdx, {
      ...problem[curIdx],
      score: value,
    });
    setProblem(newProblem);
    // let copy = [...problem];
    // // let copy = JSON.parse(JSON.stringify(problem));
    // // copy[curIdx].score = Math.trunc(100 + (scoreValue / 25) * 100);
    // copy[curIdx].score = Math.trunc(100 + (scoreValue / 25) * 100);
    // setProblem(copy);
  }, [scoreValue]);

  /* time */
  useEffect(() => {
    let copy = JSON.parse(JSON.stringify(problem));
    copy[curIdx].timelimit = Math.trunc(10 + (timelimit / 25) * 10);
    setProblem((prevstate) => copy);
  }, [timelimit]);

  /* ****** effect-end****** */

  const getImageList = async (name: string) => {
    let rt = Infinity;
    await axios
      .get(connectMainServerApiAddress + "api/crawl/" + name)
      .then((result) => {
        setImageList(result.data);
        console.log(result.data);
      })
      .catch((error) => {});
    return rt;
  };

  const getProblemsetId = async () => {
    let rt = Infinity;
    await axios
      .post(
        //const { data: result } =
        connectMainServerApiAddress + "api/problemset",
        problemSet
      )
      .then((result) => {
        rt = result.data.id;
      })
      .catch((error) => {
        alert("problemset_error");
      });
    return rt;
  };

  const getImage = async (word: string) => {
    let rt = []!;
    await axios
      .get(connectMainServerApiAddress + "api/problem")
      .then((result) => {
        rt = result.data;
      })
      .catch((error) => {
        alert("image_error");
      });
    return rt;
  };

  const getProblemId = async (idx: number) => {
    let rt = Infinity;
    await axios
      .post(connectMainServerApiAddress + "api/problem", problem[idx])
      .then((result) => {
        rt = result.data.id;
      })
      .catch((error) => {
        alert("problem_error");
      });
    return rt;
  };

  const postOption = async (idx1: number, idx2: number) => {
    await axios
      .post(
        connectMainServerApiAddress + "api/problem_option",
        option[idx1][idx2]
      )
      .then((result) => {})
      .catch((error) => {
        // alert(error);
      });
    return;
  };

  return (
    <>
      {/* head */}
      <Head>
        <title>{problemSet.title == "" ? "제목 없음" : problemSet.title}</title>
        <meta name="description" content="exquiz.me" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        ></meta>
      </Head>
      {/* modal */}
      <CompleteModal />
      <TabChangeModal />
      {/* title */}

      {/* 퀴즈 제작 */}
      <main>
        {step === 0 ? (
          <Stack>
            {/* navigation bar */}
            <CreateNavigation />
            {/* slide + create + image */}

            {/* <NavbarMinimal></NavbarMinimal> */}
            {/* <SearchSection /> */}
            {/* <Main></Main> */}
            {/* <ImageSection /> */}
            <Grid columns={5} style={{ height: "calc(100vh - 120px)" }}>
              <Grid.Col className="bg-[#273248]" span={1}>
                {/* {imageList.map(() => {
                  return (
                    <Center
                      className="cursor-pointer w-full rounded-xl shadow-lg"
                      key={i}
                    >
                    </Center>
                  );
                })} */}
              </Grid.Col>
              <Grid.Col span={4}></Grid.Col>
            </Grid>
          </Stack>
        ) : (
          <></>
        )}

        {step === 1 ? (
          <div
            className={`w-[100vw] h-[100vh] bg-gradient-to-r from-orange-500 to-yellow-500`}
          >
            <Center className="m-auto">
              <Notification
                loading
                color="orange"
                title="서버에 퀴즈 업로드 중..."
                disallowClose
              >
                퀴즈 정보가 서버에 업로드 될 때까지 기다려주세요.
              </Notification>
            </Center>
          </div>
        ) : (
          <></>
        )}

        {step === 2 ? (
          <div
            className={`w-[100vw] h-[100vh] bg-gradient-to-r from-orange-500 to-yellow-500`}
          >
            <Center className="m-auto">
              <Notification
                icon={<Check size={20} />}
                color="orange"
                title="업로드 완료!"
                disallowClose
              >
                퀴즈 정보가 서버에 안전하게 저장되었습니다.
              </Notification>
            </Center>
          </div>
        ) : (
          <></>
        )}
      </main>
    </>
  );
};

export default Home;
