import { NextResponse } from "next/server";
import Sticker from "../../model/stickerModel";
import jwt from "jsonwebtoken"
import stickerFamily from "../../model/stickerFamilyModel";
export async function GET(req) {
    try {
        let authToken = req.headers.get("authToken")
        if (!authToken) {
            return NextResponse.json("unAuthorized1")

        }
        let user = jwt.verify(authToken, process.env.jwtSecret)
        let total = await Sticker.countDocuments({ isDeleted: false })
        let totalOfUser = await Sticker.countDocuments({ createdBy: user._id, isDeleted: false })
        let totalFamilies = await stickerFamily.countDocuments({ isDeleted: false })
        return NextResponse.json({ total, totalOfUser, totalFamilies })
    }
    catch (error) {
        return NextResponse.json("error")
    }

}