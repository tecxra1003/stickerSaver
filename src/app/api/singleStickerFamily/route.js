import { NextResponse } from "next/server";
import StickerFamily from "../model/stickerFamilyModel";
import jwt from "jsonwebtoken"
const jwtSecret = "ammadisagoodb$oy"
export async function GET(req) {
    try {
        const searchParams = req.nextUrl.searchParams
        const stickerFamilyId = searchParams.get('stickerFamilyId')
        let authToken = req.headers.get("authToken")
        if (!authToken) {
            return NextResponse.json("please provide a authentication token")

        }
        let user = jwt.verify(authToken, jwtSecret)
        let getFamily = await StickerFamily.find({ _id: stickerFamilyId })
        return NextResponse.json(getFamily)
    }
    catch (error) {
        return NextResponse.json(error)
    }

}