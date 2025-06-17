const initialState ={
    Cart: {},
};

const deletetoWishReducer = (state = initialState, action) => {
    switch (action.type) {
        case "DELETE_TOwish":
            return {
                ...state,
                cart: action.payload,
            };
            default:
                return state;
    }
};
export default deletetoWishReducer;