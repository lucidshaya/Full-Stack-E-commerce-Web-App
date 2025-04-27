import React from 'react';
import { assets } from '../assets/frontend_assets/assets';
import heroimage from '../assets/frontend_assets/hero_img.png';


const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
      {/* Hero left side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base'>Our Best sellers</p>
          </div>
          <h1 className='text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
          <div className='flex items-center gap-2'>
            <span className='font-semibold text-sm md:text-base'>Shop Now</span>
            <span className='w-8 md:w-11 h-[1px] bg-[#414141]'></span>
          </div>
        </div>
      </div>
      {/* Hero Right side */}
      <img src={heroimage} className='w-full sm:w-1/2' alt='Hero' />
    </div>
  );
}

export default Hero;