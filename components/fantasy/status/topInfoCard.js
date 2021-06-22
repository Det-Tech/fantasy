import React from 'react';
import {Grid, Hidden} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {useRouter} from 'next/router';

function TopInfoCard(){
    const router = useRouter();
    return(
        <div className = "x-logout-home-top-info">
            <Grid container>
                <Grid item xs ={12} sm = {6} md = {6}>
                    <div className = "x-font11">Gameweek 38</div>
                    <div><button className = "x-button3" style = {{backgroundColor: "#37003c", fontFamily: "initial"}} onClick = {()=>router.push("/fantasy/pick-team")}>My Team <ArrowForwardIcon/></button></div>
                    <div className = "x-font11">prizes</div>
                </Grid>
                <Grid item xs ={12} sm = {6} md = {6} className = "text-center">
                    <img src = "/img/headMan.png" width = "100%"/>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs = {6} sm = {4} md = {2} className = "x-logout-home-top-info1">
                    <div className = "x-font13">Hightest Points</div>
                    <div className = "x-font11">126</div>
                </Grid>
                <Grid item xs = {6} sm = {4} md = {2} className = "x-logout-home-top-info1">
                    <div className = "x-font13">Average Points</div>
                    <div className = "x-font11">49</div>
                </Grid>
                <Grid item xs = {6} sm = {4} md = {2} className = "x-logout-home-top-info1">
                    <div className = "x-font13">Transfers Made</div>
                    <div className = "x-font11">6,085,186</div>
                </Grid>
                <Grid item xs = {6} sm = {4} md = {2} className = "x-logout-home-top-info1">
                    <div className = "x-font13">Most Transferred In</div>
                    <div className = "x-font11">Bamford</div>
                </Grid>
                <Grid item xs = {6} sm = {4} md = {2} className = "x-logout-home-top-info1">
                    <div className = "x-font13">Wildcards Played</div>
                    <div className = "x-font11">79,495</div>
                </Grid>
                <Grid item xs = {6} sm = {4} md = {2} className = "x-logout-home-top-info1">
                    <div className = "x-font13">Most Captained</div>
                    <div className = "x-font11">Salah</div>
                </Grid>
                
            </Grid>
        </div>
    )
}

export default TopInfoCard;