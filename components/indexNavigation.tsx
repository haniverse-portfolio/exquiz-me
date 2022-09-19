import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";

import {
  Button,
  Grid,
  SimpleGrid,
  Input,
  TextInput,
  Center,
  Container,
  Group,
} from "@mantine/core";
import {
  Emphasis,
  FileX,
  Login,
  ReportMoney,
  UserCircle,
  Pencil,
  Archive,
  Folders,
} from "tabler-icons-react";

function indexNavigation() {
  return (
    <Group
      style={{
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 3px 4px -4px gray",
      }}
    >
      <Link href="/">
        <Image
          className="cursor-pointer pl-8"
          src="/../public/favicon.ico"
          alt="Picture of the author"
          width={50}
          height={50}
        />
      </Link>
      <span>
        <span className="p-4 text-lg font-bold cursor-pointer transition ease-in-out">
          멤버십
        </span>
        <Link href="/inbox">
          <span className="p-4 text-lg font-bold cursor-pointer transition ease-in-out">
            로그인
          </span>
        </Link>
      </span>
    </Group>
  );
}

export default indexNavigation;
