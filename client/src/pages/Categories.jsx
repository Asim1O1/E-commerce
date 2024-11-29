import React from 'react';
import { ChevronRight } from 'lucide-react';

const categories = [
  {
    name: 'Clothing',
    description: 'Trendy and comfortable wear',
    subcategories: ['T-Shirts', 'Jeans', 'Jackets', 'Dresses'],
    image: '/api/placeholder/400/300',
  },
  {
    name: 'Shoes',
    description: 'Footwear for every occasion',
    subcategories: ['Sneakers', 'Boots', 'Sandals', 'Formal'],
    image: '/api/placeholder/400/300',
  },
  {
    name: 'Accessories',
    description: 'Complete your look',
    subcategories: ['Bags', 'Watches', 'Jewelry', 'Hats'],
    image: '/api/placeholder/400/300',
  },
  {
    name: 'Electronics',
    description: 'Latest tech and gadgets',
    subcategories: ['Phones', 'Laptops', 'Headphones', 'Smartwatches'],
    image: '/api/placeholder/400/300',
  }
];

const CategoriesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Product Categories
      </h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div 
            key={category.name} 
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105"
          >
            <img 
              src={category.image} 
              alt={category.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {category.name}
              </h2>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="space-y-2">
                {category.subcategories.map((sub) => (
                  <div 
                    key={sub} 
                    className="flex items-center justify-between text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>{sub}</span>
                    <ChevronRight size={20} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;