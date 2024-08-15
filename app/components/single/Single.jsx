"use client"
import React, { useEffect, useState } from 'react'
import SingleLeft from '../singleLeft/SingleLeft'
import SingleRight from '../singleRight/SingleRight'

const Single = ({ singleRestaurant }) => {
  console.log(singleRestaurant);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/fetchRestaurants/${singleRestaurant.title}`);
        const result = await response.json();
        setData(result);
        setLoading(false);
        // Assuming result contains title and description fields
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    getRestaurant();
  }, [singleRestaurant.title]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <section className="py-0">
  <div className="container px-4 mx-auto">
    <div className="flex flex-wrap -mx-4 -mb-8">
      <div className="w-full md:w-2/3 px-4 mb-8">
       <SingleLeft data={data} />
      </div>
      <div className="w-full md:w-1/3 px-4 mb-8">
       <SingleRight data={data} />
      </div>
    </div>
  </div>
</section>
  )
}

export default Single
