import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { User } from "@/db/models/User";
import dbConnect from "@/db/connect";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id;
      session.accessToken = token.accessToken;
      return session;
    },
    async signIn({ profile }) {
      console.log("profile", profile);

      try {
        await dbConnect();

        const userExist = await User.findOne({ email: profile.email });

        if (!userExist) {
          const user = await User.create({
            email: profile.email,
            name: profile.name,
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};
export default NextAuth(authOptions);
