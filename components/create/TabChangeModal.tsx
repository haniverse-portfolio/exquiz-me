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
  Modal,
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
  createImageURL,
  createImageList,
  createImageWord,
  createStep,
  createCompleteModal,
  createProblemsetDrawer,
} from "../States";
import { dtypeName, tabTooltip, MARKSCORE, MARKSTIME } from "../ConstValues";
import { useDebouncedState } from "@mantine/hooks";

export const TabChangeModal = () => {
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

  return (
    <Modal
      title={
        <Group>
          <ActionIcon color="red">
            <AlertTriangle></AlertTriangle>
          </ActionIcon>
          <p className="text-xl font-semibold">주의</p>
        </Group>
      }
      transition="fade"
      transitionDuration={600}
      transitionTimingFunction="ease"
      centered
      opened={tabModalOpened}
      onClose={() => setTabModalOpened(false)}
    >
      <Stack>
        <p>퀴즈 유형을 변경하시겠습니까?</p>
        <p>현재까지 작성된 내용이 사라집니다.</p>
        <Group>
          <Button
            fullWidth
            variant="filled"
            color="orange"
            onClick={() => {
              let copyProblem = [...problem];
              copyProblem.splice(curIdx, 1, {
                answer: "",
                description: "",
                dtype: tabChangeIdx.toString(),
                idx: 0,
                picture: "",
                videoUrl: "",
                problemsetId: 0,
                score: 300,
                timelimit: 30,
                title: "",
              });
              let copyOption = [...option];
              copyOption.splice(curIdx, 1, [
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
              ]);
              setProblem(copyProblem);
              setOption(copyOption);
              setTabModalOpened(false);
            }}
          >
            네
          </Button>
          <Button
            fullWidth
            variant="outline"
            color="orange"
            onClick={() => {
              setTabModalOpened(false);
            }}
          >
            아니오
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
