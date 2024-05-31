import { NextResponse } from "next/server";
import Sticker from "../../../model/stickerModel";
import User from "@/app/api/model/userModel";
export async function GET(req, context) {
    try {
        let user = await User.find({ _id: context.params.id })
        user = user[0]
        let totalStickerOfUser = await Sticker.countDocuments({ createdBy: user._id, isDeleted: false })
        return NextResponse.json(totalStickerOfUser)
    }
    catch (error) {
        return NextResponse.json("error")
    }

}