import { NextResponse } from "next/server";
import Sticker from "../../../model/stickerModel";
export async function DELETE(req, context) {
    try {
        let id = context.params.id


        let updatedSticker = await Sticker.findByIdAndUpdate(id, { $set: { isDeleted: true, deletedAt: new Date() } })
        return NextResponse.json(updatedSticker)

    }
    catch (error) {
        return NextResponse.json("error")
    }

}