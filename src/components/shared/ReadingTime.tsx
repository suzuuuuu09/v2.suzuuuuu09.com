import { Icon } from "@iconify-icon/react";
import { HStack, styled as s } from "styled-system/jsx";
import { getReadingTime } from "@/lib/reading-time";

interface Props {
  readonly content: string;
  readonly gap: string;
  readonly iconSize?: number;
}

export default function ReadingTime(props: Props) {
  const { content, gap, iconSize = 16 } = props;
  const readingTime = content ? getReadingTime(content) : null;

  if (!readingTime) return null;

  return (
    <HStack gap={gap}>
      <Icon icon="mdi:clock-outline" width={iconSize} height={iconSize} />
      <s.time color="sz.text.main" fontSize="sm">{readingTime}</s.time>
    </HStack>
  )
}
