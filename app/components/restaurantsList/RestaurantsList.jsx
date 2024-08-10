"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function RestaurantsList() {
  // Debug: Check what `user` contains
 

  // Initialize state correctly based on `user` type
  const [restaurants, setRestaurants] = useState([]);

  // Debug: Check initial state
  useEffect(() => {
    const fetchRestaurantsData = async () => {
  try {
    // Encode the email to handle special characters
   
    const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/addrestaurant`);
    
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    
    const data = await res.json();
    console.log(data);
    setRestaurants(data);
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
};
fetchRestaurantsData();

},[]);
const status = 'Not';

    return (
      <section className="py-8 md:ml-[320px] mt-8">

         
            <div className="container px-4 mx-auto" >
              <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
                <table className="table-auto w-full">
                  <thead>
                    <tr className="text-xs text-gray-500 text-left">
                      <th className="pl-6 pb-3 font-medium">Restaurant Name</th>
                      <th className="pb-3 font-medium">Website</th>
                      <th className="pb-3 font-medium">Phone</th>
                      <th className="pb-3 font-medium">Approved</th>
                      <th className="pb-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  { restaurants.map((data) => (
                    <tr className="text-xs bg-gray-50" key={data._id} >
                      <td className="py-5 px-6 font-medium">{data.name}</td>
                      <td className="font-medium">{data.website}</td>
                      <td className="font-medium">{data.phone}</td>
                      <td>
                        <span
                          className={`inline-block py-1 px-2 text-white rounded-full cursor-pointer ${
                            status === 'Yes' ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        >
                          {status}
                        </span>
                      </td>

                      <td>
                        <Link href={`/admin/restaurants-list/${data._id}`}>
                        <span

                          className={`inline-block py-1 px-2 text-white rounded-full cursor-pointer bg-green-500
                            }`}
                            >
                          Edit
                        </span>
                          </Link>
                      </td>
                    </tr>
                ))}
                  </tbody>
                </table>
              </div>
            </div>
        
      </section>
        
    );
  

  }