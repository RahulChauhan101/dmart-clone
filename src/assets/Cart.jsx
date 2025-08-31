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
  const [userId, setUserId] = useState("");

  const cartData = useSelector((state) => state.getToCartReducer.cart);
  const isInCart = cartData?.cart || [];

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const gettoken = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${gettoken}` },
        });
        const userid = response.data._id;
        setUserId(userid);
        dispatch(getTocart(userid));
      } catch (err) {
        console.log("error getcart", err);
      }
    };
    fetchCartData();
  }, [dispatch]);

  const handleAddToCart = (priceId, productId) => {
    dispatch(addToCart({ userId, productId, priceId, quantity: 1 }));
  };

  const handleDecrementa = (selectedPrice, productId) => {
    dispatch(decrementCartItem({ userId, productId, priceId: selectedPrice, quantity: 1 }));
  };

  const handleCancel = (selectedPrice, productId) => {
    dispatch(deletetoCart(userId, productId, selectedPrice));
  };

  const totalItems = isInCart.length;
  const totalSavings = isInCart.reduce(
    (sum, product) => sum + (product.quantity || 1) * (product?.priceDetails?.Discount || 0),
    0
  );
  const totalPrice = isInCart.reduce(
    (sum, product) => sum + (product.quantity || 1) * (product?.priceDetails?.DmartPrice || 0),
    0
  );

  // Mock payment function
const handlePayment = async () => {
  try {
    // 1️⃣ Create order in backend
    const { data: order } = await axios.post(
      "http://localhost:5000/api/payment/create-order",
      { amount: totalPrice * 100, currency: "INR" } // amount in paise
    );

    // 2️⃣ Configure Razorpay checkout
    const options = {
      key: "YOUR_KEY_ID", // Replace with your Razorpay key id
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: "Dmart Store",
      description: "Cart Payment",
      handler: async function (response) {
        // Optional: verify payment in backend
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        // You can call your backend to mark the order as paid here
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#50b766",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error("Payment Error:", err);
    alert("Payment failed! Please try again.");
  }
};


  return (
    <div className="min-h-80 items-center border-b-4 border-gray-400">
      <div className="flex mx-auto justify-center items-center border-b-4 border-gray-400">
        <h1 className="m-5 font-bold text-4xl">My Cart : {totalItems} Items</h1>
        <h1 className="m-5 font-bold text-4xl">Saving : ₹ {totalSavings}</h1>
        <h1 className="m-5 font-bold text-4xl">Cart Total: ₹ {totalPrice}</h1>
        
      {/* Payment Section */}
              <div className="mt-10 p-6 border-t-4 border-gray-400  rounded-lg  bg-gray-100 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4">Proceed to Payment</h2>
        <h3 className="text-xl mb-2">Total Amount: ₹{totalPrice}</h3>
        <h3 className="text-xl mb-4">You Saved: ₹{totalSavings}</h3>
        <button
          onClick={handlePayment}
          className="bg-green-600 text-white px-6 py-3 rounded-lg text-2xl hover:bg-green-700 transition"
        >
          Pay Now
        </button>
      </div>
      </div>

      {isInCart.map((product) => {
        const selectedPrice = product.priceId;
        return (
          <div key={product._id} className="flex mt-7 justify-around pb-5 border-b">
            <img className="h-[150px]" src={product?.priceDetails.image} alt={product.productName} />
            <h1>{product?.productName}</h1>
            <h1>Unit: {product?.priceDetails.unit}</h1>
            <h1>MRP: ₹{product?.priceDetails.MRP}</h1>
            <h1>Discount: ₹{product?.priceDetails.Discount}</h1>
            <h1>Dmart Price: ₹{product?.priceDetails.DmartPrice}</h1>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#50b766] rounded-sm">
                <span
                  className="text-2xl text-white bg-[#50b766] px-4 py-2 hover:bg-white hover:text-[#50b766] cursor-pointer"
                  onClick={() => handleDecrementa(product.priceId, product.productId._id)}
                >
                  <MdOutlineDeleteForever />
                </span>
                <span className="px-4">{product?.quantity}</span>
                <span
                  className="text-2xl text-white bg-[#50b766] px-4 py-2 hover:bg-white hover:text-[#50b766] cursor-pointer"
                  onClick={() => handleAddToCart(product.priceId, product.productId._id)}
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
                  {product?.quantity * (product?.priceDetails?.DmartPrice || 0)}
                </h1>
              </div>
            </div>

            <div className="mr-2 mt-1 text-4xl text-gray-700 cursor-pointer hover:text-red-400">
              <span onClick={() => handleCancel(selectedPrice, product.productId._id)}>
                <MdCancelPresentation />
              </span>
            </div>
          </div>
        );
      })}


    </div>
  );
};

export default Cart;
