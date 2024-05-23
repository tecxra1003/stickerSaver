import { NextResponse } from "next/server";
import StickerFamily from "../../model/stickerFamilyModel";
import jwt from "jsonwebtoken"
import Sticker from "../../model/stickerModel";
export async function POST(req) {
    try {
        let reqData = await req.json()
        let authToken = req.headers.get("authToken")
        if (!authToken) {
            return NextResponse.json("unAuthorized")

        }
        let images = reqData.stickerImage
        if (!images || images.length < 2 || images.length > 5) {
            return NextResponse.json("please insert 2-5 Images ")

        }
        let user = jwt.verify(authToken, process.env.jwtSecret)
        let createFamily = await StickerFamily.create({ name: reqData.name, thumbnail: reqData.thumbnail, isCustom: user.type == "Admin" ? false : true, createdBy: user._id })
        console.log(createFamily._id.toString())
        for (let i = 0; i < images.length; i++) {
            console.log(images[i])
            let sticker = await Sticker.create({ image: images[i], isCustom: true, createdBy: "664f1d7f90479546ad8552d9", stickerFamilyId: "664f1d7f90479546ad8552d9" })
            console.log(sticker)
        }
        return NextResponse.json(createFamily)
    }
    catch (error) {
        return NextResponse.json("error")

    }



}