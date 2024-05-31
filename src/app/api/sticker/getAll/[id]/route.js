import { NextResponse } from "next/server";
import Sticker from "../../../model/stickerModel";
import User from "../../../model/userModel";
export async function GET(req, context) {
    try {
        const searchParams = req.nextUrl.searchParams
        const limit = searchParams.get('limit')
        const page = searchParams.get('page')
        let user = await User.find({ _id: context.params.id })
        user = user[0]
        if (user.type == "User") {
            let getSticker = await Sticker.find({ createdBy: context.params.id, isDeleted: false }).sort({ createdAt: -1 }).limit(limit).skip((page) * limit)

            return NextResponse.json(getSticker)
        }
        else if (user.type == "Admin") {
            let getSticker = await Sticker.find({ isDeleted: false }).sort({ createdAt: -1 }).limit(limit).skip((page) * limit)
            return NextResponse.json(getSticker)
        }
    }
    catch (error) {
        return NextResponse.json(error)
    }

}