import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  const response = await fetch(`${process.env.NEXT_URL}/categories`);
  const data = await response.json();
  return NextResponse.json(data);
}