import cookie from 'cookie';
import { verify, decode } from 'jsonwebtoken';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
//import { createApolloClient } from '../../Utils/createApolloClient';
//import { getUserQuery } from 'GraphQLQueries/userQueries';
import {useAuth} from '../utils/auth'



export function requireAuthentication(gssp) {

  return async (ctx) => {
/*     const { signIn, isSignedIn, signOut, authToken} = useAuth();
 */
    const { req } = ctx;
    if (req.headers.cookie) {
      const { token } = cookie.parse(req.headers.cookie);
//      const client = createApolloClient(accessToken);
//      const GET_USER = getUserQuery;

      try {
        //verify token against .env to ensure token was issued by our server and not expired
        verify(token, process.env.SECRET)

        //get token objects
        const {username, accessToken} = decode(token)

      
        // Send a request to the API and verify that the user exists
        // Reject and redirect if the user is undefined or there is no accessToken
    //    const response = await client.query({ query: GET_USER });
    //    const { getUser: user } = response.data;


        if (!token || !username || !accessToken ){//|| !user || !user.email) {
          return {
            redirect: {
              permanent: false,
              destination: '/login',
            },
          };
        }
      } catch (error) {
        // Failure in the query or any error should fallback here
        // this route is possibly forbidden means the cookie is invalid
        // or the cookie is expired

        //TODO: REFRESH TOKEN HERE IF TOKEN EXPIRED 
        //CHECK IF USER IS IN DATABASE
        return {
          redirect: {
            permanent: false,
            destination: '/login',
          },
        };
      }





    }

    else {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
      };
    }

    return await gssp(ctx);
  };

  
}