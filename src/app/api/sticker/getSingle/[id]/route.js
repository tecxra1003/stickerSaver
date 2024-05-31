import { NextResponse } from "next/server";
import Sticker from "../../../model/stickerModel";
export async function GET(req, context) {
    try {
        let id = context.params.id

        let getSticker = await Sticker.find({ _id: id, isDeleted: false })
        return NextResponse.json(...getSticker)
    }
    catch (error) {
        return NextResponse.json(error)
    }

}