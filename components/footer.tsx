import { createStyles, Anchor, Group, ActionIcon, Stack } from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import Link from "next/link";
const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 30,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));

interface FooterCenteredProps {
  links: { link: string; label: string }[];
}

export function FooterCentered({ links }: FooterCenteredProps) {
  const { classes } = useStyles();
  const items = links.map((link) => (
    <Link key={link.label} href={link.link}>
      <Anchor
        component="a"
        color="dimmed"
        href={link.link}
        sx={{ lineHeight: 1 }}
        // onClick={(event) => event.preventDefault()}
        size="sm"
      >
        {link.label}
      </Anchor>
    </Link>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Group className="text-sm text-gray-500">
          <Stack spacing={0}>
            <p>
              주소: 서울특별시 강남구 테헤란로 311(역삼동) 아남타워빌딩
              7층(06151)
            </p>
            <p>기업 문의: wnsgus821@gmail.com</p>
          </Stack>
        </Group>
        <Group position="right" className={classes.links}>
          {items}
        </Group>
      </div>
    </div>
  );
}
