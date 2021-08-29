import React, { useContext, useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import league, { LeagueContext } from '../../context/league';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function AcccessibleTable(props) {
  const classes = useStyles();
  const router = useRouter();
  const {events, alive} = props;
  const leagueData = useContext(LeagueContext);
  const [availableLeagueData, setAvailableLeagueData] = useState();
  const [myLeagueData, setMyLeagueData] = useState();

  useEffect(()=>{
    console.log(leagueData);
    var tempAvailable = [];
    var tempMe = [];
    if(leagueData){
      leagueData &&leagueData.map((league)=>{
        events && events.map((el)=>{
          if(el.name.substring(el.name.length - 2)==league.startWeek.substring(league.startWeek.length - 2)){
            var nowDate = new Date().toISOString();
            if(nowDate<el.deadline_time){
              tempAvailable.push(league);
            }
          }
          
        })
      })
      setAvailableLeagueData(tempAvailable);
      setMyLeagueData(tempMe);
    }
  },[leagueData, events])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <caption>All available league is in here</caption>
        <TableHead>
          <TableRow>
            <TableCell>NO</TableCell>
            <TableCell align="center">League Name</TableCell>
            <TableCell align="center">Creator</TableCell>
            <TableCell align="center">Start Week</TableCell>
            <TableCell align="center">End Week</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Join Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leagueData && leagueData.map((row, idx) => (
            <TableRow key={idx} className = "x-league-table-row" onClick = {()=>router.push(`/fantasy/leagues/league-box/${row.key}`)}>
              <TableCell component="th" scope="row">
                {idx}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.owner}</TableCell>
              <TableCell align="center">{row.startWeek}</TableCell>
              <TableCell align="center">{row.endWeek}</TableCell>
              <TableCell align="center">{row.amount}</TableCell>
              <TableCell align="center">{row.key}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AcccessibleTable;
