import type { CareerItem } from "@/types";
import dayjs from "dayjs";

export const CAREER_ITEMS: CareerItem[] = [
	{
		id: "1",
		title: "生誕",
		supplement: "愛知県名古屋市",
		start: dayjs("2007-01-27"),
		icon: "tabler:baby",
		writeEnd: false,
	},
	{
		id: "2",
		title: "名電高校 入学",
		supplement: "Meiden High School",
		start: dayjs("2022-04-06"),
		end: dayjs("2025-03-01"),
		icon: "tabler:school",
		writeEnd: true,
	},
	{
		id: "3",
		title: "情報システム部 入部",
		supplement: "MISC",
		start: dayjs("2022-04-06"),
		end: dayjs("2025-03-01"),
		icon: "tabler:code",
		writeEnd: true,
	},
	{
		id: "4",
		title: "愛知工業大学 入学",
		supplement: "AIT",
		start: dayjs("2025-04-04"),
		icon: "tabler:building-castle",
		writeEnd: true,
	},
	{
		id: "5",
		title: "システム工学研究会 入会",
		supplement: "SET",
		start: dayjs("2025-04-04"),
		icon: "tabler:cpu",
		writeEnd: true,
	},
];
