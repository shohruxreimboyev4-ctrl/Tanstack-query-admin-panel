import { Link } from "react-router-dom";

const ProductCard = ({ item }) => (
  <div className="p-3 border rounded shadow">
    <img
      src={item.image || item.img || "https://via.placeholder.com/300x300?text=No+Image"}
      alt={item.title}
      className="w-full h-40 object-cover rounded"
      onError={(e) => {
        e.target.src = "https://via.placeholder.com/300x300?text=Image+Error";
      }}
    />

    <h2 className="text-lg font-bold mt-2">{item.title || "Nomi yo'q"}</h2>
    <p className="text-gray-700">{item.price || 0} so'm</p>

    <div className="flex justify-between mt-3">
      <Link
        to={`/edit/${item.id}`}
        className="px-3 py-1 bg-blue-500 text-white rounded"
      >
        Edit
      </Link>

    </div>
  </div>
);

export default ProductCard;
