"use client";
import { useEffect, useState } from "react";
import Product from "./components/product/Product";
import Featured from "./components/featured/Featured";
import { city } from "./utilis/db";
import Navbar from "./components/navbar/Navbar";
import { fetchData } from "./utilis/getData"; // Ensure you have this utility

export default function Home() {
  const [data, setData] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   // Function to get user location
  //   const getUserLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           const { latitude, longitude } = position.coords;
  //           setLocation({ latitude, longitude });
  //         },
  //         (error) => {
  //           setError("Unable to retrieve your location. Please allow location access.");
  //         }
  //       );
  //     } else {
  //       setError("Geolocation is not supported by this browser.");
  //     }
  //   };

  //   // Fetch restaurant data
  //   const fetchRestaurantsData = async () => {
  //     try {
  //       const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/addrestaurant`);
        
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! Status: ${res.status}`);
  //       }
        
  //       const data = await res.json();
  //       setRestaurants(data);
  //     } catch (error) {
  //       console.error('Failed to fetch restaurant data:', error);
  //     }
  //   };

  //   // Call functions
  //   getUserLocation();
  //   fetchRestaurantsData();
  // }, []);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });

            // Make API request to fetch restaurants based on location
            try {
              const response = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/restaurants`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  latitude,
                  longitude,
                  range: 10 // Range in kilometers
                }),
              });

              if (response.ok) {
                const data = await response.json();
                if (data.length === 0) {
                  setError('Sorry, we donot have restaurants near your location.');
                } else {
                  setRestaurants(data);
                  console.log(data);
                }
              } else {
                setError('Failed to fetch restaurants.');
              }
            } catch (error) {
              setError('An error occurred while fetching restaurants.');
            }
          },
          async (error) => {
            //setError("Unable to retrieve your location. Please allow location access.");

            // Call fallback endpoint if location access is denied
            try {
              const response = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/addrestaurant`);
              if (response.ok) {
                const data = await response.json();
                setRestaurants(data);
              } else {
                setError('Failed to fetch fallback restaurants.');
              }
            } catch (error) {
              setError('An error occurred while fetching fallback restaurants.');
            }
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");

        // Call fallback endpoint if geolocation is not supported
      }
    };

    getUserLocation();
  }, []);
  useEffect(() => {
    if (location) {
      console.log('User location:', location);
    }
  }, [location]);

  const handleSearch = async (what, city) => {
    if(what !=='' && city ===''){
      console.log(what, city);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/query?what=${what}`);
        const result = await response.json();
        console.log(result);
        setRestaurants(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

    } else if(what !=='' && city !== ''){
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/query?what=${what}&location=${city}`);
        const result = await response.json();
        console.log(result);
        setRestaurants(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
 

  return (
    <>
      <Featured onSearch={handleSearch} />
      {restaurants && (
        <Product fetchedRestaurants={restaurants} />
      )}
      {error && (
       
        
          <div className="text-center mb-18 -mt-18">
            <span className="inline-block py-1 px-3 mb-4 text-xs font-semibold text-orange-900 bg-orange-50 rounded-full"></span>
           {!restaurants && 
            <h1 className="font-heading text-xl xs:text-2xl md:text-2xl font-bold text-gray-900 mb-4">
              <span>{error}</span>
            </h1>
           }
            </div>
            
           
      )}
      
      {data && (
        <div>
          {data.map((item) => (
            <h1 key={item.id}>{item.name}</h1>
          ))}
        </div>
      )}
    </>
  );
}
