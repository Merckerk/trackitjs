import { connectToDB } from "@utils/database";
import User from "@models/userModel";

export const PATCH = async (req, { params, query }) => {
  // const expenseId = query.get("expenseId");
  // const { updatedExpense } = await req.json();

  try {
    console.log("req", req.query);
    // const queryParams = new URLSearchParams(req.url.split("?")[1]); // Extract query parameters
    // const expenseId = queryParams.get("expenseId");

    await connectToDB();
    // console.log("expense Id:", expenseId);

    const existingUser = await User.findById(params.id);

    if (!existingUser) {
      return new Response("User not found", { status: 404 });
    }

    console.log("user", existingUser);

    // const expenseToUpdate = existingUser.expenses.find(
    //   (expense) => expense._id.toString() === expenseId
    // );

    // if (!expenseToUpdate) {
    //   return new Response("Expense not found", { status: 404 });
    // }

    // Object.assign(expenseToUpdate, updatedExpense);

    // await existingUser.save();

    return new Response(JSON.stringify(existingUser), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update expense", { status: 500 });
  }
};
