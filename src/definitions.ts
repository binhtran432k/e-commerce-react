export interface LinkItem {
	label: string;
	url: string;
	icon?: JSX.Element;
}

export interface ProductItem {
	_id: { $oid: string };
	name: string;
	price: string;
	category: string;
	short_desc: string;
	long_desc: string;
	img1: string;
	img2: string;
	img3: string;
	img4: string;
}
