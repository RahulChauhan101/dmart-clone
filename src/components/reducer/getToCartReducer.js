// src/components/reducer/getTocartReducer.js

const initialState = {
  cartItems: [],
};

const getToCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TO_CART":
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
};

export default getToCartReducer;
