import type { Item } from "@/definitions";

export async function getAllSortByItems(): Promise<Item[]> {
	return [
		{ label: "Default Sorting" },
		{ name: "asc.name", label: "Name: A to Z" },
		{ name: "desc.name", label: "Name: Z to A" },
		{ name: "asc.price", label: "Price: Low to High" },
		{ name: "desc.price", label: "Price: High to Low" },
	];
}
