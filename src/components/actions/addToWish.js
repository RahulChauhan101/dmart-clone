

import axios from "axios";

export const addToWish = ({ userId, productId, priceId, quantity }) => {
  console.log("asd",userId,productId,priceId);
  
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:5000/api/user/add-to-wish", {
        userId,
        productId,
        priceId,
        quantity:1,
      });

      console.log("Cart Response", response.data);

      dispatch({
        type: "WIsh_TOcart",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error adding to Wish", error);
    }
  };
};
