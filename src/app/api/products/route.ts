import { NextRequest, NextResponse } from "next/server";

export async function GET(req :NextRequest) {
  const res = await fetch(`${process.env.NEXT_URL}/products`);
  const data = await res.json();
  return NextResponse.json(data);
}