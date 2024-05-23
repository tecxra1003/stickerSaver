import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import stickerFamily from "@/app/api/model/stickerFamilyModel";
export async function GET(req, context) {
    try {
        const { id } = context.params
        let authToken = req.headers.get("authToken")
        if (!authToken) {
            return NextResponse.json("unAuthorized")

        }
        let user = jwt.verify(authToken, process.env.jwtSecret)
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