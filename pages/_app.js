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
import axios from 'axios';


function MyApp({ Component }) {
  const router = useRouter();
  const [user] = useUser();
  
  useEffect(() => {
    if (typeof window !== "undefined"){
      if(window.ethereum.selectedAddress){
        axios.post('/api/user/checkmail',{email: window.ethereum.selectedAddress})
        .then((res)=>{
        if(res.status==200){
          router.push('/profile/register/personal')
        }
        })
        .catch((err)=>{
          console.log(err)
            if(err.response.status==403){
            }
        })
      }
    }
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
