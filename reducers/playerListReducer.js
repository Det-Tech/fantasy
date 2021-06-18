import {SET_PLAYERLIST, SET_TOP_WEEK, SET_FULL_BOOTSTRAP_API, SET_CURRENT_MEMBERS} from "../actions/types";
const isEmpty = require("is-empty");

const initialState = {
    bootstrapApi:{},
    playerList: {
        goalKeepers:[],
        defenders:[],
        midFielders:[],
        forwarders:[]
    },
    topOfWeek: [],
    currentMembers:[]
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
    case SET_FULL_BOOTSTRAP_API:
       return {
           ...state,
           bootstrapApi: action.payload
       }
    case SET_CURRENT_MEMBERS:
       return {
           ...state,
           currentMembers: action.payload
       }
    default:
      return state;
  }
}
