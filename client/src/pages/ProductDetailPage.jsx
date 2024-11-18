import React, { useState } from "react";
import {
  ShoppingCart,
  Heart,
  Share2,
  Star,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Truck,
  RotateCcw,
} from "lucide-react";

const ProductDetailPage = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedTab, setSelectedTab] = useState("description");

  const product = {
    name: "Premium Cotton Comfort T-Shirt",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.8,
    reviewCount: 256,
    description:
      "Experience unmatched comfort with our premium cotton t-shirt. Made from 100% organic cotton, this versatile piece features a classic fit, reinforced stitching, and a soft-touch finish that gets better with every wash.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Stone Gray", "Classic Black", "Navy Blue", "Crisp White"],
    features: [
      "100% Organic Cotton",
      "Reinforced Stitching",
      "Pre-shrunk Fabric",
      "Easy Care Instructions",
    ],
    images: [
      "/api/placeholder/500/600",
      "/api/placeholder/500/600",
      "/api/placeholder/500/600",
      "/api/placeholder/500/600",
    ],
  };

  const relatedProducts = [
    { name: "Classic Polo Shirt", price: 44.99, rating: 4.6 },
    { name: "Cotton Blend Hoodie", price: 79.99, rating: 4.7 },
    { name: "Lightweight Sweater", price: 59.99, rating: 4.5 },
    { name: "Casual Henley", price: 39.99, rating: 4.8 },
  ];

  const reviews = [
    {
      author: "Sarah M.",
      rating: 5,
      comment: "Perfect fit and super comfortable!",
      date: "2 days ago",
    },
    {
      author: "John D.",
      rating: 4,
      comment: "Great quality, but runs slightly large",
      date: "1 week ago",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.images[currentImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button className="absolute right-4 top-4 bg-white p-2 rounded-full shadow-lg">
                <ZoomIn className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden ${
                    currentImage === index ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex space-x-4">
                  <button className="text-gray-400 hover:text-gray-500">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="text-gray-400 hover:text-red-500">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
                <span className="px-2 py-1 bg-red-100 text-red-700 text-sm font-medium rounded">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </div>
              <p className="text-green-600 text-sm">In stock</p>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Color</h3>
              <div className="grid grid-cols-4 gap-4 mt-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-md text-sm ${
                      selectedColor === color
                        ? "border-blue-500 text-blue-500"
                        : "border-gray-200 text-gray-700"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <div className="grid grid-cols-5 gap-4 mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md text-sm ${
                      selectedSize === size
                        ? "border-blue-500 text-blue-500"
                        : "border-gray-200 text-gray-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border rounded-md"
                >
                  -
                </button>
                <span className="text-gray-900 w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border rounded-md"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              <button className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                Buy Now
              </button>
            </div>

            {/* Shipping Info */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <Truck className="h-5 w-5" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <RotateCcw className="h-5 w-5" />
                <span>30-day easy returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {["description", "features", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-8">
            {selectedTab === "description" && (
              <p className="text-gray-600">{product.description}</p>
            )}
            {selectedTab === "features" && (
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            )}
            {selectedTab === "reviews" && (
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <div key={index} className="border-b pb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-medium text-gray-900">
                          {review.author}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            You may also like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {relatedProducts.map((product, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-4">
                  <img
                    src="/api/placeholder/200/200"
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-gray-900 font-medium">{product.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-900 font-bold">
                    ${product.price}
                  </span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">
                      {product.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
