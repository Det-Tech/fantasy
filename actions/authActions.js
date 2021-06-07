import axios from "axios";
import setAuthToken from "../lib/setAuthToken";
import jwt_decode from "jwt-decode";
import {useSelector} from 'react-redux';

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING,REGISTER_INFO, SET_REGISTER_STEP, SET_EMAIL_VALID } from "./types";

// Register User 

export const registerUser = (userData, router,step) => dispatch => {
  if(step==0){
    dispatch({
      type: REGISTER_INFO,
      payload: userData
    })
    router.push("/profile/register/favourite");
    return;
  }
  else{
    dispatch({
      type: REGISTER_INFO,
      payload: userData
    })
    axios.post('/api/user/checkmail',userData)
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
    router.push("/profile/register/confirm");
    return;
  }
}

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("http://127.0.0.1:5000/api/auth/login", userData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
       
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
