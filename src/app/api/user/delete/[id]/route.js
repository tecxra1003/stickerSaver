import { NextResponse } from "next/server";
import User from "../../../model/userModel";
import jwt from "jsonwebtoken"
export async function DELETE(req, context) {

    try {
        let authToken = req.headers.get("authToken")

        if (!authToken) {
            return NextResponse.json("unAuthorized")

        }


        let user = jwt.verify(authToken, process.env.jwtSecret)
        let deleteUser = await User.findByIdAndUpdate(context.params.id, {
            $set: {
                isDeleted: true, deletedAt: new Date()
            }
        })
        return NextResponse.json(deleteUser)

    }
    catch (error) {
        return NextResponse.json("unAuthorized")

    }

}