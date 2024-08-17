"use client";
import { useEffect, useState } from "react";
import Product from "./components/product/Product";
import Featured from "./components/featured/Featured";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

export default function Home() {
  const [data, setData] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // New state for loading

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
                  setError('Sorry, we do not have restaurants near your location.');
                } else {
                  setRestaurants(data);
                }
              } else {
                setError('Failed to fetch restaurants.');
              }
            } catch (error) {
              setError('An error occurred while fetching restaurants.');
            } finally {
              setLoading(false); // Set loading to false after fetching
            }
          },
          async (error) => {
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
            } finally {
              setLoading(false); // Set loading to false after fetching
            }
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
        // Call fallback endpoint if geolocation is not supported
        fetchFallbackRestaurants();
      }
    };

    const fetchFallbackRestaurants = async () => {
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
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    getUserLocation();
  }, []);

  const handleSearch = async (what, city) => {
    if (what !== '' && city === '') {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/query?what=${what}`);
        const result = await response.json();
        setRestaurants(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else if (what !== '' && city !== '') {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/query?what=${what}&location=${city}`);
        const result = await response.json();
        setRestaurants(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <>
      <Featured onSearch={handleSearch} />
      {loading ? (
        <div className="text-center mb-18 mt-4">
          <h1 className="font-heading text-xl xs:text-2xl md:text-2xl font-bold text-gray-900 mb-4">
            Loading...
          </h1>
        </div>
      ) : error ? (
        <div className="text-center mb-18 -mt-18">
          <span className="inline-block py-1 px-3 mb-4 text-xs font-semibold text-orange-900 bg-orange-50 rounded-full"></span>
          <h1 className="font-heading text-xl xs:text-2xl md:text-2xl font-bold text-gray-900 mb-4">
            <span>{error}</span>
          </h1>
        </div>
      ) : restaurants.length > 0 ? (
        <Product fetchedRestaurants={restaurants} />
      ) : (
        <div className="text-center mb-18 -mt-18">
          <h1 className="font-heading text-xl xs:text-2xl md:text-2xl font-bold text-gray-900 mb-4">
            No restaurants found.
          </h1>
        </div>
      )}
      <Footer />
    </>
  );
}
