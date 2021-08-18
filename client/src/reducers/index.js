import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import petProfile from "./petProfile";
import post from "./post";

export default combineReducers({
  alert,
  auth,
  petProfile,
  post,
});
