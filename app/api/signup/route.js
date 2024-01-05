import { connectToDB } from "@utils/database";
import User from "@models/userModel";
import bcryptjs from "bcryptjs";

export const POST = async (req, res) => {
  try {
    await connectToDB();
    const reqBody = await req.json();
    const { username, email, password } = reqBody;

    const userNameCheck = await User.findOne({ username });
    const emailCheck = await User.findOne({ email });

    if (userNameCheck) {
      return new Response("Username already exists.", { status: 400 });
    }
    if (emailCheck) {
      return new Response("Email already exists.", { status: 400 });
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    await User.create({
      username,
      email,
      password: hashedPassword,
      expenses: [],
    });

    return new Response("Successfully created an account.", { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create an account.", { status: 500 });
  }
};
