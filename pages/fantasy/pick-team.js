import React from 'react';
import TopHead from '../../components/fantasy/head';
import {Grid} from '@material-ui/core';
import PickGround from '../../components/fantasy/ground/pickTeamGround';
import Fixture from '../../components/fantasy/fixtures/fixture';
import UserCard from '../../components/fantasy/pickTeam/userCard';


function PickTeam(props){
    const {auth} = props;
    return(
        <div>
            <TopHead />
            <div className = "diceGrid mt-3">
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
                        <PickGround auth = {auth}/>
                        <div className = "mt-5">
                            <Fixture />
                        </div>
                    </Grid>
                    <Grid item xs = {12} sm = {12} md = {4}>
                        <UserCard />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default PickTeam;