import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRecoilState } from "recoil";

import { Stack, ActionIcon } from "@mantine/core";
import { Plus, GridDots } from "tabler-icons-react";

import { createOption, createProblem, createTabCurrentIdx } from "../States";
import { dtypeName } from "../ConstValues";

export const ControlBar = (size: number) => {
  let [problem, setProblem] = useRecoilState(createProblem);
  let [option, setOption] = useRecoilState(createOption);
  let [tabIdx, setTabIdx] = useRecoilState(createTabCurrentIdx);

  const NextPlus = async () => {
    await setProblem((prevstate) => [
      ...prevstate,
      {
        answer: "-1",
        description: "",
        dtype: dtypeName[tabIdx],
        idx: 0,
        picture: "",
        problemsetId: 0,
        score: 300,
        timelimit: 30,
        title: "",
      },
    ]);

    await setOption((prevstate) => [
      ...prevstate,
      [
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
      ],
    ]);
  };

  const PrevPlus = async () => {
    await setProblem((prevstate) => [
      {
        answer: "-1",
        description: "",
        dtype: dtypeName[tabIdx],
        idx: 0,
        picture: "",
        problemsetId: 0,
        score: 300,
        timelimit: 30,
        title: "",
      },
      ...prevstate,
    ]);

    await setOption((prevstate) => [
      [
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
      ],
      ...prevstate,
    ]);
  };

  return (
    <Stack spacing={200} className=" flex flex-col justify-between">
      {/* 추가 */}
      <ActionIcon variant="transparent">
        <Plus
          onClick={() => {
            PrevPlus();
          }}
          size={size}
          color="gray"
        />
      </ActionIcon>
      {/* 이동 */}
      <ActionIcon variant="transparent">
        <GridDots size={size} color="gray" />
      </ActionIcon>
      {/* 추가 */}
      <ActionIcon variant="transparent">
        <Plus
          onClick={() => {
            NextPlus();
          }}
          size={size}
          color="gray"
        />
      </ActionIcon>
    </Stack>
  );
};
