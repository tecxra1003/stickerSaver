import { NextResponse } from "next/server";
import Sticker from "../../model/stickerModel";
export async function POST(req) {
    try {
        let reqData = await req.json()

        let createSticker = await Sticker.create({ name: reqData.name, image: reqData.image, isCustom: reqData.isCustom, createdBy: reqData.userId, stickerFamilyId: reqData.stickerFamilyId })
        return NextResponse.json(createSticker)
    }
    catch (error) {
        return NextResponse.json(error)
    }



}