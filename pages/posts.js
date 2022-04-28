import {useRouter} from "next/router"
import client from '../apollo-client'
import {useAuth} from '../utils/auth'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { isCompositeType } from 'graphql';
import {requireAuthentication} from '../components/requireAuthentication'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
  useQuery,
  concat,
   ApolloLink
} from '@apollo/client'

import {useEffect, useState} from 'react'

export const Posts = () => {


  const [postss, setPostss] = useState(null);

  
  const { signIn, isSignedIn, signOut, authToken} = useAuth();
  

  const postquery = gql`
  query Posts {
      posts {
        title
        id
      }
    }
`

const { data } = useQuery(postquery)


function isAuth() {
  console.log(isSignedIn()) 
} 
isAuth();

    return (
        <div>
        <h1>Posts</h1>
        <ul>
            {data?.posts.map((v) => {
                return (<li key={v.id}>{v.title}</li>)
            })
            }
        </ul>
        </div>

    )}


   



    


export const getServerSideProps = requireAuthentication(
  async (_ctx) => {
    return {
      props: {
        posts: [{id:1, title:'dasjda'}],
      },
    }
  }
)



export default Posts;