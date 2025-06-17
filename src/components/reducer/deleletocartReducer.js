const initialState ={
    Cart: {},
};

const deletetocartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "DELETE_TOcart":
            return {
                ...state,
                cart: action.payload,
            };
            default:
                return state;
    }
};
export default deletetocartReducer;