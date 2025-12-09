import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/productsApi";

export default function Dashboard() {
  const {
    data: items = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError) return <p className="p-6 text-red-500">Error loading data</p>;

  const totalPrice = items.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg p-6 rounded-xl border">
          <h2 className="text-xl font-semibold">Jami tovarlar</h2>
          <p className="text-3xl font-bold mt-2">{items.length}</p>
        </div>

        <div className="bg-white shadow-lg p-6 rounded-xl border">
          <h2 className="text-xl font-semibold">Jami narx summasi</h2>
          <p className="text-3xl font-bold mt-2">{totalPrice} so'm</p>
        </div>
      </div>
    </div>
  );
}
