import React, { useState } from "react";
import {
  Filter,
  X,
  ChevronDown,
  Star,
  GridIcon,
  List,
  Search,
} from "lucide-react";

const ProductsPage = () => {
  const [view, setView] = useState("grid");
  const [showFilters, setShowFilters] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    { id: "all", name: "All Categories", count: 234 },
    { id: "men", name: "Men's Wear", count: 89 },
    { id: "women", name: "Women's Fashion", count: 103 },
    { id: "accessories", name: "Accessories", count: 42 },
  ];

  const priceRanges = [
    { id: "all", name: "All Prices" },
    { id: "under-50", name: "Under $50" },
    { id: "50-100", name: "$50 - $100" },
    { id: "100-200", name: "$100 - $200" },
    { id: "over-200", name: "Over $200" },
  ];

  const products = [
    {
      id: 1,
      name: "Classic White T-Shirt",
      price: 29.99,
      rating: 4.5,
      reviews: 128,
      category: "men",
      tags: ["New Arrival", "Bestseller"],
    },
    {
      id: 2,
      name: "Premium Leather Handbag",
      price: 199.99,
      rating: 4.8,
      reviews: 89,
      category: "accessories",
      tags: ["Premium"],
    },
    {
      id: 3,
      name: "Summer Floral Dress",
      price: 79.99,
      rating: 4.6,
      reviews: 156,
      category: "women",
      tags: ["Sale"],
    },
    // Add more products as needed
  ];

  // Repeat products array to simulate more items
  const allProducts = [...products, ...products, ...products, ...products].map(
    (product, index) => ({
      ...product,
      id: index + 1,
    })
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
            <p className="text-gray-600 mt-1">
              Showing {allProducts.length} results
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* View Toggle */}
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

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-lg px-4 py-2 bg-white"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`w-full md:w-64 space-y-6 ${
              showFilters ? "block" : "hidden md:block"
            }`}
          >
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
              <div className="space-y-2">
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
            </div>

            {/* Price Ranges */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="font-semibold text-gray-900 mb-4">Price Range</h2>
              <div className="space-y-2">
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

            {/* Ratings Filter */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="font-semibold text-gray-900 mb-4">Rating</h2>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input type="checkbox" className="text-blue-600" />
                    <div className="ml-2 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-gray-600">& Up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 md:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {allProducts.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-lg shadow-sm overflow-hidden
                    ${view === "grid" ? "" : "flex"}`}
                >
                  <div
                    className={`aspect-square bg-gray-100
                    ${view === "grid" ? "w-full" : "w-48"}`}
                  >
                    <img
                      src="/api/placeholder/300/300"
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex-1">
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
                      {product.tags && (
                        <div className="flex gap-2 mt-2">
                          {product.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price}
                      </span>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-2 border rounded hover:bg-gray-50">
                  Previous
                </button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 border rounded
                      ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-50"
                      }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-3 py-2 border rounded hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
