
const initialState = {
  cart: {},
};

const addtoWishReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ToWish":
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};

export default addtoWishReducer;
