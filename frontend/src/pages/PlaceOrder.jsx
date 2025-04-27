import React, { useContext, useState } from 'react'
import Cart from './Cart'
import ShopContextProvider, { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');

  const {navigate} = useContext(ShopContext);

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-top'>
      {/* -------------------------LEFT SIDE -------------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        
        <div className='flex gap-3'>
          <input className='border border-gray-300 py-1.5 px-3.5 w-full' type='text' placeholder='First name' />
          <input className='border border-gray-300 py-1.5 px-3.5 w-full' type='text' placeholder='Last name' />
        </div>
        
        <input className='border border-gray-300 py-1.5 px-3.5 w-full' type='email' placeholder='Email address' />
        <input className='border border-gray-300 py-1.5 px-3.5 w-full' type='text' placeholder='Address' />
        
        <div className='flex gap-3'>
          <input className='border border-gray-300 py-1.5 px-3.5 w-full' type='text' placeholder='City' />
          <input className='border border-gray-300 py-1.5 px-3.5 w-full' type='text' placeholder='Postal Code' />
        </div>
        
        <input className='border border-gray-300 py-1.5 px-3.5 w-full' type='text' placeholder='Country' />
        <input className='border border-gray-300 py-1.5 px-3.5 w-full' type='tel' placeholder='Phone number' />
        
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
        </div>
        
        <div className='flex flex-col gap-2'>
          <label onClick={()=>setMethod('stripe')} className='flex items-center gap-2'>
            <input type='radio' name='payment' value='credit-card' />
            Credit Card
          </label>
          <label onClick={()=>setMethod('razorpay')} className='flex items-center gap-2'>
            <input type='radio' name='payment' value='paypal' />
            PayPal
          </label>
          <label onClick={()=>setMethod('cod')} className='flex items-center gap-2'>
            <input type='radio' name='payment' value='bank-transfer' />
            Bank Transfer
          </label>
        </div>
        
        <button className='bg-black text-white py-2 px-4 mt-4 hover:bg-gray-800 transition-colors'>
          PLACE ORDER
        </button>
      </div>
      
      {/* -------------------------RIGHT SIDE -------------- */}
      <div className='w-full text-end mt-8'>
          <button onClick={()=>navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
        {/* <ShopContextProvider>
          <Cart />
        </ShopContextProvider> */}
      </div>
    </div>
  )
}

export default PlaceOrder