import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [size, setSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  const fetchProductData = () => {
    if (!products) return;
    const product = products.find(item => item._id === productId);
    if (product) {
      setProductData(product);
      console.log(product);
      setSize(''); // Reset size when product changes
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  // Get images array (use images if available, else fallback to single image)
  const images = productData && (productData.images || (productData.image ? [productData.image] : []));

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleAddToCart = () => {
    if (productData.sizes && productData.sizes.length > 0 && !size) {
      alert('Please select a size before adding to cart.');
      return;
    }
    addToCart(productData._id, size);
  };

  return productData ? (
    <div className="p-5">
      <div className="flex flex-col sm:flex-row gap-12 sm:gap-12">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-4 sm:flex-row">
          {/* Thumbnails */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:w-28">
            {images.length > 0 &&
              images.map((image, index) => (
                <img
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  src={image}
                  className={`w-24 h-24 object-cover rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 ${
                    currentImageIndex === index ? 'border-2 border-gray-800' : ''
                  }`}
                  alt={`Product Image ${index + 1}`}
                />
              ))}
          </div>
          {/* Main Image with Arrows */}
          <div className="relative flex-1 overflow-hidden rounded-lg shadow-md">
            {images.length > 0 ? (
              <>
                <img
                  src={images[currentImageIndex]}
                  alt={productData.name}
                  className="w-full h-auto object-cover rounded-lg aspect-square max-h-[500px] transition-all duration-300 hover:scale-[1.02]"
                />
                {images.length > 1 && (
                  <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full px-2">
                    <button
                      onClick={handlePrevImage}
                      className="bg-gray-800 text-white p-2 rounded-full opacity-75 hover:opacity-100 hover:scale-110 transition-all duration-200"
                    >
                      <img
                        src={assets.dropdown_icon}
                        alt="Previous"
                        className="w-5 h-5 rotate-90"
                      />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="bg-gray-800 text-white p-2 rounded-full opacity-75 hover:opacity-100 hover:scale-110 transition-all duration-200"
                    >
                      <img
                        src={assets.dropdown_icon}
                        alt="Next"
                        className="w-5 h-5 -rotate-90"
                      />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-gray-500 text-center py-10">No images available</div>
            )}
          </div>
        </div>
        {/* Product Details */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{productData.name}</h1>
          <p className="text-xl text-gray-700 mt-2">${productData.price}</p>
          <p className="text-gray-600 mt-4">{productData.description || 'No description available'}</p>
          <div className="flex flex-col gap-2 mt-4">
            {productData.sizes && productData.sizes.length > 0 && (
              <>
                <p>Select Size</p>
                <div className="flex gap-2">
                  {productData.sizes.map((item, index) => (
                    <button
                      onClick={() => setSize(item)}
                      key={index}
                      className={`border py-2 bg-gray-100 ${
                        size === item ? 'border-gray-800' : 'border-gray-300'
                      } rounded-full px-4 text-sm font-medium`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </>
            )}
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-8 py-3 text-sm mt-5 active:bg-gray-700"
            >
              ADD TO CART
            </button>
            <hr className="mt-8 sm:w-3/4" />
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% original product</p>
              <p>Cash on delivery is available on this product</p>
              <p>Easy return and exchange policy</p>
            </div>
          </div>
          {/* Description & Review Section */}
          <div className="mt-20">
            <div className="flex">
              <button
                onClick={() => setActiveTab('description')}
                className={`border px-5 py-3 text-sm font-medium ${
                  activeTab === 'description' ? 'border-b-2 border-gray-800' : 'border-b'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`border px-5 py-3 text-sm font-medium ${
                  activeTab === 'reviews' ? 'border-b-2 border-gray-800' : 'border-b'
                }`}
              >
                Reviews
              </button>
            </div>
            <div className="flex flex-col gap-4 border border-t-0 px-5 py-6 text-sm text-gray-500">
              {activeTab === 'description' ? (
                <p>{productData.description || 'No description available'}</p>
              ) : (
                <p>No reviews available for this product.</p>
              )}
            </div>
          </div>
          {/* Display related products */}
          {productData.category && productData.subCategory && (
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="p-5">
      {products && products.length === 0 ? 'No product found.' : 'Loading product...'}
    </div>
  );
};

export default Product;