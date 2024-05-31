import { NextResponse } from "next/server";
import StickerFamily from "../../../model/stickerFamilyModel";
import User from "../../../model/userModel";
export async function GET(req, context) {
    try {
        const searchParams = req.nextUrl.searchParams
        const limit = searchParams.get('limit')
        const page = searchParams.get('page')
        let user = await User.find({ _id: context.params.id })
        user = user[0]
        if (user.type == "Admin") {
            let getFamily = await StickerFamily.find({ isDeleted: false }).sort({ createdAt: -1 }).limit(limit).skip((page) * limit)
            return NextResponse.json(getFamily)
        }
        else {
            let getFamily = await StickerFamily.find({ createdBy: context.params.id, isDeleted: false }).sort({ createdAt: -1 }).limit(limit).skip((page) * limit)
            return NextResponse.json(getFamily)
        }
        return NextResponse.json(user)
    }
    catch (error) {
        return NextResponse.json("error")
    }

}