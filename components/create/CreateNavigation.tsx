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
  /* score, time */
  const [scoreValue, setScoreValue] = useRecoilState(createScore);
  const [timelimit, setTimelimit] = useRecoilState(createTimelimit);
  /* image */
  const [imageURL, setImageURL] = useRecoilState(createImageURL);
  const [imageList, setImageList] = useRecoilState(createImageList);
  const [imageLoading, setImageLoading] = useRecoilState(createIsImageLoading);
  const [imageTmpWord, setImageTmpWord] = useDebouncedState("", 500);
  const [imageWord, setImageWord] = useRecoilState(createImageWord);

  return (
    <Grid className="h-[60px] border-b-2 border-gray-300" columns={24}>
      <Grid.Col span={5}>
        <Group>
          <Link href="/">
            <ActionIcon>
              <ArrowNarrowLeft size="xl"></ArrowNarrowLeft>
            </ActionIcon>
          </Link>
          <Avatar
            radius="xl"
            src={"h".concat(
              "ttps://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
            )}
          />
          <Text>반가워요! 임준현님.</Text>
        </Group>
      </Grid.Col>
      <Grid.Col span={14}>
        {" "}
        <Group
          onClick={() => {
            setProblemsetDrawer("1");
          }}
        >
          <Group className="cursor-pointer" spacing={0}>
            <Group className="shadow-lg" spacing={0}>
              <Group className="border-r-2 border-gray-300 shadow-lg h-12 w-4 bg-amber-200" />
              <Group>
                <Stack spacing={0}>
                  <Group className="border-b-2 border-gray-300 m-0 p-0 h-6 w-16 bg-amber-200"></Group>
                  <Group spacing={2} className=" m-0 p-0 h-6 w-16 bg-amber-200">
                    <Group
                      className={`mx-1 text-white w-5 h-5 rounded-full`}
                    ></Group>
                    <Group
                      className={`mx-0 text-white w-5 h-5 rounded-full`}
                    ></Group>
                  </Group>
                </Stack>
              </Group>
            </Group>
            <Group className="shadow-lg m-0 p-0 h-10 w-3 bg-white"></Group>
          </Group>
          {problemSet.title === "" ? (
            <p className="text-2xl text-gray-400 font-bold">
              제목을 입력해주세요
            </p>
          ) : (
            <p className="text-2xl font-bold">{problemSet.title}</p>
          )}
        </Group>
      </Grid.Col>
      <Grid.Col span={5}>
        <Group className="border-l-2 border-gray-300">
          <Button variant="outline" color="orange" onClick={() => {}}>
            미리보기
          </Button>
          <Button
            variant="outline"
            color="orange"
            onClick={() => {
              setCompleteModalOpened("1");
            }}
          >
            완성하기
          </Button>
        </Group>
      </Grid.Col>
    </Grid>
  );
};
