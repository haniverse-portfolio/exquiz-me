import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import "../styles/globals.css";
import React from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

const myCache = createEmotionCache({
  key: "mantine",
  prepend: false,
});

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <RecoilRoot>
      <Head>
        <title>exquiz.me - 실시간 퀴즈 플랫폼</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        emotionCache={myCache}
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </RecoilRoot>
  );
}
