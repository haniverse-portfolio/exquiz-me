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
} from "@mantine/core";
import {
  Plus,
  GridDots,
  CornerDownRight,
  AlertTriangle,
} from "tabler-icons-react";

import {
  createOption,
  createProblem,
  createProblemIdx,
  createTabCurrentIdx,
} from "../States";
import { dtypeName } from "../ConstValues";

export const Slide = () => {
  let [curIdx, setCurIdx] = useRecoilState(createProblemIdx);
  let [problem, setProblem] = useRecoilState(createProblem);

  const theme = useMantineTheme();
  const getColor = (color: string) =>
    theme.colors[color][theme.colorScheme === "dark" ? 5 : 7];
  return (
    <Stack justify="space-between">
      <Accordion defaultValue="0" variant="contained">
        {problem.map(({ dtype, description }, i) => {
          return (
            <Accordion.Item
              value={i.toString()}
              // className={`cursor-pointer border-2 border-${
              //   curIdx === i ? "amber" : "gray"
              // }-300`}
              onClick={() => {
                setCurIdx((prevstate) => i);
              }}
              key={i}
            >
              <Accordion.Control
                icon={<AlertTriangle color={getColor("red")} />}
              >
                {i + 1}
                &nbsp;{problem[i].description}
              </Accordion.Control>
              <Accordion.Panel>
                <Group>
                  <ActionIcon variant="transparent">
                    <CornerDownRight />
                  </ActionIcon>
                  <Text>해설</Text>
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>
      <Stack>
        <Group position="apart">
          <Stack>
            <p> 예상 소요 시간</p>
            <p> 36:00 </p>
          </Stack>
          <Stack>
            <p> 문제 수</p>
            <p> {problem.length + "개"} </p>
          </Stack>
        </Group>
      </Stack>
    </Stack>
  );
};
