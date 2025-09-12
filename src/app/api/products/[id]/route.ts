import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const res = await fetch(`${process.env.NEXT_URL}/products/${id}`);
  const data = await res.json();

  return NextResponse.json(data);
}
