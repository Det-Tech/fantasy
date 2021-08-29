import React, { Fragment, useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import CssBaseline from '@material-ui/core/CssBaseline'
import Head from 'next/head'
import '../styles/globals.css'
import '../styles/bootstrap.min.css';
import "react-multi-carousel/lib/styles.css";
import Navigation from '../components/layout/nav';
import Footer from '../components/layout/footer';
import { Provider } from 'react-redux';
import store from '../store';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {ethers} from "ethers";
import 'react-dropdown-now/style.css';
import LeagueProvider from '../context/league';
import ProfileProvider from '../context/profile';
import ApiProvider from '../context/fantasyApi';
import profileContract from '../lib/abi/profile';


function MyApp({ Component }) {
  const router = useRouter();
  const [open, setOpen] = useState();
  const [chainId, setChainId] = useState("");

  useEffect(() => {
    const detectUser = async () =>{
      const provider =new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(profileContract.kovan,profileContract.abi,signer);
      const UserAddress=await signer.getAddress();
      console.log(UserAddress);
      var userdata = await contract.profiles(UserAddress).catch((err)=>console.log(err));
      if(userdata==""){
        router.push('/profile/personal')
      }
      else{
      }
    }
    if (typeof window !== "undefined"){
      if(window.ethereum){
        if(window.ethereum.selectedAddress!==null&&!open){
          detectUser();
        }
        else{
          router.push('/')
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

  useEffect(()=>{
    const detectChain = async ()=>{
      if (typeof window !== "undefined"){
        if (window.ethereum) {
          window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload();
          });
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setChainId(chainId);
        if(chainId==="0x2a")
        setOpen(false);
        else
        setOpen(true);
        }
      }
    }
      detectChain();
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
      {chainId==="0x2a"?
      <Provider store={store}>
        <ProfileProvider>
          <LeagueProvider>
            <ApiProvider>
              <CssBaseline />
              <Navigation/>
              <Component />
              <Footer />
            </ApiProvider>
          </LeagueProvider>
        </ProfileProvider>
      </Provider>
      :
      <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle id="alert-dialog-slide-title">{"chain error"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please set your chain to Kovan chain
          </DialogContentText>
        </DialogContent>
      </Dialog>
      }
    </Fragment>
  )
}

export default MyApp
