'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch product data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('/api/CustomApi.json');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.adverts_list.adverts);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-600 text-xl font-semibold mt-10">Error: {error}</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Featured Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="relative">
                <Image
                  src={product.image_obj.url}
                  alt={product.title}
                  width={500}
                  height={300}
                  className="w-full h-40 sm:h-48 lg:h-56 object-cover"
                />
                <div className="absolute top-0 right-0 bg-white m-2 p-1.5 rounded-full shadow">
                  <FaHeart className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-sm" />
                </div>
                {product.badge_info?.label && (
                  <span className="absolute top-0 left-0 bg-yellow-400 text-xs font-semibold px-2 py-1 m-2 rounded-full">
                    {product.badge_info.label}
                  </span>
                )}
              </div>
              <div className="p-3 sm:p-4">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 truncate">{product.title}</h2>
                <p className="text-xl sm:text-2xl font-bold text-indigo-600 mb-2">{product.price_obj.view}</p>
                <div className="flex items-center text-gray-600 text-xs mb-2">
                  <FaMapMarkerAlt className="mr-1 text-xs" />
                  <span>{product.region_name || "Location not specified"}</span>
                </div>
                <Link 
                  href={`/products/${product.id}`}
                  className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-1.5 px-3 rounded transition duration-300 ease-in-out text-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
