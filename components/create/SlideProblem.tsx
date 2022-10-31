import { useRouter } from "next/router";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import {
  createImageList,
  createImageURL,
  createOption,
  createProblem,
  createProblemIdx,
  createProblemset,
  createTabCurrentIdx,
  createTabNextIdx,
  createTargetIdx,
} from "../States";

import { dtypeName } from "../ConstValues";
import { useDebouncedState } from "@mantine/hooks";
import {
  Center,
  Stack,
  Grid,
  Group,
  ActionIcon,
  ScrollArea,
  Button,
} from "@mantine/core";

import { Copy, Trash, Plus } from "tabler-icons-react";

export let SlideProblem = () => {
  /* ****** state-start ****** */

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

  const problemDelete = () => {
    if (problem.length === 1) return;
    if (problem.length - 1 === curIdx) setCurIdx((prevState) => curIdx - 1);
    let problemCopy = [...problem];
    problemCopy.splice(curIdx, 1);
    setProblem(problemCopy);

    let optionCopy = [...option];
    optionCopy.splice(curIdx, 1);
    setOption(optionCopy);
  };

  const problemPlus = () => {
    setProblem((prevstate) => [
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

    setOption((prevstate) => [
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
    setCurIdx(curIdx + 1);
  };

  return (
    <Grid.Col className="shadow-xl bg-[#273248]" span={3}>
      <ScrollArea scrollbarSize={10} className="80vh">
        <Stack style={{ height: "80vh" }} spacing={0}>
          {problem.map((cur, i) => {
            return (
              <Stack
                onClick={() => {
                  setCurIdx(i);
                }}
                className={`${
                  curIdx === i ? "bg-[#85b6ff]/[0.15]" : ""
                } cursor-pointer hover:bg-[#85b6ff]/[0.15]`}
                align="right"
                spacing={0}
                key={i}
              >
                <Group position="right">
                  <span className="text-[#F9761E] text-[16px] ">{i + 1}</span>
                  <Image
                    className="rounded-xl"
                    src="/halla_mountain.svg"
                    width={140}
                    height={120}
                    alt="image"
                  ></Image>
                  <Stack>
                    <ActionIcon color="blue" variant="light">
                      <Copy></Copy>
                    </ActionIcon>
                    <ActionIcon color="blue" variant="light">
                      <Trash
                        onClick={() => {
                          problemDelete();
                        }}
                      ></Trash>
                    </ActionIcon>
                  </Stack>
                </Group>
                <Stack spacing={0} className="w-[180px]">
                  <p className="text-white text-[16px]">{cur.description}</p>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </ScrollArea>
      <Center>
        <Button
          onClick={() => {
            problemPlus();
          }}
          size="xl"
          leftIcon={<Plus></Plus>}
          radius="md"
          color="orange"
          variant="filled"
        >
          퀴즈 추가하기
        </Button>
      </Center>
    </Grid.Col>
  );
};
