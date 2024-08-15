import Restaurant from "@/app/utilis/model/restaurant";
import { connectToDB } from "@/app/utilis/mongodb";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    // Connect to the database
    await connectToDB();

    // Extract query parameters from the request URL
    const url = new URL(req.url);
    const verified = url.searchParams.get('verified'); // e.g., 'true' or 'false'
    const name = url.searchParams.get('name'); // Filter by restaurant name

    // Build the filter object
    const filters = {};
    if (verified) {
      filters.verified = verified === 'true'; // Convert to boolean
    }
    if (name) {
      filters.name = { $regex: name, $options: 'i' }; // Case-insensitive partial match
    }

    // Query the database to get filtered results, sorted in descending order
    // Here we use `_id` for sorting in descending order; if you have a `createdAt` field, use that instead.
    const restaurants = await Restaurant.find(filters)
      .sort({ _id: -1 }) // Sort by `_id` in descending order
      .lean();

    // Return the results as a JSON response
    return NextResponse.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return NextResponse.json({ error: 'Failed to fetch restaurants' }, { status: 500 });
  }
};
