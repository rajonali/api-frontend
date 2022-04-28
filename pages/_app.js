import '../styles/globals.css'
import {ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import client from '../apollo-client'
import { AuthProvider} from '../utils/auth'
import { useEffect } from 'react';
import { StoreProvider } from '../redux/Store';

MyApp.getInitialProps = async () => {

  return {
    pageProps: {
      commercePublicKey: process.env.COMMERCE_PUBLIC_KEY,
    },
  };
};


function MyApp({ Component, pageProps }) {


  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return(
    <AuthProvider>
                <StoreProvider>

  <Component {...pageProps} />
  </StoreProvider>


  </AuthProvider>)  
 
}

export default MyApp
