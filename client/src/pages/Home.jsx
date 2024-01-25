import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';

const Home = () => {

  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
console.log(saleListings);

useEffect(() => {
  const fetchOfferListings = async () => {
    try {
      const res = await fetch('/api/listing/get?offer=true&limit=3');
      const data = await res.json();
      setOfferListings(data);
      fetchRentListings();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRentListings = async () => {
    try {
      const res = await fetch('/api/listing/get?type=rent&limit=3');
      const data = await res.json();
      setRentListings(data);
      fetchSaleListings();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSaleListings = async () => {
    try {
      const res = await fetch('/api/listing/get?type=sale&limit=3');
      const data = await res.json();
      setSaleListings(data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchOfferListings();
}, []);

  return (
    <div className=" font-Raleway">
      {/* top */}
      <div className=" flex flex-col gap-6 py-28 px-4 max-w-6xl mx-auto">
        <h1 className=" text-slate-700 font-bold text-3xl lg:text-6xl">
        StoryStream: Weaving Narratives, Connecting Worlds – Your Digital Diary of Diverse Tales.
          
        </h1>
        
        
      </div>

      {/* swiper */}

      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px] bg-fixed'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>



    
    </div>
  );
};

export default Home;
