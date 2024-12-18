import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";

import { Link } from "react-router-dom";
import AddProducts from "./AddProducts";
import Pagination from "../../utils/Pagination";

import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../features/products/productSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { products } = useSelector((state) => state.product);
  const { pagination } = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(getAllProducts({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (products?.data) setProductData(products?.data);
  }, [products?.data]);

  const closeAddProductForm = () => {
    setShowAddProductForm(false);
  };

  const filteredProducts = productData.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleProductSelection = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleDeleteSelected = () => {
    alert("Delete Selected Products: " + selectedProducts.join(", "));
  };

  const handleBulkEdit = () => {
    alert("Bulk Edit Selected Products: " + selectedProducts.join(", "));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
        <section className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Product Management
            </h2>
            <div className="flex space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <Search
                  size={20}
                  className="absolute left-3 top-3 text-gray-400"
                />
              </div>
              <button
                onClick={() => setShowAddProductForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
              >
                <Plus size={20} className="mr-2" />
                Add Products
              </button>
              {showAddProductForm && (
                <AddProducts onClose={closeAddProductForm}></AddProducts>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-4">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={selectedProducts.length === productData.length}
                      onChange={() =>
                        setSelectedProducts(
                          selectedProducts.length === productData.length
                            ? []
                            : productData.map((p) => p.id)
                        )
                      }
                    />
                  </th>
                  <th className="p-4">Image</th>
                  <th className="p-4">Product Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => toggleProductSelection(product.id)}
                        className="form-checkbox"
                      />
                    </td>
                    <td className="p-4">
                      <div className="w-16 h-16 relative">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover rounded"
                            onError={(e) => {
                              e.target.src = "/api/placeholder/64/64";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-gray-400 text-xs">
                              No image
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-medium">{product.name}</td>
                    <td className="p-4">{product.category}</td>
                    <td className="p-4">${product.price.toFixed(2)}</td>
                    <td className="p-4">
                      <span
                        className={`${
                          product.stock < 20
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        } px-3 py-1 rounded-full text-xs`}
                      >
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="p-4 flex space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit"
                        onClick={() => alert(`Edit product: ${product.id}`)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                        onClick={() => alert(`Delete product: ${product.id}`)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedProducts.length > 0 && (
            <div className="mt-4 flex justify-between items-center bg-blue-50 p-4 rounded-lg">
              <span className="text-blue-800">
                {selectedProducts.length} product(s) selected
              </span>
              <div className="space-x-2">
                <button
                  onClick={handleBulkEdit}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Bulk Edit
                </button>
                <button
                  onClick={handleDeleteSelected}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete Selected
                </button>
              </div>
            </div>
          )}
          <Pagination
            currentPage={pagination?.currentPage}
            totalPages={pagination?.totalPages}
            onPageChange={handlePageChange}
          />
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
