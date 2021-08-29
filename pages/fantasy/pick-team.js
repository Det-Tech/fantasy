import React, { useState, useEffect, useContext } from 'react';
import TopHead from '../../components/fantasy/head';
import {Grid} from '@material-ui/core';
import PickGround from '../../components/fantasy/ground/pickTeamGround';
import Fixture from '../../components/fantasy/fixtures/fixture';
import UserCard from '../../components/fantasy/pickTeam/userCard';
import RemoveDialog from '../../components/fantasy/pickTeam/removeDialog';
import AddDialog from '../../components/fantasy/pickTeam/addDialog';
import { toast, ToastContainer } from 'react-nextjs-toast';
import {ethers} from 'ethers';
import profileContract from '../../lib/abi/profile';
import { ProfileContext } from '../../context/profile';


function PickTeam(){
    const profileData = useContext(ProfileContext);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogOpen1, setDialogOpen1] = useState(false);
    const [id, setId] = useState();


    const [main, setMain] = useState(
        [
          [false,"player", 0,0,0,0,0,0],
          [false,"player", 0,0,0,0,0,0],
          [false,"player", 0,0,0,0,0,0],
          [false,"player", 0,0,0,0,0,0],
          [false,"player", 0,0,0,0,0,0],
          [false,"player", 0,0,0,0,0,0],
          [false,"player", 0,0,0,0,0,0],
          [false,"player", 0,0,0,0,0,0],
          [false,"player", 0,0,0,0,0,0],
          [false,"player", 0,0,0,0,0,0],
          [false,"player", 0,0,0,0,0,0]
        ]
        );

    const [candidate, setCandidate] = useState(
        [
            [false,"player", 0,0,0,0,0,0],
            [false,"player", 0,0,0,0,0,0],
            [false,"player", 0,0,0,0,0,0],
            [false,"player", 0,0,0,0,0,0]
        ]
        );

    useEffect(()=>{
        if(profileData.playerData!==undefined){
            const data = profileData.playerData;
            const dataLength = data.length;
            const JsonProfile = JSON.parse(profileData.playerData[dataLength-1]);
            setMain(JsonProfile.main);
            setCandidate(JsonProfile.candidate);
        }
    },[profileData])

    const removePlayer = (event,v) =>{
        setDialogOpen(true);
        setId(v);
      }
    const addPlayer = (event,v) =>{
        setDialogOpen1(true);
        setId(v);
    }

    const handleDialogClose = () => {
    setDialogOpen(false);
    setDialogOpen1(false);
    };

    const handleAdd = (e, id,bool) =>{
        let tempMain = [...main];
        let tempCandidate = [...candidate];
        if(id==0){
            let temp = tempCandidate[id]
            tempCandidate[id] = tempMain[0];
            tempMain[0] = temp;
        }
        if(id==1){
            let temp = tempCandidate[id]
            tempCandidate[id] = tempMain[4];
            tempMain[4] = temp;
        }
        if(id==2){
            let temp = tempCandidate[id]
            tempCandidate[id] = tempMain[8];
            tempMain[8] = temp;
        }
        if(id==3){
            let temp = tempCandidate[id]
            tempCandidate[id] = tempMain[10];
            tempMain[10] = temp;
        }
        setMain(tempMain);
        setCandidate(tempCandidate);
        setDialogOpen1(false);
    }

    const handleRemove = (e,id,bool) =>{
        let tempMain = [...main];
        let tempCandidate = [...candidate];
        if(id==0){
            console.log("yes")
            let temp = tempMain[id]
            tempMain[id] = tempCandidate[0];
            tempCandidate[0] = temp;
        }
        else if(id<5){
            let temp = tempMain[id]
            tempMain[id] = tempCandidate[1];
            tempCandidate[1] = temp;
        }
        else if(id<9){
            let temp = tempMain[id]
            tempMain[id] = tempCandidate[2];
            tempCandidate[2] = temp;
        }
        else {
            let temp = tempMain[id]
            tempMain[id] = tempCandidate[3];
            tempCandidate[3] = temp;
        }
        setMain(tempMain);
        setCandidate(tempCandidate);
        setDialogOpen(false);
    }
    const saveTeam = async () =>{
        const provider =new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(profileContract.kovan,profileContract.abi,signer);
        const updateInfo = {
            main : main,
            candidate : candidate
        }
        var tx =await contract.updatePlayers(JSON.stringify(updateInfo));
        if(tx!=null){
            console.log(tx);
            await provider.waitForTransaction(tx.hash)
                    .catch((err)=>{
                        toast.notify('Error!', {
                            duration: 5,
                            type: "error"
                          })
                    });
            toast.notify('your team is saved successfully!', {
                    duration: 5,
                    type: "success"
                })
        }
    }
    return(
        <div>
            <ToastContainer align={"center"} position={"bottom"}/>
            <TopHead />
            <div className = "diceGrid mt-3">
                <RemoveDialog open = {dialogOpen} onClose = {handleDialogClose} handleRemove = {handleRemove} id = {id}/>
                <AddDialog open = {dialogOpen1} onClose = {handleDialogClose} handleAdd = {handleAdd} id = {id}/>
                <div className = "x-font3">
                    Pick Team - 
                </div>
                <Grid container spacing = {3}>
                    <Grid item xs = {12} sm = {12} md = {8}>
                        <div className = "x-transfer-top-time mb-3">
                            <span className = "x-font8">Gameweek 38 </span>
                            <span className = "x-font9">Sun 23 May 16:30</span>
                        </div>
                        <div className = "x-pickTeam-top-alert x-font4 text-center">
                            To change your captain use the menu which appears when clicking on a player
                        </div>
                        <PickGround main = {main} candidate = {candidate} removePlayer = {removePlayer} addPlayer = {addPlayer} saveTeam = {saveTeam}/>
                        <div className = "mt-5">
                            <Fixture />
                        </div>
                    </Grid>
                    <Grid item xs = {12} sm = {12} md = {4}>
                        <UserCard/>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default PickTeam;