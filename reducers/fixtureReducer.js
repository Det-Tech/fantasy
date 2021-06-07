import {SET_LAST_EVENT_ID, SET_FIXTURE_EVENT, SET_LAST_EVENT_DATE} from "../actions/types";
const isEmpty = require("is-empty");

const initialState = {
    lastEventId: "",
    event: [],
    lastEventDate: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LAST_EVENT_ID:      
      return {
        ...state,
        lastEventId:action.payload,    
       };
    case SET_FIXTURE_EVENT:
      return {
        ...state,
        event: action.payload
      };
    case SET_LAST_EVENT_DATE:
      return {
        ...state,
        lastEventDate: action.payload
      };
    default:
      return state;
  }
}
