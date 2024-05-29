import User from "@models/userModel";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const user = await User.findById(params.id);
        if (!user) return new Response("User Not Found.", { status: 404 });

        const filteredExpenses = user.expenses.filter((expense) => {
            return expense.isArchived == true;
        }) 

        return new Response(JSON.stringify(filteredExpenses), { status: 200});
        
    } catch (error) {
        console.log(error);
        return new Response("Internal Server Error", {status: 500})   
    }
}