import { createSlice } from "@reduxjs/toolkit";
const menuSlice = createSlice({
    name: "menu",
    initialState: {
        menu: {}, // each item is of the type item:{itemName: string, itemPrice: number,itemCount: number, itemImagePath: string, }
        totalAmount: 0.00,
        isInitialized: false    ,
    },
    reducers: {
        setMenu: (state, action) => {
            action.payload.forEach(item => {
                item.itemCount = 0;
                state.menu[item.itemName] = item;
            });
            state.isInitialized = true;
        },
        setItemCount: (state, action) => {
            if(action.payload.type==="increment") {
                state.menu[action.payload.itemName].itemCount++;
                state.totalAmount += Number(state.menu[action.payload.itemName].itemPrice);
            } else if(action.payload.type==="decrement" && state.menu[action.payload.itemName].itemCount>0) {
                state.menu[action.payload.itemName].itemCount--;
                state.totalAmount -= Number(state.menu[action.payload.itemName].itemPrice)  ;
            }
        },
        resetItemCount: (state) => {
            Object.keys(state.menu).forEach(item => {
                state.menu[item].itemCount = 0;
            });
            state.totalAmount = 0.00;
        }
    }
});
export const { setMenu, setItemCount , resetItemCount} = menuSlice.actions;
export default menuSlice.reducer;