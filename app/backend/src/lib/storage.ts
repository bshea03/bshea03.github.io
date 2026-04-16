import { Storage } from "@google-cloud/storage";
import path from "path";

const { GCS_KEY_FILE, GCS_BUCKET_NAME } = process.env;
if (!GCS_BUCKET_NAME) throw new Error("GCS_BUCKET_NAME is not set");
if (!GCS_KEY_FILE) throw new Error("GCS_KEY_FILE is not set");

const storage = new Storage({ keyFilename: path.resolve(GCS_KEY_FILE) });
const bucket = storage.bucket(GCS_BUCKET_NAME);

export async function getSignedUploadUrl(
  filename: string,
  contentType: string,
): Promise<{ signedUrl: string; publicUrl: string }> {
  const file = bucket.file(filename);
  const [signedUrl] = await file.getSignedUrl({
    version: "v4",
    action: "write",
    expires: Date.now() + 15 * 60 * 1000,
    contentType,
  });
  const publicUrl = `https://storage.googleapis.com/${GCS_BUCKET_NAME}/${filename}`;
  return { signedUrl, publicUrl };
}
