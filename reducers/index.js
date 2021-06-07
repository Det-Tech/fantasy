import { combineReducers } from "redux";
import authReducer from "./authReducer";
import fixtureReduter from './fixtureReducer';
import playerListReducer from './playerListReducer';

export default combineReducers({
  auth: authReducer,
  fixture: fixtureReduter,
  playerList: playerListReducer
});