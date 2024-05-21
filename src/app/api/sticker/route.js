import { NextResponse } from "next/server";
import Sticker from "../model/stickerModel";
import jwt from "jsonwebtoken"
const jwtSecret = "ammadisagoodb$oy"
export async function POST(req) {
    try {
        let reqData = await req.json()
        let authToken = req.headers.get("authToken")
        if (!authToken) {
            return NextResponse.json("please provide a authentication token")

        }
        let user = jwt.verify(authToken, jwtSecret)
        let createSticker = await Sticker.create({ name: reqData.name, image: reqData.image, isCustom: user.user.type == "Admin" ? false : true, createdBy: user.user._id, stickerFamilyId: reqData.stickerFamilyId })
        return NextResponse.json(createSticker)
    }
    catch (error) {
        return NextResponse.json(error)
    }



}
export async function GET(req) {
    try {
        const searchParams = req.nextUrl.searchParams
        const stickerFamilyId = searchParams.get('stickerFamilyId')
        let authToken = req.headers.get("authToken")
        if (!authToken) {
            return NextResponse.json("please provide a authentication token")

        }
        let user = jwt.verify(authToken, jwtSecret)
        let getSticker = await Sticker.find({ stickerFamilyId: stickerFamilyId, isDeleted: false })
        return NextResponse.json(getSticker)
    }
    catch (error) {
        return NextResponse.json(error)
    }

}
export async function PUT(req) {
    try {
        let { id, ...reqData } = await req.json()
        let authToken = req.headers.get("authToken")
        if (!authToken) {
            return NextResponse.json("please provide a authentication token")

        }
        let user = jwt.verify(authToken, jwtSecret)
        let newSticker = {}
        if (reqData.name) { newSticker.name = reqData.name }
        if (reqData.image) { newSticker.image = reqData.image }
        if (reqData.isCustom) { newSticker.isCustom = reqData.isCustom }
        let updatedSticker = await Sticker.findByIdAndUpdate(id, { $set: newSticker })
        return NextResponse.json(updatedSticker)

    }
    catch (error) {
        return NextResponse.json(error)
    }

}
export async function DELETE(req) {
    try {
        let { id } = await req.json()
        let authToken = req.headers.get("authToken")
        if (!authToken) {
            return NextResponse.json("please provide a authentication token")

        }
        let user = jwt.verify(authToken, jwtSecret)

        let updatedSticker = await Sticker.findByIdAndUpdate(id, { $set: { isDeleted: true } })
        return NextResponse.json(updatedSticker)

    }
    catch (error) {
        return NextResponse.json(error)
    }

}

