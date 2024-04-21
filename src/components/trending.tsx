import type { ProductItem } from "@/definitions";
import { getTrendings } from "@/services/product-service";
import { memo, useEffect, useState } from "react";
import Product from "./product";

const Trending = memo(() => {
	const [products, setProducts] = useState<ProductItem[]>([]);

	useEffect(() => {
		getTrendings().then((items) => setProducts(items));
	}, []);

	return (
		<article className="container m-auto my-12 px-4">
			<header className="mb-6 uppercase italic tracking-wide font-medium">
				<h2 className="text-gray-300">Made The Hard Way</h2>
				<h3 className="text-xl">Top Trending Products</h3>
			</header>
			<ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-6">
				{products.map((product) => (
					<li key={product._id.$oid} className="m-auto">
						<Product product={product} />
					</li>
				))}
			</ul>
		</article>
	);
});

export default Trending;
