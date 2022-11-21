import Router, { useRouter } from "next/router";
import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
} from "@mantine/core";
import { NextPage } from "next";

const Home: NextPage = () => {
  const router = useRouter();
  const useStyles = createStyles((theme) => ({
    root: {
      paddingTop: 80,
      paddingBottom: 120,
      backgroundColor: theme.fn.variant({
        variant: "filled",
        color: "orange",
      }).background,
    },

    label: {
      textAlign: "center",
      fontWeight: 900,
      fontSize: 220,
      lineHeight: 1,
      marginBottom: theme.spacing.xl * 1.5,
      color: "orange",

      [theme.fn.smallerThan("sm")]: {
        fontSize: 120,
      },
    },

    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      textAlign: "center",
      fontWeight: 900,
      fontSize: 38,
      color: theme.white,

      [theme.fn.smallerThan("sm")]: {
        fontSize: 32,
      },
    },

    description: {
      maxWidth: 540,
      margin: "auto",
      marginTop: theme.spacing.xl,
      marginBottom: theme.spacing.xl * 1.5,
      color: "white",
    },
  }));

  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>401</div>
        <Title className={classes.title}>
          이런, 접근할 수 있는 권한이 없습니다...
        </Title>
        <Text size="lg" align="center" className={classes.description}>
          저희 서버는 사용자님이 원하는 곳으로 데려다 드릴 수 없었습니다...
          <br></br>
          로그인을 하셨는지 다시 한 번 확인해보세요.
        </Text>
        <Group position="center">
          <Button
            onClick={() => {
              Router.push("/");
            }}
            variant="light"
            color="orange"
            size="md"
          >
            메인으로
          </Button>
        </Group>
      </Container>
    </div>
  );
};

export default Home;

// 저희 서버는 사용자님의 요청을 처리할 수 없습니다... 걱정마세요, 우리
//           개발팀이 이미 인지했습니다. 페이지를 다시 새로고침 해보세요.
