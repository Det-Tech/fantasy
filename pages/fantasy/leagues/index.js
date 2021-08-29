import React, {useState, useEffect, useContext} from 'react';
import {Grid} from '@material-ui/core';
import TopHead from '../../../components/fantasy/head';
import {useRouter} from 'next/router';
import LeagueList from '../../../components/league/table';
import {ApiContext} from '../../../context/fantasyApi';

function Leagues(){
    const apiData = useContext(ApiContext);
    const router = useRouter();
    const [alive, setAlive] = useState(false);
    return(
        <div>
            <TopHead />
            <div className = "x-Grid5">
                <Grid container spacing = {3}>
                    <Grid item xs = {12} sm = {12} md = {6}>
                        <button className = "x-league-button" onClick = {()=>router.push("/fantasy/leagues/create")}>Create new League</button>
                    </Grid>
                    <Grid item xs = {12} sm = {12} md = {6}>
                        <button className = "x-league-button" onClick = {()=>router.push("/fantasy/leagues/join")}>Join to existing League</button>
                    </Grid>
                </Grid>
                <Grid container spacing = {3}>
                    <Grid item xs = {12} sm = {12} md = {12} className = "text-center mt-5">
                        <button className = "x-league-swap-button1" onClick = {()=>setAlive(true)} style = {alive?{backgroundColor: "#fc4934"}:null}>Available league</button>
                        <button className = "x-league-swap-button2" onClick = {()=>setAlive(false)} style = {!alive?{backgroundColor: "#fc4934"}:null}>my league</button>
                    </Grid>
                </Grid>
                <div className = "mt-5">
                    <LeagueList events = {apiData && apiData.apiData && apiData.apiData.events} alive = {alive}/>
                </div>
            </div>
        </div>
    )
}

export default Leagues;