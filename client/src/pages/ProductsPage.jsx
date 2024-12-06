import React, { useEffect, useState } from "react";
import { GridIcon, List, Search, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [view, setView] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);

  const { loading } = useSelector((state) => state.product);

  const categories = [
    { id: "all", name: "All Categories", count: 234 },
    { id: "men", name: "Men's Wear", count: 89 },
    { id: "women", name: "Women's Fashion", count: 103 },
    { id: "accessories", name: "Accessories", count: 42 },
  ];

  const priceRanges = [
    { id: "all", name: "All Prices" },
    { id: "under-50", name: "Under $50", min: 0, max: 50 },
    { id: "50-100", name: "$50 - $100", min: 50, max: 100 },
    { id: "100-200", name: "$100 - $200", min: 100, max: 200 },
    { id: "over-200", name: "Over $200", min: 200, max: Infinity },
  ];

  useEffect(() => {
    dispatch(getAllProducts({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  const handleAddToCart = async (productId, quantity) => {
    try {
      const result = await dispatch(
        addToCart({ productId, quantity })
      ).unwrap();
      if (result.IsSuccess || result.StatusCode === 200) {
        toast.success(
          result.Result?.message || "Product Successfully added to cart"
        );
      } else {
        toast.error(
          result.ErrorMessage[0].message || "SERVER ERROR: Couldn't add product"
        );
      }
    } catch (error) {
      toast.error(
        error.message ||
          "An unexpected error occurred while adding product to cart"
      );
    }
  };
  const products = useSelector((state) => state.product.products.data);
  console.log("The products are ", products);

  const filteredProducts = products?.filter((product) => {
    const priceRange = priceRanges.find((range) => range.id === selectedPrice);

    if (priceRange?.id === "all") {
      return true;
    } else if (priceRange?.min !== undefined && priceRange?.max !== undefined) {
      return product.price >= priceRange.min && product.price <= priceRange.max;
    } else if (priceRange?.min !== undefined) {
      return product.price >= priceRange.min;
    }
    return false;
  });

  console.log("The filtered products are", filteredProducts);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
            <p className="text-gray-600 mt-1">
              Showing {filteredProducts?.length || 0} results
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2 border rounded-lg p-1">
              <button
                onClick={() => setView("grid")}
                className={`p-2 rounded ${
                  view === "grid" ? "bg-gray-100" : ""
                }`}
              >
                <GridIcon className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 rounded ${
                  view === "list" ? "bg-gray-100" : ""
                }`}
              >
                <List className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 space-y-6 sticky top-4 self-start">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full border rounded-lg pl-10 pr-4 py-2"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="font-semibold text-gray-900 mb-4">Categories</h2>
              {categories.map((category) => (
                <label key={category.id} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category.id}
                    onChange={() => setSelectedCategory(category.id)}
                    className="text-blue-600"
                  />
                  <span className="ml-2 text-gray-600">{category.name}</span>
                  <span className="ml-auto text-gray-400 text-sm">
                    ({category.count})
                  </span>
                </label>
              ))}
            </div>

            {/* Price Ranges */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="font-semibold text-gray-900 mb-4">Price Range</h2>
              {priceRanges.map((range) => (
                <label key={range.id} className="flex items-center">
                  <input
                    type="radio"
                    name="price"
                    checked={selectedPrice === range.id}
                    onChange={() => setSelectedPrice(range.id)}
                    className="text-blue-600"
                  />
                  <span className="ml-2 text-gray-600">{range.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center">
                <ClipLoader size={50} color="#0000ff" loading={loading} />
              </div>
            ) : filteredProducts && filteredProducts.length > 0 ? (
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-1 md:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                  >
                    <Link
                      to={`/productDetail/${product._id}`}
                      className="block cursor-pointer"
                    >
                      <div
                        className={`aspect-square bg-gray-100 ${
                          view === "grid" ? "w-full" : "w-48"
                        }`}
                      >
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
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="font-medium text-gray-900">
                          {product.name}
                        </h3>
                        <div className="flex items-center mt-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-600">
                            ({product.reviews})
                          </span>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-lg font-bold text-gray-900">
                            ${product.price}
                          </span>
                        </div>
                      </div>
                    </Link>

                    <button
                      onClick={() => handleAddToCart(product._id, 1)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 mt-8">
                No products found. Please try adjusting your filters.
              </p>
            )}

            {/* Pagination */}
            <div className="mt-8 flex justify-center space-x-4 sticky bottom-0 bg-white z-10 border-t">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Previous
              </button>
              <span className="self-center text-sm">{`Page ${currentPage}`}</span>
              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
