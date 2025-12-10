import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../api/productsApi";
import React from "react";

export default function AddProduct() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [previewImage, setPreviewImage] = React.useState("");

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/products");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    const form = new FormData(e.target);
    const newProduct = {
      title: form.get("title"),
      price: form.get("price"),
      image: form.get("image"),
    };

    mutation.mutate(newProduct);
  }

  function handleImageChange(e) {
    setPreviewImage(e.target.value);
  }

  return (
    <div className="p-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md border"
      >
        <h1 className="text-2xl font-bold mb-4">Add Product</h1>

        <div className="mb-4">
          <label className="font-semibold">Title</label>
          <input
            name="title"
            required
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold">Price</label>
          <input
            name="price"
            type="number"
            required
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold">Image Preview</label>
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-40 object-cover rounded-md mt-2"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x300?text=Invalid+URL";
              }}
            />
          )}
          {!previewImage && (
            <div className="w-full h-40 bg-gray-200 rounded-md mt-2 flex items-center justify-center">
              <p className="text-gray-500">Image preview...</p>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="font-semibold">Image URL</label>
          <input
            name="image"
            value={previewImage}
            onChange={handleImageChange}
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
          Add Product
        </button>
      </form>
    </div>
  );
}
