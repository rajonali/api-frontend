import '../styles/globals.css'
import {ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import client from '../apollo-client'
import { AuthProvider} from '../utils/auth'

  


function MyApp({ Component, pageProps }) 
{

  return(
    <AuthProvider>
  <Component {...pageProps} />
  </AuthProvider>)  
 
}

export default MyApp
