import { NextResponse } from "next/server";
import StickerFamily from "../../model/stickerFamilyModel";
export async function PUT(req) {
    try {
        let { id, ...reqData } = await req.json()
        let stickerFamily = await StickerFamily.find({ name: reqData.name, isDeleted: false })
        if (stickerFamily.length > 0 && reqData.name) {
            return NextResponse.json("each family must have a unique name", { status: 400 })
        }
        let newFamily = {}
        if (reqData.name) { newFamily.name = reqData.name }
        if (reqData.thumbnail) { newFamily.thumbnail = reqData.thumbnail }
        if (reqData.isCustom) { newFamily.isCustom = reqData.isCustom }
        let updatedFamily = await StickerFamily.findByIdAndUpdate(id, { $set: newFamily })
        return NextResponse.json(updatedFamily)

    }
    catch (error) {
        return NextResponse.json(error)
    }

}