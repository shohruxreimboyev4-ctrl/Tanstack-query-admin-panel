import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../api/productsApi";

export default function Products() {
  const queryClient = useQueryClient();
  
  const query = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  if (query.isLoading) return <p className="p-6 text-center">Loading...</p>;
  if (query.isError) return <p className="p-6 text-center text-red-500">Error loading products</p>;
  if (!query.data || query.data.length === 0) return <p className="p-6 text-center">No products found</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Products</h1>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {query.data.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-xl p-4 border text-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-32 h-32 object-cover mx-auto rounded-md"
            />

            <h3 className="text-xl font-semibold mt-3">{item.title}</h3>
            <p className="text-lg font-bold text-green-600">
              {item.price} so'm
            </p>

            <div className="flex gap-3 justify-center mt-4">
              <button
                onClick={() => navigate(`/edit/${item.id}`)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Edit
              </button>

              <button
                onClick={() => deleteMutation.mutate(item.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
