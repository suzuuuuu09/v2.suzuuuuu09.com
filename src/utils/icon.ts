import { ICON_CARDS } from "@/consts";

export function getIconData(iconKey: string) {
  const iconData = ICON_CARDS[iconKey.toLowerCase()];
  return iconData;
}