import { NextResponse } from "next/server";
import Sticker from "../../../model/stickerModel";
import jwt from "jsonwebtoken"
export async function DELETE(req, context) {
    try {
        let id = context.params.id
        let authToken = req.headers.get("authToken")
        if (!authToken) {
            return NextResponse.json("unAuthorized")

        }
        let user = jwt.verify(authToken, process.env.jwtSecret)

        let updatedSticker = await Sticker.findByIdAndUpdate(id, { $set: { isDeleted: true, deletedAt: new Date() } })
        return NextResponse.json(updatedSticker)

    }
    catch (error) {
        return NextResponse.json("error")
    }

}