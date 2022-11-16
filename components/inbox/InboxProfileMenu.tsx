import Router, { useRouter } from "next/router";
import {
  createStyles,
  Card,
  Text,
  Group,
  Button,
  ActionIcon,
  Divider,
  Stack,
  ThemeIcon,
  Center,
} from "@mantine/core";
import Image from "next/image";
import { IconPlus } from "@tabler/icons";
import { avatarAnimal } from "../ConstValues";
import { Pencil } from "tabler-icons-react";
import { useRecoilState } from "recoil";
import { inboxProblemset, indexUserInfo } from "../States";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
}));

export let InboxProfileMenu = () => {
  const [userInfo, setUserInfo] = useRecoilState(indexUserInfo);
  const [problemsets, setProblemsets] = useRecoilState(inboxProblemset);
  const { classes, theme } = useStyles();
  const router = useRouter();

  return (
    <Card
      withBorder
      p="xl"
      radius="xl"
      className="h-[410px] !shadow-lg !rounded-4xl"
    >
      <Group position="right">
        <ActionIcon>
          <Pencil></Pencil>
        </ActionIcon>
      </Group>
      <Center>
        <Image
          alt="hello"
          className="cursor-pointer rounded-full animate-fadeIn"
          src={userInfo.picture}
          width={"80px"}
          height={"80px"}
        ></Image>
      </Center>

      <Group position="center">
        <Stack>
          <Text
            className="animate-fadeIn"
            align="center"
            size="lg"
            weight={500}
            mt="sm"
          >
            {userInfo.nickname}
          </Text>
          <Text
            className="animate-fadeIn"
            align="center"
            size="sm"
            color="dimmed"
          >
            익스퀴즈미 스탠다드 플랜 사용자
          </Text>
        </Stack>
      </Group>
      <Divider labelPosition="center" my="lg" />
      <Group mt="md" position="center" spacing={30}>
        <Stack>
          <Text weight={700} align="center" size="sm" color="dimmed">
            만든문제
          </Text>
          <Text
            className="animate-fadeIn"
            weight={700}
            color="orange"
            align="center"
            size="lg"
          >
            {problemsets.length}
          </Text>
        </Stack>
        <Stack>
          <Text weight={700} align="center" size="sm" color="dimmed">
            팔로잉
          </Text>
          <Text
            className="animate-fadeIn"
            weight={700}
            color="orange"
            align="center"
            size="lg"
          >
            0
          </Text>
        </Stack>
        <Stack>
          <Text weight={700} align="center" size="sm" color="dimmed">
            팔로워
          </Text>
          <Text
            className="animate-fadeIn"
            weight={700}
            color="orange"
            align="center"
            size="lg"
          >
            0
          </Text>
        </Stack>
      </Group>
      <Button
        onClick={() => {
          Router.push("/create");
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
};
