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
  Input,
  TextInputProps,
  Divider,
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
} from "../States";
import { connectMainServerApiAddress, dtypeName } from "../ConstValues";
import { useDebouncedState } from "@mantine/hooks";
import axios from "axios";
import { useEffect } from "react";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons";

export const SearchSection = () => {
  const theme = useMantineTheme();

  function InputWithButton(props: TextInputProps) {
    const theme = useMantineTheme();

    return (
      <></>
      // <TextInput
      //   icon={<IconSearch size={18} stroke={1.5} />}
      //   radius="xl"
      //   size="md"
      //   rightSection={
      //     <ActionIcon size={32} radius="xl" color="orange" variant="filled">
      //       {theme.dir === "ltr" ? (
      //         <IconArrowRight size={18} stroke={1.5} />
      //       ) : (
      //         <IconArrowLeft size={18} stroke={1.5} />
      //       )}
      //     </ActionIcon>
      //   }
      //   placeholder="퀴즈 검색하기"
      //   rightSectionWidth={42}
      //   {...props}
      // />
    );
  }
  return (
    <Stack>
      <InputWithButton />
    </Stack>
  );
};
