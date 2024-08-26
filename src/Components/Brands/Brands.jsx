import React, { useEffect, useRef, useState } from 'react'
import style from "./Brands.module.css"
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Brands() {
  let  {_id}=useParams();
  const [loading,setloading]=useState(true);
  const [brands,setBrands]= useState([]);
const [IsVisible,setIsVisible]=useState(null);
const outsideRef = useRef(null);
  function open(){}
const [speceficbrand,setSpecificBrand]=useState(null);
async function getSpecificBrands(id){
  setloading(true);
    return await axios .get (`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    .then((res)=>{
      setloading(false);
        setSpecificBrand(res?.data?.data);
        setIsVisible(true);
        console.log(res?.data.data);
        
    }).catch((res)=>{
      
      setloading(false);
      console.log(res);
    })
}

const handleLinkClick = (brand) => {
  setSpecificBrand(brand);
  setIsVisible(true);
};

const handleClose = () => {
  setIsVisible(false); 
};

function close(){setIsVisible(false)}
useEffect(()=>{
  function clickoutside(event){
    if(outsideRef.current&& !outsideRef.current.contains(event.target)){

close();}}
document.addEventListener('mousedown', clickoutside);
return () => {
  document.removeEventListener('mousedown', clickoutside);

  }
},[])

async function getAllBrands(){
  setloading(true);
  return await  axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  .then((res)=>
  { 
    setloading(false);
     setBrands(res.data.data),
    console.log(res.data.data)}
    ).catch((res)=>{console.log(res),

      setloading(false);
    })
}
useEffect(()=>{getAllBrands() ,getSpecificBrands(_id)},[_id])


  return (
  
  
  <>
  {loading==false?
  <div>
    <h1 className='text-4xl font-semibold text-green-600 my-7 '>All Brands</h1>

  <div key={brands.map((brand)=>brand._id)} className='flex flex-wrap '>
   {!IsVisible&&(<div className='flex flex-wrap'> 
  {brands.map((brand)=>
//   <Link to={`/brands/${brand._id}`}>
  <div key={brand._id} className= "w-full sm:w-1/4 lg:w-1/4 p-2">
 <Link to={`/brands/${brand._id}`} onClick={() => handleLinkClick(brand)}>
  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  
    <img  className="p-8 rounded-t-lg" src={brand.image} alt="product image" />
  <div className="px-5 pb-5">
   <h1>{brand.name}</h1>
  </div>
</div></Link>
</div>  
// {/* </Link> */}

    
)}</div>)}
</div>
{IsVisible &&(<>
<div className='absolute opacity-40 bg-slate-400 top-0 bottom-0  right-0 left-0  overflow-hidden '></div>
<div className=' top-10 flex justify-center '>
<a ref={outsideRef} className=" flex flex-col items-center justify-between bg-white border border-gray-200 rounded-lg shadow md:flex-row sm:max-w-sm md:max-w-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 absolute top-0 ">
<i  onClick={handleClose} className="fa-solid fa-x absolute top-0 right-0 py-2 px-2 "></i>
  
  <div className="absolute top-0 left-0 right-0 h-[0.9px] bg-gray-300 my-10"></div>
  
  <div className="my-11 flex flex-col justify-between p-4 leading-normal">
    <h5 className="mb-2 text-3xl font-bold  text-gray-900 dark:text-white">{speceficbrand?.name}</h5>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{speceficbrand?.name}</p>
  </div>
  
  <img className="object-contain w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={speceficbrand?.image} alt />


  <div className="absolute bottom-0  left-0 right-0 h-[0.9px]  bg-gray-300 my-10"></div>

<button className='absolute bottom-[4px] rounded-lg py-1 right-0 mx-2 bg-slate-500 px-3' onClick={handleClose}>close</button>
</a>

</div></>
)}


<div key={speceficbrand?._id}><h1>{speceficbrand && (speceficbrand?.name)}</h1> </div>
</div>:<div className='loading-overlay'>
          <div className='sk-chase'>
              <div className='sk-chase-dot'></div>
                       <div className='sk-chase-dot'></div>
                 <div className='sk-chase-dot'></div>
                           <div className='sk-chase-dot'></div>
             <div className='sk-chase-dot'></div>
              <div className='sk-chase-dot'></div>
              </div>
                 </div>}</>)
}
