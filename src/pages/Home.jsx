import React from 'react'
import Navbar from '../components/Navbar';
import Image from '../assets/image';
import PopularCategories from '../assets/PopularCategories';
import Deals from '../assets/Deals';
import Offers from './offers';
import Notification from './Notification';


const Home = () => {
  return (
    <>
        <div className='sticky'>
          <Image/>
        <PopularCategories/>
        <Deals/>
        <Offers/>
        </div>
    </>
  )
}

export default Home;