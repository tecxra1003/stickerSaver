import { NextResponse } from "next/server";
import Sticker from "../../../model/stickerModel";
import User from "@/app/api/model/userModel";
import dbConnect from "@/app/lib/mongodb";
export async function GET(req, context) {
    try {
        await dbConnect()
        let user = await User.find({ _id: context.params.id })
        user = user[0]
        let total = await Sticker.countDocuments({ isDeleted: false })

        return NextResponse.json(total)
    }
    catch (error) {
        return NextResponse.json("error")
    }

}