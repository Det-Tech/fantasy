import { SET_CURRENT_USER, USER_LOADING, REGISTER_INFO, SET_EMAIL_VALID} from "../actions/types";
const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  reg_info: {},
  step: 0,
  email_state: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_INFO:      
      return {
        ...state,
        reg_info:action.payload,    
       };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case SET_EMAIL_VALID:
      return {
        ...state,
        email_state: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
