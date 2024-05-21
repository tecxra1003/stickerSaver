import { NextResponse } from "next/server";
import User from "../model/userModel";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const jwtSecret = "ammadisagoodb$oy"
// creating a login request using Post:http://localhost:3000/api/login
export async function POST(req) {
    try {

        let data = await req.json()
        let user = await User.findOne({ email: data.email })
        console.log(user)
        if (!user) {
            return NextResponse.json("give right credentials")
        }

        let matchedPassword = await bcrypt.compare(data.password, user.password)
        if (!matchedPassword) {
            return NextResponse.json("give right credentials")
        }
        let authToken = jwt.sign({ user }, jwtSecret)


        return NextResponse.json(authToken)
    }
    catch (error) {
        return NextResponse.json("error")

    }




}
