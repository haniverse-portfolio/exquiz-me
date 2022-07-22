import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

import {
  Button,
  Grid,
  SimpleGrid,
  Input,
  TextInput,
  Center,
  Group,
  Container,
} from "@mantine/core";
import {
  Emphasis,
  FileX,
  Login,
  ReportMoney,
  UserCircle,
  Pencil,
  Archive,
} from "tabler-icons-react";

function SchoolList() {
  let arr = [
    "양정여자고등학교",
    "인덕원고등학교",
    "서울과학고등학교",
    "하나고등학교",
    "민족사관고등학교",
    "대전과학고등학교",
    "휘문고등학교",
    "상산고등학교",
    "대기고등학교",
    "포항제철고등학교",
    "현대고등학교",
    "배재고등학교",
    "경북고등학교",
    "신성고등학교",
    "서문여자고등학교",
    "강서고등학교",
    "목동고등학교",
    "마포고등학교",
    "수지고등학교",
    "서울국제고등학교",
    "북일고등학교",
    "서라벌고등학교",
    "제주고등학교",
    "오현고등학교",
  ];
  let colorCode = [
    "#ffdddd",
    "#ffeedd",
    "#ddffdd",
    "#ddf6ff",
    "#ddddff",
    "#eeddff",
  ];
  return (
    <Grid>
      {arr.map((school, i) => {
        return (
          <Grid.Col
            span={2}
            key={i}
            style={{
              boxShadow:
                "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
              borderRadius: "16px",
            }}
          >
            {school}
          </Grid.Col>
        );
      })}
    </Grid>
  );
}

export default SchoolList;
