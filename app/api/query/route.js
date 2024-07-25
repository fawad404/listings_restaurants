import { restaurants } from '@/app/utilis/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const url = new URL(req.url);
  const what = url.searchParams.get('what');
  const location = url.searchParams.get('location');
  console.log('Value of what:', what); // Print the value of 'what'

  let filteredRestaurants = restaurants;

  if (what) {
    filteredRestaurants = filteredRestaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(what.toLowerCase()) ||
      restaurant.food.toLowerCase().includes(what.toLowerCase()) ||
      restaurant.service.toLowerCase().includes(what.toLowerCase())
    );
  }

  if (location) {
    filteredRestaurants = filteredRestaurants.filter(restaurant =>
      restaurant.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  return NextResponse.json(filteredRestaurants);
}
