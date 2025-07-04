import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDeleteForever, MdCancelPresentation } from "react-icons/md";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { addToCart } from "../components/actions/addtoCart";
import { deletetoCart } from "../components/actions/deletetoCart";
import { getTocart } from "../components/actions/getTocart";
import { decrementCartItem } from "../components/actions/cart.Actins";
const Cart = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isInCart, setIsInCart] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();



    const fetchCartData = async () => {
  try {
    const gettoken = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${gettoken}` },
    });

    const userid = response.data._id;
    setUserId(userid);

    const cartRes = await axios.get(`http://localhost:5000/api/user/cart/${userid}`);
    setIsInCart(cartRes.data.cart || []);
  } catch (err) {
    console.log("error getcart", err);
  }
};

    fetchCartData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);


  const handleAddToCart = (priceId, productId) => {
    dispatch(
      addToCart({
         userId,
        productId,
        priceId,
        quantity: 1,

      })
    );
  };

    const handleDecrementa = (selectedPrice, productId) =>{
      dispatch(
        decrementCartItem({
           userId,
          productId,
          priceId: selectedPrice,
          quantity: 1,
        })

      );
    };


  const handleCancel = (selectedPrice, productId) => {
    console.log("delete redex", userId, productId, selectedPrice);
    dispatch(deletetoCart(userId, productId, selectedPrice));
  };

  const updateCartUI = async () => {
    try {
      const cartResponse = await axios.get(
        `http://localhost:5000/api/user/cart/${userId}`
      );
      setIsInCart(cartResponse.data.cart || []);
    } catch (err) {
      console.error("Error updating cart UI", err);
    }
  };

  const totalItems = isInCart.length;
  const totalSavings = isInCart.reduce(
    (sum, product) =>
      sum + (product.quantity || 1) * (product?.priceDetails?.Discount || 0),
    0
  );
  const totalPrice = isInCart.reduce(
    (sum, product) =>
      sum + (product.quantity || 1) * (product?.priceDetails?.DmartPrice || 0),
    0
  );

  return (
    <>
      <div className="min-h-80 items-center border-b-4 border-gray-400">
        <div className="flex mx-auto justify-center items-center border-b-4 border-gray-400">
          <h1 className="m-5 font-bold text-4xl">
            My Cart : {totalItems} Items
          </h1>
          <h1 className="m-5 font-bold text-4xl">Saving : ₹ {totalSavings}</h1>
          <h1 className="m-5 font-bold text-4xl">
            Cart Total : ₹ {totalPrice}
          </h1>
        </div>

        {isInCart.map((product) => {
          const selectedPrice = product.priceId;
          return (
            <div
              key={product._id}
              className="flex mt-7 justify-around pb-5 border-b"
            >
              <img
                className="h-[150px]"
                src={product?.priceDetails.image}
                alt={product.productName}
              />
              <h1>{product?.productName}</h1>
              <h1> Unit: {product?.priceDetails.unit}</h1>
              <h1>MRP: ₹{product?.priceDetails.MRP}</h1>
              <h1>Discount: ₹{product?.priceDetails.Discount}</h1>
              <h1>Dmart Price: ₹{product?.priceDetails.DmartPrice}</h1>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#50b766] rounded-sm">
                  <span
                    className="text-2xl text-white bg-[#50b766] px-4 py-2 hover:bg-white hover:text-[#50b766] cursor-pointer"
                    onClick={() =>
                      handleDecrementa(product.priceId, product.productId._id)
                    }
                  >
                    <MdOutlineDeleteForever />
                  </span>
                  <span className="px-4">{product?.quantity}</span>
                  <span
                    className="text-2xl text-white bg-[#50b766] px-4 py-2 hover:bg-white hover:text-[#50b766] cursor-pointer"
                    onClick={() =>
                      handleAddToCart(product.priceId, product.productId._id)
                    }
                  >
                    +
                  </span>
                </div>

                <div>
                  <h1 className="flex items-center gap-2 mb-5 bg-[#50b766] text-white px-4 py-2 rounded-xl">
                    <LiaMoneyBillWaveSolid /> Total Discount: ₹
                    {product?.quantity * (product?.priceDetails?.Discount || 0)}
                  </h1>
                  <h1 className="flex items-center mb-4 gap-2 bg-[#50b766] text-white px-4 py-2 rounded-xl">
                    <LiaMoneyBillWaveSolid /> Total Dmart Price : ₹
                    {product?.quantity *
                      (product?.priceDetails?.DmartPrice || 0)}
                  </h1>
                </div>
              </div>

              <div className="mr-2 mt-1 text-4xl text-gray-700 cursor-pointer hover:text-red-400">
                <span
                  onClick={() =>
                    handleCancel(selectedPrice, product.productId._id)
                  }
                >
                  <MdCancelPresentation />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cart;
