"use client"
import Footer from '@/app/components/footer/Footer';
import Navbar from '@/app/components/navbar/Navbar';
import Single from '@/app/components/single/Single';
import { useEffect, useState } from 'react';
import Head from 'next/head';

const Page = ({ params }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [metaData, setMetaData] = useState({ title: '', description: '' });

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/fetchRestaurants/${params.title}`);
        const result = await response.json();
        setData(result);
        setLoading(false);
        // Assuming result contains title and description fields
        setMetaData({
          title: result.name || 'Default Title',
          description: result.slug || 'Default description'
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    getRestaurant();
  }, [params.title]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
      </Head>
      <Navbar color={"gray-900"} />
      {data && <Single singleRestaurant={data} />}
      <Footer />
    </div>
  );
};

export default Page;
