import type { CategoryItem } from "@/definitions";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { getAllCategories } from "@/services/category-service";
import { shopActions } from "@/store/shop-slice";
import clsx from "clsx";
import { memo, useEffect, useState } from "react";

function CategoryButton({ category }: { category: CategoryItem }) {
	const isActive = useAppSelector(
		(state) => state.shop.category === category.name,
	);
	const dispatch = useAppDispatch();

	return (
		<button
			type="button"
			className={clsx(
				"text-gray-400 hover:text-gray-600 px-5 py-2 w-full text-left",
				isActive && "font-bold text-gray-600",
			)}
			onClick={() => dispatch(shopActions.setCategory(category.name))}
		>
			{category.label}
		</button>
	);
}

function CategorySecondaryList({ category }: { category: CategoryItem }) {
	return (
		<>
			<h4 className="uppercase bg-gray-100 font-medium px-5 py-2">
				{category.label}
			</h4>
			<ul>
				{category.items?.map((item) => (
					<li key={item.label}>
						<CategoryButton category={item} />
					</li>
				))}
			</ul>
		</>
	);
}

function CategoryPrimaryList({ category }: { category: CategoryItem }) {
	return (
		<>
			<h3 className="uppercase bg-gray-900 text-gray-50 font-medium px-5 py-2">
				{category.label}
			</h3>
			<ul>
				{category.items?.map((item) => (
					<li key={item.label}>
						{item.items ? (
							<CategorySecondaryList category={item} />
						) : (
							<CategoryButton category={item} />
						)}
					</li>
				))}
			</ul>
		</>
	);
}

const Sidebar = memo(({ className }: { className?: string }) => {
	const [categories, setCategories] = useState<CategoryItem[]>([]);

	useEffect(() => {
		getAllCategories().then(setCategories);
	}, []);

	return (
		<aside className={clsx("italic", className)}>
			<h4 className="uppercase font-semibold text-xl mb-4">Categories</h4>
			<ul>
				{categories.map((category) => (
					<li key={category.label}>
						{category.items && <CategoryPrimaryList category={category} />}
					</li>
				))}
			</ul>
		</aside>
	);
});

export default Sidebar;
