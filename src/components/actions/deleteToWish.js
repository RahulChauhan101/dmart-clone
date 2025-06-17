import axios from "axios";

export const deleteToWish = (userId, productId, priceId) => {
    console.log("deltetowish", userId,productId, priceId);
    
    return async (dispatch) => {
        try {
            const response = await axios.delete("http://localhost:5000/api/user/delete-to-wish",
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
        type: "DELETE_TOwish",
        payload: response.data,
      });
        }
        catch (error) {
            console.log("Error adding to delete", error);
        }
    };
};

deleteToWish.js

