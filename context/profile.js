import React, {useEffect, useState} from 'react';
import {ethers} from "ethers";
import profileContract from '../lib/abi/profile';

export const ProfileContext = React.createContext();

export default function({children}){
    const [profileData, setProfileData] = useState();
    const [playerData, setPlayerData] = useState();

    const value = React.useMemo(() => ({
        profileData, playerData
      }), [profileData, playerData]);

    useEffect(()=>{
        const getProfile = async () =>{
            if(window.ethereum.selectedAddress!==null){
                const provider =new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(profileContract.kovan, profileContract.abi,signer);
                const myProfile = await contract.profiles(window.ethereum.selectedAddress).catch((err)=>{
                    console.log(err);
                })
                const myPlayers = await contract.getPlayersHistory(window.ethereum.selectedAddress).catch((err)=>{
                    console.log(err);
                })
                console.log("wowowwoo", myPlayers);
                setProfileData(myProfile);
                setPlayerData(myPlayers);
            }
        }
        if(typeof window !== "undefined"){
            if(window.ethereum)
            getProfile();
        }
    },[])
    return(
        <ProfileContext.Provider value = {value}>
            {children}
        </ProfileContext.Provider>
    )
} 