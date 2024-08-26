import React, { useContext, useEffect, useState } from 'react'
import style from "./Navbar.module.css"
import logo from '../../../finalProject assets-20240812T162753Z-001/finalProject assets/images/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/usercontext'
import { CartContext } from '../../context/cartcontext'

export default function Navbar() {
  
 let {userLogin,setuserLogin}=useContext(UserContext);
  

 let navigate=useNavigate()
 let {getcount,SetGetCount,deleteCartItem,getLoggedUserCarts,getLoggedUserCart,updateCartProductQuantity,clearcart}=useContext(CartContext)
//  const [getcount,SetGetCount]=useState(0);
 async  function  getCartIems() {
  let response= await getLoggedUserCarts();
  // if(response.data.status=="success"){
// setCartDetails(response.data.data);
// SetGetCount(response.data.numOfCartItems);
console.log(response);

  // }else{ }
 }
 const [CartDetails,setCartDetails]=useState(null)
//  async function getCartIems() {
//   let response= await getLoggedUserCart();
//   if(response.data.status=="success"){
// setCartDetails(response.data.data);
// console.log(response);

//   }else{ }
//  }


useEffect(()=>{getCartIems()},[])
 function SignOut(){
  localStorage.removeItem("userToken");
setuserLogin(null)
navigate("/login")
}


 return <>


<nav className=" border-gray-200 bg-slate-200  fixed top-0 left-0 right-0   ">
  <div className="mx-auto container ">

    <div className="flex   flex-wrap justify-center  md:justify-between  items-center mx-auto max-w-screen-xl container p-4">
       
   
        <Link to="" className="flex flex-wrap items-center space-x-3 rtl:space-x-reverse">
            {/* <img src={logo} width="110px" class="h-8" alt="Flowbite Logo" /> */}
            <i className="fa-solid fa-cart-shopping nav-icon text-green-600" ></i>
            <span className=" self-center text-sm font-semibold ">fresh cart</span>
     {userLogin!=null?<>
     
      <ul className='flex gap-1  '>
        <li><Link to="Home" className='text-xs'>Home</Link></li>
        <li><Link to="cart" className='text-xs'>Cart</Link></li>
        <li><Link to="wish list" className='text-xs'>wishlist</Link></li>
        <li><Link to="products" className='text-xs'>Products</Link></li>
        <li><Link to="categories" className='text-xs'>Categories</Link></li>
        <li><Link to="brands" className='text-xs'>brands</Link></li>
        </ul>
     </>:null} 
       {/* <ul className='flex gap-1  '>
        <li><Link to="Home" className='text-xs'>Home</Link></li>
        <li><Link to="cart" className='text-xs'>Cart</Link></li>
        <li><Link to="wish list" className='text-xs'>wishlist</Link></li>
        <li><Link to="products" className='text-xs'>Products</Link></li>
        <li><Link to="categories" className='text-xs'>Categories</Link></li>
        <li><Link to="brands" className='text-xs'>brands</Link></li>
        </ul> */}
        </Link>
        <div className="flex items-center space-x-6 rtl:space-x-reverse ml-auto">
        <div className="links flex gap-2 mr-auto">
          {userLogin!=null?<>
            <Link to="#" onClick={SignOut} class="text-sm ">SignOut</Link>
            <Link to="" className="flex flex-wrap items-center space-x-3 rtl:space-x-reverse"></Link>
              <Link to="/cart" className="flex flex-wrap items-center space-x-3 rtl:space-x-reverse">
                <i className="fa-solid fa-cart-shopping nav-icon relative  " >

                <div className='rounded-sm w-[21px] h-[21px] absolute top-[-15px] left-[10px] bg-green-700
                flex justify-center items-center text-white text-[10px] 
                '>
{
getcount}
                </div>
                </i>
                </Link>         
           </>:
          <>   <Link to="login" className="text-sm ">Login</Link>
           <Link to="register" className="text-sm ">Register</Link>
          
           <Link to="" className="flex flex-wrap items-center  space-x-3 rtl:space-x-reverse">
              
                <i class="fa-solid fa-cart-shopping fa-2xl "></i>
                
                </Link>   

                </>  }
       
            {/* <img src={logo} width="110px" class="h-8" alt="Flowbite Logo" /> */}
      
        </div>
            </div>
    </div></div>
</nav>

<div className='py-10'></div>
  </>
}
