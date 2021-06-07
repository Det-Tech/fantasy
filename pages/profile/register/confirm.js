import React , {useState, useEffect} from 'react';
import {TextField} from '@material-ui/core';
import {useRouter} from 'next/router';
import ProfileTop from '../../../components/fantasy/register/head';
import validator from 'validator';
import {useSelector, useDispatch, connect} from 'react-redux';
import PropTypes from "prop-types";
import {registerUser} from "../../../actions/authActions";
import axios from 'axios';
import { useUser } from "../../../lib/hooks";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING,REGISTER_INFO, SET_REGISTER_STEP, SET_EMAIL_VALID } from "../../../actions/types";

function Confirm(props){
    const [user, { mutate }] = useUser();
    const router = useRouter();
    const dispatch = useDispatch();
    const userData = useSelector(state=>state.auth);
    const newData = userData.reg_info;
    const emailState = userData.email_state;
    const [valid, setValid] = useState(true);
    const [newEmail, setNewEmail] = useState();
    const handleEmail = (e) =>{
        setNewEmail(e.target.value);
        if(validator.isEmail(e.target.value)){
            setValid(false)
        }
        else
            setValid(true)
    }
    useEffect(()=>{
        console.log(userData.reg_info);
        if(!Object.keys(userData.reg_info).length){
            router.push("/profile/register/personal");
        }
        if(user)
        router.push("/");
    })

    const handleRegister = () =>{
        axios
        .post("/api/user/register", userData)
        .then(async res => {
        if(res.status=="201"){
            const userObj = await res.data;
            console.log("good")
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
    };
    const handleValidate = () =>{
        console.log(newData)
        newData.email = newEmail;
        if(!valid){
            axios.post('/api/user/checkmail',newData)
            .then((res)=>{
            if(res.status==200){
                dispatch({
                    type: SET_EMAIL_VALID,
                    payload: true
                })
            }
            })
            .catch((err)=>{
                if(err.status==403){
                    dispatch({
                        type: SET_EMAIL_VALID,
                        payload: false
                    })
                }
            })
        }
    }
    return(
        <div>
            <ProfileTop activeStep = {2}/>
            <div className = "x-Grid4 mt-5">
                <div className = "x-font3">
                    Confirm Information
                </div>
                <hr />
                <div className = "x-profile-register-confirm-res mt-5">
                {emailState?(
                        <div className = "x-font6 text-center">
                            Info validation was Success!<br/>
                            Please register with click below button!
                        </div>
                    ):
                    (
                        <div className = "x-font7 text-center">
                            Email was already registered, please try again with other!
                            <TextField
                                required
                                fullWidth
                                type = "email"
                                label="New Email"
                                variant="outlined"
                                error = {valid}
                                className = "mb-4 mt-4"
                                onChange= {(e)=>handleEmail(e)}
                            />
                        </div>
                    )
                }
                </div>

                <div className = "text-center mt-5 pb-5">
                {!emailState?(
                        <button className = "x-button3" style = {{backgroundColor: "#767768"}} onClick = {handleValidate}>Validate</button>
                    ):(
                        <button className = "x-button3" style = {{backgroundColor: "#316798"}} onClick = {handleRegister}>Register</button>
                    )
                }
                </div>
            </div>
        </div>

    )
}

Confirm.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
 };
 
 const mapStateToProps = (state) => ({
   auth: state.auth,
   errors: state.errors,
 });
 
 export default connect(mapStateToProps, { registerUser })(Confirm);