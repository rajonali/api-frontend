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
import { getSession } from "next-auth/react"

import { PrismaClient } from "@prisma/client";



function Home(props) {
  const { products } = props;

  console.log (products);
  return (
    <Layout title="Home" commercePublicKey={props.commercePublicKey}>
<p>Velcome</p>   
 </Layout>
  );
}

export async function getStaticProps(ctx) {
  const commerce = getCommerce();
  const prisma = new PrismaClient();
  console.log("dsa");

  const profile = await prisma.card.findUnique({
    where: { email: "dlaskjL@kdlajskl.com" }
  });


  const session = await getSession(ctx);




  const { data: products } = await commerce.products.list();
  return {
    props: {
      products,
      session: await getSession(ctx)

    },
  };
}

export default (Home)


