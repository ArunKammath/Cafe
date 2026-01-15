import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../components/user";

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default store;
