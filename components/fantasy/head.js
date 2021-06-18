import React, {useState,useEffect } from 'react';
import {DropdownButton, Dropdown} from 'react-bootstrap';
import { useUser } from "../../lib/hooks";
import {useRouter} from 'next/router';
import { toast, ToastContainer } from 'react-nextjs-toast';
import axios from 'axios';

export default function Home() {
  const router = useRouter();
  const [user, { mutate }] = useUser();
  const [imgHeight, setImgHeight] = useState();
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const setResponsiveness = () => {
      setImgHeight(window.innerWidth*324/1196);
      if(window.innerWidth<=800)
      setMobile(true);
      else
      setMobile(false);
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const connectWallet = () =>{
    if (typeof window !== "undefined") {
      try {
        window.ethereum.enable().then(async()=> {
          const body = {
            email: window.ethereum.selectedAddress
        };
        axios
            .post("/api/user/login", body)
            .then(async res => {
                console.log(res.data)
            if(res.status=="201"){
                const userObj = await res.data;
                mutate(userObj);
                router.push('/');
            }
            })
            .catch((err)=>{
                console.log(err);
                dispatch({
                type: GET_ERRORS,
                payload: err.response
                })
            })
          // User has allowed account access to DApp...
        });
      } catch (e) {
        // User has denied account access to DApp...
      }
    }
  }

  const handleLogout = async () => {
    await fetch('/api/user/auth', {
        method: 'DELETE',
    });
    // set the user state to null
    mutate(null);
};
  return (
      <div className = "x-top-img" style = {{height: `${imgHeight}px`}}>
        <ToastContainer align={"center"} position={"bottom"}/>
        <div className = "x-top-title" style = {mobile?{fontSize: "30px"}:{fontSize: "60px"}}>
            Fantasy
        </div>
        {!user?(
            <div>
              <div className = "x-top-fantasy-mobile" style = {!mobile?{display:"none"}:{display: "flex"}}>
                <button className = "x-top-fantasy-button">Home</button>
                <button className = "x-top-fantasy-button" onClick = {connectWallet}>Connect</button>
                <DropdownButton className = "x-top-fantasy-more-button" title="More">
                  {/* <Dropdown.Item href="#/action-3">Draft</Dropdown.Item> */}
                  <Dropdown.Item href="#/acti">Statistics</Dropdown.Item>
                </DropdownButton>
              </div>
              <div className = "x-top-fantasy" style = {mobile?{display:"none"}:{display: "block"}}>
                <button className = "x-top-fantasy-button">Home</button>
                <button className = "x-top-fantasy-button">Statistics</button>
                {/* <button className = "x-top-fantasy-button">Draft</button> */}
                <button className = "x-top-fantasy-button" onClick = {connectWallet}>{typeof window !== "undefined"?`${window.ethereum.selectedAddress.slice(0,6)}...`:"Connect"}</button>
              </div>
            </div>
          ):Object.keys(user.transfered).length === 0?
          (
            <div>
              <div className = "x-top-fantasy-mobile">
              <button className = "x-top-fantasy-button" onClick = {()=>router.push("/")}>Home</button>
                <button className = "x-top-fantasy-button" onClick = {()=>router.push("/fantasy/transfers")}>Transfers</button>
                <button className = "x-top-fantasy-button" onClick = {handleLogout}>Log out</button>
              </div>
            </div>
          ):
          (
            <div>
              <div className = "x-top-fantasy-mobile" style = {!mobile?{display:"none"}:{display: "flex"}}>
                <button className = "x-top-fantasy-button" onClick = {()=>router.push("/")}>Home</button>
                <button className = "x-top-fantasy-button" onClick = {handleLogout}>Log out</button>
                <DropdownButton className = "x-top-fantasy-more-button" title="More">
                  <Dropdown.Item href="/fantasy/pick-team">Pick Team</Dropdown.Item>
                  <Dropdown.Item href="/fantasy/transfers">Transfers</Dropdown.Item>
                  <Dropdown.Item href="/fantasy/leagues">Leagues</Dropdown.Item>
                  <Dropdown.Item href="/fantasy/fixtures">Fixtures</Dropdown.Item>
                  <Dropdown.Item href="/fantasy/stats">Stats</Dropdown.Item>
                  {/* <Dropdown.Item href="/draft">Draft</Dropdown.Item> */}
                </DropdownButton>
              </div>
              <div className = "x-top-fantasy" style = {mobile?{display:"none"}:{display: "block"}}>
                <button className = "x-top-fantasy-button" onClick = {()=>router.push("/")}>Home</button>
                <button className = "x-top-fantasy-button" onClick = {()=>router.push("/fantasy/pick-team")}>Pick Team</button>
                <button className = "x-top-fantasy-button" onClick = {()=>router.push("/fantasy/transfers")}>Transfers</button>
                <button className = "x-top-fantasy-button" onClick = {()=>router.push("/fantasy/leagues")}v>Leagues</button>
                <button className = "x-top-fantasy-button" onClick = {()=>router.push("/fantasy/fixtures")}>Fixtures</button>
                <button className = "x-top-fantasy-button" onClick = {()=>router.push("/fantasy/stats")}>Stats</button>
                {/* <button className = "x-top-fantasy-button" onClick = {()=>router.push("/draft")}>Draft</button> */}
                <button className = "x-top-fantasy-button" onClick = {handleLogout}>Log out</button>
              </div>
            </div>
          )
        }
      </div>
  )
}
