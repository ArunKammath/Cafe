import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../components/user";
import menuReducer from "../components/menu";

const store = configureStore({
    reducer: {
        user: userReducer,
        menu: menuReducer,
    },
});

export default store;
