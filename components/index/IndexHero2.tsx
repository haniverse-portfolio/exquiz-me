import {
  createStyles,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  Stack,
  Grid,
  Checkbox,
  Textarea,
  Center,
  TextInput,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import Image from "next/image";
import { useState } from "react";
import {
  AB,
  Apps,
  MathAvg,
  Parentheses,
  QuestionMark,
  SquareCheck,
} from "tabler-icons-react";
import { dtypeName, tabColor, tabIcon } from "../ConstValues";

const useStyles = createStyles((theme) => ({
  inner: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xl * 8,
    paddingBottom: theme.spacing.xl * 4,
    marginLeft: "17vw",
    marginRight: "15vw",
  },

  content: {
    maxWidth: 480,
    marginLeft: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,
    height: "full",
    width: "auto",

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: "blue",
    }).background,
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },
}));

export function IndexHero2() {
  const [tabIdx, setTabIdx] = useState(0);
  const { classes } = useStyles();
  return (
    <Center className={classes.inner}>
      <Stack>
        <TextInput size="lg"></TextInput>
      </Stack>
      <div className={classes.content}>
        <Title className={classes.title}>
          퀴즈의 <span className={classes.highlight}>공유</span>를 더
          <br /> 자유롭게
        </Title>
        <Text color="dimmed" mt="md">
          이제까지 없었던 편리하고 간결한 퀴즈 관리를 만나보세요 – <br></br>
          내가 만든 퀴즈를 손쉽게 공유하고, 다른 출제자들의 문제들까지
          <br></br>탐색해볼 수 있습니다
        </Text>

        <List
          mt={30}
          spacing="sm"
          size="sm"
          icon={
            <ThemeIcon color="blue" size={20} radius="xl">
              <IconCheck size={12} stroke={1.5} />
            </ThemeIcon>
          }
        >
          <List.Item>
            <b>원터치 UI</b>&nbsp; – 익스퀴즈미가 제시하는 흐름을 따라가다 보면
            <br></br> &nbsp;&nbsp;&nbsp;&nbsp;퀴즈를 손쉽게 제작할 수 있습니다
          </List.Item>
          <List.Item>
            <b>드래그 앤 드랍 UX</b>&nbsp; – 직관적이고 간결한 UX를 적용하여
            시인성을 높이고<br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;기능또한
            갖추었습니다
          </List.Item>
          <List.Item>
            <b>강력한 이미지 크롤링</b> – 익스퀴즈미에서만 제공하는 이미지
            크롤링으로 퀴즈를 더욱 풍성하게 만들어보세요
          </List.Item>
        </List>

        <Group mt={30}>
          <Button
            color="blue"
            radius="xl"
            size="md"
            className={classes.control}
          >
            관리하기
          </Button>
          <Button
            variant="default"
            radius="xl"
            size="md"
            className={classes.control}
          >
            체험해보기
          </Button>
        </Group>
      </div>
    </Center>
  );
}
