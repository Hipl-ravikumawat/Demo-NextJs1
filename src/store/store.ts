import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import homeReducer from "./slices/homeSlice";
import blogReducer from "./slices/blogSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        home: homeReducer,
        blog: blogReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;