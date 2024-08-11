import Search from "@/app/utilis/model/search";
import { connectToDB } from "@/app/utilis/mongodb";
import { NextResponse } from "next/server";


export const GET = async (req) => {
    try {
      // Connect to the database
      await connectToDB();
  
      // Query the database to get all users
      const searches = await Search.find({}).lean(); // Use lean() to get plain JavaScript objects
  
      // Return the users as a JSON response
      return NextResponse.json(searches);
    } catch (error) {
      console.error('Error fetching searches:', error);
      return NextResponse.json({ error: 'Failed to fetch searches' }, { status: 500 });
    }
  };
export const POST = async (req) => {
    try {
      // Parse the request body
      const body = await req.json();
      const { what, location } = body;
  
      // Check if all required fields are provided
      if (!what) {
        return NextResponse.json({ error: 'Search is required.' }, { status: 400 });
      }
  
      // Connect to the database
      await connectToDB();
  
      // Check if a restaurant with the same name already exists
    //   const existingSearch = await Search.findOne({ name });
    //   if (existingSearch) {
    //     return NextResponse.json({ error: 'Restaurant with this name already exists.' }, { status: 400 });
    //   }
  
    //   // Check if a restaurant with the same website already exists
    //   const existingRestaurantByWebsite = await Restaurant.findOne({ website });
    //   if (existingRestaurantByWebsite) {
    //     return NextResponse.json({ error: 'Restaurant with this website already exists.' }, { status: 400 });
    //   }
  
      // Create a new restaurant
      const newSearch = new Search({
        what,
        location
      });
  
      // Save the restaurant to the database
      const search = await newSearch.save();
  
      // Respond with the newly created restaurant
      return NextResponse.json(search, { status: 201 });
    } catch (error) {
      // Log error for debugging
      console.error('Error inserting search:', error);
      return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
  }