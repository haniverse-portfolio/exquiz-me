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
    marginRight: theme.spacing.xl * 3,

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
      color: "violet",
    }).background,
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },
}));

export function IndexHero3() {
  const [tabIdx, setTabIdx] = useState(0);
  const { classes } = useStyles();
  return (
    <Center className={classes.inner}>
      <div className={classes.content}>
        <Title className={classes.title}>
          퀴즈의 <span className={classes.highlight}>참여</span>를 더
          <br /> 재미있게
        </Title>
        <Text color="dimmed" mt="md">
          이제까지 없었던 편리하고 간결한 퀴즈 출제를 만나보세요 – <br></br>
          6가지의 다양한 퀴즈 유형과 편리한 조작, 그리고 이미지 크롤링까지
          <br></br>모든 기능이 갖추어져 있습니다.
        </Text>

        <List
          mt={30}
          spacing="sm"
          size="sm"
          icon={
            <ThemeIcon color="violet" size={20} radius="xl">
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
            color="violet"
            radius="xl"
            size="md"
            className={classes.control}
          >
            참여하기
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
      <Stack>
        <Group classNames="mx-auto" spacing={12} className="items-center">
          {dtypeName.map((name, i) => {
            const tmpTabColor = [
              "bg-gradient-to-r from-red-500 to-orange-500",
              "bg-gradient-to-r from-orange-500 to-amber-500",
              "bg-gradient-to-r from-green-500 to-green-500",
              "bg-gradient-to-r from-blue-700 to-blue-500",
              "bg-gradient-to-r from-purple-500 to-pink-500",
              "bg-gradient-to-r from-gray-500 to-gray-400",
            ];

            function tmpTabIcon(idx: number) {
              if (idx == 0)
                return (
                  <SquareCheck color="white" className="m-auto" size={"30px"} />
                );
              if (idx == 1)
                return (
                  <Parentheses color="white" className="m-auto" size={"30px"} />
                );
              if (idx == 2)
                return <AB color="white" className="m-auto" size={"30px"} />;
              if (idx == 3)
                return (
                  <QuestionMark
                    color="white"
                    className="m-auto"
                    size={"30px"}
                  />
                );
              if (idx == 4)
                return <Apps color="white" className="m-auto" size={"30px"} />;
              if (idx == 5)
                return (
                  <MathAvg color="white" className="m-auto" size={"30px"} />
                );
            }
            return (
              <Group
                onClick={() => {
                  setTabIdx(i);
                }}
                key={i}
                className={`${
                  i === tabIdx
                    ? "shadow-[inset_0_-2px_4px_rgba(128,128,128,0.8)]"
                    : ""
                }
            hover:shadow-none ${
              tmpTabColor[i]
            } rounded-lg cursor-pointer w-16 h-16`}
              >
                {tmpTabIcon(i)}
              </Group>
            );
          })}
          {/* <Group ref={targetRef}>.</Group> */}
        </Group>
        <Grid>
          {[0, 0, 0, 0].map((cur, i) => {
            return (
              <Grid.Col onClick={() => {}} key={i} span={5}>
                <Group
                  className={`bg-amber-100 rounded-lg border-solid border-2 border-amber-500`}
                >
                  <Checkbox
                    className="pl-2"
                    defaultChecked={false}
                    color="orange"
                    size="xl"
                  />
                  <Textarea
                    variant="unstyled"
                    placeholder={`선지 ${i + 1}`}
                    autosize
                    minRows={4}
                    maxRows={4}
                  />
                </Group>
              </Grid.Col>
            );
          })}
        </Grid>
      </Stack>
    </Center>
  );
}
