import { Router, useRouter } from "next/router";
import { useState } from "react";
import { createStyles, Navbar, Group, Code } from "@mantine/core";
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
} from "@tabler/icons";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    navbar: {
      backgroundColor: theme.fn.variant({
        variant: "filled",
        color: "orange",
      }).background,
    },

    version: {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: "orange" }).background!,
        0.1
      ),
      color: theme.white,
      fontWeight: 700,
    },

    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: "orange" }).background!,
        0.1
      )}`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: "orange" }).background!,
        0.1
      )}`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color: theme.white,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: "filled", color: "orange" }).background!,
          0.1
        ),
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.white,
      opacity: 0.75,
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: "filled", color: "orange" }).background!,
          0.15
        ),
        [`& .${icon}`]: {
          opacity: 0.9,
        },
      },
    },
  };
});

const data = [
  { link: "", label: "알림", icon: IconBellRinging },
  { link: "", label: "결제", icon: IconReceipt2 },
  { link: "", label: "보안", icon: IconFingerprint },
  { link: "", label: "키", icon: IconKey },
  { link: "", label: "DB", icon: IconDatabaseImport },
  { link: "", label: "인증", icon: Icon2fa },
  { link: "", label: "설정", icon: IconSettings },
];

export function NavbarSimpleColored() {
  const router = useRouter();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("알림");

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar height={884} width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <span className={classes.version}>익스퀴즈미</span>
          <Code className={classes.version}>v1.0.1</Code>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={() => {
            router.push("/login");
          }}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>계정 전환</span>
        </a>
        <a
          href="#"
          className={classes.link}
          onClick={() => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("host_id");
            location.replace("/");
          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>로그아웃</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
