import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../api/productsApi";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [previewImage, setPreviewImage] = React.useState("");

  const productQuery = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      navigate("/products");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    const form = new FormData(e.target);
    const updated = {
      title: form.get("title"),
      price: form.get("price"),
      image: form.get("image"),
    };

    mutation.mutate({ id, body: updated });
  }

  function handleImageChange(e) {
    setPreviewImage(e.target.value);
  }

  if (productQuery.isLoading) return <p className="p-6 text-center">Loading...</p>;
  if (productQuery.isError) return <p className="p-6 text-center text-red-500">Error loading product</p>;

  const item = productQuery.data;
  const currentImage = previewImage || item.image || "https://via.placeholder.com/300x300?text=No+Image";

  return (
    <div className="p-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md border"
      >
        <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

        <div className="mb-4">
          <label className="font-semibold">Title</label>
          <input
            name="title"
            defaultValue={item.title}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold">Price</label>
          <input
            name="price"
            type="number"
            defaultValue={item.price}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold">Image Preview</label>
          <img
            src={currentImage}
            alt="Preview"
            className="w-full h-40 object-cover rounded-md mt-2"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x300?text=Image+Error";
            }}
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold">Image URL</label>
          <input
            name="image"
            defaultValue={item.image}
            onChange={handleImageChange}
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Save
        </button>
      </form>
    </div>
  );
}
