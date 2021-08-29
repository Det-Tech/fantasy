import React, {useState} from 'react';
import TopHead from '../../../components/fantasy/head';
import { Dropdown  } from 'react-dropdown-now';
import {ethers} from "ethers";
import leagueContract from '../../../lib/abi/league';
import fearnContract from '../../../lib/abi/fearn';
import {useRouter} from 'next/router';

function Create(){
    const router = useRouter();
    const [leagueName, setLeagueName] = useState("");
    const [startWeek, setStartWeek] = useState("Gameweek 1");
    const [endWeek, setEndWeek] = useState("Gameweek 2");
    const [amount, setAmount] = useState("");
    const weekList = [
        'Gameweek 1',
        'Gameweek 2',
        'Gameweek 3',
        'Gameweek 4',
        'Gameweek 5',
        'Gameweek 6',
        'Gameweek 7',
        'Gameweek 8',
        'Gameweek 9',
        'Gameweek 10',
        'Gameweek 11',
        'Gameweek 12',
        'Gameweek 13',
        'Gameweek 14',
        'Gameweek 15',
        'Gameweek 16',
        'Gameweek 17',
        'Gameweek 18',
        'Gameweek 19',
        'Gameweek 20',
        'Gameweek 21',
        'Gameweek 22',
        'Gameweek 23',
        'Gameweek 24',
        'Gameweek 25',
        'Gameweek 26',
        'Gameweek 27',
        'Gameweek 28',
        'Gameweek 29',
        'Gameweek 30',
        'Gameweek 31',
        'Gameweek 32',
        'Gameweek 33',
        'Gameweek 34',
        'Gameweek 35',
        'Gameweek 36',
        'Gameweek 37',
        'Gameweek 38',
    ]

    const handleCreate = async () =>{
        console.log(process.env.NEXT_PUBLIC_ADMINADDRESS)
        let randomKey = Math.random().toString(36).substring(2);
        const provider =new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(leagueContract.kovan,leagueContract.abi,signer);
        const tokenContract = new ethers.Contract(fearnContract.kovan, fearnContract.abi, signer);
        var tx = await tokenContract.transfer(process.env.NEXT_PUBLIC_ADMINADDRESS, amount);
        if(tx!=null){
            await tx.wait();
            var txPmt =await contract.create(randomKey,leagueName, startWeek, endWeek, amount);
            if(txPmt!==null){
                await txPmt.wait();
                router.push(`/fantasy/leagues/league-box/${randomKey}`)
            }
        }
    }

    return(
        <div>
            <TopHead />
            <div className = "x-Grid3 mt-5">
                <div className = "x-font3 mb-4">
                    Create Invitational League and Cup
                </div>
                <div className = "x-font4">
                    League name
                </div>
                <div className = "x-font4-short">
                    Maximum 30 characters
                </div>
                <div className = "mt-1">
                    <input type = "text" className = "x-league-create-input" onChange = {(e)=>setLeagueName(e.target.value)}/>
                </div>
                <div className = "x-font14 mb-5">
                    Please think carefully before entering your league name. Leagues with names that are deemed inappropriate or offensive may result in your account being deleted. Please refer to the Terms & Conditions of entry for more information.
                </div>
                <div className = "x-font4">
                    Scoring starts
                </div>
                <Dropdown
                    placeholder="Select an option"
                    options={weekList}
                    value={startWeek}
                    onSelect={(value) => setStartWeek(value.value)} // always fires once a selection happens even if there is no change
                    onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
                    onOpen={() => console.log('open!')}
                />
                <div className = "x-font14 mb-5">
                    In a league with classic scoring, teams are ranked based on their total points in the game. You can join or league a league with classic scoring at any point during the season.
                </div>
                <div className = "x-font4">
                    Scoring end
                </div>
                <Dropdown
                    placeholder="Select an option"
                    options={weekList}
                    value={endWeek}
                    onSelect={(value) => setEndWeek(value.value)} // always fires once a selection happens even if there is no change
                    onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
                    onOpen={() => console.log('open!')}
                />
                <div className = "x-font14 mb-3">
                    In a league with classic scoring, teams are ranked based on their total points in the game. You can join or league a league with classic scoring at any point during the season.
                </div>
                <div className = "x-font4">
                    bet amount
                </div>
                <div className = "mb-5">
                    <input type = "text" className = "x-league-create-input" onChange = {(e)=>setAmount(e.target.value)}/>
                </div>
                <div className = "text-center">
                    <button className = "x-button8" onClick = {handleCreate}>Create League</button>
                </div>
            </div>
        </div>
    )
}

export default Create;