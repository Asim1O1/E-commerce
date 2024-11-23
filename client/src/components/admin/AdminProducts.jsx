import React, { useState } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  const toggleAddProductForm = () => {
    setShowAddProductForm(!showAddProductForm);
  };

  const [productData, setProductData] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 99.99,
      stock: 45,
    },
    {
      id: 2,
      name: "Smart Watch",
      category: "Wearables",
      price: 199.99,
      stock: 30,
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      category: "Audio",
      price: 79.99,
      stock: 60,
    },
  ]);

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

  const deleteProduct = (productId) => {
    const updatedProducts = productData.filter(
      (product) => product.id !== productId
    );
    setProductData(updatedProducts);
  };

  return (
    <div className="p-8 bg-gray-50">
      <section className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>
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
              onClick={toggleAddProductForm}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
            >
              <Plus size={20} className="mr-2" />
              Add Product
            </button>
          </div>
        </div>

        {/* Products Table */}
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
                      className="form-checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleProductSelection(product.id)}
                    />
                  </td>
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">${product.price.toFixed(2)}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        product.stock < 20
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="p-4 flex space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => deleteProduct(product.id)}
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Batch Actions */}
        {selectedProducts.length > 0 && (
          <div className="mt-4 flex justify-between items-center bg-blue-50 p-4 rounded-lg">
            <span className="text-blue-800">
              {selectedProducts.length} product(s) selected
            </span>
            <div className="space-x-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Bulk Edit
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                onClick={() =>
                  setProductData(
                    productData.filter(
                      (product) => !selectedProducts.includes(product.id)
                    )
                  )
                }
              >
                Delete Selected
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminProducts;
