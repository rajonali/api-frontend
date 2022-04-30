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



function Home(props) {
  const { products } = props;


  return (
    <Layout title="Home" commercePublicKey={props.commercePublicKey}>
<p>Velcome</p>   
 </Layout>
  );
}

export async function getStaticProps(ctx) {


  const commerce = getCommerce();
  const prisma = new PrismaClient();


  const profile = await prisma.card.findUnique({
    where: { email: "dlaskjL@kdlajskl.com" }
  });






  const { data: products } = await commerce.products.list();
  return {
    props: {
      products,

    },
  };
}

export default (Home)


