import { getRealPath } from "@/utils/path";
import { memo } from "react";
import { Link } from "react-router-dom";

interface CategoryItem {
	label: string;
	image: string;
}

const categories: [number, CategoryItem[]][] = [
	[
		1,
		[
			{ label: "iPhone", image: getRealPath("/images/product_1.png") },
			{ label: "Mac", image: getRealPath("/images/product_2.png") },
		],
	],
	[
		2,
		[
			{ label: "iPad", image: getRealPath("/images/product_3.png") },
			{ label: "WATCH", image: getRealPath("/images/product_4.png") },
			{ label: "AirPods", image: getRealPath("/images/product_5.png") },
		],
	],
];

const Category = memo(() => {
	return (
		<article className="container m-auto my-12 px-4">
			<header className="mb-6 text-center uppercase italic tracking-wide font-medium">
				<h3 className="text-gray-300">Carefully Created Collections</h3>
				<h2 className="text-xl">Browse Our Categories</h2>
			</header>
			<div className="flex flex-col gap-6">
				{categories.map(([id, categoryRow]) => (
					<ul key={id} className="flex grow gap-6">
						{categoryRow.map((category) => (
							<li
								key={category.label}
								className="transition-opacity w-full hover:opacity-75 hover:cursor-pointer"
							>
								<Link to="/shop">
									<img src={category.image} alt={category.label} width="100%" />
								</Link>
							</li>
						))}
					</ul>
				))}
			</div>
		</article>
	);
});

export default Category;
