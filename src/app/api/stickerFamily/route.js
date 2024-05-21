import { NextResponse } from "next/server";
import StickerFamily from "../model/stickerFamilyModel";
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
        let createFamily = await StickerFamily.create({ name: reqData.name, thumbnail: reqData.thumbnail, isCustom: user.user.type == "Admin" ? false : true, createdBy: user.user._id })
        return NextResponse.json(createFamily)
    }
    catch (error) {
        return NextResponse.json(error)
    }



}
export async function GET(req) {
    try {
        let authToken = req.headers.get("authToken")
        if (!authToken) {
            return NextResponse.json("please provide a authentication token")

        }
        let user = jwt.verify(authToken, jwtSecret)
        let getFamily = await StickerFamily.find({ createdBy: user.user._id })
        return NextResponse.json(getFamily)
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
        let newFamily = {}
        if (reqData.name) { newFamily.name = reqData.name }
        if (reqData.thumbnail) { newFamily.thumbnail = reqData.thumbnail }
        if (reqData.iscustom) { newFamily.iscustom = reqData.iscustom }
        let updatedFamily = await StickerFamily.findByIdAndUpdate(id, { $set: newFamily })
        return NextResponse.json(updatedFamily)

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

        let updatedFamily = await StickerFamily.findByIdAndUpdate(id, { $set: { isDeleted: true } })
        return NextResponse.json(updatedFamily)

    }
    catch (error) {
        return NextResponse.json(error)
    }

}

