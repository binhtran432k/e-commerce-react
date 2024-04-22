import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ShopState {
	page?: number;
	category?: string;
	sortBy?: string;
	search: string;
}

const shopSlice = createSlice({
	name: "popup",
	initialState: {
		search: "",
	} as ShopState,
	reducers: {
		setCategory: (state, { payload }: PayloadAction<ShopState["category"]>) => {
			state.category = payload;
			state.page = undefined;
		},
		setSortBy: (state, { payload }: PayloadAction<ShopState["sortBy"]>) => {
			state.sortBy = payload;
		},
		setSearch: (state, { payload }: PayloadAction<ShopState["search"]>) => {
			state.search = payload;
		},
		setPage: (state, { payload }: PayloadAction<ShopState["page"]>) => {
			state.page = payload;
		},
	},
});

export const shopActions = shopSlice.actions;

export default shopSlice.reducer;
