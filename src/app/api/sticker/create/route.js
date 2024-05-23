import { NextResponse } from "next/server";
import Sticker from "../../model/stickerModel";
import jwt from "jsonwebtoken"
export async function POST(req) {
    try {
        let reqData = await req.json()
        let authToken = req.headers.get("authToken")
        if (!authToken) {
            return NextResponse.json("unAuthorized")

        }
        let user = jwt.verify(authToken, process.env.jwtSecret)
        let createSticker = await Sticker.create({ name: reqData.name, image: reqData.image, isCustom: user.type == "Admin" ? false : true, createdBy: user._id, stickerFamilyId: reqData.stickerFamilyId })
        return NextResponse.json(createSticker)
    }
    catch (error) {
        return NextResponse.json(error)
    }



}