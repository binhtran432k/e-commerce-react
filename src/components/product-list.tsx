import type { ProductItem } from "@/definitions";
import { memo, useEffect, useState } from "react";

const Product = memo(({ product }: { product: ProductItem }) => {
	return (
		<div className="text-center italic hover:cursor-pointer hover:opacity-75 transition-opacity">
			<img src={product.img1} alt={product.name} />
			<h4 className="font-medium mt-4 mb-1">{product.name}</h4>
			<p className="text-sm text-gray-400">
				{product.price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")} VND
			</p>
		</div>
	);
});

const ProductList = memo(() => {
	const [products, setProducts] = useState<ProductItem[]>([]);

	useEffect(() => {
		loader().then((items) => setProducts(items));
	}, []);

	return (
		<article className="container m-auto my-12 px-4">
			<header className="mb-6 uppercase italic tracking-wide font-medium">
				<h2 className="text-gray-300">Made The Hard Way</h2>
				<h3 className="text-xl">Top Trending Products</h3>
			</header>
			<ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-6">
				{products.map((product) => (
					<li key={product._id.$oid}>
						<Product product={product} />
					</li>
				))}
			</ul>
		</article>
	);
});

export async function loader(): Promise<ProductItem[]> {
	return fetch(
		"https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74",
	)
		.then((res) => res.json())
		.then((data) => data.slice(0, 8));
}

export default ProductList;
