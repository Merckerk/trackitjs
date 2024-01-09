import User from "@models/userModel";
import { connectToDB } from "@utils/database";
import bcryptjs from "bcryptjs";

//add expense to user
export const PATCH = async (req, { params }) => {
  const { userId, expenseId, updatedExpense } = await req.json();
  try {
    await connectToDB();
    // Find and update the user with the new data
    const existingUser = await User.findById(userId);

    if (!existingUser) return new Response("User not found", { status: 404 });

    const expenseToUpdate = existingUser.expenses.find(
      (expense) => expense._id.toString() === expenseId
    );
    console.log("userid",userId);
    console.log("expense To Update:", expenseToUpdate);
    console.log("updated expense:",updatedExpense);

    await existingUser.save();
    return new Response(JSON.stringify(existingUser), { status: 200 });
  } catch (error) {
    console.error("Error during expense addition:", error);
    return new Response("Failed to update user.", { status: 500 });
  }
};
