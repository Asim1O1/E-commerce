import React from "react";
import { Globe, Heart, Award } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          About Our Store
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're passionate about delivering high-quality products that inspire
          and empower our customers. Our journey began with a simple mission: to
          create an exceptional shopping experience.
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <Globe className="mx-auto mb-4 text-blue-600" size={64} />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Global Reach
          </h2>
          <p className="text-gray-600">
            Shipping worldwide, bringing our products to customers across the
            globe.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <Heart className="mx-auto mb-4 text-blue-600" size={64} />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Customer First
          </h2>
          <p className="text-gray-600">
            Our customers are at the heart of everything we do. Your
            satisfaction is our top priority.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <Award className="mx-auto mb-4 text-blue-600" size={64} />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Quality Guaranteed
          </h2>
          <p className="text-gray-600">
            We meticulously select and curate products to ensure the highest
            quality standards.
          </p>
        </div>
      </div>

      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
        <div className="max-w-4xl mx-auto text-gray-600 space-y-4">
          <p>
            Founded in 2023, our store began as a small passion project. We
            believed that shopping should be more than just a transaction - it
            should be an experience.
          </p>
          <p>
            Today, we've grown into a trusted online destination, offering a
            carefully curated selection of products that combine style, quality,
            and affordability.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
