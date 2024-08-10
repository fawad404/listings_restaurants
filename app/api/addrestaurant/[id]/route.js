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
      const { name, address, phone, website, service, tags, city, state, zipCode, restaurantImg } = body;
      const { id } = params;
  
      // Connect to the database
      await connectToDB();
  
      // Find the restaurant by ID
      const restaurant = await Restaurant.findById(id);
      if (!restaurant) {
        return NextResponse.json({ error: 'Restaurant not found.' }, { status: 404 });
      }
  
      // Update the restaurant fields only if they are provided
      restaurant.name = name || restaurant.name;
      restaurant.address = address || restaurant.address;
      restaurant.phone = phone || restaurant.phone;
      restaurant.website = website || restaurant.website;
      restaurant.service = service || restaurant.service;
      restaurant.tags = tags || restaurant.tags;
      restaurant.city = city || restaurant.city;
      restaurant.state = state || restaurant.state;
      restaurant.zipCode = zipCode || restaurant.zipCode;
      restaurant.restaurantImg = restaurantImg || restaurant.restaurantImg;
  
      // Save the updated restaurant
      const updatedRestaurant = await restaurant.save();
  
      // Respond with the updated restaurant
      return NextResponse.json(updatedRestaurant, { status: 200 });
    } catch (error) {
      console.error('Error updating restaurant:', error);
      return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
  };
  