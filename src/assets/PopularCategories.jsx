import React, {useEffect, useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { IoIosArrowForward } from "react-icons/io";
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/navigation';



const PopularCategories = () => {
    const [user, setUser] = useState("");
    const [data, setData] = useState([]);
    // const [image, setImage] = useState("");
    const [offer, setOffer] = useState([]);

      useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:5000/api/PopularCategories/");
        setData(res.data);
      } catch (err) {
        console.error("Eroor image data", err);
      }
    }
    fetchData();
  }, []);

  
      useEffect(() => {
    async function fetchOffer() {
      try {
        const res = await axios.get("http://localhost:5000/api/Offer/");
        setOffer(res.data);
     

      } catch (err) {
        console.error("Eroor image data", err);
      }
    }
    fetchOffer();
  }, []);
  
  return (
    <>
      <div className='bg-white w-[97vw] m-auto my-5 py-5 px-4 border border-gray-300 rounded-md'>
        <h2 className='font-bold text-lg mb-4'>Popular Categories</h2>
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={9}
          navigation
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {data.map(({ image, name }) => (
            <SwiperSlide key={image._id}>
              <a href={image.image} className='flex flex-col items-center'>
                <img src={image} alt={image._id} className='w-32 h-32 object-cover rounded-md' />
                <span className='mt-2 text-sm'>{name}</span>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {offer.map(({_id, Offerimage, name}) => (
         <div key={_id} className='bg-white w-[97vw] m-auto my-5 py-5 px-4 border border-gray-300 rounded-md'>
        <img src={Offerimage} alt={name}  className='m-auto' />
  
      </div>

      ))}


    </>
  );
};

export default PopularCategories;



