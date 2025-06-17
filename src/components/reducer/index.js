
import { combineReducers } from "redux";
import addtocartReducer from "./addtocartReducer";
import addtoWishReducer from "./addtoWishReducer";
import deletetocartReducer from "./deleletocartReducer";
import { deleteToWish } from "../actions/deleteToWish";

const rootReducer = combineReducers({
  addtocart: addtocartReducer,
  addtoWishReducer,
  deletetocartReducer,
  deleteToWish,
});

export default rootReducer;