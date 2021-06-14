import React from 'react';
import {Grid} from '@material-ui/core';

function League(){
    return(
        <div className = "p-2">
            <div className = "x-font12">
                Best Leagues
            </div>
            <Grid container className = "x-for-list-top x-font8">
                <Grid item xs = {1} sm = {1} md = {1}></Grid>
                <Grid item xs = {2} sm = {2} md = {1}>
                    Pos
                </Grid>
                <Grid item xs = {6} sm = {7} md = {8}>
                    Team
                </Grid>
                <Grid item xs = {3} sm = {2} md = {2}>
                    Average
                </Grid>
            </Grid>
            <Grid container className = "x-player-list-item x-font5">
                    <Grid item xs = {1} sm = {1} md = {1}></Grid>
                    <Grid item xs = {2} sm = {2} md = {1} className = "mt-2">
                        1
                    </Grid>
                    <Grid item xs = {6} sm = {7} md = {8} className = "mt-2" style = {{color: "red"}}>
                        Fantasy Football Scout
                    </Grid>
                    <Grid item xs = {3} sm = {2} md = {2} className = "mt-2">
                        2628.2
                    </Grid>
            </Grid>
        </div>
    )
}

export default League;