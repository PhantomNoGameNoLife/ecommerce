import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function POST(req: Request) {
  const { key } = await req.json();
  try {
    await utapi.deleteFiles(key);
    return Response.json({ success: true });
  } catch (e) {
    return Response.json(
      { success: false, error: (e as Error).message },
      { status: 500 }
    );
  }
}
