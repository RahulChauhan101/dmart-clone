import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineDeleteForever, MdCancelPresentation } from "react-icons/md";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { RiHeartFill } from "react-icons/ri";
import { addToWish } from "../components/actions/addToWish";
import { deleteToWish } from "../components/actions/deleteToWish";
import { useDispatch, useSelector } from "react-redux";

const Wish = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isInWish, setIsInWish] = useState([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchWishData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user"));
        const userRes = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });

        const uid = userRes.data._id;
        setUserId(uid);

        const wishRes = await axios.get(
          `http://localhost:5000/api/user/wish/${uid}`,
          { signal: controller.signal }
        );

        if (isMounted) {
          setData(wishRes.data);
          setIsInWish(wishRes.data.wish || []);
          setLoading(false);
        }
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error("Error fetching wish data:", err);
        }
        setLoading(false);
      }
    };

    fetchWishData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const updateWishUI = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/user/wish/${userId}`);
      setIsInWish(res.data.wish || []);
    } catch (err) {
      console.error("Error updating wish UI", err);
    }
  };

  const handleAddToWish = (selectedPrice, productId) => {
    dispatch(addToWish(userId, productId, selectedPrice));
  };

  const handleCancel = (priceId, productId) => {
  console.log("delete redux",userId, productId, priceId);
  dispatch(deleteToWish(userId, productId,priceId));
  };

  const totalItems = isInWish.length;
  const totalSavings = isInWish.reduce(
    (sum, product) =>
      sum + (product.quantity || 1) * (product?.priceDetails?.Discount || 0),
    0
  );
  const totalPrice = isInWish.reduce(
    (sum, product) =>
      sum + (product.quantity || 1) * (product?.priceDetails?.DmartPrice || 0),
    0
  );

  return (
    <div className="min-h-80 items-center border-b-4 border-gray-400">
      <div className="flex mx-auto justify-center items-center border-b-4 border-gray-400">
        <RiHeartFill className="text-red-700 text-3xl" />
        <h1 className="m-5 font-bold text-4xl">My Wish : {totalItems} Items</h1>
      </div>

      {loading ? (
        <p className="text-center mt-4">Loading your wishlist...</p>
      ) : (
        isInWish.map((product) => {
          const selectedPrice = product.priceDetails;
          if (!selectedPrice) return null;

          return (
            <div
              key={product._id}
              className="flex mt-7 justify-around pb-5 border-b"
            >
              <img
                className="h-[150px]"
                src={selectedPrice.image}
                alt={product.productName}
              />
              <h1>{product.productName}</h1>
              <h1>Unit: {selectedPrice.unit}</h1>
              <h1>MRP: ₹{selectedPrice.MRP}</h1>
              <h1>Discount: ₹{selectedPrice.Discount}</h1>
              <h1>Dmart Price: ₹{selectedPrice.DmartPrice}</h1>

              <div className="mr-2 mt-1 text-4xl text-gray-700 cursor-pointer hover:text-red-400">
                <span
                  onClick={() =>
                    handleCancel(product.priceId, product.productId._id)
                  }
                >
                  <MdCancelPresentation />
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Wish;

