import { connectToDB } from "@utils/database";
import User from "@models/userModel";

export const GET = async (req, { query, params }) => {
  try {
    const queryParams = new URLSearchParams(req.url.split("?")[1]); // Extract query parameters
    const expenseId = queryParams.get("expenseId");


    await connectToDB();

    const user = await User.findById(params.id);
    if (!user) return new Response("User Not Found.", { status: 404 });

    const expense = user.expenses.find(
      (expense) => expense._id.toString() === expenseId
    );
    if (!expense) return new Response("Expense Not Found.", { status: 404 });

    // const returnData = {
    //   user: user,
    //   expenses: user.expenses,
    //   expenseId: expenseId,
    //   specificExpense: expense
    // }

    return new Response(JSON.stringify(expense), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
