import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteSingleProduct,
  getAllProducts,
  updateProduct,
} from "../../features/products/productSlice";
import AddProducts from "./AddProducts";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { Camera, X } from "lucide-react";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [productData, setProductData] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const { products } = useSelector((state) => state.product);
  const [previewImage, setPreviewImage] = useState(null);

  const closeAddProductForm = () => {
    setShowAddProductForm(false);
  };

  const closeEditProductForm = () => {
    setEditProduct(null);
  };

  useEffect(() => {
    dispatch(getAllProducts({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    if (products?.data) setProductData(products?.data);
  }, [products?.data]);

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

  const handleDeleteSingleProduct = (productId) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this product?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            setLoading(true);
            dispatch(deleteSingleProduct(productId))
              .unwrap()
              .then(() => {
                dispatch(getAllProducts({ page: 1, limit: 10, category: "" }));
                toast.success("Product deleted successfully!", {
                  position: "top-right",
                  autoClose: 3000,
                });
              })
              .catch((error) => {
                toast.error(`Error: ${error}`, {
                  position: "top-right",
                  autoClose: 3000,
                });
              })
              .finally(() => setLoading(false));
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
  };

  const handleUpdateProduct = async (e, productId) => {
    e.preventDefault();

    // Basic form validation
    const { name, description, price, category, stock, imageUrl } = editProduct;
    let errorMessages = [];

    // Validate the fields
    if (!name || name.trim() === "") {
      errorMessages.push("Product name is required.");
    }
    if (!description || description.trim() === "") {
      errorMessages.push("Product description is required.");
    }

    if (!category || category.trim() === "") {
      errorMessages.push("Category is required.");
    }

    if (price === "" || price <= 0 || isNaN(price)) {
      errorMessages.push("Valid product price is required.");
    }

    if (stock === "" || stock < 0 || isNaN(stock)) {
      errorMessages.push("Valid stock quantity is required.");
    }

    if (errorMessages.length > 0) {
      console.log("Validation errors:", errorMessages);
      return;
    }

    // Prepare the data to be sent
    const newProductData = {
      name: editProduct?.name,
      description: editProduct?.description,
      price: editProduct?.price,
      category: editProduct?.category,
      stock: editProduct?.stock,
      imageUrl: previewImage || editProduct?.imageUrl,
    };

    console.log(newProductData);

    if (!productId) {
      console.error("Product ID is missing.");
      return;
    }
    if (!newProductData) {
      console.errror("Product data is missing");
      return;
    }

    try {
      console.log(
        "entered try catch block for update product and this is the data",
        newProductData
      );
      const response = await dispatch(
        updateProduct({ productId, newProductData })
      );
      if (response.payload.StatusCode === 200) {
        dispatch(getAllProducts({ page: 1, limit: 10, category: "" }));
        toast.success("Product updated successfully!");
      } else {
        const errorMessage =
          response.payload?.details?.ErrorMessage[0]?.message ||
          "Server Error. Please try again.";
        console.log(errorMessage);

        toast.error(errorMessage);
      }

      console.log("Product updated successfully:", response);

      closeEditProductForm();
    } catch (error) {
      console.error("Error updating product:", error);
      if (error.response) {
        toast.error(
          error.response.data?.ErrorMessage?.[0]?.message ||
            "An unexpected error occurred."
        );
      } else {
        toast.error("Network error, please try again.");
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setEditProduct({ ...editProduct, imageUrl: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8 bg-gray-50">
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <ClipLoader size={50} color={"#ffffff"} loading={loading} />
        </div>
      )}

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

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={
                      selectedProducts.length === filteredProducts.length &&
                      filteredProducts.length > 0
                    }
                    onChange={() =>
                      setSelectedProducts(
                        selectedProducts.length === filteredProducts.length
                          ? []
                          : filteredProducts.map((p) => p.id)
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
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                      onClick={() => handleDeleteSingleProduct(product._id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Product Form */}
        {editProduct && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-start pt-16 z-50 p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 transform transition-all duration-300 ease-in-out hover:shadow-xl">
              <div className="relative">
                {/* Close Button */}
                <button
                  onClick={closeEditProductForm}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-center text-gray-800 mb-4 tracking-tight">
                    Edit Product
                  </h3>

                  <form
                    onSubmit={(e) => handleUpdateProduct(e, editProduct._id)}
                    className="space-y-3"
                  >
                    {/* Compact Input Sections */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block mb-1 text-xs font-medium text-gray-700">
                          Product Name
                        </label>
                        <input
                          type="text"
                          value={editProduct.name}
                          onChange={(e) =>
                            setEditProduct({
                              ...editProduct,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 text-sm border rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                          placeholder="Name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-xs font-medium text-gray-700">
                          Category
                        </label>
                        <input
                          type="text"
                          value={editProduct.category}
                          onChange={(e) =>
                            setEditProduct({
                              ...editProduct,
                              category: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 text-sm border rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                          placeholder="Category"
                          required
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block mb-1 text-xs font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        value={editProduct.description}
                        onChange={(e) =>
                          setEditProduct({
                            ...editProduct,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200 h-20"
                        placeholder="Description"
                        required
                      />
                    </div>

                    {/* Price, Stock, and Image Row */}
                    <div className="grid grid-cols-3 gap-3 items-center">
                      <div>
                        <label className="block mb-1 text-xs font-medium text-gray-700">
                          Price
                        </label>
                        <input
                          type="number"
                          value={editProduct.price}
                          onChange={(e) =>
                            setEditProduct({
                              ...editProduct,
                              price: parseFloat(e.target.value),
                            })
                          }
                          className="w-full px-3 py-2 text-sm border rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                          placeholder="Price"
                          required
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-xs font-medium text-gray-700">
                          Stock
                        </label>
                        <input
                          type="number"
                          value={editProduct.stock}
                          onChange={(e) =>
                            setEditProduct({
                              ...editProduct,
                              stock: parseInt(e.target.value),
                            })
                          }
                          className="w-full px-3 py-2 text-sm border rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                          placeholder="Stock"
                          required
                        />
                      </div>
                      <div className="flex justify-center">
                        <div className="w-16 h-16 relative">
                          {previewImage || editProduct.imageUrl ? (
                            <img
                              src={previewImage || editProduct.imageUrl}
                              alt={editProduct.name}
                              className="w-full h-full object-cover rounded-lg border"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                              <span className="text-gray-400 text-xs">
                                No image
                              </span>
                            </div>
                          )}
                          <label
                            htmlFor="imageUpload"
                            className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full cursor-pointer hover:bg-blue-600"
                            title="Upload New Image"
                          >
                            <Camera className="w-3 h-3" />
                          </label>
                          <input
                            type="file"
                            id="imageUpload"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        type="button"
                        className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        onClick={closeEditProductForm}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminProducts;
