import { Link } from "react-router-dom";

const ProductCard = ({ item }) => (
  <div className="p-3 border rounded shadow">
    <img
      src={item.img}
      alt={item.title}
      className="w-full h-40 object-cover rounded"
    />

    <h2 className="text-lg font-bold mt-2">{item.title}</h2>
    <p className="text-gray-700">{item.price} so‘m</p>

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
