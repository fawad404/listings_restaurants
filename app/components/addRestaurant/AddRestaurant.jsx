"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CldUploadWidget } from 'next-cloudinary';
const AddRestaurant = () => {
  const [name, setName] = useState("");
  const [restaurantType, setRestaurantType] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [service, setService] = useState("");
  const [tags, setTags] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [restaurantImg, setRestaurantImg] = useState("");
  const [geolocation, setGeolocation] = useState({ lat: null, lon: null });
  const [status, setStatus] = useState("");
  const router = useRouter();
  // console.log(process.env.NEXT_PUBLIC_WEB_URL);

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
    setStatus("Sending...");
    if (!name || !address || !phone || !website || !geolocation || !service || !tags || !city || !state || !zipCode || !restaurantImg) {
      alert('All fields must be filled out');
      return; // Exit the function if any field is empty
    }
    console.log(geolocation);

    const restaurantData = {
      name,
      address,
      phone,
      website,
      geolocation,
      service,
      tags,
      city,
      state,
      zipCode,
      restaurantImg
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
        setStatus("Sent");
        const data = await response.json();
        console.log(data);
        router.push('/');
        
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
                      {status ? (
                            <p>{status}</p>
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
                  <p className="text-sm text-coolGray-800 font-semibold">Type of Restaurant</p>
                </div>
                <div className="w-full md:flex-1 p-3">
                  <input
                    className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                    type="text"
                    placeholder="House# Town USA"
                    
                    onChange={(e) => setRestaurantType(e.target.value)}
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
                  <input
                    className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                    type="text"
                    placeholder="House# Town USA"
                   
                    onChange={(e) => setService(e.target.value)}
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
                    placeholder="House# Town USA"
                    
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
                    placeholder="House# Town USA"
                   
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
                    placeholder="House# Town USA"
                    
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
                  <p className="text-sm text-coolGray-800 font-semibold">Upload Image</p>
                </div>
                <div className="w-full md:flex-1 p-3">
                <CldUploadWidget
      signatureEndpoint="/api/sign-cloudinary-params"
      onSuccess={(result, { widget }) => {
        setRestaurantImg(result?.info.public_id); // { public_id, secure_url, etc }
       
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          setRestaurantImg(undefined);
          open();
        }
        return (
          <button onClick={handleOnClick}>
            Upload Restaurant Image
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
