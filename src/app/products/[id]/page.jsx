'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { FaMapMarkerAlt, FaPhoneAlt, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/CustomApi.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        const foundProduct = data.adverts_list.adverts.find(
          (p) => p.id === parseInt(id)
        );

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          throw new Error('Product not found');
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    alert(`${product.title} has been added to your cart!`);
  };

  const handleBuyNow = () => {
    alert(`Proceeding to buy ${product.title}`);
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div></div>;
  if (error) return <div className="container mx-auto p-6 text-center text-red-600 text-xl">Error: {error}</div>;
  if (!product) return <div className="container mx-auto p-6 text-center text-xl">Product not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Images */}
            <div className="md:w-1/2 p-6">
              <div className="relative h-96 mb-4 border border-gray-200">
                <Image
                  src={product.image_obj.url}
                  alt={product.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              {product.images && product.images.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {product.images.slice(0, 3).map((img, index) => (
                    <div key={index} className="relative h-24 border border-gray-200">
                      <Image
                        src={img.url}
                        alt={`${product.title} - Image ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Details */}
            <div className="md:w-1/2 p-6">
              <div className="mb-4">
                <span className="text-sm text-gray-500">{product.category_name}</span>
                <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.title}</h1>
              </div>
              
              <p className="text-4xl font-bold text-indigo-600 mb-6">{product.price_obj.view}</p>
              
              <p className="text-gray-600 mb-6">{product.short_description || "No description available."}</p>
              
              <div className="flex items-center mb-4 border-t border-gray-200 py-5">
                <FaMapMarkerAlt className="text-gray-400 mr-2" />
                <span className="text-gray-600">{product.region_name || "Location not specified"}</span>
              </div>
              
              {product.user_phone && (
                <div className="flex items-center justify-between mb-6 border-t border-gray-200 py-5">
                    <div className='flex items-center gap-2'>
                  <FaPhoneAlt className="text-gray-400 mr-2" />
                  <span className="text-gray-600 mr-4">{product.user_phone}</span>
                  </div>
                  <a
                    href={`tel:${product.user_phone}`}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition duration-300 ease-in-out flex items-center"
                  >
                    <FiPhoneCall className="mr-2" /> Call Now
                  </a>
                </div>
              )}
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6 border-t border-gray-200 py-5">
                {product.badge_info?.label && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {product.badge_info.label}
                  </span>
                )}
                {product.paid_info?.text && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {product.paid_info.text}
                  </span>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
                >
                  <FaShoppingCart className="mr-2" /> Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
                >
                  Buy Now
                </button>
                <button className="hidden md:block bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold p-3 rounded-lg transition duration-300 ease-in-out">
                  <FaRegHeart size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
