import Router, { useRouter } from "next/router";
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
  Center,
} from "@mantine/core";
import Image from "next/image";
import {
  IconSearch,
  IconArrowRight,
  IconArrowLeft,
  IconPlus,
} from "@tabler/icons";
import { Pencil } from "tabler-icons-react";
import { avatarAnimal, avatarColor } from "../ConstValues";
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
  const router = useRouter();

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

  return (
    <Card withBorder p="xl" radius="xl" className="!shadow-lg !rounded-4xl">
      <Group position="right">
        <ActionIcon>
          <Pencil></Pencil>
        </ActionIcon>
      </Group>
      <Center>
        <Image
          alt="hello"
          className={`cursor-pointer rounded-full`}
          src={avatarAnimal[0]}
          width={"80px"}
          height={"80px"}
        ></Image>
      </Center>

      <Group position="center">
        <Stack>
          <Text align="center" size="lg" weight={500} mt="sm">
            {name}
          </Text>
          <Text align="center" size="sm" color="dimmed">
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
          Router.push("/create_rf");
        }}
        leftIcon={
          <ThemeIcon size={32} radius="xl" color="orange" variant="filled">
            <IconPlus size={18} stroke={1.5} />
          </ThemeIcon>
        }
        fullWidth
        radius="xl"
        mt="xl"
        size="md"
        color={theme.colorScheme === "dark" ? undefined : "orange"}
      >
        퀴즈 만들기
      </Button>
    </Card>
  );
}
