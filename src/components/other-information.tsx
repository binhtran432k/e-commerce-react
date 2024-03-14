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

function FootBanner() {
	return (
		<article className="lg:container lg:px-4 m-auto">
			<div className="bg-gray-100 py-12">
				<ul className="flex flex-wrap justify-around gap-6">
					{banners.map((banner) => (
						<li
							key={banner.title}
							className="text-center w-[20rem] italic tracking-wide"
						>
							<h4 className="font-medium uppercase text-xl">{banner.title}</h4>
							<p className="text-sm text-gray-400">{banner.description}</p>
						</li>
					))}
				</ul>
			</div>
		</article>
	);
}

function SubcribeBox() {
	return (
		<article className="container px-4 my-12 m-auto flex flex-wrap gap-6 items-center justify-between">
			<header className="italic">
				<h3 className="text-xl uppercase font-medium">Let's be friends!</h3>
				<p className="text-sm text-gray-400">
					Nisi nisi tempor consequat laboris nisi.
				</p>
			</header>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					alert("This function has not been implemented yet!");
				}}
				className="flex justify-end grow"
			>
				<input
					type="email"
					className="p-4 border border-gray-400 max-w-[30rem] grow"
					placeholder="Enter your email address"
				/>
				<button
					type="submit"
					className="px-7 py-4 bg-gray-900 hover:bg-gray-700 text-gray-300"
				>
					Subcribe
				</button>
			</form>
		</article>
	);
}

const OtherInformation = memo(() => {
	return (
		<>
			<FootBanner />
			<SubcribeBox />
		</>
	);
});

export default OtherInformation;
