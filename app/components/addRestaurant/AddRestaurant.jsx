"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CldUploadWidget } from 'next-cloudinary';

const AddRestaurant = () => {
  const [name, setName] = useState("");
  const [restaurantType, setRestaurantType] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [service, setService] = useState({
    dineIn: false,
    takeOut: false,
    buffet: false,
    catering: false
  });  
  const [tags, setTags] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [restaurantImg, setRestaurantImg] = useState("");
  const [geolocation, setGeolocation] = useState({ lat: null, lon: null });
  const [slug, setSlug] = useState('');
  const [statuss, setStatuss] = useState("");
  const [seoDescription, setSeoDescription] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setRestaurantType(e.target.value);
  };

  const handleServiceChange = (event) => {
    const { name, checked } = event.target;
  
    setService(prevService => ({
      ...prevService,
      [name]: checked
    }));
  };

  // Function to fetch geolocation from address using OpenStreetMap's Nominatim API
  const fetchGeolocation = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.length > 0) {
        const location = data[0];
        setGeolocation({
          lat: parseFloat(location.lat),
          lon: parseFloat(location.lon)
        });
      } else {
        setGeolocation({ lat: null, lon: null });
        alert('Unable to find geolocation for the provided address.');
      }
    } catch (error) {
      console.error('Error fetching geolocation:', error);
      setGeolocation({ lat: null, lon: null });
      alert('Error fetching geolocation.');
    }
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    if (e.target.value) {
      fetchGeolocation(e.target.value);
    }
  };

  const generateSlug = (text) => {
    const parts = text.split(/[^\w\s]/).filter(part => part.trim() !== '');
    if (parts.length === 0) {
      return '';
    }
    return parts[parts.length - 1].trim().toLowerCase().replace(/\s+/g, '-');
  };

  const handleSeo = (e) => {
    const newTitle = e.target.value;
    setName(newTitle);
    setSlug(generateSlug(newTitle));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !address || !phone || !website || !tags || !city || !state || !zipCode || !restaurantType || !restaurantImg || !slug) {
      alert('All fields must be filled out');
      return;
    }

    if (!geolocation.lat || !geolocation.lon) {
      alert('Could not determine the geolocation for the provided address.');
      return;
    }

    setStatuss("Sending...");

    const restaurantData = {
      name,
      address,
      phone,
      website,
      geolocation,
      service: Object.keys(service).filter(key => service[key]), // Get selected service
      tags,
      city,
      state,
      zipCode,
      type: restaurantType,
      restaurantImg,
      slug,
      seoDescription,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/addrestaurant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurantData),
      });

      if (response.ok) {
        alert("Restaurant added successfully!");
        setStatuss("Sent");
        const data = await response.json();
        router.push('/');
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
                      {statuss ? (
                        <p>{statuss}</p>
                      ) : (
                        <p>Save</p>
                      )}
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
                    onChange={handleSeo}
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
                  <p className="text-sm text-coolGray-800 font-semibold">Address</p>
                </div>
                <div className="w-full md:flex-1 p-3">
                  <input
                    className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                    type="text"
                    placeholder="1234 Main St"
                    onChange={handleAddressChange} // Use handleAddressChange instead of setAddress directly
                    value={address}
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
                    placeholder="yourRestaurant.com"
                    onChange={(e) => setWebsite(e.target.value)}
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
                  <div className="flex flex-col space-y-2">
                    {Object.keys(service).map((serviceKey) => (
                      <label key={serviceKey} className="flex items-center">
                        <input
                          type="checkbox"
                          name={serviceKey}
                          checked={service[serviceKey]}
                          onChange={handleServiceChange}
                          className="form-checkbox h-4 w-4 text-green-500"
                        />
                        <span className="ml-2 text-coolGray-800 capitalize">{serviceKey.replace(/([A-Z])/g, ' $1').trim()}</span>
                      </label>
                    ))}
                  </div>
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
                    placeholder="must have 2 tags with space between eg. halal parking"
                    onChange={(e) => setTags(e.target.value)}
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
                    placeholder="Los Angeles"
                    onChange={(e) => setCity(e.target.value)}
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
                    placeholder="Louisiana"
                    onChange={(e) => setState(e.target.value)}
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
                    placeholder="38080"
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="py-6 border-b border-coolGray-100">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full md:w-1/3 p-3">
                  <p className="text-sm text-coolGray-800 font-semibold">SEO Description</p>
                </div>
                <div className="w-full md:flex-1 p-3">
                  <input
                    className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                    type="text"
                    placeholder="Write 60 characters description for seo"
                    onChange={(e) => setSeoDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="py-6 border-b border-coolGray-100">
            <div className="w-full md:w-9/12">
              <div className="flex flex-wrap -m-3">
                <div className="w-full md:w-1/3 p-3">
                  <p className="text-sm text-coolGray-800 font-semibold">Upload Image</p>
                </div>
                <div className="w-full md:flex-1 p-3">
                  <CldUploadWidget
                    signatureEndpoint="/api/sign-cloudinary-params"
                    onSuccess={(result, { widget }) => {
                      setRestaurantImg(result?.info.public_id);
                    }}
                  >
                    {({ open }) => {
                      function handleOnClick() {
                        setRestaurantImg(undefined);
                        open();
                      }
                      return (
                        <button
                          className="text-blue-800 font-semibold"
                          onClick={handleOnClick}
                        >
                          Click to Upload Image
                        </button>
                      );
                    }}
                  </CldUploadWidget>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AddRestaurant;
