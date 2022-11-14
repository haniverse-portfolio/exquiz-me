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
  TextInput,
  Center,
  Skeleton,
  ScrollArea,
  Grid,
  Container,
} from "@mantine/core";
import {
  Plus,
  GridDots,
  CornerDownRight,
  AlertTriangle,
  AdjustmentsHorizontal,
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
  createImageModal,
} from "../States";
import { connectMainServerApiAddress, dtypeName } from "../ConstValues";
import { useDebouncedState } from "@mantine/hooks";
import axios from "axios";
import { useEffect } from "react";

export const ImageSection = () => {
  /* ****** routes ****** */
  const [step, setStep] = useRecoilState(createStep);

  /* ****** pop-over ****** */
  /* modal */
  const [completeModalOpened, setCompleteModalOpened] =
    useRecoilState(createCompleteModal);
  const [tabModalOpened, setTabModalOpened] = useRecoilState(createTabModal);
  const [imageModalOpened, setImageModalOpened] =
    useRecoilState(createImageModal);
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
  const [imageList, setImageList] = useRecoilState(createImageList);
  const [imageLoading, setImageLoading] = useRecoilState(createIsImageLoading);
  const [imageWord, setImageWord] = useRecoilState(createImageWord);

  const theme = useMantineTheme();
  const getColor = (color: string) =>
    theme.colors[color][theme.colorScheme === "dark" ? 5 : 7];

  const postImage = async (url: string, idx: number) => {
    try {
      const result = await axios.post(
        connectMainServerApiAddress + "api/image/upload?url=" + url
      );

      const copyProblem = problem.map((curProblem, problemIdx) => {
        const slicedProblem = { ...curProblem } as any;
        if (curIdx === problemIdx) slicedProblem["picture"] = result.data;
        return slicedProblem;
      });

      setProblem(copyProblem as any);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stack className="h-[80vh]">
      {imageLoading === true ? (
        <Stack className="!h-[300px]">
          <Grid columns={6}>
            <Grid.Col span={2}>
              <Skeleton height={150} radius="md" />
            </Grid.Col>
            <Grid.Col span={2}>
              <Skeleton height={150} radius="md" />
            </Grid.Col>
            <Grid.Col span={2}>
              <Skeleton height={150} radius="md" />
            </Grid.Col>
          </Grid>
          <Grid columns={6}>
            <Grid.Col span={2}>
              <Skeleton height={150} radius="md" />
            </Grid.Col>
            <Grid.Col span={2}>
              <Skeleton height={150} radius="md" />
            </Grid.Col>
            <Grid.Col span={2}>
              <Skeleton height={150} radius="md" />
            </Grid.Col>
          </Grid>
          <Grid columns={6}>
            <Grid.Col span={2}>
              <Skeleton height={150} radius="md" />
            </Grid.Col>
            <Grid.Col span={2}>
              <Skeleton height={150} radius="md" />
            </Grid.Col>
            <Grid.Col span={2}>
              <Skeleton height={150} radius="md" />
            </Grid.Col>
          </Grid>
        </Stack>
      ) : (
        <Center>
          {imageWord === "" || imageList.length === 0 ? (
            <p className="text-gray-500">이미지를 검색하세요.</p>
          ) : (
            <Stack className="h-[300px]">
              <Grid
                columns={3}
                className="cursor-pointer w-full rounded-xl shadow-lg"
              >
                {imageList.map((link, i) => {
                  return (
                    <Grid.Col key={i} span={1}>
                      <img
                        height={"200px"}
                        className="max-w-full cursor-pointer"
                        onClick={async () => {
                          await postImage(imageList[i], i);
                          setImageModalOpened(false);
                        }}
                        src={link}
                        alt="alt"
                      ></img>
                    </Grid.Col>
                  );
                })}
              </Grid>
            </Stack>
          )}
        </Center>
      )}
    </Stack>
  );
};
