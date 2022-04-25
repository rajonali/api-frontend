import cookie from 'cookie';
import { verify } from 'jsonwebtoken';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
//import { createApolloClient } from '../../Utils/createApolloClient';
//import { getUserQuery } from 'GraphQLQueries/userQueries';

export function requireAuthentication(gssp) {
  return async (ctx) => {
    const { req } = ctx;
    console.log(JSON.stringify(req.headers.cookie))
    if (req.headers.cookie) {
      const { token } = cookie.parse(req.headers.cookie);
//      const client = createApolloClient(accessToken);
//      const GET_USER = getUserQuery;

      try {
        // Send a request to the API and verify that the user exists
        // Reject and redirect if the user is undefined or there is no accessToken
    //    const response = await client.query({ query: GET_USER });
    //    const { getUser: user } = response.data;

      console.log("verify func"+ JSON.stringify(verify(token, "help")))


        if (!token ){//|| !user || !user.email) {
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
        return {
          redirect: {
            permanent: false,
            destination: '/login',
          },
        };
      }



try {

  verify(token, process.env.SECRET)
  console.log('verified')
  
} catch (error) {
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