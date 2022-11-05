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
  FileButton,
  Space,
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
  createImageStep,
} from "../States";
import { connectMainServerApiAddress } from "../ConstValues";
import axios from "axios";
import { useState, useRef } from "react";
import { useDebouncedState } from "@mantine/hooks";
import { ImageSection } from "./ImageSection";

export const ImageModal = () => {
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  /* ****** routes ****** */
  const [step, setStep] = useRecoilState(createStep);
  const [imageStep, setImageStep] = useRecoilState(createImageStep);

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
      className="h-full"
      size="xl"
      withCloseButton={false}
      centered
      opened={imageModalOpened}
      onClose={() => setImageModalOpened(false)}
    >
      <Group position="apart">
        <Group position="center">
          <Button
            size="lg"
            onClick={() => {
              setImageStep(0);
            }}
            variant="subtle"
            color={imageStep === 0 ? "blue" : "gray"}
          >
            사진 검색
          </Button>
          <Divider orientation="vertical"></Divider>
          <Group
            onClick={() => {
              setImageStep(1);
            }}
          >
            <FileButton
              resetRef={resetRef}
              onChange={setFile}
              accept="image/png,image/jpeg"
            >
              {(props) => (
                <Button
                  {...props}
                  variant="subtle"
                  color={imageStep === 1 ? "blue" : "gray"}
                  size="lg"
                >
                  내 컴퓨터에서
                </Button>
              )}
            </FileButton>
          </Group>
        </Group>
        <ActionIcon
          onClick={() => {
            setImageModalOpened(false);
          }}
        >
          <X></X>
        </ActionIcon>
      </Group>
      <Space h="xs" />
      <Divider size="xs" />
      {imageStep === 0 ? (
        <Stack>
          <Space h="xs" />
          <TextInput
            onChange={(event) => {
              setImageLoading(true);
              setImageTmpWord(event.currentTarget.value);
            }}
            value={imageTmpWord}
            size="lg"
            placeholder="검색어를 입력해주세요"
          />
          <ImageSection />
        </Stack>
      ) : (
        <></>
      )}
      {imageStep === 1 ? (
        <>
          <Button disabled={!file} color="red" onClick={clearFile}>
            Reset
          </Button>
          {file && <p>Picked file: {file.name}</p>}
        </>
      ) : (
        <></>
      )}
    </Modal>
  );
};
