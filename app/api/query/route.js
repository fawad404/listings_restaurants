
import Restaurant from '@/app/utilis/model/restaurant';
import { connectToDB } from '@/app/utilis/mongodb';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const url = new URL(req.url);
  const what = url.searchParams.get('what');
  const location = url.searchParams.get('location');
  console.log('Value of what:', what); // Print the value of 'what'

  await connectToDB();
  
  // Create the base query object
  let query = {};

  // Add filters based on the 'what' parameter
  if (what) {
    query = {
      $or: [
        { name: { $regex: what, $options: 'i' } },
        { zipCode: { $regex: what, $options: 'i' } },
        { state: { $regex: what, $options: 'i' } },
        { city: { $regex: what, $options: 'i' } }
      ]
    };
  }

  // Add filter based on the 'location' parameter
  if (location) {
    query = {
      ...query,
      city: { $regex: location, $options: 'i' }
    };
  }

  // Fetch filtered restaurants from MongoDB
  const restaurants = await Restaurant.find(query);

  return NextResponse.json(restaurants);
}
