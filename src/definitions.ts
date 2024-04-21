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

export interface Item {
	label: string;
	name?: string;
}

export interface CategoryItem {
	label: string;
	name?: string;
	items?: CategoryItem[];
}

export interface PageRequest {
	page?: number;
}

export interface ProductPage extends PageRequest {
	category?: string;
	sortBy?: string;
	search?: string;
}

export interface PageResponse<T> {
	totalPage: number;
	total: number;
	page: number;
	items: T[];
}
