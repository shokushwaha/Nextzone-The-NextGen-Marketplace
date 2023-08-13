import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import md5 from "md5";


const adminEmails = ["6f1370b01cbabc921b8e87272e2fec40", "0166a104631632ff61d8280a6a4bf9c2", "518950e28fee1b9ea3100a4f5790d8e3"];

export const authOptions = {

    debug: true,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
        session: async ({ session, user }) => {

            if (!adminEmails.includes(md5(user?.email))) {
                console.log("Not authenticated")
                return false;
            }
            session.user.isAdmin = true;
            return session;
        },
    },
};

export default NextAuth(authOptions);
