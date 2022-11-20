import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import Image from "next/image";

import { useEffect } from "react";
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
  Center,
} from "@mantine/core";
import { AlertOctagon, Trash, X } from "tabler-icons-react";

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
  createImageWord2,
  createLastSearchedWord,
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
  const [imageList, setImageList] = useRecoilState(createImageList);
  const [imageLoading, setImageLoading] = useRecoilState(createIsImageLoading);
  const [imageWord, setImageWord] = useRecoilState(createImageWord);
  const [imageDebouncedWord, setImageDebouncedWord] = useDebouncedState(
    "",
    1000
  );

  const getImageList = async (name: string) => {
    let rt = Infinity;
    await axios
      .get(connectMainServerApiAddress + "api/crawl/" + name)
      .then((result) => {
        setImageList(result.data);
      })
      .catch((error) => {});
    return rt;
  };

  useEffect(() => {
    getImageList(imageDebouncedWord);
    setImageLoading(false);
  }, [imageDebouncedWord]);

  const router = useRouter();

  return (
    <Modal
      overflow="inside"
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
            rightSection={
              <ActionIcon>
                <Trash></Trash>
              </ActionIcon>
            }
            onChange={(event) => {
              setImageLoading(true);
              setImageWord(event.currentTarget.value);
              setImageDebouncedWord(event.currentTarget.value);
            }}
            value={imageWord}
            size="lg"
            placeholder="검색어를 입력해주세요"
          />
          <ImageSection />
        </Stack>
      ) : (
        <></>
      )}
      {imageStep === 1 ? (
        <Stack className="h-[70vh]">
          <Center>
            <Image src={"/halla_mountain.svg"} width={500} height={600}></Image>
          </Center>
          <hr></hr>
          <Button disabled={!file} color="red" onClick={clearFile}>
            삭제하기
          </Button>
          {/* {file && <p>업로드 된 파일 {file.name}</p>} */}
        </Stack>
      ) : (
        <></>
      )}
    </Modal>
  );
};
