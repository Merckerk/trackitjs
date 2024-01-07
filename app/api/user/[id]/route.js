import User from "@models/userModel";
import { connectToDB } from "@utils/database";

//GET user's expenses
export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const user = await User.findById(params.id);
        if (!user) return new Response("User Not Found.", { status: 404 });

        return new Response(JSON.stringify(user.expenses), { status: 200});
        
    } catch (error) {
        console.log(error);
        return new Response("Internal Server Error", {status: 500})   
    }
}

export const PATCH = async (req, { params }) => {
    const { name, amount, date, expenseId } = await req.json();

    try {
        await connectToDB();
        const existingUser = await User.findById(params.id);

        if (!existingUser) return new Response("User not found", { status: 404 });

        // Find the index of the expense in the expenses array
        const expenseIndex = existingUser.expenses.findIndex(expense => expense._id.toString() === expenseId);

        // Check if the expense with the given ID exists
        if (expenseIndex === -1) {
            return new Response("Expense not found", { status: 404 });
        }

        // Update the properties of the expense
        existingUser.expenses[expenseIndex].name = name;
        existingUser.expenses[expenseIndex].amount = amount;
        existingUser.expenses[expenseIndex].date = date;

        // Save the user with the updated expense
        await existingUser.save();

        return new Response(JSON.stringify(existingUser), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to update expense", { status: 500 });
    }
};
