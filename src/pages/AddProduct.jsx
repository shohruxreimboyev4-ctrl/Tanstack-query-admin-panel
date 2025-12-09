import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../api/productsApi";

export default function AddProduct() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
          <label className="font-semibold">Image URL</label>
          <input
            name="image"
            required
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>

        <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
          Add Product
        </button>
      </form>
    </div>
  );
}
