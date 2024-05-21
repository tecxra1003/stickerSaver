import { NextResponse } from "next/server";
import User from "../model/userModel";
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"
const jwtSecret = "ammadisagoodb$oy"
export async function POST(req) {

    try {

        let user = await req.json()

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt)

        const createUser = await User.create({ name: user.name, email: user.email, password: hash, imageUrl: user.url, type: user.type })
        return NextResponse.json(user)
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

        return NextResponse.json(user)
    }
    catch (error) {
        return NextResponse.json("please provide correct authentication token")

    }

}

export async function PUT(req) {

    try {
        let authToken = req.headers.get("authToken")
        let reqData = await req.json()
        if (!authToken) {
            return NextResponse.json("please provide a authentication token")

        }


        let user = jwt.verify(authToken, jwtSecret)
        let newUser = {}
        if (reqData.password) {


            const matchedpassword = await bcrypt.compare(reqData.password, user.password)
            if (!matchedpassword) {
                return NextResponse.json({ mes: "Wrong Password" }, {
                    status: 400,
                })
            }
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(reqData.newPassword, salt)
            newUser.password = hash
        }
        if (reqData.name) { newUser.name = reqData.name }
        if (reqData.email) { newUser.email = reqData.email }
        if (reqData.password) { newUser.password = hash }
        if (reqData.type) { newUser.type = reqData.type }
        if (reqData.url) { newUser.url = reqData.url }

        let updatedUser = await User.findByIdAndUpdate(user.user._id, { $set: newUser })
        return NextResponse.json(updatedUser)

    }
    catch (error) {
        return NextResponse.json("please provide correct authentication token")

    }
}
export async function DELETE(req) {

    try {
        let authToken = req.headers.get("authToken")

        if (!authToken) {
            return NextResponse.json("please provide a authentication token")

        }


        let user = jwt.verify(authToken, jwtSecret)
        let deleteUser = await User.findByIdAndUpdate(user.user._id, { $set: { isDeleted: true } })
        return NextResponse.json(deleteUser)

    }
    catch (error) {
        return NextResponse.json("please provide correct authentication token")

    }

}