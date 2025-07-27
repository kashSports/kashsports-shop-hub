import React, { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import { supabase } from "@/integrations/supabase/client"; // Make sure this import is correct

const AdminProductForm: React.FC = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Save product to Supabase
    const { error } = await (supabase as any)
      .from("products")
      .insert([{ name, price: Number(price), image_url: imageUrl }]);

    setSaving(false);

    if (error) {
      alert("Error saving product: " + error.message);
    } else {
      alert("Product saved!");
      setName("");
      setPrice("");
      setImageUrl("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name:</label>
        <input value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label>Price:</label>
        <input value={price} onChange={e => setPrice(e.target.value)} required type="number" />
      </div>
      <div>
        <label>Product Image:</label>
        <ImageUploader onUpload={setImageUrl} />
        {imageUrl && (
          <div>
            <img src={imageUrl} alt="Preview" style={{ width: 120, marginTop: 8 }} />
          </div>
        )}
      </div>
      <button type="submit" disabled={saving || !imageUrl}>
        {saving ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
};

export default AdminProductForm;
