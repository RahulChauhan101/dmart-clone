
const initialState = {
  cart: {},
};

const addtocartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TOcart":
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};

export default addtocartReducer;
