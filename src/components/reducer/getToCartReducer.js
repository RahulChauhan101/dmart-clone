
const initialState = {
  cart: {},
};

const getToCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TO_CART":
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};

export default getToCartReducer;
