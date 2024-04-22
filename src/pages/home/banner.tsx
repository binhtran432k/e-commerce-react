import { getRealPath } from "@/utils/path";
import { memo } from "react";
import { Link } from "react-router-dom";

const Banner = memo(() => {
	return (
		<article className="lg:container lg:px-4 m-auto">
			<div
				className="px-4 md:px-8 lg:px-12 bg-cover min-h-[24rem] bg-center flex flex-col items-start justify-center"
				style={{
					backgroundImage: `url('${getRealPath("/images/banner1.jpg")}')`,
				}}
			>
				<h3 className="uppercase italic text-gray-400 tracking-widest">
					New Inspiration 2020
				</h3>
				<p className="uppercase italic text-3xl tracking-wider mt-2 mb-4 max-w-[18rem] font-medium">
					20% off on new season
				</p>
				<Link
					to="/shop"
					className="px-5 py-2 italic inline-block bg-gray-700 text-gray-300 hover:bg-gray-600"
				>
					Browse collections
				</Link>
			</div>
		</article>
	);
});

export default Banner;
