import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Center,
  Button,
} from "@mantine/core";
import {
  IconGasStation,
  IconGauge,
  IconManualGearbox,
  IconUsers,
} from "@tabler/icons";

export function FeaturesCard2() {
  const useStyles = createStyles((theme) => ({
    card: {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },

    imageSection: {
      padding: theme.spacing.md,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },

    label: {
      marginBottom: theme.spacing.xs,
      lineHeight: 1,
      fontWeight: 700,
      fontSize: theme.fontSizes.xs,
      letterSpacing: -0.25,
      textTransform: "uppercase",
    },

    section: {
      padding: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },

    icon: {
      marginRight: 5,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[5],
    },
  }));

  const mockdata = [
    { label: "50명 초대 가능", icon: IconUsers },
    { label: "1시간 30분 동안 방 유지", icon: IconGauge },
    { label: "추가 퀴즈 유형 제공", icon: IconManualGearbox },
    { label: "문제 임포트 기능 제공", icon: IconGasStation },
  ];
  const { classes } = useStyles();
  const features = mockdata.map((feature) => (
    <Center key={feature.label}>
      <feature.icon size={18} className={classes.icon} stroke={1.5} />
      <Text size="xs">{feature.label}</Text>
    </Center>
  ));

  return (
    <div className="w-[30vw]">
      <Card withBorder radius="md" className={classes.card}>
        <Card.Section className={classes.imageSection}>
          <Image src="https://i.imgur.com/ZL52Q2D.png" alt="Tesla Model S" />
        </Card.Section>

        <Group position="apart" mt="md">
          <div>
            <Text weight={500}>익스퀴즈미 스탠다드 플랜</Text>
            <Text size="xs" color="dimmed">
              퀴즈 제작 및 참여의 필수적인 기능을 합리적인 가격에 제공합니다.
            </Text>
          </div>
          <Badge variant="outline">25% 할인</Badge>
        </Group>

        <Card.Section className={classes.section} mt="md">
          <Text size="sm" color="dimmed" className={classes.label}>
            추가 구성
          </Text>

          <Group spacing={8} mb={-8}>
            {features}
          </Group>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Group spacing={30}>
            <div>
              <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
                4,990 ₩
              </Text>
              <Text
                size="sm"
                color="dimmed"
                weight={500}
                sx={{ lineHeight: 1 }}
                mt={3}
              >
                월간
              </Text>
            </div>

            <Button disabled radius="xl" style={{ flex: 1 }}>
              업그레이드 하기
            </Button>
          </Group>
        </Card.Section>
      </Card>
    </div>
  );
}
