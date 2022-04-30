import React, { useContext, useEffect } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Link,
  Container,
  Box,
  Typography,
  CircularProgress,
  Badge,
} from '@material-ui/core';
import { theme, useStyles } from '../utils/styles';
import Head from 'next/head';
import NextLink from 'next/link';
import { Store } from '../redux/Store';
import getCommerce from '../utils/commerce';


import { cartRetrieveRequest, cartRetrieveSuccess, selectCart } from '../redux/slices/cart';
import { useSelector, useDispatch } from 'react-redux';

export default function Layout({
  children,
  commercePublicKey,
  title = 'EMS',
}) {
  const classes = useStyles();

  const cartSelector = useSelector(selectCart)
  const dispatch = useDispatch()
  
  useEffect(() => {

    const fetchCart = async () => {
      
      const commerce = getCommerce(commercePublicKey);
      dispatch(cartRetrieveRequest());
      const cartData = await commerce.cart.retrieve();
      dispatch(cartRetrieveSuccess(cartData));
      
      // TODO save cart data to local db 

    };


    const fetchUser = async () => {
      // TODO get user data hook from useAuth context (auth.js)
      // dispatch auth request and auth retrieve success

    }

    fetchCart();
    //fetchUser();
    
  }, []);

  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <title>{`${title} - Coolshop`}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="static"
          color="default"
          elevation={0}
          className={classes.appBar}
        >
          <Toolbar style={{display:'flex', flex:1, justifyContent:'space-evenly', alignItems:'center'}}>
            <NextLink href="/">
              <Link
                variant="h6"
                color="inherit"
                noWrap
                href="/"
                className={classes.toolbarTitle}
              >
                Express Mobile Solutions
              </Link>
              
            </NextLink>
            <NextLink href="/products">
            <Link href="/products">
              Products
              </Link>
            </NextLink>
            
            <NextLink href="/account">
            <Link href="/account">
              My Account
              </Link>
            </NextLink>
            <div>
            <p>
            </p>
            </div>
            <nav>
              <NextLink href="/cart">
                <Link
                  variant="button"
                  color="textPrimary"
                  href="/cart"
                  className={classes.link}
                >
                  {cartSelector.total_items ? (
                    <CircularProgress />
                  ) : cartSelector.total_items > 0 ? (
                    <Badge badgeContent={cartSelector.total_items} color="primary">
                      Cart
                    </Badge>
                  ) : (
                    'Cart'
                  )}
                </Link>
              </NextLink>
            </nav>
          </Toolbar>
        </AppBar>
        <Container component="main" className={classes.main}>


          {children}

        </Container>
        <Container maxWidth="md" component="footer">
          <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
              {'© '}
              Express Mobile Solutions 2022
              {'.'}
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
