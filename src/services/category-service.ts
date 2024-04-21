import type { CategoryItem } from "@/definitions";

export async function getAllCategories(): Promise<CategoryItem[]> {
	return [
		{
			label: "Apple",
			items: [
				{
					label: "All",
				},
				{
					label: "iPhone & Mac",
					items: [
						{
							name: "iphone",
							label: "iPhone",
						},
						{
							name: "ipad",
							label: "iPad",
						},
						{
							name: "macbook",
							label: "Macbook",
						},
					],
				},
				{
					label: "Wireless",
					items: [
						{
							name: "airpod",
							label: "Airpod",
						},
						{
							name: "watch",
							label: "Watch",
						},
					],
				},
				{
					label: "Other",
					items: [
						{
							name: "mouse",
							label: "Mouse",
						},
						{
							name: "keyboard",
							label: "Keyboard",
						},
						{
							name: "other",
							label: "Other",
						},
					],
				},
			],
		},
	];
}
