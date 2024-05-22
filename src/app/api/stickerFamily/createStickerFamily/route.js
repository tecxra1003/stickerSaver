import { NextResponse } from "next/server";
import StickerFamily from "../../model/stickerFamilyModel";
import jwt from "jsonwebtoken"
export async function POST(req) {
    try {
        let reqData = await req.json()
        let authToken = req.headers.get("authToken")
        if (!authToken) {
            return NextResponse.json("unAuthorized")

        }
        let user = jwt.verify(authToken, process.env.jwtSecret)
        console.log(user)
        let createFamily = await StickerFamily.create({ name: reqData.name, thumbnail: reqData.thumbnail, isCustom: user.type == "Admin" ? false : true, createdBy: user._id })
        return NextResponse.json(createFamily)
    }
    catch (error) {
        return NextResponse.json(error)

    }



}