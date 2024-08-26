import React, { useContext, useState } from 'react';

import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { UserContext } from '../../context/usercontext';
import { CartContext } from '../../context/cartcontext';

export default function Checkout() {
  const [ApiError,setApiError]=useState("")
  let{checkout,cartId}=useContext(CartContext)
  const [isLoding,setisLoding]=useState(false)
  const navigate=useNavigate();

  let validationSchema=Yup.object().shape({
   
    details:Yup.string()
    .matches(/^(?=(?:.*[a-zA-Z0-9]){3,}).*$/,"details min length is 3")
    .required('Details is Required')
    ,
    phone:Yup.string().matches(/^01[0125][0-9]{8}$/,"invalid phone")
      .required("phone shuold be required")
  ,city:Yup.string().required("city should be required")
  
  })
  
  let formik= useFormik({
    initialValues:{
      details:"",
      phone:"",
      city:""
    },
    validationSchema:validationSchema,
    onSubmit:()=>handleCheckout(cartId,`http://localhost:5173`)
   });
  async function handleCheckout(cartId,url){
 
 let {data}= await  checkout(cartId,url,formik.values)
 console.log(data);
 
// console.log(data.session.url);
window.location.href=data.session.url;
}
  //  console.log(formik);
   
  //  function submit(){
  //   console.log('');
    
  //  }
  //  function validation(){
  //   let errors={};
  //   if(formik.values.name==""){
  //     errors.name="Name is Required";
  //   }
  //   if(formik.values.details==""){
  //     errors.details="Name is Required";
  //   }
  //   if(formik.values.phone==""){
  //     errors.phone="Name is Required";
  //   }
  //   if(formik.values.password==""){
  //     errors.password="Name is Required";
  //   }
  //   if(formik.values.rePassword==""){
  //     errors.rePassword="Name is Required";
  //   }
   
  //   return errors;
  //  }
  //  console.log(formik);
   
    return (
        <>
        {/* {ApiError?
   <div className='w-1/2 mx-auto bg-red-600 text-white font-bold rounded-lg p-3'>
      </div>  
    :null  }
   {ApiError} */}
   {/* {isLoding? */}
  <div className='container'>
  
  
  
   <form  className="max-w-3xl mx-auto" onSubmit={formik.handleSubmit}
   >
    
    {ApiError?
   <div className='p-2 mb-4 text-sm text-red-700 bg-red-300 my-2 border border-red-400 rounded-md'>{ApiError}</div>
  :null  
  }
    <div className=" text-start">
      <label for="details" className=" block mb-1 text-xs   ">Details</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" id="details" name='details' value={formik.values.details}  className="w-full max-w-3xl p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300" />

      {formik.errors.details&&formik.touched.details?
     <div className='p-2 mb-4 text-sm text-red-700 bg-red-300 my-2 border border-red-400 rounded-md'>{formik.errors.details}</div>
     :null}
    </div>
   
    <div className=" text-start">
      <label for="phone" className=" block mb-1 text-xs   "> phone</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="phone" id="phone"name='phone' value={formik.values.phone}  className="w-full max-w-3xl p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"  />
      {/* {errors.name&&<p>{errors.name}</p>} */}
      {formik.errors.phone&&formik.touched.phone?
     <div className='p-2 mb-4 text-sm text-red-700 bg-red-300 my-2 border border-red-400 rounded-md'>{formik.errors.phone}</div>
     :null}
    </div>
    <div className=" text-start">
      <label for="city" className=" block mb-1 text-xs   "> city</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange}
       type="city" id="city"name='city' 
       value={formik.values.city}
         className="w-full max-w-3xl p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"  />
      {/* {errors.name&&<p>{errors.name}</p>} */}
      {formik.errors.city&&formik.touched.city?
     <div className='p-2 mb-4 text-sm text-red-700 bg-red-300 my-2 border border-red-400 rounded-md'>{formik.errors.city}</div>
     :null}
    </div>
  
  <div className='text-start'>
  <button  
     className="my-10 py-2 w-full max-w-3xl ring-2 ring-blue-300 text-blue-500 hover:text-black  hover:bg-blue-300 focus:ring-2 focus:outline-none   focus:ring-blue-300 font-normal rounded-lg">{isLoding?<i className='fas fa-spinner fa-spin'></i>:null}Pay now</button>
  <p className='hover:text-green-500 mx-4' >

  </p>
  

  </div>
   
    </form>
  
  </div>
  {/* :null} */}
    </>)
  }
  

