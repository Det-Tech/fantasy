import React, {useState, useEffect} from 'react';
import {IconButton, Grid, InputBase, responsiveFontSizes} from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import InfoIcon from '@material-ui/icons/Info';
import Axios from 'axios';

function TransferGround(props){
    const {auth} = props;
    const {removePlayer,handlePlayerReverse, } = props;
    const [apiFlag, setApiFlag] = useState(true);
    const [groundView, setGroundView] = useState("pitch");
    const [mobile, setMobile] = useState(false);
    const [imgHeight, setImgHeight] = useState();
    const [dialogOpen, setDialogOpen] = useState(false);

    console.log(auth)

    const [totalInfo, setTotalInfo] = useState(
      auth?
      auth.transfered:
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
        [false,"player", 0,0,0,0,0,0],
        [false,"player", 0,0,0,0,0,0],
        [false,"player", 0,0,0,0,0,0],
        [false,"player", 0,0,0,0,0,0],
        [false,"player", 0,0,0,0,0,0]
      ]
      );

    const handlePitchView = () =>{
        setGroundView("pitch");
    }
    const handleListView = () =>{
        setGroundView("list");
    }

    useEffect(()=>{
      setTotalInfo(auth?
        auth.transfered:
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
          [false,"player", 0,0,0,0,0,0],
          [false,"player", 0,0,0,0,0,0],
          [false,"player", 0,0,0,0,0,0],
          [false,"player", 0,0,0,0,0,0],
          [false,"player", 0,0,0,0,0,0]
        ]);
    }, [totalInfo])

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
                <div className = "x-transfer-player-ground-top-button">
                    <button className = "x-button5" style = {groundView=="pitch"?{backgroundColor: "white", color: "#2f2f2f"}:null} onClick = {handlePitchView}>Pitch View</button>
                    <button className = "x-button5" style = {groundView=="list"?{backgroundColor: "white", color: "#2f2f2f"}:null} onClick = {handleListView}>List View</button>
                </div>
                <Grid container className = "x-ground-img" style = {mobile?{height: `${imgHeight}px`}:{height:`${imgHeight-220}px`, paddingTop: "10%"}}>
                    <Grid item xs = {4} sm = {4} md = {4}></Grid>
                    <Grid item xs = {4} sm = {4} md = {4}>
                        <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,0,!totalInfo[0][0],totalInfo[0][6])}>
                            <CancelIcon />
                        </IconButton>
                        <img src={totalInfo[0][0]?`/img/shirts/${totalInfo[0][7]}/keeper.png`:"/img/shirts/empty.png"} className = "x-player-body" width = {mobile?`${imgHeight/11}`:"40px"}   onClick = {(e)=>removePlayer(e,0)}/>
                        <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                            <InfoIcon />
                        </IconButton>
                        <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {totalInfo[0][1]}
                        </div>
                        <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {totalInfo[0][3]}
                        </div>
                    </Grid>
                    <Grid item xs = {4} sm = {4} md = {4}></Grid>
                    <Grid item xs = {3} sm = {3} md = {3}>
                        <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,1,!totalInfo[1][0],totalInfo[1][6])}>
                            <CancelIcon />
                        </IconButton>
                        <img src={totalInfo[1][0]?`/img/shirts/${totalInfo[1][7]}/other.png`:"/img/shirts/empty.png"} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>removePlayer(e,1)}/>
                        <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                            <InfoIcon />
                        </IconButton>
                        <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {totalInfo[1][1]}
                        </div>
                        <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {totalInfo[1][3]}
                        </div>
                    </Grid>
                    <Grid item xs = {3} sm = {3} md = {3}>
                        <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,2,!totalInfo[2][0],totalInfo[2][6])}>
                            <CancelIcon />
                        </IconButton>
                        <img src={totalInfo[2][0]?`/img/shirts/${totalInfo[2][7]}/other.png`:"/img/shirts/empty.png"} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>removePlayer(e,2)}/>
                        <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                            <InfoIcon />
                        </IconButton>
                        <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {totalInfo[2][1]}
                        </div>
                        <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {totalInfo[2][3]}
                        </div>
                    </Grid>
                    <Grid item xs = {3} sm = {3} md = {3}>
                          <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,3,!totalInfo[3][0],totalInfo[3][6])}>
                              <CancelIcon />
                          </IconButton>
                          <img src={totalInfo[3][0]?`/img/shirts/${totalInfo[3][7]}/other.png`:"/img/shirts/empty.png"} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>removePlayer(e,3)}/>
                          <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                              <InfoIcon />
                          </IconButton>
                          <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                            {totalInfo[3][1]}
                          </div>
                          <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                            {totalInfo[3][3]}
                          </div>
                    </Grid>
                    <Grid item xs = {3} sm = {3} md = {3}>
                        <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,4,!totalInfo[4][0],totalInfo[4][6])}>
                            <CancelIcon />
                        </IconButton>
                        <img src={totalInfo[4][0]?`/img/shirts/${totalInfo[4][7]}/other.png`:"/img/shirts/empty.png"} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>removePlayer(e,4)}/>
                        <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                            <InfoIcon />
                        </IconButton>
                        <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {totalInfo[4][1]}
                        </div>
                        <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {totalInfo[4][3]}
                        </div>
                    </Grid>
                    <Grid item xs = {3} sm = {3} md = {3}>
                        <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,5,!totalInfo[5][0],totalInfo[5][6])}>
                            <CancelIcon />
                        </IconButton>
                        <img src={totalInfo[5][0]?`/img/shirts/${totalInfo[5][7]}/other.png`:"/img/shirts/empty.png"} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>removePlayer(e,5)}/>
                        <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                            <InfoIcon />
                        </IconButton>
                        <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {totalInfo[5][1]}
                        </div>
                        <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {totalInfo[5][3]}
                        </div>
                    </Grid>
                    <Grid item xs = {3} sm = {3} md = {3}>
                        <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,6,!totalInfo[6][0],totalInfo[6][6])}>
                            <CancelIcon />
                        </IconButton>
                        <img src={totalInfo[6][0]?`/img/shirts/${totalInfo[6][7]}/other.png`:"/img/shirts/empty.png"} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>removePlayer(e,6)}/>
                        <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                            <InfoIcon />
                        </IconButton>
                        <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {totalInfo[6][1]}
                        </div>
                        <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {totalInfo[6][3]}
                        </div>
                    </Grid>
                    <Grid item xs = {3} sm = {3} md = {3}>
                        <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,7,!totalInfo[7][0],totalInfo[7][6])}>
                            <CancelIcon />
                        </IconButton>
                        <img src={totalInfo[7][0]?`/img/shirts/${totalInfo[7][7]}/other.png`:"/img/shirts/empty.png"} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>removePlayer(e,7)}/>
                        <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                            <InfoIcon />
                        </IconButton>
                        <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {totalInfo[7][1]}
                        </div>
                        <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {totalInfo[7][3]}
                        </div>
                    </Grid>
                    <Grid item xs = {3} sm = {3} md = {3}>
                        <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,8,!totalInfo[8][0],totalInfo[8][6])}>
                            <CancelIcon />
                        </IconButton>
                        <img src={totalInfo[8][0]?`/img/shirts/${totalInfo[8][7]}/other.png`:"/img/shirts/empty.png"} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>removePlayer(e,8)}/>
                        <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                            <InfoIcon />
                        </IconButton>
                        <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {totalInfo[8][1]}
                        </div>
                        <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {totalInfo[8][3]}
                        </div>
                    </Grid>
                    <Grid item xs = {3} sm = {3} md = {3}></Grid>
                    <Grid item xs = {3} sm = {3} md = {3}>
                        <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,9,!totalInfo[9][0],totalInfo[9][6])}>
                            <CancelIcon />
                        </IconButton>
                        <img src={totalInfo[9][0]?`/img/shirts/${totalInfo[9][7]}/other.png`:"/img/shirts/empty.png"} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>removePlayer(e,9)}/>
                        <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                            <InfoIcon />
                        </IconButton>
                        <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {totalInfo[9][1]}
                        </div>
                        <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {totalInfo[9][3]}
                        </div>
                    </Grid>
                    <Grid item xs = {3} sm = {3} md = {3}>
                        <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,10,!totalInfo[10][0],totalInfo[10][6])}>
                            <CancelIcon />
                        </IconButton>
                        <img src={totalInfo[10][0]?`/img/shirts/${totalInfo[10][7]}/other.png`:"/img/shirts/empty.png"} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>removePlayer(e,10)}/>
                        <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                            <InfoIcon />
                        </IconButton>
                        <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {totalInfo[10][1]}
                        </div>
                        <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                          {totalInfo[10][3]}
                        </div>
                    </Grid>
                    <Grid item xs = {3} sm = {3} md = {3}></Grid>
                </Grid>
                <Grid container spacing = {3} className = "text-center">
                  <Grid item xs = {3} sm = {3} md = {3}>
                      <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,11,!totalInfo[11][0],totalInfo[11][6])}>
                          <CancelIcon />
                      </IconButton>
                      <img src={totalInfo[11][0]?`/img/shirts/${totalInfo[11][7]}/other.png`:"/img/shirts/empty.png"} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>removePlayer(e,11)}/>
                      <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                          <InfoIcon />
                      </IconButton>
                      <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                        {totalInfo[11][1]}
                      </div>
                      <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                        {totalInfo[11][3]}
                      </div>
                  </Grid>
                  <Grid item xs = {3} sm = {3} md = {3}>
                    <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,12,!totalInfo[12][0],totalInfo[12][6])}>
                        <CancelIcon />
                    </IconButton>
                    <img src={totalInfo[12][0]?`/img/shirts/${totalInfo[12][7]}/other.png`:"/img/shirts/empty.png"} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>removePlayer(e,12)}/>
                    <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                        <InfoIcon />
                    </IconButton>
                    <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                      {totalInfo[12][1]}
                    </div>
                    <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                      {totalInfo[12][3]}
                    </div>
                  </Grid>
                  <Grid item xs = {3} sm = {3} md = {3}>
                    <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,13,!totalInfo[13][0],totalInfo[13][6])}>
                        <CancelIcon />
                    </IconButton>
                    <img src={totalInfo[13][0]?`/img/shirts/${totalInfo[13][7]}/other.png`:"/img/shirts/empty.png"} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>removePlayer(e,13)}/>
                    <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                        <InfoIcon />
                    </IconButton>
                    <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                      {totalInfo[13][1]}
                    </div>
                    <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                      {totalInfo[13][3]}
                    </div>
                  </Grid>
                  <Grid item xs = {3} sm = {3} md = {3}>
                    <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null} onClick = {(e)=>handlePlayerReverse(e,14,!totalInfo[14][0],totalInfo[14][6])}>
                        <CancelIcon />
                    </IconButton>
                    <img src={totalInfo[14][0]?`/img/shirts/${totalInfo[14][7]}/other.png`:"/img/shirts/empty.png"} className = "x-player-body" width = {mobile?`${imgHeight/10}`:"40px"}   onClick = {(e)=>removePlayer(e,14)}/>
                    <IconButton className = "x-player-remove-button" style = {mobile?{display: "none"}:null}>
                        <InfoIcon />
                    </IconButton>
                    <div className = "x-transfer-player-info-name" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                      {totalInfo[14][1]}
                    </div>
                    <div className = "x-transfer-player-info-point" style = {mobile?{fontSize: "9px"}:{fontSize: "11px"}}>
                      {totalInfo[14][3]}
                    </div>
                  </Grid>
                </Grid>
            </div>
            <div className = "mt-3">
                <button className = "x-button6">Make Transfer</button>
            </div>
        </div>
    )
}

export default TransferGround;