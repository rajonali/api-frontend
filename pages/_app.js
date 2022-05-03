import '../styles/globals.css'
import {ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import client from '../apollo-client'
import { AuthProvider} from '../utils/auth'
import { useEffect } from 'react';
import { StoreProvider } from '../redux/Store';
import { wrapper, store } from "../redux/storee";
import { Provider } from "react-redux";
import getCommerce from '../utils/commerce';

import { useSelector, useDispatch } from 'react-redux';
import { cartRetrieveRequest, cartRetrieveSuccess, selectCart, setCart } from '../redux/slices/cart';
import {setUser} from '../redux/slices/auth';

import {useAuth} from '../utils/auth'



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
    dispatch(setUser({id:2, username:'fhsdjkfsdhk'}))
  };

  const fetchAuth = async () => {
    const { user } = useAuth();

    dispatch(setUser(user))
  }

  

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }


    fetchCart()
    
  }, []);

  return(
    <Provider store={store}>
    <AuthProvider>

  <Component {...pageProps} />


  </AuthProvider>
  </Provider>
  
  )  
 
}

export default wrapper.withRedux(MyApp);