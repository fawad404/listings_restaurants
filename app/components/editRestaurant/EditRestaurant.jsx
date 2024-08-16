"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const EditRestaurant = ({ id }) => {
  const [data, setData] = useState({
    name: "",
    address: "",
    phone: "",
    website: "",
    service: [], // Initialize as an array for services
    tags: "",
    city: "",
    state: "",
    zipCode: "",
    type: "",
    restaurantImg: "",
  });
  const [geolocation, setGeolocation] = useState({ lat: null, lon: null });
  const [restaurantType, setRestaurantType] = useState(data.type);
  const [selectedServices, setSelectedServices] = useState(data.service); // Manage selected services
  const router = useRouter();

  // Handle change for restaurant type
  const handleChange = (e) => {
    setRestaurantType(e.target.value);
  };

  // Handle change for service checkboxes
  const handleServiceChange = (e) => {
    const value = e.target.value;
    setSelectedServices((prevServices) =>
      prevServices.includes(value)
        ? prevServices.filter((service) => service !== value)
        : [...prevServices, value]
    );
  };

  // Fetch restaurant data on component mount or when `id` changes
  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/addrestaurant/${id}`);
        const result = await response.json();
        setData(result);
        setRestaurantType(result.type); // Set initial restaurantType from fetched data
        setSelectedServices(result.service); // Set initial selected services from fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getRestaurant();
  }, [id]);

  // Fetch geolocation on component mount
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const restaurantData = {
      ...data,
      type: restaurantType, // Include restaurantType in the data to be submitted
      service: selectedServices, // Include selectedServices in the data to be submitted
      geolocation,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/addrestaurant/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurantData),
      });

      if (response.ok) {
        alert("Restaurant updated successfully!");
        const result = await response.json();
        console.log(result);
        // router.push('/');
      } else {
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
                    value={data.name}
                    onChange={(e) => setData(prevData => ({ ...prevData, name: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="py-6 border-b border-coolGray-100">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full md:w-1/3 p-3">
                  <p className="text-sm text-coolGray-800 font-semibold">Type of Restaurant</p>
                </div>
                <div className="w-full md:flex-1 p-3">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="restaurantType"
                        value="food-truck"
                        checked={restaurantType === "food-truck"}
                        onChange={handleChange}
                        className="form-radio h-4 w-4 text-green-500"
                      />
                      <span className="ml-2 text-coolGray-800">Food Truck</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="restaurantType"
                        value="restaurant"
                        checked={restaurantType === "restaurant"}
                        onChange={handleChange}
                        className="form-radio h-4 w-4 text-green-500"
                      />
                      <span className="ml-2 text-coolGray-800">Restaurant</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
          <div className="py-6 border-b border-coolGray-100">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full md:w-1/3 p-3">
                  <p className="text-sm text-coolGray-800 font-semibold">Service</p>
                </div>
                <div className="w-full md:flex-1 p-3">
                  <div className="flex flex-wrap space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value="dineIn"
                        checked={selectedServices.includes("dineIn")}
                        onChange={handleServiceChange}
                        className="form-checkbox h-4 w-4 text-green-500"
                      />
                      <span className="ml-2 text-coolGray-800">Dine In</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value="takeOut"
                        checked={selectedServices.includes("takeOut")}
                        onChange={handleServiceChange}
                        className="form-checkbox h-4 w-4 text-green-500"
                      />
                      <span className="ml-2 text-coolGray-800">Take Out</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value="buffet"
                        checked={selectedServices.includes("buffet")}
                        onChange={handleServiceChange}
                        className="form-checkbox h-4 w-4 text-green-500"
                      />
                      <span className="ml-2 text-coolGray-800">Buffet</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value="catering"
                        checked={selectedServices.includes("catering")}
                        onChange={handleServiceChange}
                        className="form-checkbox h-4 w-4 text-green-500"
                      />
                      <span className="ml-2 text-coolGray-800">Catering</span>
                    </label>
                    {/* Add more service options as needed */}
                  </div>
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
                    value={data.address}
                    onChange={(e) => setData(prevData => ({ ...prevData, address: e.target.value }))}
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
                    value={data.phone}
                    onChange={(e) => setData(prevData => ({ ...prevData, phone: e.target.value }))}
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
                    value={data.website}
                    onChange={(e) => setData(prevData => ({ ...prevData, website: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="py-6 border-b border-coolGray-100">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full md:w-1/3 p-3">
                  <p className="text-sm text-coolGray-800 font-semibold">Service</p>
                </div>
                <div className="w-full md:flex-1 p-3">
                  <input
                    className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                    type="text"
                    placeholder="Service details"
                    value={data.service}
                    onChange={(e) => setData(prevData => ({ ...prevData, service: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="py-6 border-b border-coolGray-100">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full md:w-1/3 p-3">
                  <p className="text-sm text-coolGray-800 font-semibold">List of Tags Max 2</p>
                </div>
                <div className="w-full md:flex-1 p-3">
                  <input
                    className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                    type="text"
                    placeholder="House# Town USA"
                    value={data.tags}
                    onChange={(e) => setData(prevData => ({ ...prevData, tags: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="py-6 border-b border-coolGray-100">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full md:w-1/3 p-3">
                  <p className="text-sm text-coolGray-800 font-semibold">City</p>
                </div>
                <div className="w-full md:flex-1 p-3">
                  <input
                    className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                    type="text"
                    placeholder="House# Town USA"
                    value={data.city}
                    onChange={(e) => setData(prevData => ({ ...prevData, city: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="py-6 border-b border-coolGray-100">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full md:w-1/3 p-3">
                  <p className="text-sm text-coolGray-800 font-semibold">State</p>
                </div>
                <div className="w-full md:flex-1 p-3">
                  <input
                    className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                    type="text"
                    placeholder="House# Town USA"
                    value={data.state}
                    onChange={(e) => setData(prevData => ({ ...prevData, state: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="py-6 border-b border-coolGray-100">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full md:w-1/3 p-3">
                  <p className="text-sm text-coolGray-800 font-semibold">Zip Code</p>
                </div>
                <div className="w-full md:flex-1 p-3">
                  <input
                    className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                    type="text"
                    placeholder="House# Town USA"
                    value={data.zipCode}
                    onChange={(e) => setData(prevData => ({ ...prevData, zipCode: e.target.value }))}
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
