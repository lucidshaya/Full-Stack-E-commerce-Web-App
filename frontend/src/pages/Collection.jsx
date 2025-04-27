import { useContext, useState, useEffect, useCallback } from 'react';
import { ShopContext } from '../context/ShopContext';
import dropdown_icon from '../assets/frontend_assets/dropdown_icon.png';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  useEffect(() => {
    // Dynamically derive categories and types from products
    const uniqueCategories = [...new Set(products.map(item => item.category))].filter(Boolean);
    const uniqueTypes = [...new Set(products.map(item => item.type))].filter(Boolean);
    setCategories([]);
    setTypes([]);
  }, [products]);

  const applyFilters = useCallback(() => {
    let result = [...products];

    // Apply search filter
    if (showSearch && search) {
      result = result.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    // Apply category filter
    if (categories.length > 0) {
      result = result.filter(item => categories.includes(item.category));
    }

    // Apply type filter
    if (types.length > 0) {
      result = result.filter(item => types.includes(item.type));
    }

    // Apply sorting
    if (sortType === 'low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-low') {
      result.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(result);
  }, [products, categories, types, sortType, search, showSearch]);

  useEffect(() => {
    applyFilters();
  }, [categories, types, search, showSearch, applyFilters]);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategories(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const toggleType = (e) => {
    const value = e.target.value;
    setTypes(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div className='flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 border-t'>
      {/* Left Side - Filters */}
      <div className='min-w-60'>
        <div
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={dropdown_icon}
            alt='dropdown icon'
          />
        </div>

        {/* Category Filter */}
        <div className={`border border-gray-300 px-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {[...new Set(products.map(item => item.category))].filter(Boolean).map(category => (
              <label key={category} className='flex gap-2 items-center'>
                <input
                  className='w-4 h-4'
                  type="checkbox"
                  value={category}
                  onChange={toggleCategory}
                  checked={categories.includes(category)}
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div className={`border border-gray-300 px-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {[...new Set(products.map(item => item.type))].filter(Boolean).map(type => (
              <label key={type} className='flex gap-2 items-center'>
                <input
                  className='w-4 h-4'
                  type="checkbox"
                  value={type}
                  onChange={toggleType}
                  checked={types.includes(type)}
                />
                {type.replace(/([A-Z])/g, ' $1').trim()}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Products */}
      <div className='flex-1'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className='border-2 border-gray-300 text-sm px-3 py-1 mt-2 sm:mt-0'
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8'>
          {filterProducts.length > 0 ? (
            filterProducts.map((item) => (
              <ProductItem
                key={item._id}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full py-10">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;