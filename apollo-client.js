import {InMemoryCache, ApolloClient, HttpLink} from '@apollo/client'
import fetch from 'cross-fetch';


const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3001/graphql', fetch }),
  cache: new InMemoryCache(),



});

export default client;