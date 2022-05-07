import { combineReducers } from "redux";
import navigation from "./navigation.js";
import auth from "./auth.js";

export default combineReducers({
  auth,
  navigation,
});