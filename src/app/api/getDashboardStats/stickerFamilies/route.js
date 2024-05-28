import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import stickerFamily from "../../model/stickerFamilyModel";
export async function GET(req) {
    try {
        let authToken = req.headers.get("authToken")
        if (!authToken) {
            return NextResponse.json("unAuthorized1")

        }
        let user = jwt.verify(authToken, process.env.jwtSecret)

        if (user.type == "Admin") {
            let totalFamilies = await stickerFamily.countDocuments({ isDeleted: false })
            return NextResponse.json(totalFamilies)
        }
        else {
            let totalFamilies = await stickerFamily.countDocuments({ createdBy: user._id, isDeleted: false })
            return NextResponse.json(totalFamilies)
        }
    }
    catch (error) {
        return NextResponse.json("error")
    }

}