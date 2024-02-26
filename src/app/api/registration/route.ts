import connectDB from "@database/db";
import { NextRequest, NextResponse } from "next/server";
import Users, { IUser } from "@database/userSchema";
const bcrypt = require("bcrypt");

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const {
      username,
      password,
      userType,
      firstName,
      lastName,
      phoneNum,
      email,
    }: IUser = await req.json();
    if (
      !username ||
      !password ||
      !userType ||
      !firstName ||
      !lastName ||
      !phoneNum ||
      !email
    ) {
      return NextResponse.json("Failed: Invalid User", { status: 400 });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new Users({
      username,
      password: hashedPassword,
      userType,
      firstName,
      lastName,
      phoneNum,
      email,
    });
    await newUser.save();
    return NextResponse.json("Success: Registration Complete", { status: 200 });
  } catch (err) {
    return NextResponse.json(`${err}`, { status: 400 });
  }
}
