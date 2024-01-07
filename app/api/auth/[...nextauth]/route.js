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

          console.log(process.env.NEXTAUTH_SECRET);
          if (!validPassword) {
            console.log("Invalid password");
            return null;
          } else {
            console.log("Valid password");
            console.log("user to return:", user);
            return user;
          }
        } catch (error) {
          console.error("Error during authorization:", error);
          throw new Error("Failed to login");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.id = user.id;
      }
      console.log("token:", token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.id = token.id;
      }
      console.log("sesh:", session);
      return session;
    },
  },

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
