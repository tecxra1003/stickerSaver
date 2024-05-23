import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
export async function GET(req) {

    try {
        let authToken = req.headers.get("authToken")
        if (!authToken) {
            return NextResponse.json("unAuthorized")

        }
        let user = jwt.verify(authToken, process.env.jwtSecret)

        return NextResponse.json(user)
    }
    catch (error) {
        return NextResponse.json("unAuthorized")

    }

}