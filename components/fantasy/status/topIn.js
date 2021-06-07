import React from 'react';
import {Grid} from '@material-ui/core';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';

function TopIn(){
    return(
        <div>
            <Grid container className = "x-player-midfielder-top x-font8">
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
            <Grid container className = "x-player-list-item x-font5">
                    <Grid item xs = {1} sm = {1} md = {2} className = "text-center">
                        <LiveHelpIcon style = {{width: "40px", height: "40px"}}/>
                    </Grid>
                    <Grid item xs = {2} sm = {2} md = {2} className = "mt-2">
                        GKP
                    </Grid>
                    <Grid item xs = {2} sm = {2} md = {1} className = "pr-1 mt-1 text-center">
                        <img src = {`/img/shirts/1/keeper.png`} alt = "player" width = "20px"/>
                    </Grid>
                    <Grid item xs = {3} sm = {3} md = {3} className = "mt-2">
                        Ederson
                    </Grid>
                    <Grid item xs = {2} sm = {2} md = {2} className = "mt-2">
                        MCI
                    </Grid>
                    <Grid item xs = {2} sm = {2} md = {2} className = "mt-2">
                        12
                    </Grid>
            </Grid>
        </div>
    )
}

export default TopIn;