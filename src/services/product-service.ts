import type { PageResponse, ProductItem, ProductPage } from "@/definitions";
import { fuzzySearch } from "@/utils/search";

export async function getAllProducts(): Promise<ProductItem[]> {
	return fetch(
		"https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74",
	).then((res) => res.json());
}

export async function getTrendings(): Promise<ProductItem[]> {
	return getAllProducts().then((data) => data.slice(0, 8));
}

export async function getProductPage(
	page: ProductPage,
	count = 10,
): Promise<PageResponse<ProductItem>> {
	const compareFunc = (() => {
		if (page.sortBy === "asc.name")
			return (a: ProductItem, b: ProductItem) =>
				a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
		if (page.sortBy === "desc.name")
			return (a: ProductItem, b: ProductItem) =>
				a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1;
		if (page.sortBy === "asc.price")
			return (a: ProductItem, b: ProductItem) =>
				Number(a.price) - Number(b.price);
		if (page.sortBy === "desc.price")
			return (a: ProductItem, b: ProductItem) =>
				Number(b.price) - Number(a.price);
		return () => 0;
	})();
	return getAllProducts()
		.then((data) =>
			data
				.filter((x) => (page.category ? x.category === page.category : true))
				.filter((x) =>
					page.search
						? fuzzySearch(
								page.search.toLowerCase(),
								x.name.toLowerCase(),
								1,
						  ).next().value
						: true,
				)
				.sort(compareFunc),
		)
		.then((data) => {
			const totalPage = Math.ceil(data.length / count);
			const pageNum = page.page ?? 1;

			return {
				totalPage,
				total: data.length,
				page: pageNum,
				items: data.slice((pageNum - 1) * count, pageNum * count),
			};
		});
}
