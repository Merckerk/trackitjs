import User from "@models/userModel";
import { connectToDB } from "@utils/database";
import bcryptjs from "bcryptjs";

export const PATCH = async (req, { params }) => {
  const { userId, expenseId, isToArchive } = await req.json();
  try {
    await connectToDB();
    const existingUser = await User.findById(userId);

    if (!existingUser) return new Response("User not found", { status: 404 });

    const expenseToUpdate = existingUser.expenses.find(
      (expense) => expense._id.toString() === expenseId
    );

    
    console.log("expense To Update:", expenseToUpdate);

    expenseToUpdate.isArchived = isToArchive;

    await existingUser.save();
    console.log("userid",userId);

    return new Response(JSON.stringify(existingUser), { status: 200 });
  } catch (error) {
    console.error("Error during expense addition:", error);
    return new Response("Failed to update user.", { status: 500 });
  }
};
