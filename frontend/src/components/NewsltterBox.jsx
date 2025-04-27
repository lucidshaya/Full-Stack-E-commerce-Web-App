import React from 'react';

const NewsletterBox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className='text-center px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 rounded-lg'>
      <p className='text-2xl sm:text-3xl font-medium text-gray-800 mb-3'>
        Subscribe Now and get <span className='text-black font-semibold'>20% off</span>
      </p>
      <p className='text-gray-500 text-sm sm:text-base max-w-2xl mx-auto'>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit molestiae 
        in molestias eius, reiciendis ipsam amet aliquid aspernatur corrupti voluptas.
      </p>
      <form 
        onSubmit={onSubmitHandler}
        className='mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto'
      >
        <input 
          type='email' 
          placeholder='Enter your email' 
          required
          className='w-full sm:flex-1 outline-none border border-gray-300 px-4 py-3 rounded-md focus:ring-2 focus:ring-black focus:border-transparent text-sm'
        />
        <button 
          type='submit' 
          className='bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium whitespace-nowrap'
        >
          Subscribe
        </button>
      </form>
      <p className='mt-3 text-xs text-gray-400'>
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};

export default NewsletterBox;