import { NextResponse } from "next/server";
import StickerFamily from "../../model/stickerFamilyModel";
import jwt from "jsonwebtoken"
export async function PUT(req) {
    try {
        let { id, ...reqData } = await req.json()
        let authToken = req.headers.get("authToken")
        if (!authToken) {
            return NextResponse.json("unAuthorized")

        }
        let user = jwt.verify(authToken, process.env.jwtSecret)
        let newFamily = {}
        if (reqData.name) { newFamily.name = reqData.name }
        if (reqData.thumbnail) { newFamily.thumbnail = reqData.thumbnail }
        if (reqData.isCustom) { newFamily.isCustom = reqData.isCustom }
        let updatedFamily = await StickerFamily.findByIdAndUpdate(id, { $set: newFamily })
        return NextResponse.json(updatedFamily)

    }
    catch (error) {
        return NextResponse.json(error)
    }

}