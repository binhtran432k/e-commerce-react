import type { ProductItem } from "@/definitions";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ProductPopupState {
	type: "product";
	data: ProductItem;
}

export type PopupState = ProductPopupState;

const popupSlice = createSlice({
	name: "popup",
	initialState: {
		isShow: false,
	} as PopupState & { isShow: boolean },
	reducers: {
		show: (state, { payload }: PayloadAction<PopupState>) => {
			state.isShow = true;
			state.type = payload.type;
			state.data = payload.data;
		},
		hide: (state) => {
			state.isShow = false;
		},
	},
});

export const popupActions = popupSlice.actions;

export default popupSlice.reducer;
