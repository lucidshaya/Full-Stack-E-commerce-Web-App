import React, { useState, useContext } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);
  const closeSidebar = () => setVisible(false);

  const navItems = ['Home', 'Collection', 'About', 'Contact'];

  return (
    <div className="flex items-center justify-between py-5 font-medium relative">
      <Link to="/">
        <img
          src={assets.logo}
          className="w-36 object-contain rounded-md shadow-sm hover:scale-105 transition-all duration-200"
          alt="Logo"
        />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {navItems.map((item) => (
          <li key={item}>
            <NavLink
              to={`/${item === 'Home' ? '' : item.toLowerCase()}`}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 ${isActive ? 'text-black' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <p>{item}</p>
                  <hr
                    className={`w-2/4 border-none h-[1.5px] ${
                      isActive ? 'bg-black' : 'bg-gray-300 hidden'
                    }`}
                  />
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Icons Section */}
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-200"
          alt="Search"
        />

        <div className="group relative">
            
         <Link to='/login'><img
            src={assets.profile_icon}
            className="w-6 h-6 cursor-pointer hover:scale-110 transition-all duration-200"
            alt="Profile"
          /></Link> 
          <div className="group-hover:block hidden absolute right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-md shadow-md">
              <p className="cursor-pointer hover:text-black">My profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>

        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-6 h-6 min-w-6 hover:scale-110 transition-all duration-200"
            alt="Cart"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-5 h-5 text-center leading-5 bg-black text-white rounded-full text-[10px]">
            {getCartCount()}
          </p>
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-6 h-6 cursor-pointer sm:hidden hover:scale-110 transition-all duration-200"
          alt="Menu"
        />
      </div>

      {/* Mobile Sidebar */}
      {visible && (
        <div className="fixed inset-0 z-50 sm:hidden" onClick={closeSidebar}>
          <div
            className={`absolute top-0 right-0 bottom-0 w-3/4 bg-white shadow-lg transition-transform duration-300 ${
              visible ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col">
              <div
                onClick={closeSidebar}
                className="flex items-center gap-4 p-3 cursor-pointer border-b"
              >
                <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="Close" />
                <p className="text-sm font-medium">Menu</p>
              </div>

              {navItems.map((item) => (
                <NavLink
                  key={item}
                  to={`/${item === 'Home' ? '' : item.toLowerCase()}`}
                  className={({ isActive }) =>
                    `py-3 pl-6 border-b ${isActive ? 'text-black font-bold' : ''}`
                  }
                  onClick={closeSidebar}
                >
                  {item}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;