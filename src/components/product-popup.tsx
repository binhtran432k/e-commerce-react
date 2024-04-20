import type { ProductItem } from "@/definitions";
import { getPriceText } from "@/utils/string";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

const ProductPopup = ({ product }: { product: ProductItem }) => {
	return (
		<div className="flex flex-wrap md:flex-nowrap w-full max-w-[800px] items-start justify-center gap-4">
			<img
				src={product.img1}
				alt={product.name}
				width={400}
				height={400}
				className="self-center shrink-0"
			/>
			<div className="flex flex-col items-start mb-4">
				<div className="ms-4 my-4">
					<h3 className="font-bold italic text-xl mt-4 mb-1">{product.name}</h3>
					<p className="text-lg italic text-gray-400">
						{getPriceText(product.price)} VND
					</p>
					<p className="text-sm text-gray-400">{product.short_desc}</p>
				</div>
				<a
					href="./#"
					className="flex self-center md:self-start items-center gap-2 bg-gray-900 hover:bg-gray-700 text-gray-50 px-4 py-1"
				>
					<ShoppingCartIcon className="w-4" /> View Detail
				</a>
			</div>
		</div>
	);
};

export default ProductPopup;
