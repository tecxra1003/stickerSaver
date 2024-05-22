import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "../../model/userModel";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',

            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials

                const user = await User.findOne({ email });
                if (!user) {
                    return null
                }
                const matchedPassword = await bcrypt.compare(password, user.password)
                if (!matchedPassword) {
                    return null
                }




                return user


            }
        })
    ],

    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/"
    },
    callbacks: {
        async jwt({ token, user }) {

            if (user?.id) {
                token.id = user.id;
                token.accessToken = (jwt.sign({ user }, process.env.jwtSecret))

            }


            return token
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.accessToken = token.accessToken


            return session;
        }
    }


}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }