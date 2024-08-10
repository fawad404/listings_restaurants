"use client";
import { useState, useEffect } from "react";

const EditRestaurant = ({ id }) => {
    console.log(id);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [geolocation, setGeolocation] = useState({ lat: null, lon: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGeolocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(geolocation);

    const restaurantData = {
      name,
      address,
      phone,
      website,
      geolocation,
    };

    try {
      const response = await fetch("http://localhost:3000/api/addrestaurant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurantData),
      });

      if (response.ok) {
        alert("Restaurant added successfully!");
        const data = await response.json();
        console.log(data);
      }else {
        const errorData = await response.json();
      alert(errorData.error || 'An error occurred');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section className="bg-coolGray-50 py-4">
      <div className="container px-4 mx-auto">
        <div className="p-6 h-full border border-coolGray-100 overflow-hidden bg-white rounded-md shadow-dashboard">
          <div className="pb-6 border-b border-coolGray-100">
            <div className="flex flex-wrap items-center justify-between -m-2">
              <div className="w-full md:w-auto p-2">
                <h2 className="text-coolGray-900 text-lg font-semibold">Restaurant info</h2>
                <p className="text-xs text-coolGray-500 font-medium">Add your Restaurant Info</p>
              </div>
              <div className="w-full md:w-auto p-2">
                <div className="flex flex-wrap justify-between -m-1.5">
                  <div className="w-full md:w-auto p-1.5">
                    <button className="flex flex-wrap justify-center w-full px-4 py-2 font-medium text-sm text-coolGray-500 hover:text-coolGray-600 border border-coolGray-200 hover:border-coolGray-300 bg-white rounded-md shadow-button">
                      <p>Cancel</p>
                    </button>
                  </div>
                  <div className="w-full md:w-auto p-1.5">
                    <button
                      onClick={handleSubmit}
                      className="flex flex-wrap justify-center w-full px-4 py-2 bg-green-500 hover:bg-green-600 font-medium text-sm text-white border border-green-500 rounded-md shadow-button"
                    >
                      <p>Save</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-6 border-b border-coolGray-100">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full md:w-1/3 p-3">
                  <p className="text-sm text-coolGray-800 font-semibold">Name of Restaurant</p>
                </div>
                <div className="w-full md:flex-1 p-3">
                  <input
                    className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                    type="text"
                    placeholder="Dolla Restaurant"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="py-6 border-b border-coolGray-100">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full md:w-1/3 p-3">
                  <p className="text-sm text-coolGray-800 font-semibold">Address</p>
                </div>
                <div className="w-full md:flex-1 p-3">
                  <input
                    className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                    type="text"
                    placeholder="House# Town USA"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="py-6 border-b border-coolGray-100">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full md:w-1/3 p-3">
                  <p className="text-sm text-coolGray-800 font-semibold">Phone</p>
                </div>
                <div className="w-full md:flex-1 p-3">
                  <input
                    className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                    type="text"
                    placeholder="+9811111111"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="py-6 border-b border-coolGray-100">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full md:w-1/3 p-3">
                  <p className="text-sm text-coolGray-800 font-semibold">Website</p>
                </div>
                <div className="w-full md:flex-1 p-3">
                  <input
                    className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                    type="text"
                    placeholder="restaurant Pro"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditRestaurant;
