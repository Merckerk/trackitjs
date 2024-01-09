import { connectToDB } from "@utils/database";
import User from "@models/userModel";

export const PUT = async (req, { params }) => {
  const { expenseId, updatedExpense } = await req.json();

  try {
    await connectToDB();
    const existingUser = await User.findById(params.id);

    if (!existingUser) {
      return new Response("User not found", { status: 404 });
    }

    const expenseToUpdate = existingUser.expenses.find(
      (expense) => expense._id.toString() === expenseId
    );

    if (!expenseToUpdate) {
      return new Response("Expense not found", { status: 404 });
    }

    Object.assign(expenseToUpdate, updatedExpense);

    await existingUser.save();

    return new Response(JSON.stringify(existingUser), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update expense", { status: 500 });
  }
};


