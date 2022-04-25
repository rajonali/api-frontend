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


function Posts({posts}) {
  
  const { isSignedIn } = useAuth();
  
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


   


/*
    export async function getServerSideProps(req, res) {
      


      
      const client = new ApolloClient({
        link: new HttpLink({ uri: 'http://localhost:3001/graphql' }),
        cache: new InMemoryCache(),
        fetchOptions: {
          mode: 'no-cors',
        },
      
      });     
      
      
      const postquery = gql`
        query Posts {
            posts {
              title
              id
            }
          }
      `
  
  
      
      //const { loading, error, data } = useQuery(postquery);
      
      //console.log(data)


    
      return {
        props: {
          posts: [{id:1, title:'dasjda'}],
        },
      };}
*/



export const getServerSideProps = requireAuthentication(
  async (_ctx) => {
    return {
      props: {},
    }
  }
)



export default Posts;