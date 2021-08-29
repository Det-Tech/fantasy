import React, {useState,useEffect, useContext } from 'react';
import {DropdownButton, Dropdown} from 'react-bootstrap';
import {useRouter} from 'next/router';
import { toast, ToastContainer } from 'react-nextjs-toast';
import  {ProfileContext} from '../../context/profile';

export default function Home() {
  const {playerData} = useContext(ProfileContext);
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
      const jsonProfile = JSON.parse(playerData);
      if(jsonProfile.main){
        setIsTeam(true);
      }
      else{
        setIsTeam(false);
      }
    }
    if (typeof window !== "undefined"){
      if (window.ethereum&&window.ethereum.selectedAddress!==null) {
        handleCheckTeam();
      }
    }
  },[playerData])

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
                <button className = "x-top-fantasy-button" onClick = {()=>router.push("/fantasy/pick-team")}>Pick Team</button>
                <DropdownButton className = "x-top-fantasy-more-button" title="More">
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
              </div>
            </div>
          )
        }
      </div>
  )
}
