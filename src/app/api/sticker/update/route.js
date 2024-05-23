import { NextResponse } from "next/server";
import Sticker from "../../model/stickerModel";
import jwt from "jsonwebtoken"
export async function PUT(req) {
    try {
        let { id, ...reqData } = await req.json()
        let authToken = req.headers.get("authToken")
        if (!authToken) {
            return NextResponse.json("unAuthorized")

        }
        let user = jwt.verify(authToken, process.env.jwtSecret)
        let newSticker = {}
        if (reqData.name) { newSticker.name = reqData.name }
        if (reqData.image) { newSticker.image = reqData.image }
        if (reqData.isCustom) { newSticker.isCustom = reqData.isCustom }
        let updatedSticker = await Sticker.findByIdAndUpdate(id, { $set: newSticker })
        return NextResponse.json(updatedSticker)

    }
    catch (error) {
        return NextResponse.json(error)
    }

}