import React, { createContext, useReducer } from 'react';
import {
  CART_RETRIEVE_REQUEST,
  CART_RETRIEVE_SUCCESS,
  ORDER_SET,
} from '../utils/constants';




export const Store = createContext();

function reducer(state, action) {
  switch (action.type) {
    case CART_RETRIEVE_REQUEST:
      return {
        ...state,
        cart: { loading: true },
      };
    case CART_RETRIEVE_SUCCESS:
      return {
        ...state,
        cart: { loading: false, data: action.payload },
      };
    case ORDER_SET:
      return {
        ...state,
        order: action.payload,
      };
      case 'SAVE_SHIPPING_ADDRESS':
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
      case 'SAVE_PAYMENT_METHOD':
        return {
          ...state,
          cart: { ...state.cart, paymentMethod: action.payload },
        };
      case 'USER_LOGIN':
        return { ...state, userInfo: action.payload };
    case 'USER_LOGOUT':
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: '',
        },
      };

    default:
      return state;
  }
}


//fetch user info and store into init state

async function fetchDick(){

  const profile = await prisma.user.findMany({
    where: { id: "cl1efyj2o00088gtebj2lc4v6" },
    select: {
      email: true,
      name: true,
    },

  });
  return profile

}




const initialState = {
  cart: { loading: true,
    cartItems: [],
  shippingAddress: { location: {} },
  paymentMethod: '',
  userInfo: null,


  
  
  },
  order:
    typeof window !== 'undefined' &&
    window.localStorage.getItem('order_receipt')
      ? JSON.parse(window.localStorage.getItem('order_receipt'))
      : null,
};
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
