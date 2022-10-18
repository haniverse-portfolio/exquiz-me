import {
  createStyles,
  Card,
  Text,
  Group,
  Button,
  ActionIcon,
  ThemeIcon,
} from "@mantine/core";
import { IconSearch, IconArrowRight, IconPencil } from "@tabler/icons";

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
        {stat.label === "문제 수" ? "개" : "분"}
      </Text>
    </div>
  ));

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <Card.Section sx={{ backgroundImage: `url(${image})`, height: 140 }} />
      <Text align="left" size="lg" weight={500} mt="sm">
        {name}
      </Text>
      <Text align="left" size="sm" color="dimmed">
        {job}
      </Text>
      <Group mt="md" position="center" spacing={30}>
        {items}
      </Group>
      <Button
        variant="outline"
        leftIcon={
          <ThemeIcon color="orange" size={32} radius="xl">
            <IconPencil size={18} stroke={1.5} />
          </ThemeIcon>
        }
        fullWidth
        radius="xl"
        mt="xl"
        size="md"
        color="orange"
      >
        수정하기
      </Button>
    </Card>
  );
}
