import { memo } from "react";

interface FootBannerItem {
	title: string;
	description: string;
}

const banners: FootBannerItem[] = [
	{ title: "Free Shipping", description: "Free shipping worldwide" },
	{ title: "24 x 7 Service", description: "Free shipping worldwide" },
	{ title: "Festival Offer", description: "Free shipping worldwide" },
];

const BannerFoot = memo(() => {
	return (
		<article className="lg:container lg:px-4 m-auto">
			<div className="bg-gray-100 py-12">
				<ul className="flex flex-wrap justify-around gap-6">
					{banners.map((banner) => (
						<li
							key={banner.title}
							className="text-center w-[14rem] italic tracking-wide"
						>
							<h4 className="font-medium uppercase text-xl">{banner.title}</h4>
							<p className="text-sm text-gray-400">{banner.description}</p>
						</li>
					))}
				</ul>
			</div>
		</article>
	);
});

export default BannerFoot;
