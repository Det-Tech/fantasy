import React , {useEffect, useRef, useState} from 'react';
import { useRouter } from 'next/router'
import isWeekend from 'date-fns/isWeekend';
import {TextField, Checkbox, FormControlLabel, Grid} from '@material-ui/core';
import {Autocomplete} from '@material-ui/core';
import ProfileTop from '../../../components/fantasy/register/head';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizaitonProvider from '@material-ui/lab/LocalizationProvider';
import StaticDatePicker from '@material-ui/lab/StaticDatePicker';
import validator from 'validator';
import Axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {registerUser} from "../../../actions/authActions";

function Personal(props){
    const router = useRouter()
    const [flag, setFlag] = useState(true);
    const firstName = useRef();
    const lastName = useRef();
    const email = useRef();
    const password = useRef();
    const [male, setMale] = useState(true);
    const [female, setFemale] = useState(false);
    const [other, setOther] = useState(false);
    const [gender, setGender] = useState("male");
    const [birth, setBirth] = useState(new Date());
    const [country, setCountry] = useState("Canada");
    const [phoneCodeState, setPhoneCodeState] = useState('1');
    const phoneNumber = useRef();

    // error state

    const [firstErr, setFirstErr] = useState(true);
    const [lastErr, setLastErr] = useState(true);
    const [emailErr, setEmailErr] = useState(true);
    const [passErr, setPassErr] = useState(true);
    const [regionErr, setRegionErr] = useState(false);
    const [phoneErr, setPhoneErr] = useState(true);
    // api data

    const [region, setRegion] = useState([]);
    const [phoneCode, setPhoneCode] = useState([]);
    const [phoneKey, setPhoneKey] = useState([]);

    // event once change elements

    const handleFirstName = () =>{
        if(firstName.current.value){
            setFirstErr(false)
        }
        else{
            setFirstErr(true);
        }
    }

    const handleLastName = () =>{
        if(lastName.current.value){
            setLastErr(false)
        }
        else{
            setLastErr(true);
        }
    }

    const handleEmail = () =>{
        if(validator.isEmail(email.current.value)){
            setEmailErr(false)
        }
        else{
            setEmailErr(true);
        }
    }

    const handlePassword = () =>{
        if(password.current.value.length>=6){
            setPassErr(false)
        }
        else{
            setPassErr(true);
        }
    }

    const handleRegion = (e,v) =>{
        setCountry(v);
        fetch(`https://restcountries.eu/rest/v2/name/${v}`).then(resp=>{
            return resp.json();
        }).then(json=>{
            console.log(json[0].alpha2Code);
            phoneKey.map((el)=>{
                if(el.region_short == json[0].alpha2Code)
                setPhoneCodeState(el.country_code);
            })
        })
    }

    const handlePhoneCode = (e,v) =>{
        setPhoneCodeState(v);
    }

    const handlePhoneNumber = () =>{
        Axios.get(`https://4b110qrq3f.execute-api.eu-west-1.amazonaws.com/prod/validate?number=%2B${String(phoneCodeState)+String(phoneNumber.current.value)}`)
        .then(response=>{
                if(response.data.is_valid)
                setPhoneErr(false)
                else
                setPhoneErr(true);
            }
        )
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
        var tempPhoneCode = [];
        setPhoneKey(res.data.phone_country_codes);
        res.data.regions.map((el)=>{
            tempRegion.push(el.name);
        })
        res.data.phone_country_codes.map((el)=>{
            tempPhoneCode.push(el.country_code);
        })
        let cleanTempPhoneCode = [...new Set(tempPhoneCode)];
        setRegion(tempRegion);
        setPhoneCode(cleanTempPhoneCode);
    }

    useEffect(()=>{
        if(flag){
         handleGetApi();
        }
    })

    const gotoFavourite = (e) => {
        e.preventDefault();
        const user_data = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            publicKey: window.ethereum.selectedAddress,
            gender: gender,
            birth: birth,
            country: country,
            phoneNumber: String(phoneCodeState)+String(phoneNumber.current.value)
        }
       if(!firstErr && !lastErr && !phoneErr){
        props.registerUser(user_data, router, 0);
       }
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
                        label="First Name"
                        variant="outlined"
                        error = {firstErr}
                        inputRef = {firstName}
                        className = "mb-4 mt-4"
                        onChange= {handleFirstName}
                    />
                    <TextField
                        required
                        fullWidth
                        type = "text"
                        label="Last Name"
                        variant="outlined"
                        error = {lastErr}
                        inputRef = {lastName}
                        className = "mb-4"
                        onChange= {handleLastName}
                    />
                    {/* <TextField
                        required
                        fullWidth
                        type = "email"
                        label="Email"
                        variant="outlined"
                        error = {emailErr}
                        inputRef = {email}
                        className = "mb-4"
                        onChange= {handleEmail}
                    />
                    <TextField
                        required
                        fullWidth
                        type = "password"
                        label="Password"
                        variant="outlined"
                        error = {passErr}
                        inputRef = {password}
                        className = "mb-4"
                        onChange= {handlePassword}
                    /> */}
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
                    <Grid container spacing = {3} className = "mb-5">
                        <Grid item xs = {12} sm = {3} md = {2}>
                            <Autocomplete
                                id="grouped-demo"
                                options={phoneCode.sort()}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => <TextField {...params} label="+1" fullWidth variant="outlined" />}
                                onChange = {(e,v)=>handlePhoneCode(e,v)}
                                value = {phoneCodeState}
                            />
                        </Grid>
                        <Grid item xs = {12} sm = {9} md = {10}>
                            <TextField
                                required
                                fullWidth
                                type = "number"
                                label="Phone number"
                                variant="outlined"
                                error = {phoneErr}
                                inputRef = {phoneNumber}
                                onChange= {handlePhoneNumber}
                            />
                        </Grid>
                    </Grid>

                    <div className = "mb-4 text-center">
                        <button className = "x-button3" style = {{backgroundColor: "#1976d2"}} onClick = {gotoFavourite}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

Personal.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
 };
 
 const mapStateToProps = (state) => ({
   auth: state.auth,
   errors: state.errors,
 });
 
 export default connect(mapStateToProps, { registerUser })(Personal);