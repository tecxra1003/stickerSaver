import { NextResponse } from "next/server";
import StickerFamily from "../../../model/stickerFamilyModel";
import jwt from "jsonwebtoken"
export async function DELETE(req, context) {
    try {
        let { id } = context.params
        let authToken = req.headers.get("authToken")
        if (!authToken) {
            return NextResponse.json("unAuthorized")

        }
        let user = jwt.verify(authToken, process.env.jwtSecret)

        let updatedFamily = await StickerFamily.findByIdAndUpdate(id, { $set: { isDeleted: true, deletedAt: new Date() } })
        return NextResponse.json(updatedFamily)

    }
    catch (error) {
        return NextResponse.json(error)
    }

}
