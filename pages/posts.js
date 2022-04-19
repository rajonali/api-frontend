import {gql } from '@apollo/client'
import {useRouter} from "next/router"
import client from '../apollo-client'
import { ApolloClient } from "@apollo/client";

const PostsQuery = gql`
query {
  posts {
    title,
    id
  }
}
`


function Posts({posts}) {

    return (
        <div>
        <h1>Posts</h1>
        <ul>
            {posts?.map((v) => {
                return (<li key={v.id}>{v.title}</li>)
            })
            }
        </ul>
        </div>

    )}

    export async function getServerSideProps() {
      const { data } = await client.query({
        query: gql`
          query Posts {
            posts {
              title
              id
            }
          }
        `,
      });
    
      
    
      return {
        props: {
          posts: data.posts,
        },
      };}


export default Posts;