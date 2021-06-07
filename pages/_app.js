import React, { Fragment, useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router';
import { useUser } from "../lib/hooks";
import CssBaseline from '@material-ui/core/CssBaseline'
import Head from 'next/head'
import '../styles/globals.css'
import '../styles/bootstrap.min.css';
import "react-multi-carousel/lib/styles.css";
import Navigation from '../components/layout/nav';
import { Provider } from 'react-redux';
import store from '../store';
import Axios from 'axios';


function MyApp({ Component }) {
  const [user] = useUser();
  
  useEffect(() => {
    console.log(user)
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [])
  return (
    <Fragment>
      <Head>
        <title>Fantasy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <CssBaseline />
        <Navigation/>
        <Component auth = {user} />
      </Provider>
    </Fragment>
  )
}

export default MyApp
