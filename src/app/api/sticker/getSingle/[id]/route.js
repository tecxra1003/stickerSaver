import { NextResponse } from "next/server";
import Sticker from "../../../model/stickerModel";
import jwt from "jsonwebtoken"
export async function GET(req, context) {
    try {
        let id = context.params.id
        let authToken = req.headers.get("authToken")
        if (!authToken) {
            return NextResponse.json("unAuthorized")

        }
        let user = jwt.verify(authToken, process.env.jwtSecret)
        let getSticker = await Sticker.find({ _id: id, isDeleted: false })
        return NextResponse.json(...getSticker)
    }
    catch (error) {
        return NextResponse.json(error)
    }

}