// pages/api/restaurants.js
import Restaurant from '@/app/utilis/model/restaurant';
import { connectToDB } from '@/app/utilis/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { latitude, longitude, range } = await request.json();

    await connectToDB();

    // Function to calculate the distance between two coordinates
    const haversineDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Radius of the Earth in kilometers
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in kilometers
    };

    // Fetch only verified restaurants
    const restaurants = await Restaurant.find({ verified: true });

    // Filter restaurants by distance
    const filteredRestaurants = restaurants.filter((restaurant) => {
      const { lat, lon } = restaurant.geolocation;
      return haversineDistance(latitude, longitude, lat, lon) <= range;
    });

    return NextResponse.json(filteredRestaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
