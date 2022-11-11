import {
  createStyles,
  Card,
  Group,
  Button,
  ActionIcon,
  ThemeIcon,
  Stack,
  Divider,
} from "@mantine/core";
import { IconBrandAsana } from "@tabler/icons";
import { useRecoilState } from "recoil";
import {
  Alarm,
  Click,
  Copy,
  ListCheck,
  Pencil,
  Trash,
  X,
} from "tabler-icons-react";
import {
  inboxIsModalOpened,
  inboxProblem,
  inboxProblemset,
  inboxProblemsetIdx,
} from "../States";
import axios from "axios";
import { connectMainServerApiAddress } from "../ConstValues";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
}));

export let InboxProblemsetMenu = () => {
  // const totalTime = () => {
  //   let sum = 0;
  //   for (let i = 0; i < problem.length; i++) sum += problem[i].timelimit;
  //   return sum;
  // };

  const { classes, theme } = useStyles();
  /* *** cur state *** */
  const [modalOpened, setModalOpened] = useRecoilState(inboxIsModalOpened);
  const [problemsetIdx, setProblemsetIdx] = useRecoilState(inboxProblemsetIdx);
  /* *** problem *** */
  const [problemsets, setProblemsets] = useRecoilState(inboxProblemset);
  const [problem, setProblem] = useRecoilState(inboxProblem);

  const deleteProblemset = () => {
    axios
      .post(
        connectMainServerApiAddress +
          "api/problemset/" +
          (problemsets[problemsetIdx] as any).id
      )
      .then((result) => {
        setProblemsets(result.data);
      })
      .catch((error) => {
        alert(error);
      });
    return;
  };

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
      className="h-[350px] !rounded-4xl !shadow-lg !bg-indigo-100"
    >
      <Group className="px-2 pb-4" position="apart">
        <p className="text-lg text-left">퀴즈 정보</p>

        <ActionIcon radius="xl" variant="default">
          <X size={18} color="indigo"></X>
        </ActionIcon>
      </Group>
      <Stack spacing={4} className="bg-white p-4 rounded-xl h-[200px]">
        <Stack className="h-[40px]">
          <p className="text-left font-bold text-[20px]">
            {(problemsets[problemsetIdx] as any).title || ""}
          </p>
        </Stack>
        <Stack className="h-[40px]">
          <Group mt="sm" position="center" spacing={10}>
            <Stack spacing={0}>
              <p className="text-center text-[#447EFF] text-[14px]">
                전체 문제 개수
              </p>
              <Group spacing={5}>
                <ActionIcon variant="transparent" color="blue">
                  <ListCheck></ListCheck>
                </ActionIcon>
                <p className="text-center text-[#447EFF] text-[24px]">
                  {(problemsets[problemsetIdx] as any).problemCount}
                </p>
                <p className="text-center text-[#85B6FF] text-[18px]">개</p>
              </Group>
            </Stack>
            <Divider orientation="vertical" />
            <Stack spacing={0}>
              <p className="text-center text-[#447EFF] text-[14px]">
                예상 소요 시간
              </p>
              <Group spacing={5}>
                <ActionIcon variant="transparent" color="blue">
                  <Alarm></Alarm>
                </ActionIcon>
                <p className="text-center text-[#447EFF] text-[24px]">
                  {(problemsets[problemsetIdx] as any).problemCount * 2}
                </p>
                <p className="text-center text-[#85B6FF] text-[18px]">분</p>
              </Group>
            </Stack>
          </Group>
          <Group className="" position="apart">
            <ActionIcon radius="md" color="blue" variant="light">
              <Pencil></Pencil>
            </ActionIcon>
            <Group>
              <ActionIcon radius="md" color="blue" variant="light">
                <Copy />
              </ActionIcon>
              <ActionIcon radius="md" color="blue" variant="light">
                <Trash
                  onClick={() => {
                    deleteProblemset();
                  }}
                />
              </ActionIcon>
            </Group>
          </Group>
        </Stack>
      </Stack>
      <Button
        onClick={() => {
          setModalOpened(true);
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
};
