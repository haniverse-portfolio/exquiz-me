import { Group, Stack } from "@mantine/core";

export let alternativeImage = () => {
  return (
    <Stack align="center" className="my-4 flex items-center justify-center">
      <Stack>
        <Group spacing={8} align="flex-start">
          <img
            className="!overflow-visible animate-[spin_4s_ease-in-out_infinite]"
            src="/index/rectangle_right.svg"
            alt="rectangle"
            width={100}
            height={100}
          ></img>
          <Stack spacing={8}>
            <img
              className="!overflow-visible animate-[bounce_2s_ease-in-out_infinite]"
              src="/index/circle.svg"
              alt="circle"
              width={15}
              height={15}
            ></img>
            <img
              className="!overflow-visible animate-[bounce_3s_ease-in-out_infinite]"
              src="/index/circle.svg"
              alt="circle"
              width={25}
              height={25}
            ></img>
          </Stack>
        </Group>
        <Group align="flex-end">
          <Stack>
            <img
              className="!overflow-visible animate-[bounce_2s_ease-in-out_infinite]"
              src="/index/circle.svg"
              alt="rectangle"
              width={15}
              height={15}
            ></img>
            <img
              className="!overflow-visible animate-[bounce_3s_ease-in-out_infinite]"
              src="/index/circle.svg"
              alt="rectangle"
              width={25}
              height={25}
            ></img>
          </Stack>
          <img
            className="!overflow-visible animate-[spin_3s_ease-in-out_infinite]"
            src="/index/rectangle_left.svg"
            alt="rectangle"
            width={60}
            height={60}
          ></img>
        </Group>
      </Stack>
    </Stack>
  );
};
