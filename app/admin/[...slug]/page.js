"use client";
import EditRestaurant from '@/app/components/editRestaurant/EditRestaurant';
import RestaurantsList from '@/app/components/restaurantsList/RestaurantsList';
import SearchQueries from '@/app/components/searchQueries/SearchQueries';
import UsersList from '@/app/components/usersList/UsersList';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const Page = ({ params }) => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const slug = params.slug || []; // Ensure slug is an array

  // Check if the slug array is available
  if (!slug.length) {
    return null; // Or render a loading state
  }

  // Match URL patterns
  if (Array.isArray(slug) && slug.length === 2 && slug[0] === 'restaurants-list' && /^[0-9a-fA-F]{24}$/.test(slug[1])) {
    return (
      <div className="mt-8 md:ml-[320px] top-0">
        <EditRestaurant id={slug[1]} />
      </div>
    );
  } else if (slug.length === 1 && slug[0] === 'restaurants-list') {
    return (
      <RestaurantsList />
    );
  } else if (slug.length === 1 && slug[0] === 'users-list') {
    return (
        <UsersList />
    );
  } else if (slug.length === 1 && slug[0] === 'search-queries') {
    return (
      <SearchQueries />
    );
  } else {
    return (
      <div className="mt-8 md:ml-[320px] top-0">
        Page not Found
      </div>
    );
  }
};

export default Page;
