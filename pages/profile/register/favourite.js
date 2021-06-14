import React , {useEffect, useState} from 'react';
import {Grid} from '@material-ui/core';
import {useRouter} from 'next/router'
import ProfileTop from '../../../components/fantasy/register/head';
import {useDispatch, useSelector, connect} from 'react-redux';
import PropTypes from "prop-types";
import {registerUser} from "../../../actions/authActions";
import { useUser } from "../../../lib/hooks";
import axios from 'axios';

import { GET_ERRORS } from "../../../actions/types";

function Favourite(props){
    const router = useRouter();
    const [user, { mutate }] = useUser();
    const dispatch = useDispatch();
    const userData = useSelector(state=>state.auth);
    const [club, setClub] = useState("Arsenal");

    useEffect(()=>{
        console.log(userData.reg_info);
        if(!Object.keys(userData.reg_info).length){
            router.push("/profile/register/personal");
        }
    })

    const goBack = () =>{
        router.push("/profile/register/personal");
    }

    const goNext = () =>{
            axios
            .post("/api/user/register", userData)
            .then(async res => {
                console.log(res.data)
            if(res.status=="201"){
                const userObj = await res.data;
                console.log("good")
                console.log(res.data)
                mutate(userObj);
                router.push('/');
            }
            })
            .catch((err)=>{
                console.log(err);
                dispatch({
                type: GET_ERRORS,
                payload: err.response
                })
            })
    }

    return(
        <div className = "pb-5">
            <ProfileTop activeStep = {1}/>
            <div className = "x-Grid3">
                <div className = "x-font3">
                    Your Favourite Club
                </div>
                <div className = "x-font4">
                    We will prepare web and mobile content according to your preferences
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
            </div>
            <div className = "mt-5 x-Grid4 text-center">
                {/* <button className = "x-button3" style = {{backgroundColor: "#e8e8e8", color: "black"}} onClick = {goBack}>Back</button> */}
                <button className = "x-button3" style = {{backgroundColor: "#1976d2"}} onClick = {goNext}>Register</button>
            </div>
        </div>
    )
}

Favourite.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
 };
 
 const mapStateToProps = (state) => ({
   auth: state.auth,
   errors: state.errors,
 });
 
 export default connect(mapStateToProps, { registerUser })(Favourite);