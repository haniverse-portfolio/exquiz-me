import { useState } from "react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
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
} from "@tabler/icons";
import { MantineLogo } from "@mantine/ds";
import Image from "next/image";
import { Plus } from "tabler-icons-react";

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
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconSquareCheck, label: "1. 문제를 잘 읽고 문제를" },
  { icon: IconSquareCheck, label: "2. 문제를 잘 읽고 문제를" },
  { icon: IconSquareCheck, label: "3. 문제를 잘 읽고 문제를" },
  { icon: IconSquareCheck, label: "4. 문제를 잘 읽고 문제를" },
  { icon: IconSquareCheck, label: "5. 문제를 잘 읽고 문제를" },
  { icon: IconSquareCheck, label: "6. 문제를 잘 읽고 문제를" },
  { icon: IconSquareCheck, label: "7. 문제를 잘 읽고 문제를" },
];

export function NavbarMinimal() {
  const [active, setActive] = useState(2);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <Navbar height={872} width={{ base: 80 }} p="md">
      <Center>
        <Image
          src="/../public/favicon.ico"
          alt="Picture of the author"
          width={40}
          height={40}
        />
      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconPlus} label="Change account" />
          <NavbarLink icon={IconLogout} label="Logout" />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
