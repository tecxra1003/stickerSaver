import { NextResponse } from "next/server";
import StickerFamily from "../../../model/stickerFamilyModel";
import Sticker from "@/app/api/model/stickerModel";
export async function DELETE(req, context) {
    try {
        let { id } = context.params

        let updatedFamily = await StickerFamily.findByIdAndUpdate(id, { $set: { isDeleted: true, deletedAt: new Date() } })
        let deleteSticker = await Sticker.find({ stickerFamilyId: id })
        for (let i = 0; i < deleteSticker.length; i++) {
            let deletedSticker = await Sticker.findByIdAndUpdate(deleteSticker[i]._id, { $set: { isDeleted: true, deletedAt: new Date() } })
        }
        return NextResponse.json(updatedFamily)

    }
    catch (error) {
        return NextResponse.json(error)
    }

}
