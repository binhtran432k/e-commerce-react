import { memo } from "react";

const Banner = memo(({ title }: { title: string }) => {
	return (
		<article className="md:container lg:px-4 m-auto">
			<div className="px-5 md:px-10 lg:px-16 font-medium uppercase italic tracking-wider bg-cover bg-gray-100 min-h-[12rem] flex items-center justify-between">
				<h3 className="text-3xl">{title}</h3>
				<p className="text-gray-400">{title}</p>
			</div>
		</article>
	);
});

export default Banner;
