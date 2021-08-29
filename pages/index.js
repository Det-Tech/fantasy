import React, { Fragment, useState,useEffect } from 'react';
import {Grid} from '@material-ui/core';
import TopHead from '../components/fantasy/head';
import Card from '../components/fantasy/logout/home_card';
import Company from '../components/fantasy/logout/companys';
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
        <div className = "x-Grid3">
          <TopInfoCard />
          <Grid container spacing = {3} className = "mt-3">
            <Grid item xs = {12} sm = {12} md = {12}>
              {/* <KingOfGw /> */}
              <PlayerAval />
            </Grid>
            {/* <Grid item xs = {12} sm = {12} md = {12}>
              <TopIn />
            </Grid>
            <Grid item xs = {12} sm = {12} md = {12}>
              <TopOut />
            </Grid> */}
          </Grid>
          <div className = 'mt-5'>
            {/* <PlayerCarousel /> */}
          </div>
          <div className = "mt-5">
            <Grid container spacing = {3}>
              {/* <Grid item xs = {12} sm = {12} md = {6}>
                <div>
                  <MostTeam />
                </div>
                <div>
                  <BestLeague/>
                </div>
              </Grid> */}
              <Grid  item xs = {12} sm = {12} md = {12}>
                <PlayerAval />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      <div className = "mt-5">
        <Company />
      </div>
    </Fragment>
  )
}
