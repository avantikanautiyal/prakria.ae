import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

export async function uploadToS3(file, fileName, contentType) {
  const region = process.env.REGION || 'us-east-1';
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Body: file,
    ContentType: contentType,
    ACL: 'public-read', // Ensure public accessibility if allowed
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command).catch(async (e) => {
      // Fallback if ACL is not supported by the bucket
      if (e.name === 'AccessControlListNotSupported' || e.message.includes('ACL')) {
        console.warn('ACL not supported, trying without ACL');
        delete params.ACL;
        const fallbackCommand = new PutObjectCommand(params);
        return await s3Client.send(fallbackCommand);
      }
      throw e;
    });
    return `https://${process.env.S3_BUCKET_NAME}.s3.${region}.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw error;
  }
}

export async function generatePresignedUrl(fileName, contentType) {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    ContentType: contentType,
    ACL: 'public-read', // Request public access for pre-signed upload
  };

  try {
    const command = new PutObjectCommand(params);
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return url;
  } catch (error) {
    // If ACL causes issues here, try without it
    console.warn("Retrying presigned URL without ACL");
    delete params.ACL;
    const command = new PutObjectCommand(params);
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return url;
  }
}

