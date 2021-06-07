import React, {useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Box } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import MuiCardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import MuiButton from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import { createMuiTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    paddingTop: "20px",
    paddingBottom: "30px",
  },
  txtAlign: {
    textAlign: "left",
  },
  root: {
    display: "inline-block",
    border: "1px solid #E336FF",
    // margin: '30px',
    // [theme.breakpoints.up('md')]: {
    //   margin: "30px",
    // },
    // [theme.breakpoints.up('lg')]: {
    //   margin: "30px",
    // },
    [theme.breakpoints.down("sm")]: {
      marginBottom: "20px",
      marginRight: 0,
      marginLeft: 0,
    },
  },
  title: {
    fontFamily: "initial",
    marginBottom: "60px",
  },
  reffirst: {
    [theme.breakpoints.up("lg")]: {
      marginBottom: "58px",
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: "28px",
    },
  },

  minH: {
    [theme.breakpoints.up("md")]: {
      minHeight: "270px",
    },
    [theme.breakpoints.up("lg")]: {
      minHeight: "270px",
    },
  },
}));
const Button = withStyles((theme) => ({
  root: {
    padding: "10px 40px",
    fontSize: "1rem",
    [theme.breakpoints.up("lg")]: {
      padding: "10px 40px",
    },
    [theme.breakpoints.down("lg")]: {
      padding: "4px 10px",
    },
    [theme.breakpoints.down("md")]: {
      padding: "10px 30px",
    },
  },
}))(MuiButton);
const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});


const TeamList = [
  ["Arsenal","/team1.png"],
  ["Aston Villa","/team2.png"],
  ["Brighton","/team3.png"],
  ["Burnley","/team4.png"],
  ["Chelsea","/team5.png"],
  ["Crystal palace","/team6.png"],
  ["Everton","/team7.png"],
  ["Fulham","/team8.png"],
  ["Leicester","/team9.png"],
  ["Leeds","/team10.png"],
  ["Liverpool","/team11.png"],
  ["Man City","/team12.png"],
  ["Man Utd","/team13.png"],
  ["Newcastle","/team14.png"],
  ["Sheffield Utd","/team15.png"],
  ["Southampton","/team16.png"],
  ["Spurs","/team17.png"],
  ["West Brom","/team18.png"],
  ["West Ham","/team19.png"],
  ["Wolves","/team20.png"]
]

function Premiermanagerscomponent(props) {
  const classes = useStyles();
  const history = useHistory();
  var {time,firstTeam,secondTeam} = props;
  const [upTime, setUpTime] = useState('1');
  
    var dateNew = new Date(time);
    var first;
    var second;
    time=dateNew.toString();
    first = time.split(' ')[0]+" "+time.split(' ')[1]+" "+time.split(' ')[2]+" "+time.split(' ')[3];
    second = time.split(' ')[4];
  return (
    <div>
      <Card>
        <div className="col-md-12 col-sm-12 col-xs-12 text-center status-padding20">
          <div className="col-md-2 col-sm-2 col-xs-6 text-center">{TeamList[firstTeam-1][0]}</div>
          <div className="col-md-2 col-sm-2 col-xs-6 text-center">
            <img
              width="30px"
              height="30px"
              src={`/teambrands${TeamList[firstTeam-1][1]}`}
              title="Contemplative Reptile"
            />
          </div>
          <div className="col-md-4 col-sm-4 col-xs-6 text-center">
            <span class="label label-default" style = {{display: "block",marginBottom: "5px"}}>{first}</span>
            <span class="label label-default" style = {{display: "block"}}>{second}</span>
          </div>
          <div className="col-md-2 col-sm-2 col-xs-6 text-center">
            <img
              width="30px"
              height="30px"
              src={`/teambrands${TeamList[secondTeam-1][1]}`}
              title="Contemplative Reptile"
            />
          </div>
          <div className="col-md-2 col-sm-2 col-xs-6 text-center">{TeamList[secondTeam-1][0]}</div>
        </div>
        <div className="col-md-12 col-sm-12 col-xs-12 text-center status-padding20" 
        style={{padding:'0px'}}
        >
          <div className="col-md-1">
          </div>
          <div className="col-md-10" style={{borderBottom:'1px black solid',paddingBottom:'5px',paddingRight:'5px',paddingLeft:'5px'}}></div>
          <div className="col-md-1"></div>
        </div>
        <div className="col-md-12 col-sm-12 col-xs-12 text-center status-padding">
          <img src="/img/fixtures_mark2.png" title="Fixture_mark" />
        </div>
      </Card>
    </div>
  );
}

export default Premiermanagerscomponent;
