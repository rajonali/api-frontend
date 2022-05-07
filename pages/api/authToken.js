
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import {useAuth} from '../../utils/auth'

import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    HttpLink,
    gql,
    concat,
     ApolloLink
  } from '@apollo/client'

import { useSelector, useDispatch } from 'react-redux';
import { selectUser, userLogin, userLogout } from '../../redux/slices/auth';



import {sign } from 'jsonwebtoken'
import setAuthorizationToken from '../../utils/setAuthorizeToken';
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie'
import { getCookies } from 'cookies-next';


export default async (req, res) => {
    const myCookies = req.headers.cookie;
    const str = myCookies.split('; ');
    const result = {};
    for (let i in str) {
        const cur = str[i].split('=');
        result[cur[0]] = cur[1];
    }


    //get token cookie and return it to be decoded and dispatched in appjs
    if (result['token']){
        res.status(200).json(result['token'])

    }
    else {
        return res.json({message: "no token!"})
    }


}
//    const { signIn, isSignedIn, signOut, authToken} = useAuth();

