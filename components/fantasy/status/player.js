import React, { useEffect, useState } from 'react';
import {Grid} from '@material-ui/core';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import {useDispatch, useSelector, connect} from 'react-redux';
import Axios from 'axios';


const playerArrange = (a,b) =>{
    if (a.total_points === b.total_points) {
      return 0;
  }
  else {
      return (a.total_points > b.total_points) ? -1 : 1;
  }
  }

function Player(){
    const dispatch = useDispatch();
    const playerData = useSelector(state=>state.playerList);
    const [flag, setFlag] = useState(true);
    const [currentList, setCurrentList] = useState(playerData.playerList);

    useEffect(()=>{
        if(flag){
            setFlag(false)
            Axios.post("/api/fantasy/bootstrap-api")
            .then((res)=>{
                var temp1 = [];
                var temp2 = [];
                var temp3 = [];
                var temp4 = [];
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
                var totalApi = {
                    goalKeepers:temp1.sort(playerArrange),
                    defenders:temp2.sort(playerArrange),
                    midFielders:temp3.sort(playerArrange),
                    forwarders: temp4.sort(playerArrange)
                }
                dispatch({type: "SET_PLAYERLIST", payload: totalApi})

                setCurrentList({
                    goalKeepers:temp1.sort(playerArrange),
                    defenders:temp2.sort(playerArrange),
                    midFielders:temp3.sort(playerArrange),
                    forwarders: temp4.sort(playerArrange)
                })
            })
        }
    })
    return(
        <div className = "p-2">
            <div className = "x-font12">
                Player Availability
            </div>
            <Grid container className = "x-player-keeper-top x-font10">
                <Grid item xs = {1} sm = {1} md = {2}></Grid>
                <Grid item xs = {4} sm = {4} md = {3}>
                    Pos
                </Grid>
                <Grid item xs = {3} sm = {3} md = {3}>
                    Player
                </Grid>
                <Grid item xs = {2} sm = {2} md = {2}>
                    Club
                </Grid>
                <Grid item xs = {2} sm = {2} md = {2}>
                    Pts
                </Grid>
            </Grid>
            {currentList.goalKeepers.slice(0,4).concat(currentList.defenders.slice(0,4),currentList.midFielders.slice(0,4),currentList.forwarders.slice(0,4)).map((el)=>(
                <Grid container className = "x-player-list-item x-font5">
                    <Grid item xs = {1} sm = {1} md = {2} className = "text-center">
                        <LiveHelpIcon style = {{width: "40px", height: "40px"}}/>
                    </Grid>
                    <Grid item xs = {2} sm = {2} md = {2} className = "mt-2">
                        {el.element_type==1? "GKP":el.element_type==2?"DEF":el.element_type==3?"MID":"FWD"}
                    </Grid>
                    <Grid item xs = {2} sm = {2} md = {1} className = "pr-1 mt-1 text-center">
                        <img src = {`/img/shirts/${el.team}/keeper.png`} alt = "player" width = "20px"/>
                    </Grid>
                    <Grid item xs = {3} sm = {3} md = {3} className = "mt-2">
                        {el.second_name}
                    </Grid>
                    <Grid item xs = {2} sm = {2} md = {2} className = "mt-2">
                        {el.team==1? "ARS"
                        :el.team==2?"AVL"
                        :el.team==3?"BRI"
                        :el.team==4?"BUR"
                        :el.team==5?"CHE"
                        :el.team==6?"CRY"
                        :el.team==7?"EVE"
                        :el.team==8?"FUL"
                        :el.team==9?"LEE"
                        :el.team==10?"LEI"
                        :el.team==11?"LIV"
                        :el.team==12?"MCI"
                        :el.team==13?"MUN"
                        :el.team==14?"NEW"
                        :el.team==15?"SOU"
                        :el.team==16?"SHU"
                        :el.team==17?"TOT"
                        :el.team==18?"WBA"
                        :el.team==19?"WHU"
                        :"WOL"
                        }
                    </Grid>
                    <Grid item xs = {2} sm = {2} md = {2} className = "mt-2">
                        {el.total_points}
                    </Grid>
                </Grid>
            ))}
        </div>
    )
}

export default Player;