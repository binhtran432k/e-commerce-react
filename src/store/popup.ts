import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
	name: "popup",
	initialState: {
		id: null as string | null,
	},
	reducers: {
		show: (state, { payload }: { payload: string }) => {
			state.id = payload;
		},
		hide: (state) => {
			state.id = null;
		},
	},
});

export const popupActions = popupSlice.actions;

export default popupSlice.reducer;
