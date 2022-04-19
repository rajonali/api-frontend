import '../styles/globals.css'
import {ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import client from '../apollo-client'


  
  {/* 
  const client = async () => {
    const client = new ApolloClient({
        link: new HttpLink({
          url: 'http://localhost:3000/graphql'
        }),
        ssrMode: typeof window === 'undefined',
        cache: new InMemoryCache(),
    });
}
*/}
  


function MyApp({ Component, pageProps }) 
{

  return(
  <ApolloProvider client={client}>
  <Component {...pageProps} />
  </ApolloProvider>
)
}

export default MyApp
