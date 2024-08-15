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
  
  export const PATCH = async (req, { params }) => {
    try {
      if (!params || !params.id) {
        return NextResponse.json({ error: 'Restaurant ID is required.' }, { status: 400 });
      }
  
      // Parse the request body
      const body = await req.json();
      const { name, address, phone, website, service, tags, city, state, zipCode, restaurantImg, verified } = body;
      const { id } = params;
  
      // Connect to the database
      await connectToDB();
  
      // Find the restaurant by ID
      const restaurant = await Restaurant.findById(id);
      if (!restaurant) {
        return NextResponse.json({ error: 'Restaurant not found.' }, { status: 404 });
      }
  
      // Update the restaurant fields only if they are provided
      if (name !== undefined) restaurant.name = name;
      if (address !== undefined) restaurant.address = address;
      if (phone !== undefined) restaurant.phone = phone;
      if (website !== undefined) restaurant.website = website;
      if (service !== undefined) restaurant.service = service;
      if (tags !== undefined) restaurant.tags = tags;
      if (city !== undefined) restaurant.city = city;
      if (state !== undefined) restaurant.state = state;
      if (zipCode !== undefined) restaurant.zipCode = zipCode;
      if (restaurantImg !== undefined) restaurant.restaurantImg = restaurantImg;
      if (verified !== undefined) restaurant.verified = verified;
  
      // Save the updated restaurant
      const updatedRestaurant = await restaurant.save();
  
      // Respond with the updated restaurant
      return NextResponse.json(updatedRestaurant, { status: 200 });
    } catch (error) {
      console.error('Error updating restaurant:', error);
      return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
  };
  


export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: 'Restaurant ID is required.' }, { status: 400 });
    }

    // Connect to the database
    await connectToDB();

    // Find and delete the restaurant by ID
    const result = await Restaurant.findByIdAndDelete(id);
    
    if (!result) {
      return NextResponse.json({ error: 'Restaurant not found.' }, { status: 404 });
    }

    // Respond with a success message
    return NextResponse.json({ message: 'Restaurant deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
};
