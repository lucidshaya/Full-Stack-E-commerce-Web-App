import React from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block">
              <img src={assets.logo} className="w-36 mb-4" alt="Company Logo" />
            </Link>
            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis commodi molestias temporibus.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              {['Home', 'Collection', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item === 'Home' ? '' : item.toLowerCase()}`}
                    className="text-gray-600 hover:text-black text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">CONTACT US</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-black transition-colors">info@example.com</li>
              <li className="hover:text-black transition-colors">+1 (234) 567-8900</li>
              <li className="hover:text-black transition-colors">123 Street, City</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Your Brand. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <img src={assets.social_icon1} className="h-5 w-5" alt="Social" />
            <img src={assets.social_icon2} className="h-5 w-5" alt="Social" />
            <img src={assets.social_icon3} className="h-5 w-5" alt="Social" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;