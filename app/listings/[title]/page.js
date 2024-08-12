"use client"
import Navbar from '@/app/components/navbar/Navbar';
import Single from '@/app/components/single/Single'
import { useEffect, useState } from 'react';

const Page = ({params}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  //console.log(params.title);
  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/addrestaurant/${params.title}`);
        const result = await response.json();
        setLoading(false);
        setData(result);
       // console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getRestaurant();
  }, [params.title]);
  if(!loading){
    return (
      <div>
        <Navbar color={"gray-900"}/>
        {data && 
        <Single singleRestaurant={data}/>
        }
      </div>
    )
  }
}

export default Page;
