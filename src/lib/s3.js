import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadToS3(file, fileName, contentType) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: file,
    ContentType: contentType,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw error;
  }
}
