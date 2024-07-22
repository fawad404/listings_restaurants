import { restaurants } from "@/app/utilis/db"; 
import { NextResponse } from "next/server";

// Handle GET request
export  function GET(req) {

  let filteredRestaurants = restaurants;

  return NextResponse.json(filteredRestaurants);
}

// Handle POST request
export async function POST(req) {
  const body = await req.json();
  const { what, location } = body;

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
