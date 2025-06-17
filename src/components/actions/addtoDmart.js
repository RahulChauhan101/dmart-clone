// redux/actions/cartActions.js
import axios from "axios";

export const addToDmart = ({ userId, productId, priceId, quantity }) => {
  console.log("asd",userId,productId,priceId);
  
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:5000/api/dmart", {
        userId,
        productId,
        priceId,
        quantity:1,
      });

      console.log("dmart Response", response.data);

      dispatch({
        type: "ADD_TOdmart",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error adding to dmart", error);
    }
  };
};
