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

function NavLogin() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 3px 4px -4px black",
      }}
    >
      <Button
        component="a"
        rel="noopener noreferrer"
        href="/"
        leftIcon={<Emphasis size={32} />}
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
          onClick={() => {
            alert("구독 연장까지 90일 남았습니다.");
          }}
          variant="gradient"
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
              color: "white",
              backgroundColor: "white",
              border: 0,
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
          스탠다드 플랜 이용 중
        </Button>
        <Button
          variant="gradient"
          gradient={{ from: "orange", to: "orange" }}
          component="a"
          rel="noopener noreferrer"
          href="/index"
          leftIcon={<Archive size={32} />}
          styles={(theme) => ({
            root: {
              marginLeft: 5,
              fontWeight: "bold",
              fontSize: 16,
              color: "white",
              backgroundColor: "white",
              border: 0,
              height: 42,

              "&:hover": {
                backgroundColor: theme.fn.darken("#FFFFFF", 0.05),
              },
            },

            leftIcon: {
              marginRight: 5,
            },
          })}
        >
          내 퀴즈
        </Button>
        <Button
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          component="a"
          rel="noopener noreferrer"
          href="/"
          leftIcon={<UserCircle size={32} />}
          styles={(theme) => ({
            root: {
              fontWeight: "bold",
              fontSize: 16,
              marginLeft: 5,
              marginRight: 10,
              color: "white",
              backgroundColor: "white",
              border: 0,
              height: 42,

              "&:hover": {
                backgroundColor: theme.fn.darken("#FFFFFF", 0.05),
              },
            },

            leftIcon: {
              marginRight: 5,
            },
          })}
        >
          로그아웃
        </Button>
      </span>
    </div>
  );
}

export default NavLogin;
