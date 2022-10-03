import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRecoilState } from "recoil";

import { Stack, Group, Button, Modal } from "@mantine/core";
import {} from "tabler-icons-react";

import {
  createOption,
  createProblem,
  createProblemIdx,
  createTabCurrentIdx,
  createTabNextIdx,
  createTargetIdx,
  createTabModal,
  createIsImageLoading,
  createProblemset,
  createScore,
  createTimelimit,
  createImageURL,
  createImageList,
  createImageWord,
  createCompleteModal,
  createProblemsetDrawer,
  createStep,
} from "../States";
import {
  dtypeName,
  tabTooltip,
  MARKSCORE,
  MARKSTIME,
  connectMainServerApiAddress,
} from "../ConstValues";
import { ControlBar } from "./ControlBar";
import { useDebouncedState } from "@mantine/hooks";
import axios from "axios";

export const CompleteModal = () => {
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
  const [imageTmpWord, setImageTmpWord] = useDebouncedState("", 500);
  const [imageWord, setImageWord] = useRecoilState(createImageWord);

  const NextPlus = async () => {
    await setProblem((prevstate) => [
      ...prevstate,
      {
        answer: "-1",
        description: "",
        dtype: dtypeName[tabIdx],
        idx: 0,
        picture: "",
        problemsetId: 0,
        score: 300,
        timelimit: 30,
        title: "",
      },
    ]);

    await setOption((prevstate) => [
      ...prevstate,
      [
        {
          description: "",
          idx: 0,
          picture: "",
          problemId: 0,
        },
        {
          description: "",
          idx: 1,
          picture: "",
          problemId: 0,
        },
        {
          description: "",
          idx: 2,
          picture: "",
          problemId: 0,
        },
        {
          description: "",
          idx: 3,
          picture: "",
          problemId: 0,
        },
      ],
    ]);
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

  const router = useRouter();

  return (
    <Modal
      centered
      size="80%"
      opened={completeModalOpened === "0" ? false : true}
      onClose={() => setCompleteModalOpened("0")}
    >
      <Button
        onClick={() => {
          console.log(problemSet);
          getProblemsetId();
        }}
      >
        테스트용
      </Button>
      <Button
        variant="outline"
        color="orange"
        onClick={async () => {
          setCompleteModalOpened("0");
          setStep((prevState) => step + 1);

          let problemsetId = await getProblemsetId();
          // await delay(1500);
          let copyProblem = JSON.parse(JSON.stringify(problem));
          let copyOption = JSON.parse(JSON.stringify(option));
          {
            /* problemset */
          }
          for (let i = 0; i < copyProblem.length; i++) {
            copyProblem[i].idx = i;
            copyProblem[i].problemsetId = problemsetId;
          }
          setProblem((prevState) => copyProblem);

          for (let i = 0; i < copyProblem.length; i++) {
            {
              /* problem */
            }
            let problemId = await getProblemId(i);
            // await delay(1500);
            {
              /* problem_option */
            }
            for (let j = 0; j < copyOption.length; j++) {
              copyOption[i][j].idx = j;
              copyOption[i][j].problemId = problemId;
            }
            setOption((prevState) => copyOption);
            for (let j = 0; j < copyOption.length; j++) {
              await postOption(i, j);
            }
          }
          await setStep((prevState) => step + 1);
          router.push("/inbox");
        }}
      >
        배포하기
      </Button>
    </Modal>
  );
};
