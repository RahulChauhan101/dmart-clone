
const initialState = {
  cart: {},
};

const addtoDmartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TOdmart":
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};

export default addtoDmartReducer;
