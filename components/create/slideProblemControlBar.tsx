import { useState } from "react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  ScrollArea,
} from "@mantine/core";
import {
  TablerIcon,
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
  IconSquareCheck,
  IconPlus,
  IconX,
  IconTrash,
  IconAlarm,
  IconFiles,
} from "@tabler/icons";
import { MantineLogo } from "@mantine/ds";
import Image from "next/image";
import { Plus, X } from "tabler-icons-react";
import { useRecoilState, useResetRecoilState } from "recoil";
import {
  createActive,
  createOption,
  createProblem,
  createSlideProblem,
  createTabCurrentIdx,
} from "../States";
import { useEffect } from "react";
import { dtypeName } from "../ConstValues";
import { create } from "domain";

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: "orange",
      }).background,
      color: theme.fn.variant({ variant: "light", color: "orange" }).color,
    },
  },
}));

export interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip
      label={label === "" ? "퀴즈를 작성해주세요" : label}
      position="right"
      transitionDuration={0}
    >
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

export function NavbarMinimal() {
  const [problem, setProblem] = useRecoilState(createProblem);
  const [option, setOption] = useRecoilState(createOption);
  const [tabIdx, setTabIdx] = useRecoilState(createTabCurrentIdx);
  const [slideProblem, setSlideProblem] = useRecoilState(createSlideProblem);
  const [active, setActive] = useRecoilState(createActive);

  const NextPlus = () => {
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
    setSlideProblem((prevstate) => [
      ...prevstate,
      {
        icon: IconSquareCheck,
        label: "",
      },
    ]);
    setActive(active + 1);
  };

  const links = slideProblem.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <Navbar
      style={{ height: "calc(100vh - 70px)" }}
      width={{ base: 80 }}
      p="md"
    >
      <Stack style={{ height: "calc(100vh - 70px)" }} justify="space-between">
        <Navbar.Section>
          <Stack justify="center" spacing={0}>
            <NavbarLink
              onClick={async () => {
                if (problem.length === 1) return;
                if (problem.length - 1 === active)
                  await setActive((prevState) => active - 1);
                let copy1 = [...problem];
                copy1.splice(active, 1);
                setProblem(copy1);

                let copy2 = [...option];
                copy2.splice(active, 1);
                setOption(copy2);

                let copy3 = [...slideProblem];
                copy3.splice(active, 1);
                setSlideProblem(copy3);
              }}
              icon={IconTrash}
              label="삭제하기"
            />
            <NavbarLink
              onClick={() => {
                NextPlus();
              }}
              icon={IconPlus}
              label="추가하기"
            />
          </Stack>
        </Navbar.Section>
        <Navbar.Section>
          <Stack justify="center" spacing={0}>
            {links}
          </Stack>
        </Navbar.Section>
        <Navbar.Section>
          <Stack justify="center" spacing={0}>
            <NavbarLink icon={IconFiles} label={`${slideProblem.length}개`} />
            <NavbarLink icon={IconAlarm} label="30분" />
          </Stack>
        </Navbar.Section>
      </Stack>
    </Navbar>
  );
}
