import { Icon } from "@iconify-icon/react";
import { HStack, styled as s } from "styled-system/jsx";
import dayjs from "dayjs";

interface Props {
  date: string | Date;
  gap: string;
  type: "publish" | "update" | "award";
  iconSize?: number;
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
  })()

  return (
    <HStack gap={gap}>
      <Icon icon={icon} size={iconSize} />
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
