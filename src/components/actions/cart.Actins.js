import axios from "axios";



export const decrementCartItem = ({ userId, productId, priceId }) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete("http://localhost:5000/api/user/decrement-to-cart", {
        data: {
          userId,
          productId,
          priceId,
          quantity: 1,
        },
      });
      console.log("Cart Response", response.data);
      dispatch({
        type: "DECREMENT_CART_ITEM",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error decrementing item in cart", error);
    }
  };
};