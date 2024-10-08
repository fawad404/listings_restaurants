"use client";
import React, { useState } from 'react';
import { city } from '@/app/utilis/db';
import Navbar from '../navbar/Navbar';

const Featured = ({ onSearch }) => {
  const [selectedCity, setSelectedCity] = useState('');
  const [what, setWhat] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (what === '') {
      return;
    }
    const restaurantData = {
      what,
      location: selectedCity,
    };
    console.log(what, selectedCity);
    
        try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/searchQueries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurantData),
      });

      if (response.ok) {
        //alert("Query added successfully!");
        console.log("successfully searched");
        
      }else {
      alert(errorData.error || 'An error occurred');
      }
    } catch (error) {
      console.error("Error submitting Query:", error);
    }
    onSearch(what, selectedCity);
  };

  return (
    <section className="relative pb-20 xl:pb-32 overflow-hidden">
      <Navbar color={"white"} />
      <img className="absolute bottom-0 left-0 w-full h-full object-cover brightness-50" src="https://restaurantpro.listingprowp.com/wp-content/uploads/2017/04/heroheader-restpro-1920x600_01_opt.jpg" alt="" />
      <nav className="py-6 mb-12 md:mb-24 bg-white">
        <div className="container px-4 mx-auto removed"></div>
      </nav>
      <div className="container px-4 mx-auto relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-2xl xs:text-2xl md:text-3xl xl:text-4xl font-bold text-white mb-8 sm:mb-14">
            <span>Browse Anything! Explore Your city</span>
          </h1>
          <div className="relative group inline-block w-full sm:w-auto py-4 px-7 mb-24 text-gray-900 font-semibold overflow-hidden">
            <div className="relative flex flex-col justify-start sm:flex-row">
              <div className="flex items-center space-x-4 bg-white mb-5 md:mb-0 md:border-r-2 md:border-gray-600">
                <label htmlFor="simple-search" className="flex-shrink-0 px-3 py-1 text-base font-normal text-surface">What</label>
                <input
                  onChange={(e) => setWhat(e.target.value)}
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 outline-none text-gray-900 text-sm block w-full p-2.5"
                  placeholder="Ex:restaurant, state, zipcode, city"
                  required
                />
              </div>

              <div className="relative flex flex-wrap items-center bg-white md:border-r-4 md:border-black">
                <label className="flex-shrink-0 px-3 py-1 text-base font-normal text-surface" htmlFor="inputGroupSelect01">Where</label>
                <select
                  className="relative m-0 block flex-auto bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500"
                  id="inputGroupSelect01"
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">Select your city</option>
                  {city.length > 0 ? (
                    city.map(({ id, city: cityName }) => (
                      <option key={id} value={cityName}>{cityName}</option>
                    ))
                  ) : (
                    <option value="" disabled>No cities available</option>
                  )}
                </select>
              </div>

              <div className="mt-5 md:mt-0">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="p-2.5 flex w-full justify-center text-sm font-medium text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:flex-none sm:w-auto sm:justify-start"
                >
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
