import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import { connectToDb } from "../../../../utils/database";
import User from "../../../../models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    async session({session}) {
        const sessionUser = await User.findOne({
            email: session.user.email
        })

        session.user.id = sessionUser._id.toString();

        return session;

    },
    async signIn({profile}){
        try {
            await connectToDb();

            //Check if user aleady exists
            const userExists = await User.findOne({
                email: profile.email
            });

            //Create if not

            if(!userExists){
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ","").toLowerCase(),
                    image: profile.picture
                })
            }
        } catch (error) {
            
        }

    }
})

export {handler as GET, handler as POST};