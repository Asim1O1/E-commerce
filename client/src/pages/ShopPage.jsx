import React, { useState } from "react";
import { ShoppingCart, Star, Filter } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 29.99,
    rating: 4.5,
    image: "/api/placeholder/300/400",
  },
  {
    id: 2,
    name: "Denim Jeans",
    price: 79.99,
    rating: 4.7,
    image: "/api/placeholder/300/400",
  },
  {
    id: 3,
    name: "Leather Jacket",
    price: 199.99,
    rating: 4.8,
    image: "/api/placeholder/300/400",
  },
  {
    id: 4,
    name: "Sneakers",
    price: 89.99,
    rating: 4.6,
    image: "/api/placeholder/300/400",
  },
];

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Clothing", "Shoes", "Accessories"];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Our Products</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded px-3 py-2"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h2>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-500 fill-yellow-500" size={20} />
                  <span className="text-gray-600">{product.rating}</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <button className="mt-4 w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <ShoppingCart className="mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
