"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function RestaurantsList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurantsData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/fetchRestaurants`);
        
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log(data);
        setRestaurants(data);
      } catch (error) {
        console.error('Failed to fetch restaurants data:', error);
      }
    };
    fetchRestaurantsData();
  }, []);

  const togglePaymentStatus = async (id) => {
    const updatedRestaurant = restaurants.find(restaurant => restaurant._id === id);
    if (!updatedRestaurant) {
      console.error('Restaurant not found');
      return;
    }

    const newStatus = updatedRestaurant.verified ? "false" : true;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/addrestaurant/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verified: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update restaurant');

      const updatedRestaurants = restaurants.map(restaurant =>
        restaurant._id === id ? { ...restaurant, verified: newStatus } : restaurant
      );
      alert('Verificaiton changed');
      setRestaurants(updatedRestaurants);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section className="py-8 md:ml-[320px] mt-8">
      <div className="container px-4 mx-auto">
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
              {restaurants.map((data) => (
                <tr className="text-xs bg-gray-50" key={data._id}>
                  <td className="py-5 px-6 font-medium">{data.name}</td>
                  <td className="font-medium">{data.website}</td>
                  <td className="font-medium">{data.phone}</td>
                  <td>
                    <span
                      onClick={() => togglePaymentStatus(data._id)}
                      className={`inline-block py-1 px-2 text-white rounded-full cursor-pointer ${
                        data.verified ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      {data.verified ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td>
                    <Link href={`/admin/restaurants-list/${data._id}`}>
                      <span className="inline-block py-1 px-2 text-white rounded-full cursor-pointer bg-green-500">
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
