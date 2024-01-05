export const PATCH = async (req, { params }) => {
    const { expenseId } = await req.json();

    try {
        await connectToDB();
        const existingUser = await User.findById(params.id);

        if (!existingUser) return new Response("User not found", { status: 404 });

        existingUser.expenses = existingUser.expenses.filter(expense => expense._id.toString() !== expenseId);

        await existingUser.save();

        return new Response(JSON.stringify(existingUser), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to delete expense", { status: 500 });
    }
};
