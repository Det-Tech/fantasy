import {useRef, useEffect} from 'react';
import {Grid, TextField} from '@material-ui/core';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import { useUser } from "../../../lib/hooks";
import { toast, ToastContainer } from 'react-nextjs-toast'
function Login(){
    const [user, { mutate }] = useUser();
    const email = useRef();
    const password = useRef();

    const handleEnter = (e) =>{
        if (e&&e.key === 'Enter') {
            handleLogin()
        }
    }

    useEffect(()=>{
        document,addEventListener("keydown", handleEnter)
    })
    const handleLogin = async () =>{
        const body = {
            email: email.current.value,
            password: password.current.value
        };
        const res = await fetch("/api/user/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        if (res.status === 200) {
            const userObj = await res.json();
            mutate(userObj);
        }
        else{
            toast.notify('Email or password is invalid!', {
                duration: 5,
                type: "error"
              })
        }
    }
    return(
        <div>
            <ToastContainer align={"center"} position={"bottom"}/>
            <Grid container spacing = {3} className = 'x-Grid2'>
                <Grid item xs = {12} sm = {12} md = {2} className = "x-font1">
                    Sign In
                </Grid>
                <Grid item xs = {12} sm = {6} md = {3}>
                    <TextField
                        variant = "outlined"
                        label="Email"
                        type="email"
                        inputRef = {email}
                    />
                </Grid>
                <Grid item xs = {12} sm = {6} md = {3}>
                    <TextField
                        variant = "outlined"
                        label="Password"
                        type="password"
                        inputRef = {password}
                    />
                </Grid>
                <Grid item xs = {12} sm = {6} md = {2}>
                    <button className = "x-button1" onClick = {handleLogin}><VpnKeyOutlinedIcon /> Login</button>
                </Grid>
                <Grid item xs = {12} sm = {6} md = {2}>
                    <div className = "mb-2">
                        <a href = "/">forgot your password -></a>
                    </div>
                    <div>
                        <a href = "/profile/register/personal">Sing up -></a>
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing = {3} className = 'x-Grid2 mt-3'>
                <Grid item xs = {4} sm = {5} md = {5}>
                    <hr />
                </Grid>
                <Grid item xs = {4} sm = {2} md = {2} className = "text-center">
                    or login with
                </Grid>
                <Grid item xs = {4} sm = {5} md = {5}>
                    <hr />
                </Grid>
            </Grid>
            <Grid container spacing = {3} className = "x-Grid2 mt-3 text-center">
                <Grid item xs = {12} sm = {6} md = {3}>
                    <button className = "x-button2" style = {{backgroundColor: "#3b5998"}}><img src = "/img/icons/facebook.png" width = "40px"/> facebook</button>
                </Grid>
                <Grid item xs = {12} sm = {6} md = {3}>
                    <button className = "x-button2" style = {{backgroundColor: "#00aced"}}><img src = "/img/icons/twitter.png" width = "30px"/>  twitter</button>
                </Grid>
                <Grid item xs = {12} sm = {6} md = {3}>
                    <button className = "x-button2" style = {{backgroundColor: "#1c6ef2"}}><img src = "/img/icons/google.png" width = "30px"/> google</button>
                </Grid>
                <Grid item xs = {12} sm = {6} md = {3}>
                    <button className = "x-button2" style = {{backgroundColor: "#000000"}}><img src = "/img/icons/apple.png" width = "30px"/> apple</button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Login;