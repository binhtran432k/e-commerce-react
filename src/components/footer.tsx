import type { LinkItem } from "@/definitions";
import { getRealPath } from "@/utils/path";
import { memo, useEffect, useState } from "react";

interface FooterSection {
	name: string;
	items: LinkItem[];
}

interface FooterResponse {
	columns: FooterSection[];
}

function FooterSection({ name, items }: { name: string; items: LinkItem[] }) {
	return (
		<div className="w-[18rem]">
			<h5 className="italic text-xl uppercase">{name}</h5>
			<ul className="mt-4">
				{items.map((item) => (
					<li key={item.label}>
						<a href={item.url} className="text-gray-500 hover:text-gray-300">
							{item.label}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}

const Footer = memo(() => {
	const [footerSections, setFooterSections] = useState<FooterSection[]>([]);
	useEffect(() => {
		loader().then((cols) => setFooterSections(cols));
	}, []);
	return (
		<footer className="bg-black text-white">
			<div className="container m-auto px-4 py-16 flex flex-wrap gap-6 justify-between">
				{footerSections.map((section) => (
					<FooterSection
						key={section.name}
						name={section.name}
						items={section.items}
					/>
				))}
			</div>
		</footer>
	);
});

export async function loader() {
	const res = await fetch(getRealPath("/footer.json"));
	const data: FooterResponse = await res.json();
	return data.columns;
}

export default Footer;
