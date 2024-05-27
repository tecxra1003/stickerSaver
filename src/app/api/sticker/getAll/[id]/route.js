import { NextResponse } from "next/server";
import Sticker from "../../../model/stickerModel";
import jwt from "jsonwebtoken"
export async function GET(req, context) {
    try {
        const searchParams = req.nextUrl.searchParams
        const limit = searchParams.get('limit')
        const page = searchParams.get('page')
        let id = context.params.id
        let authToken = req.headers.get("authToken")
        if (!authToken) {
            return NextResponse.json("unAuthorized")

        }
        let user = jwt.verify(authToken, process.env.jwtSecret)

        if (user.type == "Admin") {
            let getSticker = await Sticker.find({ stickerFamilyId: id, isDeleted: false }).sort({ createdAt: -1 }).limit(limit).skip((page) * limit)
            return NextResponse.json(getSticker)
        }
        else {
            let getSticker = await Sticker.find({ createdBy: user._id, stickerFamilyId: id, isDeleted: false }).sort({ createdAt: -1 }).limit(limit).skip((page) * limit)

            return NextResponse.json(getSticker)
        }
    }
    catch (error) {
        return NextResponse.json(error)
    }

}