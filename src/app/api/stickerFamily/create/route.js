import { NextResponse } from "next/server";
import StickerFamily from "../../model/stickerFamilyModel";
import Sticker from "../../model/stickerModel";
import { ObjectId } from "mongodb";

export async function POST(req) {
    try {
        let reqData = await req.json()

        let images = reqData.stickerImage
        if (!images || images.length < 2 || images.length > 5) {
            return NextResponse.json("please insert 2-5 Images ")

        }
        console.log(reqData.isCustom)
        let createFamily = await StickerFamily.create({ name: reqData.name, thumbnail: reqData.thumbnail, isCustom: reqData.isCustom, createdBy: new ObjectId(reqData.userId) })
        console.log("first")
        for (let i = 0; i < images.length; i++) {
            let sticker = await Sticker.create({ image: images[i], isCustom: reqData.isCustom, createdBy: new ObjectId(reqData.userId), stickerFamilyId: createFamily._id })
        }
        return NextResponse.json(createFamily)
    }
    catch (error) {
        return NextResponse.json(error, { status: 400 })

    }



}