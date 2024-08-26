import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/cartcontext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { getcount, SetGetCount, deleteCartItem, getLoggedUserCarts, getLoggedUserCart, updateCartProductQuantity, clearcart } = useContext(CartContext);
  const [CartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  async function clearallcart() {
    let response = await clearcart();
    console.log(response);
    setCartDetails(response);
  }

  async function deleteitem(productId) {
    setLoading(true);
    let response = await deleteCartItem(productId);
    if (response.data.status === "success") {
      setCartDetails(response.data.data);
      await getLoggedUserCarts();
    }
    setLoading(false);
  }

  async function update(id, count) {
    setLoading(true);
    let response = await updateCartProductQuantity(id, count);
    if (response.data.status === "success") {
      setCartDetails(response.data.data);
    }
    setLoading(false);
    getCartIems2();
  }

  async function getCartIems2() {
    let response = await getLoggedUserCarts();
    console.log(response);
  }

  async function getCartIems() {
    setLoading(true);
    let response = await getLoggedUserCart();
    if (response.data.status === "success") {
      setCartDetails(response.data.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    getCartIems();
    getCartIems2();
  }, []);

  return (
    <>
      {loading ? (
        <div className='loading-overlay flex items-center justify-center'>
          <div className='sk-chase'>
            <div className='sk-chase-dot'></div>
            <div className='sk-chase-dot'></div>
            <div className='sk-chase-dot'></div>
            <div className='sk-chase-dot'></div>
            <div className='sk-chase-dot'></div>
            <div className='sk-chase-dot'></div>
          </div>
        </div>
      ) : (
        CartDetails?.products?.length > 0 ? (

          <div className='flex justify-center'>
          <div className='bg-gray-200 p-4 ' >
            <div className='flex flex-col md:flex-row justify-between items-center m'>
              <h1 className='font-semibold text-xl md:text-2xl'>Cart Shop</h1>
              <Link to="/checkout">
                <button type='submit' className='bg-blue-600 rounded-md text-xs px-4 py-2 text-white'>
                  Checkout
                </button>
              </Link>
            </div>
            <div className='flex flex-col items-start  mb-4'>
              <h6 className='text-sm font-semibold'>Total Price: {CartDetails?.totalCartPrice}</h6>
              <h6 className='text-sm font-semibold'>Total Number of Items: {getcount}</h6>
            </div>
            {CartDetails?.products.map((product) => 
              product.count > 0 ? (
                <div key={product.product.id} className='flex flex-col md:flex-row border-b border-gray-300 mb-4 pb-4 justify-between'>
                  <div className='flex items-center mb-4 md:mb-0'>
                    <img src={product.product.imageCover} className='w-full md:w-32 h-auto object-cover' alt={product.product.title} />
                    <div className='ml-4'>
                      <h2 className='text-sm font-semibold flex items-start'>{product.product.title}</h2>
                      <h2 className='text-sm font-semibold flex items-start'>{`${product.price} EGP`}</h2>
                      <div className='flex items-center text-red-700 text-xs mt-2'>
                        <i className="fa-solid fa-trash fa-xs"></i>
                        <span onClick={() => deleteitem(product.product.id)} className='ml-1 cursor-pointer'>Remove</span>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center mt-4 md:mt-0'>
                    <button onClick={() => update(product.product.id, product.count + 1)} className='w-8 h-8 rounded-md border border-green-400 flex items-center justify-center'>+</button>
                    <span className='mx-2 text-sm'>{product.count}</span>
                    <button onClick={() => update(product.product.id, product.count - 1)} className='w-8 h-8 rounded-md border border-green-400 flex items-center justify-center'>-</button>
                  </div>
                </div>
              ) : null
            )}
            <button onClick={() => clearallcart()} className='border border-green-400 rounded-md py-2 px-4 mt-4'>
              Clear Your Cart
            </button>
          </div></div>
        ) : (
          <div className='bg-gray-200 w-1/1' >
          <div  className='py-6'>
          <div className='flex px-5 py-1 justify-between md:float-wrap sm:flex-none'>
          <div> <h1 className='font-semibold text-[24px] text-start'>your cart </h1>
        
        
        <h1  className='text-[25px] font-semibold'>your cart is empty</h1>
        </div>
           
          </div></div></div>
        )
      )}
    </>
  );
}
