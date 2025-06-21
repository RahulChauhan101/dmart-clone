// // src/components/actions/getTocart.js
// import axios from "axios";

// export const getTocart = (userId) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/user/cart/${userId}`);
      
//       dispatch({
//         type: "GET_TO_CART",
//         payload: response.data.cart,
//       });
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     }
//   };
// };

// src/components/actions/getTocart.js
export const getTocart = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/cart/${userId}`);
      console.log("Fetched Cart from API:", response.data.cart); // ✅
      dispatch({
        type: "GET_TO_CART",
        payload: response.data.cart,
      });
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };
};

