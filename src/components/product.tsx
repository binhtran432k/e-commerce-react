import type { ProductItem } from "@/definitions";
import { useAppDispatch } from "@/hooks/store";
import { popupActions } from "@/store/popup-slice";
import { getPriceText } from "@/utils/string";
import { memo } from "react";

const Product = memo(({ product }: { product: ProductItem }) => {
	const dispatch = useAppDispatch();

	return (
		<div className="animate-appear">
			<button
				type="button"
				className="my-8 flex flex-col items-center italic hover:opacity-75 transition-opacity"
				onClick={() =>
					dispatch(popupActions.show({ type: "product", data: product }))
				}
			>
				<img src={product.img1} alt={product.name} width={250} height={250} />
				<h4 className="font-medium mt-4 mb-1">{product.name}</h4>
				<p className="text-sm text-gray-400">
					{getPriceText(product.price)} VND
				</p>
			</button>
		</div>
	);
});

export default Product;
