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
import {
  Alarm,
  BrandAsana,
  Click,
  Copy,
  ListCheck,
  Pencil,
  Trash,
  X,
} from "tabler-icons-react";
import { inboxIsModalOpened, inboxProblemsetIdx } from "../States";

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
  const [problemsetIdx, setProblemsetIdx] = useRecoilState(inboxProblemsetIdx);

  return problemsetIdx === -1 ? (
    <Card
      withBorder
      p="xl"
      radius="xl"
      className="!flex !items-center !justify-center h-[390px] !rounded-4xl !shadow-lg !bg-white"
    >
      <Stack spacing="xs" align="center">
        <ActionIcon>
          <Click></Click>
        </ActionIcon>
        <Stack align="center" spacing="xs">
          <p>퀴즈 리스트에서</p>
          <p>선택해보세요!</p>
        </Stack>
      </Stack>
    </Card>
  ) : (
    <Card
      withBorder
      p="xl"
      radius="xl"
      className="h-[390px] !rounded-4xl !shadow-lg !bg-indigo-100"
    >
      <Group className="px-2 pb-4" position="apart">
        <p className="text-lg text-left">퀴즈 정보</p>

        <ActionIcon radius="xl" variant="default">
          <X size={18} color="indigo"></X>
        </ActionIcon>
      </Group>
      <Stack spacing={4} className="bg-white p-4 rounded-xl h-[230px]">
        <Stack className="h-[40px]">
          <p className="text-left font-bold text-[24px]">
            {/* {name} */}디자인 가이드 정리
          </p>
        </Stack>
        <Stack className="h-[120px]">
          <Group mt="sm" position="center" spacing={20}>
            <Stack spacing={0}>
              <p className="text-center text-[#447EFF] text-[14px]">
                전체 문제 개수
              </p>
              <Group spacing={7}>
                <ActionIcon variant="transparent" color="blue">
                  <ListCheck></ListCheck>
                </ActionIcon>
                <p className="text-center text-[#447EFF] text-[24px]">10</p>
                <p className="text-center text-[#85B6FF] text-[18px]">개</p>
              </Group>
            </Stack>
            <Divider orientation="vertical" />
            <Stack spacing={0}>
              <p className="text-center text-[#447EFF] text-[14px]">
                예상 소요 시간
              </p>
              <Group spacing={7}>
                <ActionIcon variant="transparent" color="blue">
                  <Alarm></Alarm>
                </ActionIcon>
                <p className="text-center text-[#447EFF] text-[24px]">30</p>
                <p className="text-center text-[#85B6FF] text-[18px]">분</p>
              </Group>
            </Stack>
          </Group>
          <Group className="mt-10" position="apart">
            <ActionIcon radius="md" color="blue" variant="light">
              <Pencil></Pencil>
            </ActionIcon>
            <Group>
              <ActionIcon radius="md" color="blue" variant="light">
                <Copy />
              </ActionIcon>
              <ActionIcon radius="md" color="blue" variant="light">
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
