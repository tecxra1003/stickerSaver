import { NextResponse } from "next/server";
import StickerFamily from "../../model/stickerFamilyModel";
import jwt from "jsonwebtoken"
export async function GET(req) {
    try {
        const searchParams = req.nextUrl.searchParams
        const limit = searchParams.get('limit')
        const page = searchParams.get('page')
        let authToken = req.headers.get("authToken")
        if (!authToken) {
            return NextResponse.json("unAuthorized")

        }

        let user = jwt.verify(authToken, process.env.jwtSecret)
        let getFamily = await StickerFamily.find({ createdBy: user._id }).limit(limit).skip((page) * limit)
        return NextResponse.json(getFamily)
    }
    catch (error) {
        return NextResponse.json(error)
    }

}