"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CldUploadWidget } from 'next-cloudinary';
import { useSession } from "next-auth/react";

const AddRestaurant = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [isLocationAvailable, setIsLocationAvailable] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!session) {
      router.push('/signin');
    } else {
      setLoading(false);
    }
  }, [session, status, router]);

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
  const [slug, setSlug] = useState('');
  const [statuss, setStatuss] = useState("");
  const [hasSelected, setHasSelected] = useState(false);
  const [hasServiceSelected, setHasServiceSelected] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setRestaurantType(value);
    if (value !== '') {
      setHasSelected(true);
    }
  };

  const handleServiceChange = (e) => {
    const value = e.target.value;
    setService(value);
    if (value !== '') {
      setHasServiceSelected(true);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeolocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setIsLocationAvailable(true); // Set to true when location is successfully retrieved
        },
        (error) => {
          console.error("Error getting location:", error);
          setGeolocation({ lat: null, lon: null });
          setIsLocationAvailable(false); // Set to false if there is an error
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setGeolocation({ lat: null, lon: null });
      setIsLocationAvailable(false);
    }
  }, []);

  //generate slug for seo 

  const generateSlug = (text) => {
    const parts = text.split(/[^\w\s]/).filter(part => part.trim() !== ''); // Split by non-word characters and filter out empty parts
    if (parts.length === 0) {
      return ''; // Return an empty string if there are no valid parts
    }
    return parts[parts.length - 1].trim().toLowerCase().replace(/\s+/g, '-'); // Take the last part, trim spaces, and replace spaces with hyphens
  };

  const handleSeo = (e) => {
    const newTitle = e.target.value;
    setSlug(generateSlug(newTitle));
  };

  //console.log(slug);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !address || !phone || !website || !service || !tags || !city || !state || !zipCode || !restaurantType || !restaurantImg || !slug) {
      alert('All fields must be filled out');
      return;
    }

    if (!isLocationAvailable || geolocation.lat === null || geolocation.lon === null) {
      alert('Kindly allow location access to add your restaurant');
      return;
    }

    setStatuss("Sending...");
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
      type: restaurantType,
      restaurantImg,
      slug,
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
        console.log(data);
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
                  <select
                    className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                    value={restaurantType}
                    onChange={handleChange}
                  >
                    {!hasSelected && <option value="" disabled>Select a type</option>}
                    <option value="food-truck">Food Truck</option>
                    <option value="restaurant">Restaurant</option>
                  </select>
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
                  <select
                    className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                    value={service}
                    onChange={handleServiceChange}
                  >
                    {!hasServiceSelected && <option value="" disabled>Select a type</option>}
                    <option value="dine-in">Dine in</option>
                    <option value="take-out">Take out</option>
                    <option value="buffet">Buffet</option>
                    <option value="catering">Catering</option>
                  </select>
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
