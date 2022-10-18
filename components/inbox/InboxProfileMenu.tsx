import {
  createStyles,
  Card,
  Text,
  Group,
  Button,
  ActionIcon,
  Divider,
  Avatar,
  Stack,
  ThemeIcon,
} from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons";
import { useRecoilState } from "recoil";
import { inboxIsModalOpened } from "../States";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
}));

export interface InboxProfileMenuProps {
  image: string;
  name: string;
  job: string;
  stats: { label: string; value: string }[];
}

export function InboxProfileMenu({
  image,
  name,
  job,
  stats,
}: InboxProfileMenuProps) {
  const { classes, theme } = useStyles();

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text weight={700} align="center" size="sm" color="dimmed">
        {stat.label}
      </Text>
      <Text weight={700} color="orange" align="center" size="lg">
        {stat.value}
      </Text>
    </div>
  ));

  const [modalOpened, setModalOpened] = useRecoilState(inboxIsModalOpened);

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <Group>
        <Avatar
          component="a"
          href="https://github.com/rtivital"
          target="_blank"
          src="avatar.png"
          alt="it's me"
        />
        <Stack>
          <Text align="left" size="lg" weight={500} mt="sm">
            {name}
          </Text>
          <Text align="left" size="sm" color="dimmed">
            {job}
          </Text>
        </Stack>
      </Group>
      <Divider labelPosition="center" my="lg" />
      <Group mt="md" position="center" spacing={30}>
        {items}
      </Group>
      <Button
        onClick={() => {
          setModalOpened("1");
        }}
        leftIcon={
          <ThemeIcon size={32} radius="xl" color="orange" variant="filled">
            <IconArrowLeft size={18} stroke={1.5} />
          </ThemeIcon>
        }
        fullWidth
        radius="xl"
        mt="xl"
        size="md"
        color={theme.colorScheme === "dark" ? undefined : "orange"}
      >
        퀴즈방 생성
      </Button>
    </Card>
  );
}
