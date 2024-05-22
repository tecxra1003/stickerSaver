import { NextResponse } from "next/server";
import User from "../../model/userModel";
import bcrypt, { hash } from "bcrypt"
export async function POST(req) {

    try {

        let user = await req.json()

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt)

        const createUser = await User.create({ name: user.name, email: user.email, password: hash, imageUrl: user.url, type: user.type })
        return NextResponse.json(user)
    }
    catch (error) {
        return NextResponse.json(error)

    }




}