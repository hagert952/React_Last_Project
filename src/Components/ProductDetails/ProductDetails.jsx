import React, { useContext, useEffect, useRef, useState } from 'react'
import style from "./ProductDetails.module.css"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from 'react-slick';
import { CartContext } from '../../context/cartcontext';

export default function ProductDetails() {
  let [loading,setloading]=useState(true);
  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };const [wishlists,setWishlists]=useState([])
  let { addProductToCard,
    getLoggedUserCarts,
    addProductTowishlist,getLoggedUserwishlist
       ,getcount,SetGetCount,} = useContext(CartContext);
       async function getwishlist() {
        let response= await getLoggedUserwishlist();
        if(response.data.status=="success"){
     console.log(response.data.data);
     setWishlists(response.data.data)
     
        }else{ }
       }
       async function addToWishlist(id) {
        setloading(true);
  
        let response = await addProductTowishlist(id);
        console.log(response.data);
        if (response.data.status === "success") {
    // await getLoggedUserCarts();
    setloading(false);
    await getwishlist();
    
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
  async function addToCart(id) {
    setloading(true);
    let response = await addProductToCard(id);
    console.log(response.data);
    if (response.data.status === "success") {
      setloading(false);
await getLoggedUserCarts();

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
      
      toast(response.data.message);
    }
  }




  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
const [product ,setproduct]=useState(null);
 let {id}=useParams()
async function  getproduct(id){
setloading(true);
 return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
 
.then((res)=>{console.log(res.data.data)

setproduct(res.data.data);
setloading(false)
}
).catch((res)=>{

setloading(false)

})

}
useEffect((
)=>{
  getproduct(id)

},[ ])
 return <>
   {loading?
  (
        <div className='loading-overlay'> <div className='sk-chase'>
                 <div className='sk-chase-dot'></div>
             <div className='sk-chase-dot'></div>   <div className='sk-chase-dot'></div>
            <div className='sk-chase-dot'></div><div className='sk-chase-dot'></div>
             <div className='sk-chase-dot'></div></div></div>
      )
  
 : 
  <div className="row items-center md:flex md:flex-wrap  sm:flex sm:flex-wrap ">

    <div className='w-full lg:w-1/4 sm:w-1/4 md:w-1/4'>
    <Slider
        ref={slider => {
          sliderRef = slider;
        }}
        {...settings}
      >
   {product?.images.map((src)=><img src={src} className='w-full'></img>)} 
  
  </Slider>
 
  <div className='flex  justify-center my-3 gap-2'>
    <div onClick={previous} className='w-6 h-3 bg-gray-400 rounded-lg flex '>

    </div>
    <div onClick={next} className='w-6 h-3 bg-gray-400 rounded-lg flex '>

    </div>
  </div>
    </div>
    <div className='w-3/4 p-4 text-start  '>
    <h3 className='font-semibold capitalize text-2xl'>{product?.title}
    </h3>
    <h4 className='text-gray-700 my-4'>{product?.description}</h4>
   <h4 className=''>
   {product?.category.name}

   </h4>
   <div className='flex justify-between p-3 my-5  '>
                  <span>{product?.price}EGP</span>
                  <span>
                    <i className='fas fa-star text-yellow-400'></i>
                    {product?.ratingsAverage}
                  </span>
                </div>
              <div className='flex justify-center items-center  '>

              <button onClick={() => addToCart(product.id)} className='btn '>add to cart</button>
              <i
                    onClick={() => addToWishlist(product.id)}
                    className={`fa-solid fa-heart fa-2xl px-3 `}></i>
              </div>

   
    </div>
  </div>
 } </>
}
