import Link from 'next/link';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Slide,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Layout from '../components/Layout';
import getCommerce from '../utils/commerce';

import { PrismaClient } from "@prisma/client";

import { useSelector, useDispatch } from 'react-redux';
import { cartRetrieveRequest, cartRetrieveSuccess, selectCart, setCart } from '../redux/slices/cart';
import { selectUser, userLogin, userLogout } from '../redux/slices/auth';
import {useAuth} from '../utils/auth'


function Home(props) {
  const { products } = props;

  const dispatch = useDispatch()
  const authSelector = useSelector(selectUser)

  const { signIn, isSignedIn, signOut, authToken} = useAuth();

  return (
    <Layout title="Home" commercePublicKey={props.commercePublicKey}>
<p>Velcome</p>   
 </Layout>
  );
}

export async function getStaticProps(ctx) {


  const commerce = getCommerce();
  const prisma = new PrismaClient();







  const { data: products } = await commerce.products.list();
  return {
    props: {
      products,

    },
  };
}

export default (Home)


