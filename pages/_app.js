import '../styles/globals.css'
import {ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import client from '../apollo-client'
import { useEffect } from 'react';
import { wrapper, store } from "../redux/storee";
import { Provider } from "react-redux";
import getCommerce from '../utils/commerce';

import { useSelector, useDispatch } from 'react-redux';
import { cartRetrieveRequest, cartRetrieveSuccess, selectCart, setCart } from '../redux/slices/cart';
import {setUser} from '../redux/slices/auth';

import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';

import jwt_decode from "jwt-decode";

MyApp.getInitialProps = async () => {
  return {
    pageProps: {
      commercePublicKey: process.env.COMMERCE_PUBLIC_KEY,
    },
  };
};


function MyApp({ Component, pageProps }) {

  const commerce = getCommerce(pageProps.commercePublicKey);
  const cartSelector = useSelector(selectCart)




  const dispatch = useDispatch()


  const fetchCart = async () => {
    dispatch(setCart(await commerce.cart.retrieve()));
  };

  const fetchAuth = async () => {
    //TODO call a function that checks for cookie in local storage. 
    //Create a function in utils/auth service context 
    //If true return user obj and setUser to that return value 
    

    //post request to server route and call dispatch on ssr?
    //else returns user state and auth status to put in dispatch 


    //make call to /api route that returns decoded cookie
    //dispatch that 


    const myReq = await fetch('/api/authToken', {
      method: "post",
      headers : {
        "Content-Type": "application/json"
      },
      body: ''
    }).then(response => response.text())
    .then(data => {
    dispatch(setUser(jwt_decode(data)))
    }).catch(error => {
      console.log(error);
  });

  }


  const getServerSideProps = ({ req, res }) => {
    console.log(req.res.cookie)
  return { props: {}};
}
  

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }


    fetchCart();
    fetchAuth();
    
  }, []);

  return(
    <Provider store={store}>

  <Component {...pageProps} />


  </Provider>
  
  )  
 
}

export default wrapper.withRedux(MyApp);