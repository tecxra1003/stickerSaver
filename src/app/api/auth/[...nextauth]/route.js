import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "../../model/userModel";
import bcrypt from "bcrypt"
import dbConnect from "@/app/lib/mongodb";

export const authOptions = {

    providers: [
        CredentialsProvider({
            name: 'credentials',

            credentials: {},
            async authorize(credentials, req) {
                await dbConnect()

                const { email, password } = credentials
                const user = await User.findOne({ email });
                if (!user) {
                    return null
                }
                const matchedPassword = await bcrypt.compare(password, user.password)
                if (!matchedPassword) {
                    return null
                }




                return {
                    "_id": "665d6cb25fa68286e5f9e5e2",
                    "name": "ammad khan",
                    "email": "abc@gmail.com",
                    "password": "$2b$10$juwCNlj8HEzzEnJbTT/NwOG09VyOqOyehUjEBYf8lgp6cXD7WMLEm",
                    "type": "User",
                    "isDeleted": false,
                    "deletedAt": null,
                    "createdAt": {
                        "$date": "2024-06-03T07:11:46.766Z"
                    },
                    "updatedAt": {
                        "$date": "2024-06-03T07:11:46.766Z"
                    },
                    "__v": 0
                }


            }
        })
    ],

    secret: "ammadisagoodboy",
    pages: {
        signIn: "/"
    },
    callbacks: {
        async jwt({ token, user }) {

            if (user?.id) {
                token.id = user.id;
                token.type = user.type
            }


            return token
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.type = token.type


            return session;
        }
    }


}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }