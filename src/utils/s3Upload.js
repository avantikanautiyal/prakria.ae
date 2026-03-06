export async function s3Upload(file) {
  if (!file) return null;

  try {
    // 1. Create FormData
    const formData = new FormData();
    formData.append('file', file);

    // 2. Upload to our server-side API
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Upload failed');

    // 3. Return the final public URL
    return data.url;
  } catch (error) {
    console.error('s3Upload Error:', error);
    throw error;
  }
}
