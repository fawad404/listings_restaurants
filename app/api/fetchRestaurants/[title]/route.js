import Restaurant from "@/app/utilis/model/restaurant";
import { connectToDB } from "@/app/utilis/mongodb";
import { NextResponse } from "next/server";


export const GET = async (req, { params }) => {
    try {
      // Connect to the database
      await connectToDB();
  
      // Extract the user ID from the URL parameters
      const { title } = params;
  
      if (!title) {
        return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
      }
  
      // Query the database to get a specific user by ID
      const restaurant = await Restaurant.findOne({ slug: title }).lean();; // Use findById for a single user
  
      if (!restaurant) {
        return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
      }
  
      // Return the user as a JSON response
      return NextResponse.json(restaurant);
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      return NextResponse.json({ error: 'Failed to fetch restaurant' }, { status: 500 });
    }
  };