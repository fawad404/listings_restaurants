"use client";
import { useEffect, useState } from "react";
import { fetchData } from "./utilis/getData";
import Product from "./components/product/Product";
import Featured from "./components/featured/Featured";
import { city } from "./utilis/db";
import Navbar from "./components/navbar/Navbar";
export default function Home() {
  const [data, setData] = useState(null); // Changed initial state to null

  useEffect(() => {
    const fetchDataAsync = async () => {
      const result = await fetchData();
      setData(result);
    };

    fetchDataAsync();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/query?what=Sushi&location=Tokyo"); // Replace with your API endpoint
      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(city);
  return (
    <>
    
    <Featured />
    <Product />
    </>
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
    
     

    //   <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outsline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="food name" />
    //  <button onClick={handleSubmit}>submit</button>

    // {data ? (
    //     data.map((item) => (
    //       <h1 key={item.id}>{item.name}</h1>
    //     ))
    //   ) : (
    //     <h1>Loading...</h1>
    //   )}
    // </main>
  );
}
