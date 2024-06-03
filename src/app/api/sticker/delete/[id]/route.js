import { NextResponse } from "next/server";
import Sticker from "../../../model/stickerModel";

export async function DELETE(req, context) {
    try {
        let id = context.params.id
        let sticker = await Sticker.findById(id)
        let stickers = await Sticker.find({ stickerFamilyId: sticker.stickerFamilyId, isDeleted: false }).select("-image")
        if (stickers.length <= 2) {
            return NextResponse.json("stickers of a family cannot be less than 2", { status: 400 })
        }



        let updatedSticker = await Sticker.findByIdAndUpdate(id, { $set: { isDeleted: true, deletedAt: new Date() } })
        return NextResponse.json(updatedSticker)

    }
    catch (error) {
        return NextResponse.json("error")
    }

}