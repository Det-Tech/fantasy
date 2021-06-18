import React, {useState, useEffect} from 'react';
import {IconButton, Grid, InputBase, responsiveFontSizes} from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import InfoIcon from '@material-ui/icons/Info';
import Axios from 'axios';

function TransferGround(props){
    const {auth} = props;
    const {removePlayer,addPlayer, main, candidate, saveTeam} = props;
    const [apiFlag, setApiFlag] = useState(true);
    const [groundView, setGroundView] = useState("pitch");
    const [mobile, setMobile] = useState(false);
    const [imgHeight, setImgHeight] = useState();
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        const setResponsiveness = () => {
          setImgHeight(window.innerWidth*405/750);
          if(window.innerWidth<=960)
          setMobile(true);
          else
          setMobile(false);
        };
    
        setResponsiveness();
    
        window.addEventListener("resize", () => setResponsiveness());
      }, []);

    return(
        <div>
            <div className = "x-transfer-player-ground">
                {/* <div className = "x-transfer-player-ground-top-button">
                    <button className = "x-button5" style = {groundView=="pitch"?{backgroundColor: "white", color: "#2f2f2f"}:null} onClick = {handlePitchView}>Pitch View</button>
                    <button className = "x-button5" style = {groundView=="list"?{backgroundColor: "white", color: "#2f2f2f"}:null} onClick = {handleListView}>List View</button>
                </div> */}
                <Grid container className = "x-ground-img" style = {mobile?{height: `${imgHeight}px`}:{height:`${imgHeight-220}px`, paddingTop: "10%"}}>
                    <Grid item xs = {4} sm = {4} md = {4}></Grid>
                    <Grid item xs = {4} sm = {4} md = {4}>
                        {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,0,!totalInfo[0][0],totalInfo[0][6])}>
                            <CancelIcon />
                        </IconButton> */}
                        <img src={`/img/shirts/${main[0][7]}/keeper.png`} className = "x-player-body" width = {mobile?`${imgHeight/11}`:"40px"}   onClick = {(e)=>removePlayer(e,0,true)}/>
                        {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                            <InfoIcon />
                        </IconButton> */}
                        <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {main[0][1]}
                        </div>
                        <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {main[0][3]}
                        </div>
                    </Grid>
                    <Grid item xs = {4} sm = {4} md = {4}></Grid>
                    <Grid item xs = {3} sm = {3} md = {3}>
                        {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,1,!totalInfo[1][0],totalInfo[1][6])}>
                            <CancelIcon />
                        </IconButton> */}
                        <img src={`/img/shirts/${main[1][7]}/other.png`} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>removePlayer(e,1)}/>
                        {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                            <InfoIcon />
                        </IconButton> */}
                        <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {main[1][1]}
                        </div>
                        <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {main[1][3]}
                        </div>
                    </Grid>
                    <Grid item xs = {3} sm = {3} md = {3}>
                        {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,2,!totalInfo[2][0],totalInfo[2][6])}>
                            <CancelIcon />
                        </IconButton> */}
                        <img src={`/img/shirts/${main[2][7]}/other.png`} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>removePlayer(e,2)}/>
                        {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                            <InfoIcon />
                        </IconButton> */}
                        <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {main[2][1]}
                        </div>
                        <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {main[2][3]}
                        </div>
                    </Grid>
                    <Grid item xs = {3} sm = {3} md = {3}>
                        {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,4,!totalInfo[4][0],totalInfo[4][6])}>
                            <CancelIcon />
                        </IconButton> */}
                        <img src={`/img/shirts/${main[3][7]}/other.png`} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>removePlayer(e,3)}/>
                        {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                            <InfoIcon />
                        </IconButton> */}
                        <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {main[3][1]}
                        </div>
                        <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {main[3][3]}
                        </div>
                    </Grid>
                    <Grid item xs = {3} sm = {3} md = {3}>
                        {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,5,!totalInfo[5][0],totalInfo[5][6])}>
                            <CancelIcon />
                        </IconButton> */}
                        <img src={`/img/shirts/${main[4][7]}/other.png`} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>removePlayer(e,4)}/>
                        {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                            <InfoIcon />
                        </IconButton> */}
                        <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {main[4][1]}
                        </div>
                        <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {main[4][3]}
                        </div>
                    </Grid>
                    <Grid item xs = {3} sm = {3} md = {3}>
                        {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,7,!totalInfo[7][0],totalInfo[7][6])}>
                            <CancelIcon />
                        </IconButton> */}
                        <img src={`/img/shirts/${main[5][7]}/other.png`} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>removePlayer(e,5)}/>
                        {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                            <InfoIcon />
                        </IconButton> */}
                        <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {main[5][1]}
                        </div>
                        <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {main[5][3]}
                        </div>
                    </Grid>
                    <Grid item xs = {3} sm = {3} md = {3}>
                        {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,8,!totalInfo[8][0],totalInfo[8][6])}>
                            <CancelIcon />
                        </IconButton> */}
                        <img src={`/img/shirts/${main[6][7]}/other.png`} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>removePlayer(e,6)}/>
                        {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                            <InfoIcon />
                        </IconButton> */}
                        <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {main[6][1]}
                        </div>
                        <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {main[6][3]}
                        </div>
                    </Grid>
                    <Grid item xs = {3} sm = {3} md = {3}>
                        {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,9,!totalInfo[9][0],totalInfo[9][6])}>
                            <CancelIcon />
                        </IconButton> */}
                        <img src={`/img/shirts/${main[7][7]}/other.png`} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>removePlayer(e,7)}/>
                        {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                            <InfoIcon />
                        </IconButton> */}
                        <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {main[7][1]}
                        </div>
                        <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {main[7][3]}
                        </div>
                    </Grid>
                    <Grid item xs = {3} sm = {3} md = {3}>
                        {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,10,!totalInfo[10][0],totalInfo[10][6])}>
                            <CancelIcon />
                        </IconButton> */}
                        <img src={`/img/shirts/${main[8][7]}/other.png`} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>removePlayer(e,8)}/>
                        {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                            <InfoIcon />
                        </IconButton> */}
                        <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {main[8][1]}
                        </div>
                        <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {main[8][3]}
                        </div>
                    </Grid>
                    <Grid item xs = {3} sm = {3} md = {3}></Grid>
                    <Grid item xs = {3} sm = {3} md = {3}>
                        {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,10,!totalInfo[10][0],totalInfo[10][6])}>
                            <CancelIcon />
                        </IconButton> */}
                        <img src={`/img/shirts/${main[9][7]}/other.png`} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>removePlayer(e,9)}/>
                        {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                            <InfoIcon />
                        </IconButton> */}
                        <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {main[9][1]}
                        </div>
                        <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {main[9][3]}
                        </div>
                    </Grid>
                    <Grid item xs = {3} sm = {3} md = {3}>
                        {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,10,!totalInfo[10][0],totalInfo[10][6])}>
                            <CancelIcon />
                        </IconButton> */}
                        <img src={`/img/shirts/${main[10][7]}/other.png`} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>removePlayer(e,10)}/>
                        {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                            <InfoIcon />
                        </IconButton> */}
                        <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {main[10][1]}
                        </div>
                        <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {main[10][3]}
                        </div>
                    </Grid>
                    <Grid item xs = {3} sm = {3} md = {3}></Grid>
                </Grid>
                <Grid container spacing = {3} className = "text-center">
                  <Grid item xs = {3} sm = {3} md = {3}>
                      {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,11,!totalInfo[11][0],totalInfo[11][6])}>
                          <CancelIcon />
                      </IconButton> */}
                      <img src={`/img/shirts/${candidate[0][7]}/keeper.png`} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>addPlayer(e,0)}/>
                      {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                          <InfoIcon />
                      </IconButton> */}
                      <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                        {candidate[0][1]}
                      </div>
                      <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                        {candidate[0][3]}
                      </div>
                  </Grid>
                  <Grid item xs = {3} sm = {3} md = {3}>
                    {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,12,!totalInfo[12][0],totalInfo[12][6])}>
                        <CancelIcon />
                    </IconButton> */}
                    <img src={`/img/shirts/${candidate[1][7]}/other.png`} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>addPlayer(e,1)}/>
                    {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                        <InfoIcon />
                    </IconButton> */}
                    <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                      {candidate[1][1]}
                    </div>
                    <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                      {candidate[1][3]}
                    </div>
                  </Grid>
                  <Grid item xs = {3} sm = {3} md = {3}>
                    {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,13,!totalInfo[13][0],totalInfo[13][6])}>
                        <CancelIcon />
                    </IconButton> */}
                    <img src={`/img/shirts/${candidate[2][7]}/other.png`} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>addPlayer(e,2)}/>
                    {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                        <InfoIcon />
                    </IconButton> */}
                    <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                      {candidate[2][1]}
                    </div>
                    <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                      {candidate[2][3]}
                    </div>
                  </Grid>
                  <Grid item xs = {3} sm = {3} md = {3}>
                    {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,14,!totalInfo[14][0],totalInfo[14][6])}>
                        <CancelIcon />
                    </IconButton> */}
                    <img src={`/img/shirts/${candidate[3][7]}/other.png`} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>addPlayer(e,3)}/>
                    {/* <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                        <InfoIcon />
                    </IconButton> */}
                    <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                      {candidate[3][1]}
                    </div>
                    <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                      {candidate[3][3]}
                    </div>
                  </Grid>
                </Grid>
            </div>
            <div className = "mt-3">
                <button className = "x-button6" onClick = {saveTeam}>Save Team</button>
            </div>
        </div>
    )
}

export default TransferGround;