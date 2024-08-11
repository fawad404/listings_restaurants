"use client";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from 'date-fns';
export default function SearchQueries() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSeearches = async() => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/searchQueries`);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setData(data);
          // if (data.length === 0) {
          //   setError('Sorry, we donot have restaurants near your location.');
          // } else {
          //   setRestaurants(data);
          //   console.log(data);
          // }
        } else {
          setError('Failed to fetch restaurants.');
        }
      } catch (error) {
        setError('An error occurred while fetching restaurants.');
      }
    }
    fetchSeearches();
  }, []);
  return (
  
      
    <section className="py-8 md:ml-[320px] mt-8">
  <div className="container px-4 mx-auto">
    <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr className="text-xs text-gray-500 text-left">
            <th className="pl-6 pb-3 font-medium">Search</th>
            <th className="pb-3 font-medium">Time</th>
            </tr>
        </thead>
        <tbody>


        {data.map((result) => (
          <tr className="text-xs bg-gray-50 mt-8">
            <td className="py-5 px-6 font-medium">name: {result.what}, location: {result.location}</td>
            <td className="font-medium">
            {formatDistanceToNow(new Date(result.createdAt), { addSuffix: true })}
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