import React, { useState } from "react";
import {
  ShoppingCart,
  Search,
  User,
  ChevronLeft,
  ChevronRight,
  Star,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

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
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">LOGO</div>

            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Shop
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Categories
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                About
              </a>
            </nav>

            <div className="flex items-center space-x-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border rounded-full w-48"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <User className="h-6 w-6 text-gray-700 cursor-pointer" />
              <div className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-700 cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Carousel */}
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">About Us</h4>
              <p className="text-gray-400">
                Your trusted destination for quality products and exceptional
                service.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Shipping Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Returns & Exchanges
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Shop
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Sale
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <Facebook className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EcommercePage;
