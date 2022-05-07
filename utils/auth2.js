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

import { useSelector, useDispatch } from 'react-redux';
import { selectUser, userLogin, userLogout, setUser } from '../redux/slices/auth';
import Cookies from 'js-cookie'

    const getUserCookie = () => {
        const authCookie = Cookies.get('token')
    } 
    
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
  
    export const authActions = {
        signIn,
        signOut,
        isSignedIn,
        getAuthHeaders,
        getUserCookie,
    };


