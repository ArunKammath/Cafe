import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: {
            username: "",
            password: "",
            userId: "",
            loginTime: 0
        },
    },
    reducers: {
        setUser: (state, action) => {
            state.userData = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
