import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

import {
  Button,
  Grid,
  SimpleGrid,
  Input,
  TextInput,
  Center,
  Container,
  Image,
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

function NavIndex() {
  return (
    <Group
      style={{
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 3px 4px -4px black",
      }}
    >
      <Button
        className="h-[50px]"
        component="a"
        rel="noopener noreferrer"
        href="/"
        leftIcon={<Emphasis size={30} />}
        styles={(theme) => ({
          root: {
            fontWeight: "bold",
            fontSize: 16,
            marginLeft: 10,
            paddingLeft: 0,
            color: "black",
            backgroundColor: "white",
            border: 0,
            height: 42,

            "&:hover": {
              backgroundColor: "white",
              //backgroundColor: theme.fn.darken("#ffffff", 0.05),
            },
          },

          leftIcon: {
            marginRight: 0,
          },
        })}
      >
        xquiz.me
      </Button>
      <span>
        <Button
          className="h-[50px]"
          onClick={() => {
            alert("구독 연장까지 90일 남았습니다.");
          }}
          variant="outline"
          gradient={{ from: "yellow", to: "orange" }}
          component="a"
          rel="noopener noreferrer"
          href="#"
          leftIcon={<ReportMoney size={32} />}
          styles={(theme) => ({
            root: {
              fontWeight: "bold",
              fontSize: 16,
              paddingLeft: 15,
              color: "orange",
              border: "2px solid orange",
              backgroundColor: "white",
              height: 42,

              "&:hover": {
                backgroundColor: theme.fn.darken("#ffffff", 0.05),
              },
            },

            leftIcon: {
              marginRight: 5,
            },
          })}
        >
          멤버십
        </Button>

        <Button
          className="h-[50px] bg-orange-500"
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          component="a"
          rel="noopener noreferrer"
          href="/inbox"
          leftIcon={<Folders size={32} />}
          styles={(theme) => ({
            root: {
              fontWeight: "bold",
              fontSize: 16,
              marginLeft: 5,
              color: "white",
              backgroundColor: "orange",
              border: 0,
              height: 42,

              "&:hover": {},
            },

            leftIcon: {
              marginRight: 5,
            },
          })}
        >
          퀴즈 관리
        </Button>

        <Button
          className="h-[50px] bg-orange-500"
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          component="a"
          rel="noopener noreferrer"
          href="/#"
          leftIcon={<UserCircle size={32} />}
          onClick={() => {
            alert("로그인 된 걸로 합시다");
          }}
          styles={(theme) => ({
            root: {
              fontWeight: "bold",
              fontSize: 16,
              marginLeft: 5,
              marginRight: 10,
              color: "white",
              backgroundColor: "orange",
              border: 0,
              height: 42,

              "&:hover": {},
            },

            leftIcon: {
              marginRight: 5,
            },
          })}
        >
          로그인
        </Button>
      </span>
    </Group>
  );
}

export default NavIndex;
