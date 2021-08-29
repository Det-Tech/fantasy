import React, { useState } from 'react';
import TopHead from '../../../components/fantasy/head';
import leagueContract from '../../../lib/abi/league';
import {ethers} from 'ethers';
import { CollectionsOutlined } from '@material-ui/icons';

function Join(){
    const [leagueKey, setLeagueKey] = useState("");
    const handleInput = (e) =>{
        setLeagueKey(e.target.value);
    }
    const handleJoin = async () =>{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(leagueContract.kovan, leagueContract.abi,signer);
        const tx = await contract.Join(leagueKey).catch((err)=>console.log(err));
        console.log(tx);
    }
    return(
        <div>
            <TopHead />
            <div className = "x-Grid3 mt-5">
                <div className = "x-font3 mb-4">
                    Join invitational league and cup
                </div>
                <div className = "x-font4">
                    League Code
                </div>
                <div className = "mt-1 mb-5">
                    <input type = "text" className = "x-league-create-input" onChange = {handleInput}/>
                </div>
                <div className = "text-center">
                    <button className = "x-button8" onClick = {handleJoin}>Join to League</button>
                </div>
            </div>
        </div>
    )
}

export default Join;