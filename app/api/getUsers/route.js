import User from "@/app/utilis/model/user";
import { connectToDB } from "@/app/utilis/mongodb";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        // Connect to the database
        await connectToDB();

        // Query the database to get all users
        const users = await User.find({}).lean(); // Use lean() to get plain JavaScript objects

        // Exclude the password field from each user object
        const usersWithoutPassword = users.map(user => {
            const { password, createdAt, updatedAt,  ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        // Return the users as a JSON response
        return NextResponse.json(usersWithoutPassword);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
};


export const POST = async (req) => {
    try {
      // Connect to the database
      await connectToDB();
  
      // Extract the email from the request body
      const { email } = await req.json();
  
      if (!email) {
        return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
      }
  
      // Query the database to get a specific user by email
      const user = await User.findOne({ email }).lean(); // Use findOne to search by email
  
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
  
      // Return the user as a JSON response
      return NextResponse.json(user.isAdmin);
    } catch (error) {
      console.error('Error fetching user by email:', error);
      return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }
  };