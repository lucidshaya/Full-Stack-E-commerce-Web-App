import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  }, [location, setShowSearch]);

  if (!showSearch) return null;

  return (
    <div className='border-t border-b bg-gray-50 text-center py-2'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-4 my-3 mx-2 rounded-full w-full sm:w-1/2'>
        <input 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className='flex-1 outline-none px-3 py-2 bg-transparent text-sm' 
          type="text" 
          placeholder='Search for products...' 
        />
        <img 
          className='w-4 h-4 mx-2' 
          src={assets.search_icon} 
          alt='Search icon' 
        />
      </div>  
      <img 
        onClick={() => setShowSearch(false)} 
        className='inline w-4 h-4 ml-2 cursor-pointer' 
        src={assets.cross_icon} 
        alt='Close search' 
      />
    </div>
  );
};

export default SearchBar;