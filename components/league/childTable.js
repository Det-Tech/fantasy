import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import leagueContract from '../../lib/abi/league';
import profileContract from '../../lib/abi/profile';
import { ethers } from 'ethers';
import { textAlign } from '@material-ui/system';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function AcccessibleTable(props) {
    const {code} = props;
    const classes = useStyles();
    const [childData, setChildData] = useState([]);
    console.log('childData.length', childData.length)
    useEffect(()=>{
        if(window.ethereum && code){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const LeagueContract = new ethers.Contract(leagueContract.kovan, leagueContract.abi, provider);
            const ProfileContract = new ethers.Contract(profileContract.kovan, profileContract.abi, provider);
            LeagueContract.getJoiner(code).then(async joiner=>{
                var tempDetail = [];
                for(const el of joiner) {
                    const oneDetail = await ProfileContract.profiles(el);
                    tempDetail.push(JSON.parse(oneDetail));
                }
                /* joiner&&joiner.map(async (el, idx)=>{
                    const oneDetail = await ProfileContract.profiles(el);
                    tempDetail.push(JSON.parse(oneDetail));
                }) */
                console.log(tempDetail);
                console.log("tempDetail", tempDetail.length)
                setChildData(tempDetail);
            }).catch((err)=>{
                console.log(err,code)
            });
        }
    },[code])

    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="caption table">
            <caption>All available league is in here</caption>
            <TableHead>
            <TableRow>
                <TableCell>NO</TableCell>
                <TableCell align="center">Joiner Name</TableCell>
                <TableCell align="center">Gender</TableCell>
                <TableCell align="center">Country</TableCell>
                <TableCell align="center">PublicKey</TableCell>
                <TableCell align="center">Favourite team</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {childData && childData.map((el, idx) => (
                <TableRow key={idx}>
                <TableCell component="th" scope="row">
                    {idx+1}
                </TableCell>
                <TableCell align="center">{el.userName}</TableCell>
                <TableCell align="center">{el.gender}</TableCell>
                <TableCell align="center">{el.country}</TableCell>
                <TableCell align="center">{el.publicKey}</TableCell>
                <TableCell align="center">{el.favourite}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

export default AcccessibleTable;
