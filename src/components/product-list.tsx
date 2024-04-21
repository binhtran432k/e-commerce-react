import type { PageResponse, ProductItem } from "@/definitions";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { getProductPage } from "@/services/product-service";
import { shopActions } from "@/store/shop-slice";
import { memo, useEffect, useState } from "react";
import Pagination from "./pagination";
import Product from "./product";

const PRODUCT_PER_PAGE = 3;

const ProductList = memo(() => {
	const dispatch = useAppDispatch();
	const [productPage, setProductPage] = useState<
		PageResponse<ProductItem> | undefined
	>();
	const [nextPage, setNextPage] = useState<number | undefined>();
	const [prevPage, setPrevPage] = useState<number | undefined>();
	const shop = useAppSelector((state) => state.shop);

	useEffect(() => {
		setProductPage(undefined);
		setNextPage(undefined);
		setPrevPage(undefined);
		const timeoutId = setTimeout(() => {
			getProductPage(
				{
					category: shop.category,
					search: shop.search,
					sortBy: shop.sortBy,
					page: shop.page,
				},
				PRODUCT_PER_PAGE,
			).then((page) => {
				setProductPage(page);
				const pageNum = shop.page ?? 1;
				setPrevPage(
					pageNum > page.totalPage
						? page.totalPage
						: pageNum > 1
						  ? page.page - 1
						  : undefined,
				);
				setNextPage(
					pageNum < 1
						? 1
						: pageNum < page.totalPage
						  ? page.page + 1
						  : undefined,
				);
			});
		}, 300);
		return () => clearTimeout(timeoutId);
	}, [shop]);

	return (
		<div className="flex flex-col gap-12 items-end">
			<ul className="flex flex-wrap sm:grid md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-6">
				{productPage?.items.map((product) => (
					<li key={product._id.$oid} className="m-auto">
						<Product product={product} />
					</li>
				))}
			</ul>
			<div className="flex flex-col items-end gap-2">
				<Pagination
					page={shop.page ?? 1}
					onNext={
						nextPage ? () => dispatch(shopActions.setPage(nextPage)) : undefined
					}
					onPrev={
						prevPage ? () => dispatch(shopActions.setPage(prevPage)) : undefined
					}
				/>
				<p className="text-gray-400 italic">
					Showing{" "}
					{productPage
						? Math.min(
								(productPage.page - 1) * PRODUCT_PER_PAGE + 1,
								productPage.total,
						  )
						: 1}
					-
					{productPage
						? Math.min(productPage.page * PRODUCT_PER_PAGE, productPage.total)
						: PRODUCT_PER_PAGE}{" "}
					of {productPage?.total ?? PRODUCT_PER_PAGE} results
				</p>
			</div>
		</div>
	);
});

export default ProductList;
