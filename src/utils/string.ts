export const getPriceText = (txt: string) =>
	txt.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
