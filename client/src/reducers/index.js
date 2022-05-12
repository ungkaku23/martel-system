import { combineReducers } from "redux";
import navigation from "./navigation.js";
import auth from "./auth.js";
import rentals from "./rentals";

export default combineReducers({
  auth,
  navigation,
  rentals
});