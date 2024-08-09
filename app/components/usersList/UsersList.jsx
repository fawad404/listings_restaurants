"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function UsersList() {
  // Debug: Check what `user` contains
 

  // Initialize state correctly based on `user` type
//   const [users, setUsers] = useState([]);

//   // Debug: Check initial state
//   useEffect(() => {
//     const fetchUserData = async () => {
//   try {
//     // Encode the email to handle special characters
   
//     const res = await fetch(`/api/login`);
    
//     if (!res.ok) {
//       throw new Error(`HTTP error! Status: ${res.status}`);
//     }
    
//     const data = await res.json();
//     console.log(data);
//     setUsers(data);
//   } catch (error) {
//     console.error('Failed to fetch user data:', error);
//   }
// };
// fetchUserData();

// },[]);

    return (
      <section className="py-8 md:ml-[320px] mt-8">

         
            <div className="container px-4 mx-auto" >
              <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
                <table className="table-auto w-full">
                  <thead>
                    <tr className="text-xs text-gray-500 text-left">
                      <th className="pl-6 pb-3 font-medium">Username</th>
                      <th className="pb-3 font-medium">Email</th>
                      <th className="pb-3 font-medium">Phone</th>
                      <th className="pb-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {/* { users.map((data) => ( */}
                    <tr className="text-xs bg-gray-50" >
                      <td className="py-5 px-6 font-medium">fawad</td>
                      <td className="font-medium">fawad@gmail.com</td>
                      <td className="font-medium">+9323232323</td>
                      <td>
                        <Link href={`/admin/restaurants-list/32323232`}>
                        <span

                          className={`inline-block py-1 px-2 text-white rounded-full cursor-pointer bg-green-500
                            }`}
                            >
                          Edit
                        </span>
                          </Link>
                      </td>
                    </tr>
                {/* ))} */}
                  </tbody>
                </table>
              </div>
            </div>
        
      </section>
        
    );
  

  }