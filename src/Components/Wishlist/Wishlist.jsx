import React, { useContext, useEffect, useState } from 'react'

import { CartContext } from '../../context/cartcontext'
import axios from 'axios'
export default function Wishlist() {
  let {deleteCartItem,deletewhishlist,getLoggedUserwishlist,getLoggedUserCart,updateCartProductQuantity,clearcart}=useContext(CartContext)
  const [CartDetails,setCartDetails]=useState(null)
// const [clearcart,setClearCart]=useState()
const [getcount,SetGetCount]=useState(0);
const [wishlists,setWishlists]=useState([])
;
let [loading ,setloading]=useState(true);
async function clearallcart(){
let response=await clearcart()
console.log(response);

setCartDetails(response)
}

let { addProductToCard,
  getLoggedUserCarts,
  addProductTowishlist,} = useContext(CartContext);

async function addToCart(id) {
  setloading(true)
  let response = await addProductToCard(id);
  console.log(response.data);
  if (response.data.status === "success") {
    setloading(false)
await getLoggedUserCarts();await getCartIems();
await getwishlist()
    toast(response.data.message, {
      icon: <i className="fa-solid fa-check fa-xl text-9xl"></i>,
      position: 'top-right',
      style: {
        background: 'green',
        color: 'white',
        fontSize: '8px',
        width: "30%"
      },
      iconTheme: {
        primary: 'green',
        secondary: 'black',
      },
    });
  } else {
    setloading(false);
    toast(response.data.message);
  }
}




// async function getwishlist(){

// }

async function deleteitem(productId)
{setloading(true)
  let response= await deletewhishlist(productId)
  if (response.data.status === "success") {
    setloading(false)
console.log(response.data.data);
setWishlists(response.data.data);
getCartIems();
getwishlist()}else{setloading(false);}
}

  async function update(id,count){
let response= await updateCartProductQuantity(id,count);


console.log(response);
if(response.data.status=="success"){
  setCartDetails(response.data.data)
}
// setCartDetails(response.data.data);

(response)
 }
 async function getCartIems() {
  // setLoading(true); 
  let response = await getLoggedUserCart();
  if (response.data.status === "success") {
    setCartDetails(response.data.data);
  }
  // setLoading(false); 
}
 
async function getwishlist() {
  setloading(true);
  let response = await getLoggedUserwishlist();
  if (response.data.status === "success") {
    setWishlists(response.data.data);
  }
  setloading(false);
}

  useEffect(()=>{
getwishlist();getCartIems();
  },[])
  return (
    
    loading?
      (
            <div className='loading-overlay'> <div className='sk-chase'>
                     <div className='sk-chase-dot'></div>
                 <div className='sk-chase-dot'></div>   <div className='sk-chase-dot'></div>
                <div className='sk-chase-dot'></div><div className='sk-chase-dot'></div>
                 <div className='sk-chase-dot'></div></div></div>
          )
      
     : 
  wishlists.length>0?
  <>
  
 <div className='bg-gray-200  ' >
  <div  key={wishlists?.map((product)=>product.id)} className='py-6  '>

 
  <>
  <h1 className='flex mx-5 font-semibold text-[24px] text-start gap-1'>My wish List</h1>
  
  {wishlists?.map((product)=>
  <div key={product._id}>
  <div className=' flex   '>
  <div className='flex items-center border justify-between w-full lg:w-auto '>
    <div className='flex  items-center'>
 <div className='w-full sm:w-1/2 md:w-1/5  px-5  '>
      
       <img src={product.imageCover} className='my-4  w-full ' alt="" />
       {/* <hr className='bg-red-600' /> */}
        </div> 
        
     <div className='flex md:flex-col sm:flex-col '>
      <div className='flex text-start  flex-col '>
     <h2 className=' text-xs font-semibold w-full ' >{product.title}</h2>
        <h2 className=' text-xs font-semibold w-full ' >{`${product.price}EGP`}</h2>
   

   <div className='flex items-center text-red-700 text-xs'>

   <i className="fa-solid fa-trash fa-2xs"></i>
   <span onClick={()=>deleteitem(product.id)} className='text-[9px] cursor-pointer'>Remove</span>
   </div>

      
  
    </div>
      </div> </div>
       <div className='flex  items-center justify-between'>
 
      {/* <div class="flex items-center">
                        <button class="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <span class="sr-only">Quantity button</span>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                            </svg>
                        </button>
                        <div class="ms-3">
                            <input type="number" id="first_product" class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required />
                        </div>
                        <button class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <span class="sr-only">Quantity button</span>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                            </svg>
                        </button>
                    </div> */}
{/* <div>
</div> */}
<button onClick={()=>{addToCart(product.id) ,deleteitem(product.id)}} className='w-full text-[13px]  border border-green-400 rounded-md px-6  '> add To Cart</button>

</div>
         </div></div>   
        <div className='w-180 h-[1px] mx-6 bg-gray-300'>
        
        </div>
 </div> )}

 
    </>  
       
  
  
  </div>
  </div>
  
      


{/* <div className="relative overflow-x-auto  sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src="/docs/images/products/apple-watch.png" className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          Apple Watch
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={1} required />
            </div>
            <button className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          $599
        </td>
        <td className="px-6 py-4">
          <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
        </td>
      </tr>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src="/docs/images/products/imac.png" className="w-16 md:w-32 max-w-full max-h-full" alt="Apple iMac" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          iMac 27"
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div className="ms-3">
              <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={1} required />
            </div>
            <button className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          $2499
        </td>
        <td className="px-6 py-4">
          <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
        </td>
      </tr>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src="/docs/images/products/iphone-12.png" className="w-16 md:w-32 max-w-full max-h-full" alt="iPhone 12" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          IPhone 12 
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div className="ms-3">
              <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={1} required />
            </div>
            <button className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          $999
        </td>
        <td className="px-6 py-4">
          <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
        </td>
      </tr>
    </tbody>
  </table>
</div> */}


  </>:<div>
  <div className='bg-gray-200 w-1/1' >
  <div  className='py-6'>
  <div className='flex px-5 py-1 justify-between md:float-wrap sm:flex-none'>
  <div> <h1 className='font-semibold text-[24px] text-start'>Whichlist Shop</h1>


<h1  className='text-[25px] font-semibold'>your Whichlist is empty</h1>
</div>
   
  </div></div></div>
  </div>
)}
