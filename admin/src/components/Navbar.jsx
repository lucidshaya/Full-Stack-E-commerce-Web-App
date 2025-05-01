import React from 'react';
import { assets } from '../assets/assets.js';

const Navbar = ({ setToken }) => {
  const handleLogout = () => {
    setToken(''); // Clear token in state
    localStorage.removeItem('token'); // Clear token from localStorage
  };

  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className='w-[max(10%,80px)]' src={assets.logo} alt='' />
      <button
        onClick={handleLogout}
        className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;