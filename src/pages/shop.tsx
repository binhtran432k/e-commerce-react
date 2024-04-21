import Banner from "@/components/banner";
import CategorySidebar from "@/components/category-sidebar";
import Dropdown from "@/components/dropdown";
import Input from "@/components/input";
import ProductList from "@/components/product-list";
import type { Item } from "@/definitions";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { getAllSortByItems } from "@/services/sort-by-service";
import { shopActions } from "@/store/shop-slice";
import { memo, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Shop = memo(() => {
	const [sortByItems, setSortByItems] = useState<Item[]>([]);
	const dispatch = useAppDispatch();
	const currentSortBy = useAppSelector((state) =>
		sortByItems.find((item) => item.name === state.shop.sortBy),
	);
	const [searchParams, setSearchParams] = useSearchParams();
	const searchValue = useAppSelector((state) => state.shop.search);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const shop = useAppSelector((state) => state.shop);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Ignore use only initial of searchParams
	useEffect(() => {
		getAllSortByItems().then(setSortByItems);
		dispatch(shopActions.setSearch(searchParams.get("q") ?? ""));
		dispatch(shopActions.setSortBy(searchParams.get("sort-by") ?? undefined));
		dispatch(
			shopActions.setCategory(searchParams.get("category") ?? undefined),
		);
		dispatch(
			shopActions.setPage(
				searchParams.get("page") ? Number(searchParams.get("page")) : undefined,
			),
		);
	}, []);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			searchValue
				? searchParams.set("q", searchValue)
				: searchParams.delete("q");
			currentSortBy?.name
				? searchParams.set("sort-by", currentSortBy.name)
				: searchParams.delete("sort-by");
			shop.category
				? searchParams.set("category", shop.category)
				: searchParams.delete("category");
			shop.page
				? searchParams.set("page", shop.page.toString())
				: searchParams.delete("page");
			setSearchParams(searchParams);
		}, 300);
		return () => clearTimeout(timeoutId);
	}, [searchValue, shop, currentSortBy, searchParams, setSearchParams]);

	return (
		<main>
			<Banner title="Shop" />
			<div className="container m-auto p-4 my-4 gap-6 flex-col sm:flex-row flex">
				<CategorySidebar className="sm:max-w-[240px] w-full grow" />
				<div className="w-full">
					<div className="flex flex-col gap-4 sm:flex-row justify-between">
						<Input
							type="search"
							placeholder="Enter Search Here"
							value={searchValue}
							onChange={(e) => dispatch(shopActions.setSearch(e.target.value))}
							className="w-full sm:max-w-[260px]"
							ref={inputRef}
						/>
						<Dropdown
							className="w-full sm:max-w-[260px] z-10"
							options={sortByItems}
							value={currentSortBy}
							onChange={(option) =>
								dispatch(shopActions.setSortBy(option.name))
							}
						/>
					</div>
					<ProductList />
				</div>
			</div>
		</main>
	);
});

export default Shop;
