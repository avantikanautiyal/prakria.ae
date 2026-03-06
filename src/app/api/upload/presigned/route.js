import { NextResponse } from "next/server";
import { generatePresignedUrl } from "@/lib/s3";

export async function POST(req) {
  try {
    const { fileName, contentType } = await req.json();

    if (!fileName || !contentType) {
      return NextResponse.json(
        { success: false, error: "Missing filename or contentType" },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const sanitizedFileName = fileName.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9.\-_]/g, "");
    const uniqueFileName = `${timestamp}-${sanitizedFileName}`;

    const presignedUrl = await generatePresignedUrl(uniqueFileName, contentType);
    
    // Construct the final public URL
    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${uniqueFileName}`;

    return NextResponse.json({ 
      success: true, 
      uploadUrl: presignedUrl,
      fileUrl: fileUrl 
    });
  } catch (error) {
    console.error("Presigned API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
