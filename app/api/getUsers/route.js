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
