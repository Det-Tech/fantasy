import React, { useState, useEffect } from 'react';
import TopHead from '../../components/fantasy/head';
import {Grid} from '@material-ui/core';
import PickGround from '../../components/fantasy/ground/pickTeamGround';
import Fixture from '../../components/fantasy/fixtures/fixture';
import UserCard from '../../components/fantasy/pickTeam/userCard';
import RemoveDialog from '../../components/fantasy/pickTeam/removeDialog';
import AddDialog from '../../components/fantasy/pickTeam/addDialog';
import {useSelector, useDispatch} from 'react-redux';
import Axios from 'axios';
import { useUser } from "../../lib/hooks";
import { toast, ToastContainer } from 'react-nextjs-toast'

const playerArrange = (a,b) =>{
    if (a.total_points === b.total_points) {
      return 0;
  }
  else {
      return (a.total_points > b.total_points) ? -1 : 1;
  }
  }


function PickTeam(props){
    const [user, { mutate }] = useUser();
    const dispatch = useDispatch();
    const bootstrapApiStore = useSelector(state=>state.playerList);
    const [bootstrapApi, setBootstrapApi] = useState(bootstrapApiStore.bootstrapApi);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogOpen1, setDialogOpen1] = useState(false);
    const [selectedValue, setSelectedValue] = useState(false);
    const [id, setId] = useState();
    const [apiFlag, setApiFlag] = useState(true);
    const [totalPlayerApi, setTotalPlayerApi] = useState([]);

    const [totalList, setTotalList] = useState({
        goalKeepers:[],
        defenders:[],
        midFielders:[],
        forwarders:[]
    });


    const [main, setMain] = useState(
        user?
        user.main:
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
        user?
        user.candidate:
        [
            [false,"player", 0,0,0,0,0,0],
            [false,"player", 0,0,0,0,0,0],
            [false,"player", 0,0,0,0,0,0],
            [false,"player", 0,0,0,0,0,0]
        ]
        );

        useEffect(()=>{
            if(apiFlag){
                setApiFlag(false);
                Axios.post("/api/fantasy/bootstrap-api")
                .then((res)=>{
                    var temp1 = [];
                    var temp2 = [];
                    var temp3 = [];
                    var temp4 = [];
                    dispatch({type: "SET_FULL_BOOTSTRAP_API", payload: res.data})
                    setTotalPlayerApi(res.data.elements);
                    res.data.elements.map((el)=>{
                    if(el.element_type==1){
                        temp1.push(el);
                    }
                    if(el.element_type==2){
                        temp2.push(el);
                    }
                    if(el.element_type==3){
                        temp3.push(el);
                    }
                    if(el.element_type==4){
                        temp4.push(el);
                    }
                })
                setTotalList({
                    goalKeepers:temp1.sort(playerArrange),
                    defenders:temp2.sort(playerArrange),
                    midFielders:temp3.sort(playerArrange),
                    forwarders: temp4.sort(playerArrange)
                })
                })
            }
        })
  
      useEffect(()=>{
          console.log(user);
          if(user){
                setCandidate(user.candidate);
                setMain(user.main);
            }
      }, [user])

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
    const saveTeam = () =>{
        Axios({
            method: "POST",
            url: "/api/fantasy/team/update-team",
            data:{
                  id: user._id,
                  main:main,
                  candidate:candidate
            }
          })
          .then((res)=>{
            console.log(res.data);
            mutate(res.data);
            toast.notify('your team is saved successfully!', {
                duration: 5,
                type: "success"
              })
          }).catch((err)=>{
            toast.notify('Error!', {
                duration: 5,
                type: "error"
              })
          })
    }
    return(
        <div>
            <ToastContainer align={"center"} position={"bottom"}/>
            <TopHead />
            <div className = "diceGrid mt-3">
                <RemoveDialog open = {dialogOpen} onClose = {handleDialogClose} selectedValue = {selectedValue} handleRemove = {handleRemove} id = {id}/>
                <AddDialog open = {dialogOpen1} onClose = {handleDialogClose} selectedValue = {selectedValue} handleAdd = {handleAdd} id = {id}/>
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
                        <PickGround auth = {user} main = {main} candidate = {candidate} removePlayer = {removePlayer} addPlayer = {addPlayer} saveTeam = {saveTeam}/>
                        <div className = "mt-5">
                            <Fixture />
                        </div>
                    </Grid>
                    <Grid item xs = {12} sm = {12} md = {4}>
                        <UserCard auth = {user}/>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default PickTeam;