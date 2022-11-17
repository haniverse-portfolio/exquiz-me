import { useRouter } from "next/router";
import axios from "axios";
import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
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
  createStep,
  createTabCurrentIdx,
  createTabModal,
  createTabNextIdx,
  createTargetIdx,
  createProblemsetDrawer,
  createImageWord,
} from "../components/States";
import { useDebouncedState } from "@mantine/hooks";
import {
  Center,
  Stack,
  Grid,
  Notification,
  Group,
  ActionIcon,
  Loader,
  ScrollArea,
  Button,
} from "@mantine/core";

import { Main } from "../components/create/Main";
import { CreateNavigation } from "../components/create/CreateNavigation";
import { CompleteModal } from "../components/create/CompleteModal";

import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

import {
  Check,
  SquareCheck,
  AB,
  QuestionMark,
  Apps,
  Parentheses,
  MathAvg,
  Copy,
  Trash,
  Plus,
} from "tabler-icons-react";
import { TabChangeModal } from "../components/create/TabChangeModal";
import { ImageSection } from "../components/create/ImageSection";
import {
  connectMainServerApiAddress,
  problemsetInput,
} from "../components/ConstValues";
import { SearchSection } from "../components/create/SearchSection";
import { ImageModal } from "../components/create/ImageModal";

const Home: NextPage = () => {
  // const [files, setFiles] = useState<FileWithPath[]>([]);
  /* ****** routes ****** */
  const [step, setStep] = useRecoilState(createStep);

  /* ****** pop-over ****** */
  /* modal */
  const [completeModalOpened, setCompleteModalOpened] =
    useRecoilState(createCompleteModal);
  const [tabModalOpened, setTabModalOpened] = useRecoilState(createTabModal);

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

  function replaceItemAtIndex(arr: any, index: number, newValue: any) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  }
  /* ****** state-end ****** */

  /* ****** effect-start ****** */

  useEffect(() => {
    // if ((localStorage.getItem("problemSet") as any) !== null)
    //   setProblemSet(localStorage.getItem("problemSet") as any);
    // if ((localStorage.getItem("problem") as any) !== null)
    //   setProblem(localStorage.getItem("problem") as any);
    // if ((localStorage.getItem("option") as any) !== null)
    //   setOption(localStorage.getItem("option") as any);
    let copyProblemSet = {
      ...problemSet,
      hostId: parseInt(localStorage.getItem("host_id") as string),
    };
    setProblemSet(copyProblemSet);
  }, []);

  /* ****** effect-end****** */

  const getImageList = async (name: string) => {
    let rt = Infinity;
    await axios
      .get(connectMainServerApiAddress + "api/crawl/" + name)
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {});
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
      <ImageModal />
      {/* title */}

      {/* 퀴즈 제작 */}
      <main>
        {step === 0 ? (
          <Stack className="h-[100vh]" spacing={0}>
            {/* navigation bar */}
            <CreateNavigation />
            <Main />
          </Stack>
        ) : (
          <></>
        )}

        {step === 1 ? (
          <Stack
            align="center"
            className="flex items-center justify-center bg-orange-400 h-[100vh]"
          >
            <Center>
              <Loader color="yellow" size="xl" />
            </Center>
            <p className="text-center text-xl text-white font-semibold">
              서버에 퀴즈 업로드 중...
            </p>
            <p className="text-center text-xl text-white font-semibold">
              exquiz.me 서버가 안전하게 퀴즈를 저장하고 있습니다.
            </p>
          </Stack>
        ) : (
          <></>
        )}

        {step === 2 ? (
          <Stack
            align="center"
            className="flex items-center justify-center bg-orange-400 h-[100vh]"
          >
            <p className="text-center text-xl text-white font-semibold">
              퀴즈 정보가 서버에 안전하게 저장되었습니다.
            </p>
            <p className="text-center text-xl text-white font-semibold">
              exquiz.me 서버가 안전하게 퀴즈를 저장하고 있습니다.
            </p>
          </Stack>
        ) : (
          <></>
        )}
      </main>
    </>
  );
};

export default Home;
