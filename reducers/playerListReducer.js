import {SET_PLAYERLIST, SET_TOP_WEEK} from "../actions/types";
const isEmpty = require("is-empty");

const initialState = {
    playerList: {
        goalKeepers:[],
        defenders:[],
        midFielders:[],
        forwarders:[]
    },
    topOfWeek: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PLAYERLIST:      
      return {
        ...state,
        playerList:action.payload,    
       };
    case SET_TOP_WEEK:
       return {
           ...state,
           topOfweek: action.payload
       }
    default:
      return state;
  }
}
