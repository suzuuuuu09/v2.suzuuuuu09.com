import { Icon } from "@iconify/react";
import { HStack, styled as s } from "styled-system/jsx";
import dayjs from "dayjs";

interface Props {
  readonly date: string | Date;
  readonly gap: string;
  readonly type: "publish" | "update" | "award";
  readonly iconSize?: number;
}

export default function Date(props: Props) {
  const { date, gap, type, iconSize = 16 } = props;

  if (!date) return null;
  const formattedDate = dayjs(date).format("YYYY.MM.DD");

  const icon = (() => {
    switch (type) {
      case "publish":
        return "mdi:calendar";
      case "update":
        return "mdi:update";
      case "award":
        return "mdi:award";
    }
  })();

  return (
    <HStack gap={gap}>
      <Icon icon={icon} width={iconSize} height={iconSize} />
      <s.time
        dateTime={dayjs(date).toISOString()}
        color="sz.text.main"
        fontSize="sm"
      >
        {formattedDate}
      </s.time>
    </HStack>
  )
}
