import {createSlice} from '@reduxjs/toolkit';
import {HYDRATE} from 'next-redux-wrapper'

export const CartSlice = createSlice({
    name: 'cart',

    initialState: {
        cart: {
        commerce: {},
        loading: true,
        cartItems: [],
        shippingAddress: { location: {} },
        paymentMethod: '',
        userInfo: null,
        },
    },
    reducers: {
        setCart: (state,action) => {
            return{
                ...state,
                cart: {...state.cart, commerce: action.payload },
            }
        },
        cartRetrieveRequest: (state,action) => {
            return {
                ...state,
                cart: { loading: true },
              };
        },
        cartRetrieveSuccess: (state,action) => {
            return {
                ...state,
                cart: { loading: false, data: action.payload },
              };
        },
        orderSet: (state, action) => {
            return {
                ...state,
                order: action.payload,
              };
        },
        saveShippingAddress: (state,action) => {
            return {
                ...state,
                cart: {
                  ...state.cart,
                  shippingAddress: {
                    ...state.cart.shippingAddress,
                    ...action.payload,
                  },
                },
              };
        },
        savePaymentMethod: (state,action) => {
            return {
                ...state,
                cart: { ...state.cart, paymentMethod: action.payload },
              };
        },
        userLogin: (state,action) => {
            return { ...state, userInfo: action.payload };
        },
        userLogout: (state, action) => {
            return {
                ...state,
                userInfo: null,
                cart: {
                  cartItems: [],
                  shippingAddress: { location: {} },
                  paymentMethod: '',
                },
              };
        }

    },

    extraReducers: {
        [HYDRATE]: (state,action) => {
            state.name = action.payload.profile.name
        }
    },
})


export const {cartRetrieveRequest, setCart, cartRetrieveSuccess, orderSet, saveShippingAddress, savePaymentMethod, userLogin, userLogout } = CartSlice.actions;

export const selectCart = (state) => state.cart
export default CartSlice.reducer;