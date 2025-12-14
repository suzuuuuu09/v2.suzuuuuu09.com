import { Icon } from "@iconify/react";
import { HStack, styled as s } from "styled-system/jsx";

interface Props {
  readonly readingTime?: string;
  readonly gap: string;
  readonly iconSize?: number;
}

export default function ReadingTime(props: Props) {
  const { readingTime, gap, iconSize = 16 } = props;

  if (!readingTime) return null;

  return (
    <HStack gap={gap}>
      <Icon
        icon="mdi:clock-outline"
        width={iconSize}
        height={iconSize}
      />
      <s.time color="sz.text.main" fontSize="sm">
        {readingTime}
      </s.time>
    </HStack>
  );
}
