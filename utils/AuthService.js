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

import { useRouter } from "next/router";
import Router from 'next/router';


export default class AuthService {

    constructor() {
      
      return
    }


//TODO
    setToken(token) {
      // Saves user token to localStorage
      localStorage.setItem('token', token)
  }

    getToken = () => {
//check redux state or cookie?

  console.log(localStorage.getItem('token'))
      

// try {
//  // Retrieves the user token from localStorage
// //      console.log(localStorage.getItem('token'))
// const myReq = await fetch('/api/authToken', {
//   method: "post",
//   headers : {
//     "Content-Type": "application/json"
//   },
//   body: ''
// })
// //Catch error with try/catch
// return myReq
// //.catch(err => console.log(err))
// } catch(error){
//   console.log(error)
//   return null
// }

  }
  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    if (this.loggedIn()) {
        headers['Authorization'] = 'Bearer ' + this.getToken()
    }

    return fetch(url, {
            headers,
            ...options
        })
        .then(this._checkStatus)
        .then(response => response.json())
}
  
    createApolloClient() {
  
      const link = new HttpLink({ uri: 'http://localhost:3001/graphql' })
  
  
      
      return new ApolloClient({
        link,
        cache: new InMemoryCache(),
  
        fetchOptions: {
          mode: 'no-cors',
        },
  
      });
    }
  
    signOut = () => {
      setAuthToken(null);
      localStorage.removeItem('token')
      dispatch(userLogout()) ;
    }
  
    signIn = async ({ username, password }) => {
    const client = this.createApolloClient()
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
      Router.push('/account')

      setAuthToken(result.data.login.accessToken)
  
      return(result.data.login.user)
  
    }
  
    isSignedIn = () => {        
      if (this.getToken()) {
        return true
      } else {
        return false
      }
    }
  
}


