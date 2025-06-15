// redux/actions/cartActions.js
import axios from "axios";

export const addToCart = ({ userId, productId, priceId, quantity }) => {
  console.log("asd",userId,productId,priceId);
  
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:5000/api/user/add-to-cart", {
        userId,
        productId,
        priceId,
        quantity:1,
      });

      console.log("Cart Response", response.data);

      dispatch({
        type: "ADD_TOcart",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error adding to cart", error);
    }
  };
};
