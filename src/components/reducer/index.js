
import { combineReducers } from "redux";
import addtocartReducer from "./addtocartReducer";
import addtoWishReducer from "./addtoWishReducer";
import deletetocartReducer from "./deleletocartReducer";
import deletetoWishReducer from "./deleletocartReducer"; 
import getToCartReducer from "./getToCartReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  addtocart: addtocartReducer,
  addtoWishReducer,
  deletetocartReducer,
  deletetoWishReducer,
  getToCartReducer,
  cartReducer,
  
});

export default rootReducer;