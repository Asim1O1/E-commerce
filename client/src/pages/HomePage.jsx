import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
const EcommercePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselItems = [
    { title: "Summer Collection", subtitle: "Up to 50% off", cta: "Shop Now" },
    {
      title: "New Arrivals",
      subtitle: "Fresh Styles Daily",
      cta: "Discover More",
    },
    {
      title: "Limited Time Offer",
      subtitle: "Free Shipping on Orders $50+",
      cta: "Learn More",
    },
  ];

  const categories = [
    { name: "Men's Wear", items: "2,000+ items" },
    { name: "Women's Fashion", items: "3,500+ items" },
    { name: "Accessories", items: "1,500+ items" },
    { name: "Footwear", items: "1,000+ items" },
  ];

  const bestsellers = [
    { name: "Classic White Sneakers", price: "$79.99", rating: 4.8 },
    { name: "Leather Crossbody Bag", price: "$129.99", rating: 4.9 },
    { name: "Denim Jacket", price: "$89.99", rating: 4.7 },
    { name: "Wireless Earbuds", price: "$149.99", rating: 4.6 },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselItems.length) % carouselItems.length
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-96 bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {carouselItems[currentSlide].title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {carouselItems[currentSlide].subtitle}
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors">
              {carouselItems[currentSlide].cta}
            </button>
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-gray-50 p-6 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {category.name}
              </h3>
              <p className="text-gray-600">{category.items}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Bestsellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <div
                key={product.name}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-blue-600 font-bold">
                    {product.price}
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
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
            <p className="text-gray-600">On orders over $50</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">30-Day Returns</h3>
            <p className="text-gray-600">Easy returns policy</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
            <p className="text-gray-600">100% secure checkout</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default EcommercePage;
