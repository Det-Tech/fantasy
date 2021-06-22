import React, {useState,useEffect } from 'react';
import {DropdownButton, Dropdown} from 'react-bootstrap';
import { useUser } from "../../lib/hooks";
import {useRouter} from 'next/router';
import { toast, ToastContainer } from 'react-nextjs-toast';
import {ethers} from 'ethers';
import profileContract from '../../lib/abi/profile';

export default function Home() {
  const router = useRouter();
  const [isTeam, setIsTeam] = useState(false);
  const [imgHeight, setImgHeight] = useState();
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const setResponsiveness = () => {
      setImgHeight(window.innerWidth*267/1196);
      if(window.innerWidth<=800)
      setMobile(true);
      else
      setMobile(false);
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  useEffect(()=>{
    const handleCheckTeam = async () =>{
      const provider =new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(profileContract.kovan,profileContract.abi,signer);
      const UserAddress=await signer.getAddress();
      console.log(UserAddress);
      var userdata = await contract.profiles(UserAddress).catch((err)=>console.log(err));
      const userObj = JSON.parse(userdata);
      if(userObj.players){
        setIsTeam(true);
      }
      else{
        setIsTeam(false);
      }

    }
    handleCheckTeam();
  })

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
          {!isTeam?
          (
            <div>
              <div className = "x-top-fantasy-mobile">
              <button className = "x-top-fantasy-button" onClick = {()=>router.push("/")}>Home</button>
                <button className = "x-top-fantasy-button" onClick = {()=>router.push("/fantasy/transfers")}>Transfers</button>
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
