import { NextResponse } from "next/server";
import Sticker from "../../model/stickerModel";
export async function PUT(req) {
    try {
        let { id, ...reqData } = await req.json()

        let newSticker = {}
        if (reqData.name) { newSticker.name = reqData.name }
        if (reqData.image) { newSticker.image = reqData.image }
        if (reqData.isCustom) { newSticker.isCustom = reqData.isCustom }
        if (reqData.stickerFamilyId) { newSticker.stickerFamilyId = reqData.stickerFamilyId }

        let updatedSticker = await Sticker.findByIdAndUpdate(id, { $set: newSticker })
        return NextResponse.json(updatedSticker)

    }
    catch (error) {
        return NextResponse.json("error")
    }

}