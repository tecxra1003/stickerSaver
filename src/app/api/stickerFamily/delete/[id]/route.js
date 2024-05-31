import { NextResponse } from "next/server";
import StickerFamily from "../../../model/stickerFamilyModel";
export async function DELETE(req, context) {
    try {
        let { id } = context.params

        let updatedFamily = await StickerFamily.findByIdAndUpdate(id, { $set: { isDeleted: true, deletedAt: new Date() } })
        return NextResponse.json(updatedFamily)

    }
    catch (error) {
        return NextResponse.json(error)
    }

}
