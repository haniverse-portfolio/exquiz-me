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
  createScore,
  createTimelimit,
  createImageURL,
  createImageList,
  createImageWord,
  createStep,
  createCompleteModal,
  createProblemsetDrawer,
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

  const theme = useMantineTheme();
  const getColor = (color: string) =>
    theme.colors[color][theme.colorScheme === "dark" ? 5 : 7];

  const postImage = async () => {
    console.log(imageURL);
    let rt = Infinity;
    await axios
      .post(connectMainServerApiAddress + "api/image/upload", imageURL)
      .then((result) => {})
      .catch((error) => {
        // alert(error.response.messages);
        alert("imagePost_error");
      });
    return rt;
  };

  return (
    <Stack className="w-[20vw] h-[80px]">
      {imageLoading === true ? (
        <Stack>
          <Stack>
            <Grid columns={6}>
              <Grid.Col span={2}>
                <Skeleton height={100} radius="sm" />
              </Grid.Col>
              <Grid.Col span={2}>
                <Skeleton height={100} radius="sm" />
              </Grid.Col>
              <Grid.Col span={2}>
                <Skeleton height={100} radius="sm" />
              </Grid.Col>
            </Grid>
            <Grid columns={6}>
              <Grid.Col span={3}>
                <Skeleton height={100} radius="sm" />
              </Grid.Col>
              <Grid.Col span={3}>
                <Skeleton height={100} radius="sm" />
              </Grid.Col>
            </Grid>
          </Stack>
          <Center>
            <p className="text-gray-500"> 이미지 검색 중...</p>
          </Center>
          <Stack>
            <Grid columns={6}>
              <Grid.Col span={2}>
                <Skeleton height={100} radius="sm" />
              </Grid.Col>
              <Grid.Col span={2}>
                <Skeleton height={100} radius="sm" />
              </Grid.Col>
              <Grid.Col span={2}>
                <Skeleton height={100} radius="sm" />
              </Grid.Col>
            </Grid>
            <Grid columns={6}>
              <Grid.Col span={3}>
                <Skeleton height={100} radius="sm" />
              </Grid.Col>
              <Grid.Col span={3}>
                <Skeleton height={100} radius="sm" />
              </Grid.Col>
            </Grid>
          </Stack>
        </Stack>
      ) : (
        <Center>
          {imageList.length === 0 ? (
            <p className="text-gray-500">검색결과 없음.</p>
          ) : (
            <ScrollArea style={{ height: "calc(100vh - 70px)" }}>
              <Stack className="h-[1500vh]">
                {imageList.map((link, i) => {
                  return (
                    <Center
                      className="cursor-pointer w-full rounded-xl shadow-lg"
                      key={i}
                    >
                      <img
                        className="max-w-full h-auto cursor-pointer"
                        onClick={async () => {
                          if (cur == 0) problem[curIdx].picture = link;
                          else option[curIdx][cur].picture = link;
                          let copy = imageURL;
                          copy.url = link;
                          setImageURL((prevstate) => copy);
                          await postImage();
                        }}
                        src={link}
                        alt="alt"
                      ></img>
                    </Center>
                  );
                })}
              </Stack>
            </ScrollArea>
          )}
        </Center>
      )}
    </Stack>
  );
};
