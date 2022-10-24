import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  ActionIcon,
} from "@mantine/core";
import { BrandGoogle } from "tabler-icons-react";

export function AuthenticationForm(props: PaperProps) {
  const router = useRouter();
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        익스퀴즈미에 오신걸 환영합니다!
      </Text>

      <Group grow mb="md" mt="md">
        <Button
          variant="outline"
          onClick={() => {
            router.push("https://api.exquiz.me/api/google/login");
          }}
          color="orange"
          leftIcon={<BrandGoogle size={14} />}
        >
          구글 로그인하기
        </Button>
      </Group>

      {/* <Divider label="이메일로 로그인하기" labelPosition="center" my="lg" /> */}

      {/* <form onSubmit={form.onSubmit(() => {})}> */}
      {/* <Stack>
          {type === "register" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
            />
          )}

          <TextInput
            required
            label="이메일"
            placeholder=""
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
          />

          <PasswordInput
            required
            label="비밀번호"
            placeholder=""
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
          />

          {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )}
        </Stack> */}

      {/* <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "계정이 이미 있으신가요? 로그인"
              : "계정이 없으신가요? 회원가입"}
          </Anchor>
          <Button color="orange" type="submit">
            로그인
          </Button>
        </Group> */}
      {/* </form> */}
    </Paper>
  );
}
