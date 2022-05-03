import {configureStore} from '@reduxjs/toolkit';
import CartSlice from './slices/cart';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import AuthSlice from './slices/auth';
import { combineReducers } from 'redux';



const reducer = {
    cart: CartSlice,
    auth: AuthSlice,

  }


export const store = configureStore({
    reducer,
    devTools: true
})

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
