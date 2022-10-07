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
    <Stack className="w-[20vw] h-[80vh]">
      {/* <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
                    <Text color="gray" align="center">
                      이미지나 동영상을 첨부하세요
                    </Text>
                  </Dropzone> */}
      <TextInput
        size="lg"
        label=""
        placeholder="검색어를 입력하세요"
        rightSection={
          <ActionIcon>
            <AdjustmentsHorizontal size="md" />
          </ActionIcon>
        }
        onChange={(event) => {
          let copy = event.currentTarget.value;
          setImageLoading(true);
          setImageTmpWord(copy);
        }}
        value={imageWord}
      />
      {imageLoading === true ? (
        <Stack>
          <Stack className="mx-2">
            <Group>
              <Skeleton height={100} width="30%" radius="sm" />
              <Skeleton height={100} width="30%" radius="sm" />
              <Skeleton height={100} width="30%" radius="sm" />
            </Group>
            <Group>
              <Skeleton height={100} width="45%" radius="sm" />
              <Skeleton height={100} width="45%" radius="sm" />
            </Group>
          </Stack>
          <Center>
            <p className="text-gray-500"> 이미지 검색 중...</p>
          </Center>
          <Stack className="mx-2">
            <Group>
              <Skeleton height={100} width="30%" radius="sm" />
              <Skeleton height={100} width="30%" radius="sm" />
              <Skeleton height={100} width="30%" radius="sm" />
            </Group>
            <Group>
              <Skeleton height={100} width="45%" radius="sm" />
              <Skeleton height={100} width="45%" radius="sm" />
            </Group>
          </Stack>
        </Stack>
      ) : (
        <Center>
          {imageList.length === 0 ? (
            <p className="text-gray-500">검색결과 없음.</p>
          ) : (
            <ScrollArea className="h-[50vh]">
              <Stack className="h-[1500vh]">
                {imageList.map((link, i) => {
                  return (
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
                      key={i}
                      src={link}
                      alt="alt"
                    ></img>
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
