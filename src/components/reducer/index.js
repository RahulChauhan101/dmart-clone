
import { combineReducers } from "redux";
import addtocartReducer from "./addtocartReducer";

const rootReducer = combineReducers({
  addtocart: addtocartReducer
});

export default rootReducer;