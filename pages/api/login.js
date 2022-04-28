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

  import Cookies from 'cookies'
import { serialize } from 'cookie';




import {sign } from 'jsonwebtoken'


export default async (req, res) => {
      

    const secret = process.env.SECRET;


    const {accessToken, refreshToken } = req.body;
    const {username}  = req.body.user;

    if (username) {
        const token = sign(
            {
                username,
                refreshToken,
            },
            secret
        )


        const serialized = serialize("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 60 * 60 *24 * 30,
            path: "/"
        })



        res.setHeader('Set-Cookie', serialized);

        res.status(200).json(req.body )



    }
    else {
        return res.json({message: "invalid creds"})
    }


}
//    const { signIn, isSignedIn, signOut, authToken} = useAuth();

