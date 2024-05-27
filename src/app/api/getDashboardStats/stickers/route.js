import { NextResponse } from "next/server";
import Sticker from "../../model/stickerModel";
import jwt from "jsonwebtoken"
export async function GET(req) {
    try {
        let authToken = req.headers.get("authToken")
        if (!authToken) {
            return NextResponse.json("unAuthorized1")

        }
        let user = jwt.verify(authToken, process.env.jwtSecret)
        let total = await Sticker.countDocuments({ isDeleted: false })

        return NextResponse.json(total)
    }
    catch (error) {
        return NextResponse.json("error")
    }

}