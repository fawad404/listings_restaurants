"use client";
import { useState, useEffect } from "react";

export default function SearchQueries() {
 // const [data, setData] = useState([]);

//   useEffect(() => {
//     // Ensure `user` is always an array
//     if (Array.isArray(user)) {
//       setData(user);
//     } else if (user && typeof user === 'object') {
//       // If `user` is a single object, wrap it in an array
//       setData([user]);
//     } else {
//       // Handle cases where `user` is neither an array nor an object
//       console.error("Expected user to be an array or an object, received:", user);
//       setData([]);
//     }
//   }, [user]);
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
        {/* {data.map((result) => ( */}


          <tr className="text-xs bg-gray-50">
            <td className="py-5 px-6 font-medium">name: sushi, location: faisalabad</td>
            <td className="font-medium">09/04/2021</td>
          </tr>
        {/* //   ))} */}
        </tbody>
      </table>
    </div>
  
  </div>
</section>

  );
}