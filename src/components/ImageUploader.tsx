import React, { useState } from "react";

interface ImageUploaderProps {
  onUpload: (url: string) => void;
}

const CLOUDINARY_UPLOAD_PRESET = "kash_preset"; // Set in Cloudinary settings
const CLOUDINARY_CLOUD_NAME = "dmubonvht"; // From Cloudinary dashboard

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.secure_url) {
        onUpload(data.secure_url);
      } else {
        setError("Upload failed.");
      }
    } catch (err) {
      setError("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
      {uploading && <p>Uploading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ImageUploader;
