import { connectToDB } from "@utils/database";
import User from "@models/userModel";


export const GET = async (req, { params }) => {
    const { expenseId } = req.query;

    try {
        await connectToDB();
        const existingUser = await User.findById(params.id);

        if (!existingUser) {
            return new Response("User not found", { status: 404 });
        }

        const expenseDetails = existingUser.expenses.find(
            (expense) => expense._id.toString() === expenseId
        );

        if (!expenseDetails) {
            return new Response("Expense not found", { status: 404 });
        }

        return new Response(JSON.stringify(expenseDetails), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch expense details", { status: 500 });
    }
};
