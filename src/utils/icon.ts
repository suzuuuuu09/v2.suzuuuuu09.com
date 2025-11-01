import { ICON_CARDS } from "@/consts/icon";

export function getIconData(iconKey: string) {
  const iconData = ICON_CARDS[iconKey.toLowerCase()];
  return iconData;
}