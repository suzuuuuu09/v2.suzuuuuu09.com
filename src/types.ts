import type { Dayjs } from "dayjs";

export interface ContactLink {
	label: string;
	url: string;
	icon: string;
	color?: string;
}

export interface IconCard {
	icon: string;
	name: string;
	color?: string;
}

export interface CareerItem {
	id: string;
	title: string;
	supplement: string;
	start: Dayjs;
	end?: Dayjs;
	icon: string;
	writeEnd?: boolean;
}

export interface CategoryItem {
	category: string;
	emoji: string;
}
