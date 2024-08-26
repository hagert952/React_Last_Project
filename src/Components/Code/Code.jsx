

import React, { useState } from 'react';

import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import style from "./Code.module.css"
export default function Code() {
  const [ApiError,setApiError]=useState("")
  const [isLoding,setisLoding]=useState(false)
  const navigate=useNavigate();
  function handleResetCode(values){
    setisLoding(true)
  axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode'
  
  ,values
  ).then((res)=>{
    setisLoding(false)
  if(  res.data.status==="Success"){
    //  localStorage.setItem("userToken",res.data.token)
    //  navigate('../Home')

    navigate('../Resetpassword')
  
  }
    console.log(res)}
  ).catch((res)=>{console.log(res);
  
    setisLoding(false)
    setApiError(res.response.data.message)
  }
  )
  
  }
  // let validationSchema=Yup.object().shape({
   
  //   email:Yup.string()
  //   .email("invalid email")
  //   .required('name is Required')
  //   ,
  // //   password:Yup.string().matches(/^[A-Za-z0-9]{6,10}$/,"password should be between 6 and 10")
  // //     .required("password shuold be required")
  // // ,
  
  // })
  
  let formik= useFormik({
    initialValues:{
      resetCode:"",
   
      
    },
    // validationSchema:validationSchema,
    onSubmit:handleResetCode
   });
  //  function submit(){
  //   console.log('');
    
  //  }
  //  function validation(){
  //   let errors={};
  //   // if(formik.values.name==""){
  //   //   errors.name="Name is Required";
  //   // }
  //   if(formik.values.email==""){
  //     errors.email="Name is Required";
  //   }
  //   // if(formik.values.phone==""){
  //   //   errors.phone="Name is Required";
  //   // }
  //   // if(formik.values.password==""){
  //   //   errors.password="Name is Required";
  //   // }
  //   // if(formik.values.rePassword==""){
  //   //   errors.rePassword="Name is Required";
  //   // }
   
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
  <div className='container'>
  
  <h1 className='text-start font-semibold text-3xl max-w-3xl mx-auto'>please enter your verification code</h1>
  
   <form  className="max-w-3xl mx-auto my-3" onSubmit={formik.handleSubmit}>
  














    <div className=" text-start">
      <label for="resetCode" className=" block mb-1 text-xs   ">resetCode</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="resetCode" id="resetCode" name='resetCode' value={formik.values.resetCode} className=" border max-w-3xl p-2  border-gray-300 focus:outline-none  text-sm focus:ring focus:ring-blue-300 block w-full rounded-lg "  />
      {/* {errors.name&&<p>{errors.name}</p>} */}
      {/* {formik.errors.email&&formik.touched.email?
     <div className='p-2 mb-4 text-sm text-red-700 bg-red-300 my-2 border border-red-400 rounded-md'>{formik.errors.resetCode}</div>
     :null} */}
    </div>
    {ApiError?
   <div className='p-2 mb-4 text-sm text-red-700 bg-red-300 my-2 border border-red-400 rounded-md'>{ApiError}</div>
  :null  
  }
    {/* <div className=" text-start">
      <label for="password" className=" block mb-1 text-xs   "> password</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id="password"name='password' value={formik.values.password} className="y border  border-gray-300  text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full "  /> */}
      {/* {errors.name&&<p>{errors.name}</p>} */}
      {/* {formik.errors.password&&formik.touched.password?
     <div className='p-2 mb-4 text-sm text-red-700 bg-red-300 my-2 border border-red-400 rounded-md'>{formik.errors.password}</div>
     :null}
    </div>
   */}
  <div className='flex items-center'>
  <button type="submit" 
     className="py-3 text-green-600 hover:text-white hover:bg-green-600     font-medium rounded-lg text-sm w-full sm:w-auto px-5 my-5  text-center border border-green-600 ">{isLoding?<i className='fas fa-spinner fa-spin'></i>:null}verify</button>
  <p className='hover:text-green-500' >
  {/* <Link to='forgetpassword'>forget your password ?</Link> */}
  </p>
  

  </div>
   
    </form>
  
  </div>
    </>)
  }
  





