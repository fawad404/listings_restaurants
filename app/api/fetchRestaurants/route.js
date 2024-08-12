import Restaurant from "@/app/utilis/model/restaurant";
import { connectToDB } from "@/app/utilis/mongodb";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
      // Connect to the database
      await connectToDB();
  
      // Query the database to get all users
      const restaurants = await Restaurant.find({}).lean(); // Use lean() to get plain JavaScript objects
  
      // Return the users as a JSON response
      return NextResponse.json(restaurants);
    } catch (error) {
      console.error('Error fetching users:', error);
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
  };