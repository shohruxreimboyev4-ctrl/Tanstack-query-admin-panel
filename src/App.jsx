import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <div className="p-5">
      <nav className="bg-gray-900 text-white px-6 py-4 flex gap-6 shadow-md">
        <Link className="hover:text-blue-400" to="/">
          Dashboard
        </Link>
        <Link className="hover:text-blue-400" to="/products">
          Products
        </Link>
        <Link className="hover:text-blue-400" to="/add">
          Add Product
        </Link>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </div>
  );
}

export default App;
