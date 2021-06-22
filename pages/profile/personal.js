import React , {useEffect, useRef, useState} from 'react';
import { useRouter } from 'next/router'
import isWeekend from 'date-fns/isWeekend';
import {TextField, Checkbox, FormControlLabel, Grid} from '@material-ui/core';
import {Autocomplete} from '@material-ui/core';
import ProfileTop from '../../components/fantasy/register/head';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizaitonProvider from '@material-ui/lab/LocalizationProvider';
import StaticDatePicker from '@material-ui/lab/StaticDatePicker';
import Axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import profileContract from '../../lib/abi/profile';
import {ethers} from "ethers"
import { useUser } from "../../lib/hooks";

function Personal(props){
    const [user, { mutate }] = useUser();
    const router = useRouter()
    const [flag, setFlag] = useState(true);
    const userName = useRef();
    const [male, setMale] = useState(true);
    const [female, setFemale] = useState(false);
    const [other, setOther] = useState(false);
    const [gender, setGender] = useState("male");
    const [birth, setBirth] = useState(new Date());
    const [country, setCountry] = useState("Canada");
    const [club, setClub] = useState("Arsenal");

    // error state

    const [userErr, setUserErr] = useState(true);
    const [regionErr, setRegionErr] = useState(false);
    // api data

    const [region, setRegion] = useState([]);

    // event once change elements

    const handleFirstName = () =>{
        if(firstName.current.value){
            setFirstErr(false)
        }
        else{
            setFirstErr(true);
        }
    }

    const handleUserName = () =>{
        if(userName.current.value){
            setUserErr(false)
        }
        else{
            setUserErr(true);
        }
    }

    const handleRegion = (e,v) =>{
        setCountry(v);
    }

    const handleGender = (e,v) =>{
        if(v==1){
            setGender("male");
            setMale(true);
            setFemale(false);
            setOther(false);
        }
        else if(v==2){
            setGender("female");
            setMale(false);
            setFemale(true);
            setOther(false);
        }
        else{
            setGender("other");
            setMale(false);
            setFemale(false);
            setOther(true);
        }
    }

    const handleGetApi = async () =>{
        setFlag(false);
        const res = await Axios("/api/user/getapi", {
            method: "POST"
        });
        console.log(res.data);
        var tempRegion = [];
        res.data.regions.map((el)=>{
            tempRegion.push(el.name);
        })
        setRegion(tempRegion);
    }

    useEffect(()=>{
        if(flag){
         handleGetApi();
        }
    })

    const handleSave = async (e) => {
        e.preventDefault();
        const user_data = {
            userName: userName.current.value,
            publicKey: window.ethereum.selectedAddress,
            gender: gender,
            birth: birth,
            country: country,
            favourite: club
        }

        const provider =new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(profileContract.kovan,profileContract.abi,signer);
        var tx =await contract.saveProfile(JSON.stringify(user_data));
        if(tx!=null){
            console.log(tx);
            await provider.waitForTransaction(tx.hash)
                    .catch((err)=>{
                        console.log(err)
                    });
                    mutate(user_data);
                router.push('/');
        }
        // const UserAddress=await signer.getAddress();
        // var userdata = await contract.profiles(UserAddress);
        // console.log(JSON.parse(userdata));
    }
    return(
        <div>
            <ProfileTop activeStep = {0}/>
            <div className = "x-Grid4 mt-5">
                <div className = "x-font3">
                    Your Personal Details
                </div>
                <hr />
                <div>
                    <TextField
                        required
                        fullWidth
                        type = "text"
                        label="User Name"
                        variant="outlined"
                        error = {userErr}
                        inputRef = {userName}
                        className = "mb-4 mt-4"
                        onChange= {handleUserName}
                    />
                    <div className = "mb-3 x-font4">
                        Gender
                    </div>
                    <div className = "mb-5">
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={male}
                                onChange={(e)=>handleGender(e,1)}
                                name="checkedB"
                                color="primary"
                            />
                            }
                            label="Male"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={female}
                                onChange={(e)=>handleGender(e,2)}
                                name="checkedB"
                                color="primary"
                            />
                            }
                            label="Female"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={other}
                                onChange={(e)=>handleGender(e,3)}
                                name="checkedB"
                                color="primary"
                            />
                            }
                            label="Other"
                        />
                    </div>
                    <div className = "mb-3 x-font4">
                        Date of Birth
                    </div>
                    <div className = "mb-5">
                        <LocalizaitonProvider dateAdapter={AdapterDateFns}>
                            <StaticDatePicker
                                orientation="landscape"
                                openTo="day"
                                value={birth}
                                shouldDisableDate={isWeekend}
                                onChange={(newValue) => {
                                setBirth(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} variant="standard" />}
                            />
                        </LocalizaitonProvider>
                    </div>
                    <div className = "mb-4">
                        <Autocomplete
                            id="grouped-demo"
                            options={region.sort()}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
                            onChange = {(e,v)=>handleRegion(e,v)}
                            value = {country}
                        />
                    </div>
                    <div className = "x-font3">
                        Your Favourite Club
                    </div>
                    <Grid container spacing = {3} className = "mt-4 text-center">
                        <Grid item xs = {6} sm = {3} md = {2}>
                            <div className = "x-profile-favourite-card" onClick = {()=>setClub("Arsenal")} style = {club=="Arsenal"?{border: "2px solid green"}:null}>
                                <div>
                                    <img src = "/img/clubs/team1.png" />
                                </div>
                                <div className = "x-font5">
                                    Arsenal
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs = {6} sm = {3} md = {2} className = "text-center">
                            <div className = "x-profile-favourite-card" onClick = {()=>setClub("Aston Villa")} style = {club=="Aston Villa"?{border: "2px solid green"}:null}>
                                <div>
                                    <img src = "/img/clubs/team2.png" />
                                </div>
                                <div className = "x-font5">
                                    Aston Villa
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs = {6} sm = {3} md = {2} className = "text-center">
                            <div className = "x-profile-favourite-card" onClick = {()=>setClub("Brighton")} style = {club=="Brighton"?{border: "2px solid green"}:null}>
                                <div>
                                    <img src = "/img/clubs/team3.png" />
                                </div>
                                <div className = "x-font5">
                                    Brighton
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs = {6} sm = {3} md = {2} className = "text-center">
                            <div className = "x-profile-favourite-card" onClick = {()=>setClub("Burnley")} style = {club=="Burnley"?{border: "2px solid green"}:null}>
                                <div>
                                    <img src = "/img/clubs/team4.png" />
                                </div>
                                <div className = "x-font5">
                                    Burnley
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs = {6} sm = {3} md = {2} className = "text-center">
                            <div className = "x-profile-favourite-card" onClick = {()=>setClub("Chelsea")} style = {club=="Chelsea"?{border: "2px solid green"}:null}>
                                <div>
                                    <img src = "/img/clubs/team5.png" />
                                </div>
                                <div className = "x-font5">
                                    Chelsea
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs = {6} sm = {3} md = {2} className = "text-center">
                            <div className = "x-profile-favourite-card" onClick = {()=>setClub("Crystal Palace")} style = {club=="Crystal Palace"?{border: "2px solid green"}:null}>
                                <div>
                                    <img src = "/img/clubs/team6.png" />
                                </div>
                                <div className = "x-font5">
                                    Crystal Palace
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs = {6} sm = {3} md = {2} className = "text-center">
                            <div className = "x-profile-favourite-card" onClick = {()=>setClub("Everton")} style = {club=="Everton"?{border: "2px solid green"}:null}>
                                <div>
                                    <img src = "/img/clubs/team7.png" />
                                </div>
                                <div className = "x-font5">
                                    Everton
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs = {6} sm = {3} md = {2} className = "text-center">
                            <div className = "x-profile-favourite-card" onClick = {()=>setClub("Fulham")} style = {club=="Fulham"?{border: "2px solid green"}:null}>
                                <div>
                                    <img src = "/img/clubs/team8.png" />
                                </div>
                                <div className = "x-font5">
                                    Fulham
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs = {6} sm = {3} md = {2} className = "text-center">
                            <div className = "x-profile-favourite-card" onClick = {()=>setClub("Leicester")} style = {club=="Leicester"?{border: "2px solid green"}:null}>
                                <div>
                                    <img src = "/img/clubs/team9.png" />
                                </div>
                                <div className = "x-font5">
                                    Leeds
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs = {6} sm = {3} md = {2} className = "text-center">
                            <div className = "x-profile-favourite-card" onClick = {()=>setClub("Leeds")} style = {club=="Leeds"?{border: "2px solid green"}:null}>
                                <div>
                                    <img src = "/img/clubs/team10.png" />
                                </div>
                                <div className = "x-font5">
                                    Leicester
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs = {6} sm = {3} md = {2} className = "text-center">
                            <div className = "x-profile-favourite-card" onClick = {()=>setClub("Liverpool")} style = {club=="Liverpool"?{border: "2px solid green"}:null}>
                                <div>
                                    <img src = "/img/clubs/team11.png" />
                                </div>
                                <div className = "x-font5">
                                    Liverpool
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs = {6} sm = {3} md = {2} className = "text-center">
                            <div className = "x-profile-favourite-card" onClick = {()=>setClub("Man City")} style = {club=="Man City"?{border: "2px solid green"}:null}>
                                <div>
                                    <img src = "/img/clubs/team12.png" />
                                </div>
                                <div className = "x-font5">
                                    Man city
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs = {6} sm = {3} md = {2} className = "text-center">
                            <div className = "x-profile-favourite-card" onClick = {()=>setClub("Man Utd")} style = {club=="Man Utd"?{border: "2px solid green"}:null}>
                                <div>
                                    <img src = "/img/clubs/team13.png" />
                                </div>
                                <div className = "x-font5">
                                    Man utd
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs = {6} sm = {3} md = {2} className = "text-center">
                            <div className = "x-profile-favourite-card" onClick = {()=>setClub("Newcastle")} style = {club=="Newcastle"?{border: "2px solid green"}:null}>
                                <div>
                                    <img src = "/img/clubs/team14.png" />
                                </div>
                                <div className = "x-font5">
                                    Newcastle
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs = {6} sm = {3} md = {2} className = "text-center">
                            <div className = "x-profile-favourite-card" onClick = {()=>setClub("Sheffield Utd")} style = {club=="Sheffield Utd"?{border: "2px solid green"}:null}>
                                <div>
                                    <img src = "/img/clubs/team15.png" />
                                </div>
                                <div className = "x-font5">
                                    Sheffield United
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs = {6} sm = {3} md = {2} className = "text-center">
                            <div className = "x-profile-favourite-card" onClick = {()=>setClub("Southampton")} style = {club=="Southampton"?{border: "2px solid green"}:null}>
                                <div>
                                    <img src = "/img/clubs/team16.png" />
                                </div>
                                <div className = "x-font5">
                                    Southampton
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs = {6} sm = {3} md = {2} className = "text-center">
                            <div className = "x-profile-favourite-card" onClick = {()=>setClub("Spurs")} style = {club=="Spurs"?{border: "2px solid green"}:null}>
                                <div>
                                    <img src = "/img/clubs/team17.png" />
                                </div>
                                <div className = "x-font5">
                                    Spurs
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs = {6} sm = {3} md = {2} className = "text-center">
                            <div className = "x-profile-favourite-card" onClick = {()=>setClub("West Brom")} style = {club=="West Brom"?{border: "2px solid green"}:null}>
                                <div>
                                    <img src = "/img/clubs/team18.png" />
                                </div>
                                <div className = "x-font5">
                                    West Bromwich Albion
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs = {6} sm = {3} md = {2} className = "text-center">
                            <div className = "x-profile-favourite-card" onClick = {()=>setClub("West Ham")} style = {club=="West Ham"?{border: "2px solid green"}:null}>
                                <div>
                                    <img src = "/img/clubs/team19.png" />
                                </div>
                                <div className = "x-font5">
                                    West Ham
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs = {6} sm = {3} md = {2} className = "text-center">
                            <div className = "x-profile-favourite-card" onClick = {()=>setClub("Wolves")} style = {club=="Wolves"?{border: "2px solid green"}:null}>
                                <div>
                                    <img src = "/img/clubs/team20.png" />
                                </div>
                                <div className = "x-font5">
                                    Wolves
                                </div>
                            </div>
                        </Grid>
                    </Grid>

                    <div className = "mb-4 mt-4 text-center">
                        <button className = "x-button3" style = {{backgroundColor: "#1976d2"}} onClick = {handleSave}>Save profile</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

Personal.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
 };
 
 const mapStateToProps = (state) => ({
   auth: state.auth,
   errors: state.errors,
 });
 
 export default connect(mapStateToProps, {})(Personal);