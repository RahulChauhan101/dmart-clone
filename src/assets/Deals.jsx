
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import axios from "axios";
import { LuShoppingCart } from "react-icons/lu";
import { RiHeartFill } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import ProductSelect from "./Productselect";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../components/actions/addtoCart";
import { addToWish } from "../components/actions/addToWish";

const Deals = () => {
  const Deal = useSelector((state) => state?.Deals?.Deals);
  const [data, setData] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState({});
  const [userid, setUserid] = useState("");
  const [wishlistItems, setWishlistItems] = useState([]);
  const dispatch = useDispatch();

  // Fetch products
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:5000/api/dmart/");
        setData(res.data);
        const initialPrices = {};
        res.data.forEach((product) => {
          if (product.price && product.price.length > 0) {
            initialPrices[product._id] = product.price[0];
          }
        });
        setSelectedPrices(initialPrices);
      } catch (err) {
        console.error("Error fetching product data", err);
      }
    }
    fetchData();
  }, []);

  // Fetch user and wishlist
  useEffect(() => {
    const getUser = async () => {
      const token = JSON.parse(localStorage.getItem("user"));
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const uid = res.data._id;
        setUserid(uid);

        // Get wishlist
        const wishRes = await axios.get(`http://localhost:5000/api/user/wish/${uid}`);
        const wishData = (wishRes.data.wish || []).map((item) => ({
          productId: typeof item.productId === "object" ? item.productId._id : item.productId,
          priceId: item.priceId,
        }));
        setWishlistItems(wishData);
      } catch (err) {
        console.error("Error loading user/wishlist", err);
      }
    };

    getUser();
  }, []);

  const checkUnblock = (product) => product.status === "unblock";

  const handlePriceChange = (productId, priceData) => {
    setSelectedPrices((prev) => ({
      ...prev,
      [productId]: priceData,
    }));
  };

  const handleAddToCart = (selectedPrice, productId) => {
    dispatch(
      addToCart({
        userId: userid,
        productId: productId,
        priceId: selectedPrice._id,
      })
    );
  };

  const handleAddToWish = (selectedPrice, productId) => {
    dispatch(
      addToWish({
        userId: userid,
        productId: productId,
        priceId: selectedPrice._id,
      })
    );
  };

  return (
    <div className="bg-[#fff6df] w-[97vw] m-auto border border-gray-300 rounded-md">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg font-bold">Top 50 Deals</h2>
        <h2 className="cursor-pointer text-600 hover:underline">View All</h2>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="px-4 pb-4"
      >
        {data.filter(checkUnblock).map((product) => {
          const selectedPrice = selectedPrices[product._id] || product.price?.[0] || {};

          const isWished = wishlistItems.some(
            (item) => item.productId === product._id && item.priceId === selectedPrice._id
          );

          return (
            <SwiperSlide key={product._id}>
              <div className="bg-white my-2 ml-10 p-2 border border-gray-300 rounded-md w-[270px] h-[520px] shadow-sm">
                <div>
                  <h1 className="flex justify-between mx-5 mt-3">
                    <button onClick={() => handleAddToWish(selectedPrice, product._id)}>
                      {isWished ? (
                        <RiHeartFill className="text-red-700 text-2xl cursor-pointer" />
                      ) : (
                        <FaRegHeart className="text-red-700 text-2xl cursor-pointer" />
                      )}
                    </button>

                    Stock:
                    {selectedPrice.Stock > 0 ? selectedPrice.Stock : "Out of Stock"}
                  </h1>
                </div>

                <img
                  src={selectedPrice.image}
                  alt={product.name}
                  className={
                    selectedPrice.Stock > 0
                      ? "w-full h-40 object-contain mb-4 mt-10"
                      : "bg-gray-200 opacity-50 w-full h-42 object-contain mb-4 mt-10"
                  }
                />

                <h3 className="text-lm font-medium">{product.name}</h3>
                {selectedPrice.quantity && (
                  <h3 className="text-lm font-medium">{selectedPrice.quantity}</h3>
                )}

                <div className="flex justify-between text-sm mt-1 mb-2">
                  <div className="flex">
                    <p className="line-through text-gray-500">MRP: {selectedPrice.MRP}</p>
                    <p className="text-black-600 font-semibold mx-4">
                      Dmart: {selectedPrice.DmartPrice}
                    </p>
                  </div>
                  <p className="text-green-500 bg-[#e9f6ec] p-1.5 rounded-md">
                    OFF: {selectedPrice.Discount}
                  </p>
                </div>

                <p className="font-light text-gray-400 -mt-6 pt-2 mb-1 text-xs">
                  (Inclusive of all taxes)
                </p>

                <ProductSelect
                  key={product._id}
                  product={product}
                  onSelectChange={(priceData) =>
                    handlePriceChange(product._id, priceData)
                  }
                />

                <button
                  onClick={() => handleAddToCart(selectedPrice, product._id)}
                  className={
                    selectedPrice.Stock > 0
                      ? "mb-1 mt-2 w-full flex items-center justify-center bg-green-700 hover:bg-green-800 text-white py-2 px-3 rounded-sm text-sm cursor-pointer"
                      : "mb-1 mt-2 w-full flex items-center justify-center bg-gray-400 text-white py-2 px-3 rounded-sm text-sm"
                  }
                  disabled={selectedPrice.Stock <= 0}
                >
                  <LuShoppingCart size={18} />
                  <span className="ml-2">ADD TO CART</span>
                </button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Deals;
