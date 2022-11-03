import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import Image from "next/image";

import {
  Stack,
  Group,
  Button,
  Modal,
  ActionIcon,
  Divider,
  TextInput,
  Grid,
  Skeleton,
  ScrollArea,
  Center,
} from "@mantine/core";
import { AlertOctagon, X } from "tabler-icons-react";

import {
  createOption,
  createProblem,
  createProblemset,
  createCompleteModal,
  createStep,
  createImageModal,
  createImageURL,
  createImageList,
  createIsImageLoading,
  createImageWord,
} from "../States";
import { connectMainServerApiAddress } from "../ConstValues";
import axios from "axios";
import { useState } from "react";
import { useDebouncedState } from "@mantine/hooks";
import { ImageSection } from "./ImageSection";

export const ImageModal = () => {
  /* ****** routes ****** */
  const [step, setStep] = useRecoilState(createStep);

  /* ****** pop-over ****** */
  /* modal */
  const [completeModalOpened, setCompleteModalOpened] =
    useRecoilState(createCompleteModal);

  /* *** common *** */
  const [problemSet, setProblemSet] = useRecoilState(createProblemset);
  const [problem, setProblem] = useRecoilState(createProblem);
  const [option, setOption] = useRecoilState(createOption);

  const [imageModalOpened, setImageModalOpened] =
    useRecoilState(createImageModal);

  /* image */
  const [imageURL, setImageURL] = useRecoilState(createImageURL);
  const [imageList, setImageList] = useRecoilState(createImageList);
  const [imageLoading, setImageLoading] = useRecoilState(createIsImageLoading);
  const [imageTmpWord, setImageTmpWord] = useDebouncedState("", 500);
  const [imageWord, setImageWord] = useRecoilState(createImageWord);

  const router = useRouter();

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
    <Modal
      className="h-[80vh]"
      size="xl"
      withCloseButton={false}
      centered
      opened={imageModalOpened}
      onClose={() => setImageModalOpened(false)}
    >
      <Group position="apart">
        <Group position="center">
          <span>사진 검색</span>
          <Divider orientation="vertical"></Divider>
          <span>내 컴퓨터에서</span>
        </Group>
        <ActionIcon
          onClick={() => {
            setImageModalOpened(false);
          }}
        >
          <X></X>
        </ActionIcon>
      </Group>
      <TextInput
        onChange={(event) => {
          setImageLoading(true);
          setImageTmpWord(event.currentTarget.value);
        }}
        value={imageWord}
        size="lg"
        placeholder="검색어를 입력해주세요"
      >
        {/* <Grid columns={3}></Grid> */}
      </TextInput>
      <ImageSection />
    </Modal>
  );
};
