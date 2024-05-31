import { NextResponse } from "next/server";
import Sticker from "../../../model/stickerModel";
export async function GET(req, context) {
    try {
        const searchParams = req.nextUrl.searchParams
        const limit = searchParams.get('limit')
        const page = searchParams.get('page')
        let id = context.params.id

        let getSticker = await Sticker.find({ stickerFamilyId: id, isDeleted: false }).sort({ createdAt: -1 }).limit(limit).skip((page) * limit)
        return NextResponse.json(getSticker)


    }
    catch (error) {
        return NextResponse.json(error)
    }

}