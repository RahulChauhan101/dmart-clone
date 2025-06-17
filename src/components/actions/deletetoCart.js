import axios from "axios";

export const deletetoCart = (userId, productId, priceId) => {
    console.log("deltetocart", userId,productId, priceId);
    
    return async (dispatch) => {
        try {
            const response = await axios.delete("http://localhost:5000/api/user/delete-to-cart",
                {
                 data:{ 
                userId, 
                productId, 
                priceId,
},
}
);
      console.log("delete Response", response.data);
      dispatch({
        type: "DELETE_TOcart",
        payload: response.data,
      });
        }
        catch (error) {
            console.log("Error adding to delete", error);
        }
    };
};

deletetoCart.js

