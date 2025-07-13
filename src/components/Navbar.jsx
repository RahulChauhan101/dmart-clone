import React, { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { useSelector } from "react-redux";
import {
  MdOutlineLocationOn,
  MdOutlineNotificationsNone,
} from "react-icons/md";
import "./navbar.css";

import { BiTimer } from "react-icons/bi";
import { TfiShoppingCart } from "react-icons/tfi";
import { LuMenu } from "react-icons/lu";
import { IoMdLogOut } from "react-icons/io";

import axios from "axios";
import Cart from "../assets/Cart";
import Notification from "../pages/Notification";

const categoryList = [
  { id: 1, name: "Readytocook", link: "#" },
  { id: 2, name: "Home Appliances", link: "#" },
  { id: 3, name: "Cookware", link: "#" },
  { id: 4, name: "Serveware", link: "#" },
  { id: 5, name: "Cleaners", link: "#" },
  { id: 6, name: "Detergents & Fabric Care", link: "#" },
];

const Navbar = ({ setUser }) => {
  
  const [user, setuser] = useState("");
  const [userId, setUserId] = useState("");
  const [image, setImage] = useState("");
  const [isInCart, setIsInCart] = useState([]);
  const [isOpan, setIsOpan] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const cartData = useSelector((state) => state.getToCartReducer.cart);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"));

    axios
      .get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { name, profileImage, _id } = res.data;
        setuser(name);
        setImage(profileImage);
        setUserId(_id);

        return axios.get(`http://localhost:5000/api/user/cart/${_id}`);
      })
      .then((res) => {
        setIsInCart(cartData?.cart || res.data.cart || []);
      })
      .catch((err) => {
        console.error("Error fetching user or cart:", err);
      });
  }, []);
  console.log("ss:", cartData);

  const logout = () => {
    setUser("");
    localStorage.setItem("user", JSON.stringify(""));
  };

  const handleAddToCart = (selectedPrice, productId) => {
    axios
      .post("http://localhost:5000/api/user/add-to-cart", {
        userId,
        productId,
        priceId: selectedPrice,
        quantity: 1,
      })
      .then(() => updateCartUI())
      .catch((err) => console.error("Error adding to cart", err));
  };

  const handleDecrement = (selectedPrice, productId) => {
    axios
      .delete("http://localhost:5000/api/user/decrement-to-cart", {
        data: { userId, productId, priceId: selectedPrice, quantity: 1 },
      })
      .then(() => updateCartUI())
      .catch((err) => console.error("Error decrementing cart", err));
  };

  const handleCancel = (selectedPrice, productId) => {
    axios
      .delete("http://localhost:5000/api/user/delete-to-cart", {
        data: { userId, productId, priceId: selectedPrice },
      })
      .then(() => updateCartUI())
      .catch((err) => console.error("Error removing item from cart", err));
  };

  const updateCartUI = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/user/cart/${userId}`
      );
      setIsInCart(res.data.cart || []);
    } catch (err) {
      console.error("Error updating cart UI", err);
    }
  };

  const totalItems = isInCart.length;
  const totalPrice = isInCart.reduce(
    (sum, product) =>
      sum + (product.quantity || 1) * (product?.priceDetails?.DmartPrice || 0),
    0
  );

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="navbar-logo-location">
          <img
            src="https://cdn.dmart.in/images/icons/dmart_ready_logo.svg"
            alt="logo"
            className="logo"
          />
          <div className="location-box">
            <div className="location-top">
              <MdOutlineLocationOn className="location-icon" />
              <span className="location-pin">382350</span>
              {/* <IoChevronDown /> */}
            </div>
            <div className="location-b">
              <IoChevronDown />
              <span className="location-city">Ahmedabad</span>
            </div>
          </div>
        </div>

        <div className="delivery-time-info">
          <p className="delivery-msg">
            Earliest <span className="text-green">Home Delivery</span> available
          </p>
          <p className="delivery-slot">
            <BiTimer className="time-icon" />
            <span className="delivery-time">Today 05:00 PM - 08:00 PM</span>
          </p>
        </div>
        <div className="search-section">
          <input
            type="search"
            placeholder="Search here..."
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div>

        <div className="user-actions">
          <div className="navbar-profile">
            <img src={image} alt="profile" className="profile-img" />
            <h5 className="username">{user}</h5>
          </div>

          <div onClick={logout} className="navbar-logout">
            <IoMdLogOut className="logout-icon" />
            <h5 className="logout-text">logout</h5>
          </div>

          <div
            onClick={() => setIsNotification(!isNotification)}
            className="navbar-notification"
          >
            <span className="notification">1</span>
            <MdOutlineNotificationsNone className="notification-icon" />
          </div>

          <div onClick={() => setIsOpan(!isOpan)} className="navbar-cart">
            <span className="badge ">{totalItems}</span>
            <TfiShoppingCart className="cart-icon" />
            <span className="cart-price">₹ {totalPrice}</span>
          </div>
        </div>
      </div>

      <div className="navbar-categories">
        <div className="all-categories">
          <LuMenu className="category-icon" />
          <span>All Categories</span>
        </div>
        {categoryList.map(({ id, link, name }) => (
          <a href={link} key={id} className="category-link">
            {name}
          </a>
        ))}
      </div>

      {isOpan && <Cart />}
      {isNotification && <Notification />}
    </nav>

    // <nav className="sticky  top-0 z-50 bg-white shadow-md">
    //   <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-2 border-b border-gray-300 bg-white">
    //     <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
    //       <img
    //         src="https://cdn.dmart.in/images/icons/dmart_ready_logo.svg"
    //         alt="logo"
    //         className="w-[100px] h-auto"
    //       />
    //       <div className="flex flex-col bg-[#f2f6ff] px-3 py-2 rounded-tl-2xl rounded-br-2xl">
    //         <div className="flex items-center gap-2">
    //           <MdOutlineLocationOn className="text-custom-darkreen text-xl" />
    //           <span className="font-bold text-sm">382350</span>
    //           <IoChevronDown />
    //         </div>
    //         <span className="font-bold text-custom-lightgray text-sm">
    //           Ahmedabad
    //         </span>
    //       </div>
    //     </div>

    //     <div className="hidden md:flex flex-col gap-1">
    //       <p className="text-xs">
    //         Earliest <span className="text-custom-Green">Home Delivery</span>
    //         available
    //       </p>
    //       <p className="flex items-center gap-1.5">
    //         <BiTimer className="text-xl text-[#ffa238]" />
    //         <span className="text-xs font-bold">Today 05:00 PM - 08:00 PM</span>
    //       </p>
    //     </div>

    //     <div className="flex w-full sm:w-auto items-center gap-2">
    //       <input
    //         type="search"
    //         placeholder="Search here..."
    //         className="w-full  sm:w-[33vw]  h-10 px-3 py-2 text-sm border rounded-sm bg-gray-100 border-gray-300  "
    //       />
    //       <button className="uppercase font-bold text-sm bg-custom-Green text-white px-3 py-2 rounded-sm hover:bg-white hover:text-custom-Green border border-custom-Green">
    //         Search
    //       </button>
    //     </div>

    //     <div className="  md: flex items-center gap-2 flex-wrap ">
    //       <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-xl hover:border border-green-500">
    //         <img
    //           src={image}
    //           alt="profile"
    //           className="w-15 h-15 rounded-full border-2 p-1 border-green-300"
    //         />
    //         <h5 className="hidden md:block text-sm font-smbold">{user}</h5>
    //       </div>

    //       <div
    //         onClick={logout}
    //         className="cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-xl hover:border border-green-500"
    //       >
    //         <IoMdLogOut className="text-2xl text-custom-darkreen" />
    //         <h5 className="hidden md:block  text-xs font-smbold">logout</h5>
    //       </div>

    //       <div
    //         onClick={() => setIsNotification(!isNotification)}
    //         className="relative p-2 cursor-pointer"
    //       >
    //         <span className="absolute top-0 left-0 bg-blue-300 text-[10px] px-1 rounded-full">
    //           0
    //         </span>
    //         <MdOutlineNotificationsNone className="text-2xl text-custom-darkreen" />
    //       </div>

    //       <div
    //         onClick={() => setIsOpan(!isOpan)}
    //         className="relative flex items-center border border-green-500 p-2 rounded-sm cursor-pointer"
    //       >
    //         <span className="absolute top-0 left-0 bg-yellow-300 text-[10px] px-1 rounded-full">
    //           {totalItems}
    //         </span>
    //         <TfiShoppingCart className="text-xl text-custom-darkreen" />
    //         <span className="hidden md:block  font-bold ml-2 ">₹ {totalPrice}</span>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="overflow-x-auto whitespace-nowrap flex items-center px-4 py-2 border-t border-gray-300">
    //     <div className="flex items-center gap-2 mr-4">
    //       <LuMenu className="text-xl text-gray-700" />
    //       <span className="text-sm font-medium">All Categories</span>
    //     </div>
    //     {categoryList.map(({ id, link, name }) => (
    //       <a
    //         href={link}
    //         key={id}
    //         className="px-4 py-1 text-sm font-medium text-gray-700 hover:text-custom-Green hover:underline"
    //       >
    //         {name}
    //       </a>
    //     ))}
    //   </div>

    //   {isOpan && <Cart />}
    //   {isNotification && <Notification />}
    // </nav>
  );
};

export default Navbar;
