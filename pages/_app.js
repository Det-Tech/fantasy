import React, { Fragment, useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { useUser } from "../lib/hooks";
import CssBaseline from '@material-ui/core/CssBaseline'
import Head from 'next/head'
import '../styles/globals.css'
import '../styles/bootstrap.min.css';
import "react-multi-carousel/lib/styles.css";
import Navigation from '../components/layout/nav';
import Footer from '../components/layout/footer';
import { Provider } from 'react-redux';
import store from '../store';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {ethers} from "ethers";
import profileContract from '../lib/abi/profile';


function MyApp({ Component }) {
  const router = useRouter();
  const [user, { mutate }] = useUser();
  const [flag, setFlag] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    const detectChain = async ()=>{
      setFlag(false)
      if (typeof window !== "undefined"){
        if (window.ethereum) {
          window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload();
          });
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        console.log(chainId);
        if(chainId==="0x38")
        setOpen(false);
        else
        setOpen(true);
        }
      }
    }
    if(flag){
      detectChain();
    }
  })
  
  useEffect(async () => {
    const detectUser = async () =>{
      const provider =new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(profileContract.kovan,profileContract.abi,signer);
      const UserAddress=await signer.getAddress();
      console.log(UserAddress);
      var userdata = await contract.profiles(UserAddress).catch((err)=>console.log(err));
      mutate(userdata);
      if(userdata==""){
        router.push('/profile/personal')
      }
      else{
      }
    }
    if (typeof window !== "undefined"){
      if(window.ethereum){
        if(window.ethereum.selectedAddress!==null){
          detectUser();
        }
      }
      else{{
        alert("please install metamask!")
      }}
    }
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [])

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <Fragment>
      <Head>
        <title>Fantasy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
      {/* <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle id="alert-dialog-slide-title">{"chain error"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please set your chain to smart chain
          </DialogContentText>
        </DialogContent>
      </Dialog> */}
        <CssBaseline />
        <Navigation/>
        <Component auth = {user} />
        <Footer />
      </Provider>
    </Fragment>
  )
}

export default MyApp
