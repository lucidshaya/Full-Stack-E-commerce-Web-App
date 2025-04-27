import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (!products || products.length === 0) return;
    const filtered = products
      .filter(product => product.category === category && product.subCategory === subCategory)
      .slice(0, 5);
    setRelatedProducts(filtered);
  }, [products, category, subCategory]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((item, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg shadow-md">
              <ProductItem
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full py-10">No related products found.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;