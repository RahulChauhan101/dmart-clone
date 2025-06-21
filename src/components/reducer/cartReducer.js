const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT_CART_ITEM":
              return {
        ...state,
        cartItems: action.payload.cart,
      };
    case "DECREMENT_CART_ITEM":
              return {
        ...state,
        cartItems: action.payload.cart,
      };
    case "ADD_TOcart":
      return {
        ...state,
        cartItems: action.payload.cart,
      };

    default:
      return state;
  }
};

export default cartReducer;
