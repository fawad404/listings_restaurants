"use client";
import React, { useEffect, useState } from 'react';
import RestaurantsList from '../components/restaurantsList/RestaurantsList';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Page = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!session) {
      router.push('/');
    } else {
      setLoading(false);
    }
  }, [session, status, router]);

  return (
    <div>
      {!loading && <RestaurantsList />}
    </div>
  );
}

export default Page;
