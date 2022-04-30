import {configureStore} from '@reduxjs/toolkit';
import CartSlice from './slices/cart';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";




export const store = configureStore({
    reducer: {
        cart: CartSlice
    },
    devTools: true
})

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
