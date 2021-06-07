import React, {useEffect, useState} from 'react';
import {Autocomplete, TextField, Grid, IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Axios from 'axios';
import {useDispatch, useSelector, connect} from 'react-redux';

const playerArrange = (a,b) =>{
    if (a.total_points === b.total_points) {
      return 0;
  }
  else {
      return (a.total_points > b.total_points) ? -1 : 1;
  }
  }

function PlayerList(props){

    const dispatch = useDispatch();
    const playerData = useSelector(state=>state.playerList);
    const {playerIdArray,addFromList} = props;
    const [sort1, setSort1] = useState("All players");
    const [sort2, setSort2] = useState("Total points");
    const [sort3, setSort3] = useState(7.9);
    const [apiFlag, setApiFlag] = useState(true);
    const [listNumber, setListNumber] = useState(0);
    const [totalList, setTotalList] = useState({
        goalKeepers:[],
        defenders:[],
        midFielders:[],
        forwarders:[]
    }
    );
    const [currentPlayerCount, setCurrentPlayerCount] = useState(1);
    const [currentList, setCurrentList] = useState(playerData.playerList);

    const options1 = [
        {group:"Global",value: "All players"},
        {group:"Global",value: "Watchlist"},
        {group:"By Position",value: "Goalkeepers"},
        {group:"By Position",value: "Defenders"},
        {group:"By Position",value: "Midfielders"},
        {group:"By Position",value: "Forwards"},
        {group:"By Team",value: "Arsenal"},
        {group:"By Team",value: "Aston Villa"},
        {group:"By Team",value: "Brighton"},
        {group:"By Team",value: "Burnley"},
        {group:"By Team",value: "Chelsea"},
        {group:"By Team",value: "Crystal Palace"},
        {group:"By Team",value: "Everton"},
        {group:"By Team",value: "Fulham"},
        {group:"By Team",value: "Leeds"},
        {group:"By Team",value: "Leicester"},
        {group:"By Team",value: "Liverpool"},
        {group:"By Team",value: "Man City"},
        {group:"By Team",value: "Man Utd"},
        {group:"By Team",value: "Newcastle"},
        {group:"By Team",value: "Sheffield Utd"},
        {group:"By Team",value: "Southampton"},
        {group:"By Team",value: "Spurs"},
        {group:"By Team",value: "West Brom"},
        {group:"By Team",value: "West Ham"},
        {group:"By Team",value: "Wolves"}
    ];
    const options2 = [
        "Total points",
        "Round points",
        "Price",
        "Team selected by %",
        "Minutes played",
        "Goals scored",
        "Assists",
        "Clean sheets",
        "Goals conceded",
        "Own goals",
        "Penalties saved",
        "penalties missed",
        "Yellow cards",
        "Red cards",
        "Saves",
        "Bonus",
        "Bonus Points System",
        "Influence",
        "Creativity",
        "Threat",
        "ICT Index",
        "Form",
        "Times in Dream Team",
        "Value (from)",
        "Value (season)",
        "Points per match",
        "Transfers in",
        "Transfers out",
        "Price rise",
        "Price fall",
        "Price rice (round)",
        "Price fall (round)"
    ];

    const options3 = [
        12.9,
        12.4,
        11.9,
        11.4,
        10.9,
        10.4,
        9.9,
        9.4,
        8.9,
        8.4,
        7.9,
        7.4,
        6.9,
        6.4,
        5.9,
        5.4,
        4.9,
        4.4,
        3.9
    ]

    useEffect(()=>{
        if(apiFlag){
            setApiFlag(false);
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
                setCurrentPlayerCount(res.data.elements.length);
            })
        }
    })

    const handleFirst = () =>{
        setListNumber(0);
    }
    const handleBefore = () =>{
        setListNumber(listNumber-1);
    }
    const handleNext = () =>{
        setListNumber(listNumber+1);
    }
    const handleLast = () =>{
        setListNumber(parseInt(currentPlayerCount/32));
    }

    return(
        <div className = "x-Grid1">
            <div className = "x-font3">
                Player Selection
            </div>
            <div className = "x-font4">
                View
            </div>
            <div>
                <Autocomplete
                    id="sort1"
                    options={options1.sort()}
                    groupBy={(option) => option.group}
                    getOptionLabel={(option) => option.value}
                    renderInput={(params) => <TextField {...params} label={sort1} variant="outlined" />}
                />
            </div>
            <div className = "x-font4 mt-3">
                Sorted by
            </div>
            <div>
                <Autocomplete
                    id="sort1"
                    options={options2}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => <TextField {...params} label={sort2} variant="outlined" />}
                />
            </div>
            <div className = "x-font4 mt-3">
                Search
            </div>
            <div className = "x-playerlist-searchbar">
                <input className = "x-input1"/>
                <SearchIcon className = "float-right"/>
            </div>
            <div className = "x-font4 mt-3">
                Max cost
            </div>
            <div className = "x-font5">
                Between 3.8 and 12.9
            </div>
            <div>
                <Autocomplete
                    id="sort1"
                    options={options3}
                    getOptionLabel={(option) => String(option)}
                    renderInput={(params) => <TextField {...params} label={sort3} variant="outlined" />}
                />
            </div>
            <div className = "x-font4 text-center mt-3">
                {`${currentPlayerCount} players shown`} 
            </div>
            <div className = "mt-3 x-font5">
                <div>
                    <Grid container className = "x-player-keeper-top">
                        <Grid item xs = {6} sm = {6} md = {6} className = "text-center">
                            Goalkeepers
                        </Grid>
                        <Grid item xs = {3} sm = {3} md = {3}>
                            £
                        </Grid>
                        <Grid item xs = {3} sm = {3} md = {3}>
                            **
                        </Grid>
                    </Grid>
                    {currentList.goalKeepers.slice(listNumber*8,listNumber*8+8).map((el)=>(
                        <Grid container className = "x-font5" className = "x-player-list-item">
                            <Grid item xs = {1} sm = {1} md = {2} className = "text-center">
                                <LiveHelpIcon style = {{width: "40px", height: "40px"}}  onClick = {()=>console.log("very good")}/>
                            </Grid>
                            <Grid container xs = {11} sm = {11} md = {10} onClick = {(e)=>addFromList(e,el.id)}>
                                <Grid item xs = {2} sm = {2} md = {1} className = "pr-1 mt-1 text-center">
                                    <img src = {`/img/shirts/${el.team}/keeper.png`} alt = "player" width = "20px" style = {playerIdArray.includes(el.id)?{opacity: "0.6"}:null}/>
                                </Grid>
                                <Grid item xs = {4} sm = {4} md = {4} className = "mt-2" style = {playerIdArray.includes(el.id)?{color: "grey"}:null}>
                                    {el.second_name}
                                </Grid>
                                <Grid item xs = {3} sm = {3} md = {3} className = "mt-2" style = {playerIdArray.includes(el.id)?{color: "grey"}:null}>
                                    {el.now_cost/10}
                                </Grid>
                                <Grid item xs = {3} sm = {3} md = {3} className = "mt-2" style = {playerIdArray.includes(el.id)?{color: "grey"}:null}>
                                    {el.total_points}
                                </Grid>
                            </Grid>
                        </Grid>
                    ))
                    }
                </div>
                <div>
                    <Grid container className = "x-player-defender-top">
                        <Grid item xs = {6} sm = {6} md = {6} className = "text-center">
                            Defenders
                        </Grid>
                        <Grid item xs = {3} sm = {3} md = {3}>
                            £
                        </Grid>
                        <Grid item xs = {3} sm = {3} md = {3}>
                            **
                        </Grid>
                    </Grid>
                    {currentList.defenders.slice(listNumber*8,listNumber*8+8).map((el)=>(
                        <Grid container className = "x-font5" className = "x-player-list-item">
                            <Grid item xs = {1} sm = {1} md = {2} className = "text-center">
                                <LiveHelpIcon style = {{width: "40px", height: "40px"}}  onClick = {()=>console.log("very good")}/>
                            </Grid>
                            <Grid container xs = {11} sm = {11} md = {10} onClick = {(e)=>addFromList(e,el.id)}>
                                <Grid item xs = {2} sm = {2} md = {1} className = "pr-1 mt-1 text-center">
                                    <img src = {`/img/shirts/${el.team}/other.png`} alt = "player" width = "20px" style = {playerIdArray.includes(el.id)?{opacity: "0.6"}:null} />
                                </Grid>
                                <Grid item xs = {4} sm = {4} md = {4} className = "mt-2" style = {playerIdArray.includes(el.id)?{color: "grey"}:null}>
                                    {el.second_name}
                                </Grid>
                                <Grid item xs = {3} sm = {3} md = {3} className = "mt-2" style = {playerIdArray.includes(el.id)?{color: "grey"}:null}>
                                    {el.now_cost/10}
                                </Grid>
                                <Grid item xs = {3} sm = {3} md = {3} className = "mt-2" style = {playerIdArray.includes(el.id)?{color: "grey"}:null}>
                                    {el.total_points}
                                </Grid>
                            </Grid>
                        </Grid>
                    ))
                    }
                </div>
                <div>
                    <Grid container className = "x-player-midfielder-top">
                        <Grid item xs = {6} sm = {6} md = {6} className = "text-center">
                            Midfielders
                        </Grid>
                        <Grid item xs = {3} sm = {3} md = {3}>
                            £
                        </Grid>
                        <Grid item xs = {3} sm = {3} md = {3}>
                            **
                        </Grid>
                    </Grid>
                    {currentList.midFielders.slice(listNumber*8,listNumber*8+8).map((el)=>(
                        <Grid container className = "x-font5" className = "x-player-list-item">
                            <Grid item xs = {1} sm = {1} md = {2} className = "text-center">
                                <LiveHelpIcon style = {{width: "40px", height: "40px"}}  onClick = {()=>console.log("very good")}/>
                            </Grid>
                            <Grid container xs = {11} sm = {11} md = {10} onClick = {(e)=>addFromList(e,el.id)}>
                                <Grid item xs = {2} sm = {2} md = {1} className = "pr-1 mt-1 text-center">
                                    <img src = {`/img/shirts/${el.team}/other.png`} alt = "player" width = "20px" style = {playerIdArray.includes(el.id)?{opacity: "0.6"}:null} />
                                </Grid>
                                <Grid item xs = {4} sm = {4} md = {4} className = "mt-2" style = {playerIdArray.includes(el.id)?{color: "grey"}:null}>
                                    {el.second_name}
                                </Grid>
                                <Grid item xs = {3} sm = {3} md = {3} className = "mt-2" style = {playerIdArray.includes(el.id)?{color: "grey"}:null}>
                                    {el.now_cost/10}
                                </Grid>
                                <Grid item xs = {3} sm = {3} md = {3} className = "mt-2" style = {playerIdArray.includes(el.id)?{color: "grey"}:null}>
                                    {el.total_points}
                                </Grid>
                            </Grid>
                        </Grid>
                    ))
                    }
                </div>
                <div>
                    <Grid container className = "x-player-forwarder-top">
                        <Grid item xs = {6} sm = {6} md = {6} className = "text-center">
                            Forwarders
                        </Grid>
                        <Grid item xs = {3} sm = {3} md = {3}>
                            £
                        </Grid>
                        <Grid item xs = {3} sm = {3} md = {3}>
                            **
                        </Grid>
                    </Grid>
                    {currentList.forwarders.slice(listNumber*8,listNumber*8+8).map((el)=>(
                        <Grid container className = "x-font5" className = "x-player-list-item">
                            <Grid item xs = {1} sm = {1} md = {2} className = "text-center">
                                <LiveHelpIcon style = {{width: "40px", height: "40px"}}  onClick = {()=>console.log("very good")}/>
                            </Grid>
                            <Grid container xs = {11} sm = {11} md = {10} onClick = {(e)=>addFromList(e,el.id)}>
                                <Grid item xs = {2} sm = {2} md = {1} className = "pr-1 mt-1 text-center">
                                    <img src = {`/img/shirts/${el.team}/other.png`} alt = "player" width = "20px" style = {playerIdArray.includes(el.id)?{opacity: "0.6"}:null} />
                                </Grid>
                                <Grid item xs = {4} sm = {4} md = {4} className = "mt-2" style = {playerIdArray.includes(el.id)?{color: "grey"}:null} >
                                    {el.second_name}
                                </Grid>
                                <Grid item xs = {3} sm = {3} md = {3} className = "mt-2" style = {playerIdArray.includes(el.id)?{color: "grey"}:null}>
                                    {el.now_cost/10}
                                </Grid>
                                <Grid item xs = {3} sm = {3} md = {3} className = "mt-2" style = {playerIdArray.includes(el.id)?{color: "grey"}:null}>
                                    {el.total_points}
                                </Grid>
                            </Grid>
                        </Grid>
                    ))
                    }
                </div>
            </div>
            <div className = "mt-2 text-center">
                <IconButton><FirstPageIcon color = "primary" onClick = {handleFirst}/></IconButton>
                <IconButton><NavigateBeforeIcon color = "primary" onClick = {handleBefore}/></IconButton>
                <span>{`${listNumber+1}/${parseInt(currentPlayerCount/32+1)}`}</span>
                <IconButton><NavigateNextIcon color = "primary" onClick = {handleNext}/></IconButton>
                <IconButton><LastPageIcon color = "primary" onClick = {handleLast}/></IconButton>
            </div>
        </div>
    )
}

export default PlayerList;