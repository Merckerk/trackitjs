import User from "@models/userModel";
import { connectToDB } from "@utils/database";
import bcryptjs from "bcryptjs";

//add expense to user
export const PATCH = async (req, { params }) => {
    const { userId, expense } =
      await req.json();
    try {
      await connectToDB();
      // Find and update the user with the new data
      const existingUser = await User.findById(userId);
  
      if (!existingUser) return new Response("User not found", { status: 404 });
  
      // Response if user is updated successfully
      existingUser.expenses.push(expense);
  
      await existingUser.save();
      return new Response(JSON.stringify(existingUser), { status: 200 });
    } catch (error) {
        console.error("Error during expense addition:", error);
      return new Response("Failed to update user.", { status: 500 });
    }
  };