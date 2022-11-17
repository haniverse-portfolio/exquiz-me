import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRecoilState } from "recoil";

import {
  Stack,
  ActionIcon,
  Accordion,
  Group,
  Text,
  useMantineTheme,
  Center,
  Tooltip,
  Button,
  Checkbox,
  Textarea,
  TextInput,
  Grid,
  Slider,
  Avatar,
} from "@mantine/core";
import {
  Plus,
  GridDots,
  CornerDownRight,
  AlertTriangle,
  FileUpload,
  Copy,
  X,
  ArrowNarrowLeft,
  ChevronLeft,
  ArrowRight,
} from "tabler-icons-react";

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
  createImageURL,
  createImageList,
  createImageWord,
  createStep,
  createCompleteModal,
  createProblemsetDrawer,
} from "../States";
import { dtypeName, tabTooltip, MARKSCORE, MARKSTIME } from "../ConstValues";
import { useDebouncedState } from "@mantine/hooks";

export const CreateNavigation = () => {
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
  /* image */
  const [imageURL, setImageURL] = useRecoilState(createImageURL);
  const [imageList, setImageList] = useRecoilState(createImageList);
  const [imageLoading, setImageLoading] = useRecoilState(createIsImageLoading);
  const [imageTmpWord, setImageTmpWord] = useDebouncedState("", 500);
  const [imageWord, setImageWord] = useRecoilState(createImageWord);

  let problemVailidation = (idx: number) => {
    let flag = true;
    if (problem[idx].description === "") flag = false;
    if (problem[idx].answer === "") flag = false;
    if (problem[idx].dtype === "0") {
      if (option[idx][0].description === "") flag = false;
      if (option[idx][1].description === "") flag = false;
      if (option[idx][2].description === "") flag = false;
      if (option[idx][3].description === "") flag = false;
    }
    return flag;
  };

  let totalValidation = () => {
    let flag = true;
    for (let k = 0; k < problem.length; k++) {
      if (problemVailidation(k) === false) {
        flag = false;
        break;
      }
    }

    if (problemSet.title === "") flag = false;
    return flag;
  };

  return (
    <Group
      className="z-50 px-8 shadow-xl h-[120px] border-b-2 border-gray-300"
      position="apart"
    >
      <Link href="/inbox">
        <ActionIcon size={60}>
          <ChevronLeft size={36}></ChevronLeft>
        </ActionIcon>
      </Link>
      <TextInput
        onChange={(event) => {
          let copy = JSON.parse(JSON.stringify(problemSet));
          copy.title = event.currentTarget.value;
          setProblemSet(copy);
          localStorage.setItem("problemSet", copy);
        }}
        value={problemSet.title}
        size="xl"
        placeholder="퀴즈 제목을 입력해주세요"
        variant="unstyled"
      ></TextInput>
      {totalValidation() === true ? (
        <Group
          position="center"
          onClick={() => {
            setCompleteModalOpened("1");
          }}
          className="cursor-pointer h-16 w-16 rounded-full bg-orange-500"
        >
          <ActionIcon variant="transparent">
            <ArrowRight color="white"></ArrowRight>
          </ActionIcon>
        </Group>
      ) : (
        <Tooltip label="문제가 다 완성되지 않았어요">
          <Group
            position="center"
            className="cursor-not-allowed h-16 w-16 rounded-full bg-gray-500"
          >
            <ActionIcon className="cursor-not-allowed" variant="transparent">
              <ArrowRight
                className="cursor-not-allowed"
                color="white"
              ></ArrowRight>
            </ActionIcon>
          </Group>
        </Tooltip>
      )}
    </Group>
  );
};
