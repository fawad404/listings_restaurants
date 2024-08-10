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


export const POST = async (req) => {
  try {
    // Parse the request body
    const body = await req.json();
    const { name, address, phone, website, geolocation } = body;

    // Check if all required fields are provided
    if (!name || !address || !phone || !website || !geolocation) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Connect to the database
    await connectToDB();

    // Check if a restaurant with the same name already exists
    const existingRestaurantByName = await Restaurant.findOne({ name });
    if (existingRestaurantByName) {
      return NextResponse.json({ error: 'Restaurant with this name already exists.' }, { status: 400 });
    }

    // Check if a restaurant with the same website already exists
    const existingRestaurantByWebsite = await Restaurant.findOne({ website });
    if (existingRestaurantByWebsite) {
      return NextResponse.json({ error: 'Restaurant with this website already exists.' }, { status: 400 });
    }

    // Create a new restaurant
    const newRestaurant = new Restaurant({
      name,
      address,
      phone,
      website,
      geolocation,
    });

    // Save the restaurant to the database
    const restaurant = await newRestaurant.save();

    // Respond with the newly created restaurant
    return NextResponse.json(restaurant, { status: 201 });
  } catch (error) {
    // Log error for debugging
    console.error('Error inserting restaurant:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
