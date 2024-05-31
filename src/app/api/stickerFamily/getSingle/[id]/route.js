import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import stickerFamily from "@/app/api/model/stickerFamilyModel";
export async function GET(req, context) {
    try {
        const { id } = context.params

        let getFamily = await stickerFamily.aggregate([
            {
                $lookup: {
                    from: "stickers",
                    localField: "_id",
                    foreignField: "stickerFamilyId",
                    as: "stickers"
                }
            },
            { $match: { _id: new ObjectId(id) } },






        ]).exec()
        return NextResponse.json(...getFamily)
    }
    catch (error) {
        return NextResponse.json(error)
    }

}