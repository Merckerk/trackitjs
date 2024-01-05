import { connectToDB } from "@utils/database";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@models/userModel";
import bcryptjs from "bcryptjs";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        console.log("recieved creds", credentials);
        const { username, password } = credentials;

        try {
          await connectToDB();
          const user = await User.findOne({ username });

          //Error handling if username does not exist
          if (!user) {
            console.log("User not found");
            return null;
          }

          //Check password if correct
          const validPassword = await bcryptjs.compare(password, user.password);

          console.log("Password comparison result:", validPassword);

          if (!validPassword) {
            console.log("Invalid password");
            return null;
          } else {
            console.log("Valid password");
          }

          const userWithoutImage = { ...user.toObject() };
          delete userWithoutImage.image;

          return userWithoutImage;
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
