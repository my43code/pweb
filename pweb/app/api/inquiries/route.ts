import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Inquiry from "@/models/inquiries";

export async function POST(req: Request) {
  const body = await req.json();
  await dbConnect();

  const saved = await Inquiry.create(body);
  return NextResponse.json({ ok: true, id: saved._id });
}

export async function GET() {
  await dbConnect();
  const items = await Inquiry.find().sort({ createdAt: -1 });
  return NextResponse.json(items);
}