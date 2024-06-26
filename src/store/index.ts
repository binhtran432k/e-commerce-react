import { configureStore } from "@reduxjs/toolkit";
import popupReducer from "./popup-slice";
import shopReducer from "./shop-slice";

const store = configureStore({
	reducer: {
		popup: popupReducer,
		shop: shopReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;

export default store;
