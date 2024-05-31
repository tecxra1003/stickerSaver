import { NextResponse } from "next/server";
import User from "../../model/userModel";
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"
export async function PUT(req) {




    return NextResponse.json("unAuthorized")

}
