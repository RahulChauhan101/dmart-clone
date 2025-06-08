import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";



const Image = () => {
  const [user, setUser] = useState("");
  const [data, setData] = useState([]);
  const [image, setImage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:5000/api/image/");
        setData(res.data);
     

      } catch (err) {
        console.error("Eroor image data", err);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        speed={1000}
        loop={true}
      >
        {data.map((image) => (
          <SwiperSlide key={image._id} className="bg-gray-200">
            <Link to="/about">
              <img
                src={image.image}
                alt={`Slide ${image._id}`}
                className="w-screen sm:h-[45vh] mx-auto object-cover"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

    
    </>
  );
};

export default Image;
