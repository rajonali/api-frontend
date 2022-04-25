import React, { useState, useEffect, useContext, createContext } from 'react'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
  concat,
   ApolloLink
} from '@apollo/client'

import fetch from 'cross-fetch';
import axios from 'axios';


import { parseCookies, setCookie, destroyCookie } from 'nookies'


const authContext = createContext()

export function AuthProvider({ children }) {
  const auth = useProvideAuth()


  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [authToken, setAuthToken] = useState(null)

  const getAuthHeaders = () => {
    if (!authToken)
    {return null }
    
    return {
      "x-auth-token": authToken,
    }
  }



  function createApolloClient() {


const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3001/graphql' }),
  cache: new InMemoryCache(),
  headers: getAuthHeaders(),
  fetchOptions: {
    mode: 'no-cors',
  },

});

return client;
  }





  const signOut = () => {
    setAuthToken(null);
    //TODO delete cookies 
    console.log(authToken);
  }

  const signIn = async ({ username, password }) => {
    const client = createApolloClient()
    const LoginMutation = gql`
      mutation login($input: LoginUserInput!) {
        login(input: $input) {
          accessToken,
          refreshToken,
          user { id, username }
        }
      }
    `


    
    const result = await client.mutate({
      mutation: LoginMutation,
      
      variables: { input : {username, password} },
    })

//    console.log("my result" + JSON.stringify(result))

    if (result.data.login.accessToken) {
      //make req to proxy
      const myReq = await fetch('/api/login', {
        method: "post",
        headers : {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(result.data.login)
      });
      //if true, return request with auth header cookie
      setAuthToken(result.data.login.accessToken)
          
    }
//console.log(result.data.login)
    return result.data.login
    
  }

  const isSignedIn = () => {
//    console.log("coookokieeiei: " + JSON.stringify(parseCookies()))
//    const cookies = parseCookies()
//      if (cookies['user'] != null) {
        
    if (authToken) {
      return true
    } else {
      return false
    }
  }

  return {
    createApolloClient,
    signIn,
    signOut,
    isSignedIn,
    authToken,
  }
}