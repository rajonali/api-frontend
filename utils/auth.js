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
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, userLogin, userLogout } from '../redux/slices/auth';




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
  const [user, setUser] = useState('')

  const getAuthHeaders = () => {
    if (!authToken)
    {return null }
    
    return {
      authorization: `Bearer ${authToken}`,
    }
  }


  function createApolloClient() {

    const link = new HttpLink({ uri: 'http://localhost:3001/graphql' })


    
    return new ApolloClient({
      link,
      cache: new InMemoryCache(),

      fetchOptions: {
        mode: 'no-cors',
      },

    });
  }

  const signOut = () => {
    setAuthToken(null);
    //TODO delete cookies 
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

// TODO dispatch login and return result.data.login

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
      return(result.data.login.user)

    }
    setUser(result.data.login.username)
    setAuthToken(result.data.login.accessToken)

    return(result.data.login.user)

  }

  const isSignedIn = () => {        
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
    user
  }
}