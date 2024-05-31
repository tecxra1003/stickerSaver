import { NextResponse } from "next/server";
import stickerFamily from "../../../model/stickerFamilyModel";
import User from "@/app/api/model/userModel";
export async function GET(req, context) {
    try {
        let user = await User.find({ _id: context.params.id })
        user = user[0]

        if (user.type == "Admin") {
            let totalFamilies = await stickerFamily.countDocuments({ isDeleted: false })
            return NextResponse.json(totalFamilies)
        }
        else {
            let totalFamilies = await stickerFamily.countDocuments({ createdBy: user._id, isDeleted: false })
            return NextResponse.json(totalFamilies)
        }
    }
    catch (error) {
        return NextResponse.json("error")
    }

}