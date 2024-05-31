import { NextResponse } from "next/server";
export async function GET(req) {

    try {


        return NextResponse.json(user)
    }
    catch (error) {
        return NextResponse.json("unAuthorized")

    }

}