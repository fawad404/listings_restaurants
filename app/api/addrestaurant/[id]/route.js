import Restaurant from "@/app/utilis/model/restaurant";
import { connectToDB } from "@/app/utilis/mongodb";
import { NextResponse } from "next/server";


export const GET = async (req, { params }) => {
    try {
      // Connect to the database
      await connectToDB();
  
      // Extract the user ID from the URL parameters
      const { id } = params;
  
      if (!id) {
        return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
      }
  
      // Query the database to get a specific user by ID
      const user = await Restaurant.findById(id).lean(); // Use findById for a single user
  
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
  
      // Return the user as a JSON response
      return NextResponse.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }
  };