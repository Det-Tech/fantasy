import React, { Fragment, useState,useEffect } from 'react';
import {Grid} from '@material-ui/core';
import TopHead from '../components/fantasy/head';
import LoginForm from '../components/profile/login/login_from';
import Card from '../components/fantasy/logout/home_card';
import Company from '../components/fantasy/logout/companys';
import { useUser } from "../lib/hooks";
import TopInfoCard from '../components/fantasy/status/topInfoCard';
import KingOfGw from '../components/fantasy/status/kingOfGw';
import TopIn from '../components/fantasy/status/topIn';
import TopOut from '../components/fantasy/status/topOut';
import {useRouter} from 'next/router';
import PlayerCarousel from '../components/fantasy/status/playerCarousel';
import MostTeam from '../components/fantasy/status/team';
import BestLeague from '../components/fantasy/status/league';
import PlayerAval from '../components/fantasy/status/player';

export default function Home(props) {
  const {auth} = props;
  return (
    <Fragment>
      <TopHead/>
      <div className = "mt-5">
        {!auth?(
          <div>
            {/* <LoginForm /> */}
            <Grid container spacing = {3} className = "mt-5 x-Grid2">
              <Grid item xs= {12} sm = {12} md = {7} className = "x-home-card">
                <Card img = "/img/fantasy/home_card1.png" title = "Pick Your Squad" content = "Use your budget of £100m to pick a squad of 15 players from the Premier League." />
              </Grid>
              <Grid item xs= {12} sm = {12} md = {5} className = "x-home-card">
                <Card img = "/img/fantasy/home_card2.png" title = "Create and Join Leagues" content = "Play against friends and family, colleagues or a web community in private leagues." />
              </Grid>
            </Grid>
          </div>
          ):(
            <div className = "x-Grid3">
              <TopInfoCard />
              <Grid container spacing = {3} className = "mt-3">
                <Grid item xs = {12} sm = {12} md = {4}>
                  <KingOfGw />
                </Grid>
                <Grid item xs = {12} sm = {12} md = {4}>
                  <TopIn />
                </Grid>
                <Grid item xs = {12} sm = {12} md = {4}>
                  <TopOut />
                </Grid>
              </Grid>
              <div className = 'mt-5'>
                <PlayerCarousel />
              </div>
              <div className = "mt-5">
                <Grid container spacing = {3}>
                  <Grid item xs = {12} sm = {12} md = {6}>
                    <div>
                      <MostTeam />
                    </div>
                    <div>
                      <BestLeague/>
                    </div>
                  </Grid>
                  <Grid  item xs = {12} sm = {12} md = {6}>
                    <PlayerAval />
                  </Grid>
                </Grid>
              </div>
            </div>
          )
        }
      </div>
      <div className = "mt-5">
        <Company />
      </div>
    </Fragment>
  )
}
