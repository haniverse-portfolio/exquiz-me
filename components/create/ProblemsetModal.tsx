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
  Select,
  Drawer,
} from "@mantine/core";
import {
  Plus,
  GridDots,
  CornerDownRight,
  AlertTriangle,
  FileUpload,
  Copy,
  X,
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
  createScore,
  createTimelimit,
  createImageURL,
  createImageList,
  createImageWord,
  createStep,
  createCompleteModal,
  createProblemsetDrawer,
} from "../States";
import { dtypeName, tabTooltip, MARKSCORE, MARKSTIME } from "../ConstValues";
import { ControlBar } from "./ControlBar";
import { useDebouncedState } from "@mantine/hooks";
import { useState } from "react";

export const ProblemsetModal = () => {
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

  const [data, setData] = useState([
    { value: "korean", label: "국어" },
    { value: "math", label: "수학" },
  ]);
  const theme = useMantineTheme();

  return (
    <Drawer
      position="bottom"
      opened={problemsetDrawer === "0" ? false : true}
      onClose={() => setProblemsetDrawer("0")}
      padding="xl"
      size="93.8%"
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
    >
      <Center>
        <Stack align="center" spacing={0}>
          <Stack className="bg-white w-[46vw] h-12 shadow-lg"></Stack>
          <Stack className="bg-amber-200 w-[50vw] h-[80vh] shadow-lg">
            <TextInput
              onChange={(event) => {
                let copy = JSON.parse(JSON.stringify(problemSet));
                copy.title = event.currentTarget.value;
                setProblemSet(copy);
              }}
              value={problemSet.title}
              variant="unstyled"
              placeholder="제목을 입력해주세요"
              size="xl"
            ></TextInput>

            <Textarea
              onChange={(event) => {
                let copy = JSON.parse(JSON.stringify(problemSet));
                copy.description = event.currentTarget.value;
                setProblemSet(copy);
              }}
              variant="unstyled"
              placeholder="설명을 입력해주세요"
              size="xl"
            ></Textarea>
            <h2 className="text-amber-500 font-semibold">과목 선택</h2>

            <Select
              className="w-52"
              data={data}
              placeholder="분야를 입력해주세요"
              nothingFound="새로운 입력값 만들기"
              searchable
              creatable
              getCreateLabel={(query) => `+ Create ${query}`}
              onCreate={(query) => {
                const item = { value: query, label: query };
                setData((current) => [...current, item]);
                return item;
              }}
            />
            <Center>
              <Button variant="outline" className="w-20" color="orange">
                완료
              </Button>
            </Center>
          </Stack>
        </Stack>
      </Center>
    </Drawer>
  );
};
