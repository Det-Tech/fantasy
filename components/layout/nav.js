import React, { useEffect } from 'react';
import {useRouter} from 'next/router';

function Navigation(props){
    const router = useRouter();
    const {user} = props;

    return(
        <div className = "x-Grid1">
            <div className = "text-center">
                <a href = "https://google.com"><img src = '/img/clubs/team1.png' alt = "team1" className = "x-margin1"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team2.png' alt = "team2" className = "x-margin1"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team3.png' alt = "team3" className = "x-margin1"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team4.png' alt = "team4" className = "x-margin1"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team5.png' alt = "team5" className = "x-margin1"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team6.png' alt = "team6" className = "x-margin1"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team7.png' alt = "team7" className = "x-margin1"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team8.png' alt = "team8" className = "x-margin1"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team9.png' alt = "team9" className = "x-margin1"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team10.png' alt = "team10" className = "x-margin1"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team11.png' alt = "team11" className = "x-margin1"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team12.png' alt = "team12" className = "x-margin1"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team13.png' alt = "team13" className = "x-margin1"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team14.png' alt = "team14" className = "x-margin1"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team15.png' alt = "team15" className = "x-margin1"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team16.png' alt = "team16" className = "x-margin1"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team17.png' alt = "team17" className = "x-margin1"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team18.png' alt = "team18" className = "x-margin1"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team19.png' alt = "team19" className = "x-margin1"/></a>
                <a href = "https://google.com"><img src = '/img/clubs/team20.png' alt = "team20" className = "x-margin1"/></a>
            </div>
            <div className = "d-flex mt-2">
                <a href = "/"><img src = '/img/logo.png' alt = "logo" width = "60px"/></a>
                <span className = "x-nav-content1">
                    <a href = '/fantasy' className = "x-margin2" style = {{color: "white"}}>fantasy</a>
                    <a href = '/draft' className = "x-margin2" style = {{color: "white"}}>draft</a>
                </span>
            </div>
        </div>
    )
}
export default Navigation;