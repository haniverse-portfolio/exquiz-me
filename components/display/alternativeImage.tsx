import { Group, Stack } from "@mantine/core";

export let alternativeImage = () => {
  return (
    <Stack align="center" className="flex items-center justify-center">
      <Stack className="mt-12">
        <Group spacing={8} align="flex-start">
          <img
            className="!overflow-visible animate-[spin_4s_ease-in-out_infinite]"
            src="/index/rectangle_right.svg"
            alt="rectangle"
            width={200}
            height={200}
          ></img>
          <Stack spacing={8}>
            <img
              className="!overflow-visible animate-[bounce_2s_ease-in-out_infinite]"
              src="/index/circle.svg"
              alt="circle"
              width={30}
              height={30}
            ></img>
            <img
              className="!overflow-visible animate-[bounce_3s_ease-in-out_infinite]"
              src="/index/circle.svg"
              alt="circle"
              width={50}
              height={50}
            ></img>
          </Stack>
        </Group>
        <Group align="flex-end">
          <Stack>
            <img
              className="!overflow-visible animate-[bounce_2s_ease-in-out_infinite]"
              src="/index/circle.svg"
              alt="rectangle"
              width={30}
              height={30}
            ></img>
            <img
              className="!overflow-visible animate-[bounce_3s_ease-in-out_infinite]"
              src="/index/circle.svg"
              alt="rectangle"
              width={50}
              height={50}
            ></img>
          </Stack>
          <img
            className="!overflow-visible animate-[spin_3s_ease-in-out_infinite]"
            src="/index/rectangle_left.svg"
            alt="rectangle"
            width={120}
            height={120}
          ></img>
        </Group>
      </Stack>
    </Stack>
  );
};
