export async function s3Upload(file) {
  if (!file) return null;

  try {
    // 1. Get pre-signed URL from our API
    const res = await fetch('/api/upload/presigned', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName: file.name,
        contentType: file.type,
      }),
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to get upload URL');

    const { uploadUrl, fileUrl } = data;

    // 2. Upload directly to S3
    const uploadRes = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!uploadRes.ok) throw new Error('S3 upload failed');

    // 3. Return the final public URL
    return fileUrl;
  } catch (error) {
    console.error('s3Upload Error:', error);
    throw error;
  }
}
