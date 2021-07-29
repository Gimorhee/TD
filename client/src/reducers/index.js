import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import petProfile from "./petProfile";

export default combineReducers({
  alert,
  auth,
  petProfile,
});
