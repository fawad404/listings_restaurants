"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function UsersList() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchUsers = async() => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/getUsers`);

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
          setError('Failed to fetch users.');
        }
      } catch (error) {
        setError('An error occurred while fetching users.');
      }
    }
    fetchUsers();
  }, []);

    return (
      <section className="py-8 md:ml-[320px] mt-8">

         
            <div className="container px-4 mx-auto" >
              <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
                <table className="table-auto w-full">
                  <thead>
                    <tr className="text-xs text-gray-500 text-left">
                      <th className="pl-6 pb-3 font-medium">Username</th>
                      <th className="pb-3 font-medium">Email</th>
                      <th className="pb-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  { data.map((data) => (
                    <tr className="text-xs bg-gray-50" >
                      <td className="py-5 px-6 font-medium">{data.username}</td>
                      <td className="font-medium">{data.email}</td>
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
                 ))}
                  </tbody>
                </table>
              </div>
            </div>
        
      </section>
        
    );
  

  }