import {
  createStyles,
  Card,
  Text,
  Group,
  Button,
  ActionIcon,
  ThemeIcon,
  Stack,
  Divider,
} from "@mantine/core";
import {
  IconSearch,
  IconArrowRight,
  IconPencil,
  IconBrandAsana,
} from "@tabler/icons";
import { useRecoilState } from "recoil";
import { BrandAsana, Copy, Pencil, Trash, X } from "tabler-icons-react";
import { inboxIsModalOpened } from "../States";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
}));

export interface InboxProblemsetMenuProps {
  image: string;
  name: string;
  job: string;
  stats: { label: string; value: string }[];
}

export function InboxProblemsetMenu({
  image,
  name,
  job,
  stats,
}: InboxProblemsetMenuProps) {
  const { classes, theme } = useStyles();

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text align="center" size="sm" color="dimmed">
        {stat.label}
      </Text>
      <Text align="center" size="lg" weight={500}>
        {stat.value}
        {stat.label === "전체 문제 개수" ? "개" : "분"}
      </Text>
    </div>
  ));
  const [modalOpened, setModalOpened] = useRecoilState(inboxIsModalOpened);

  return (
    <Card
      withBorder
      p="xl"
      radius="md"
      className="!rounded-xl !shadow-lg !bg-indigo-100"
    >
      <Group position="apart">
        <ActionIcon>
          <X></X>
        </ActionIcon>
        <p className="text-lg text-center">퀴즈 정보</p>

        <ActionIcon className="cursor-default" variant="transparent">
          <X className="cursor-default" color="indigo.6"></X>
        </ActionIcon>
      </Group>
      <Stack className="bg-white p-4 rounded-xl h-[230px]">
        <Stack className="h-[80px]">
          <Text align="left" size="lg" weight={500} mt="sm">
            {name}
          </Text>
          <Text align="left" size="sm" color="dimmed">
            {job}
          </Text>
        </Stack>
        <Stack className="h-[120px]">
          <Group mt="md" position="center" spacing={30}>
            {items}
          </Group>
          <Group position="apart">
            <ActionIcon>
              <Pencil></Pencil>
            </ActionIcon>
            <Group>
              <ActionIcon>
                <Copy />
              </ActionIcon>
              <ActionIcon>
                <Trash />
              </ActionIcon>
            </Group>
          </Group>
        </Stack>
      </Stack>
      <Button
        onClick={() => {
          setModalOpened("1");
        }}
        variant="filled"
        leftIcon={
          <ThemeIcon color="indigo.5" size={32} radius="xl">
            <IconBrandAsana size={18} stroke={1.5} />
          </ThemeIcon>
        }
        fullWidth
        radius="xl"
        mt="xl"
        size="md"
        color="indigo.5"
      >
        방 만들기
      </Button>
    </Card>
  );
}
