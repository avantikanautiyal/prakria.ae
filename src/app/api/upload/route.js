import { NextResponse } from "next/server";
import { uploadToS3 } from "@/lib/s3";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const sanitizedFileName = file.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9.\-_]/g, "");
    const fileName = `${Date.now()}-${sanitizedFileName}`;
    const contentType = file.type;

    const fileUrl = await uploadToS3(buffer, fileName, contentType);

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error("Upload Route Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
