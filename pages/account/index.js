import React, { useContext, useReducer, useEffect, useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import { Store } from '../../redux/Store';
import { toast } from 'react-toastify';
import { getError } from '../../utils/getError';
import axios from 'axios';
import Layout from '../../components/Layout';
import getCommerce from '../../utils/commerce';


import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import {
    Box,
    Card,
    CardActionArea,
    List,
    ListItem,
    ListItemText,
    TextField,
    CardContent,
    CardMedia,
    Grid,
    Slide,
    Typography,
  } from '@material-ui/core';
  
import { Controller, useForm } from 'react-hook-form';
import Cookies from 'js-cookie';







ault function Account(props) {
    const { products } = props;

    const { state, dispatch } = useContext(Store);
    const {
      handleSubmit,
      control,
      formState: { errors },
      setValue,
    } = useForm();
    const router = useRouter();
    const { userInfo } = state;
  
    useEffect(() => {
      if (!userInfo) {
        //return router.push('/login');
        return;
      }
      setValue('name', userInfo.name);
      setValue('email', userInfo.email);
    }, []);
    const submitHandler = async ({ name, email, password, confirmPassword }) => {
      if (password !== confirmPassword) {
        return;
      }
      try {
        const { data } = await axios.put(
          '/api/users/profile',
          {
            name,
            email,
            password,
          },
          { headers: { authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: 'USER_LOGIN', payload: data });
        Cookies.set('userInfo', data);
  
      } catch (err) {
      }
    };


  return (
    <Layout title="Account" commercePublicKey={props.commercePublicKey}>
 <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <NextLink href="/profile" passHref>
                <ListItem selected button component="a">
                  <ListItemText primary="User Profile"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/order-history" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Order History"></ListItemText>
                </ListItem>
              </NextLink>
            </List>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  Profile
                </Typography>
              </ListItem>
              <ListItem>
                <form
                  onSubmit={handleSubmit(submitHandler)}
                >
                  <List>
                    <ListItem>
                        name
                    </ListItem>
                    <ListItem>
                        email
                    </ListItem>
                    <ListItem>
                      <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        color="primary"
                      >
                        Update
                      </Button>
                    </ListItem>
                  </List>
                </form>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>    </Layout>
  );
}

export async function getStaticProps(ctx) {
    const commerce = getCommerce();
    const { data: products } = await commerce.products.list();
    return {
      props: {
        products,
  
      },
    };
  }
  