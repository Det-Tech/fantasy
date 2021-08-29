import React, {createContext, useEffect, useState} from 'react';
import {ethers} from "ethers";
import leagueContract from '../lib/abi/league';

export const LeagueContext = React.createContext();

export default function({children}){
    const [leagueData, setLeagueData] = useState();

    const value = React.useMemo(() => ({
        leagueData
      }), [leagueData]);

    useEffect(()=>{
        const getLeague = async () =>{
                const provider =new ethers.providers.Web3Provider(window.ethereum);
                const contract = new ethers.Contract(leagueContract.kovan, leagueContract.abi,provider);
                const tempId = await contract.id().catch((err)=>{
                    console.log(err);
                })
                console.log(tempId);
                const count = ethers.utils.formatUnits(tempId, 0);
                var tempLeague = [];
                for(var i = 0; i<count;i++){
                    const tx = await contract.leaguesById(i).catch((err)=>{
                        console.log(err);
                    })
                    tempLeague.push(tx);
                }
                setLeagueData(tempLeague);
        }
        if(typeof window !== "undefined"){
            if(window.ethereum){
                getLeague();
            }
        }
    },[])
    return(
        <LeagueContext.Provider value = {leagueData}>
            {children}
        </LeagueContext.Provider>
    )
} 