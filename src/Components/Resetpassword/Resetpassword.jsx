
import React, { useState } from 'react';

import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

import style from "./Resetpassword.module.css"
export default function Resetpassword() {
  const [ApiError,setApiError]=useState("")
  const [isLoding,setisLoding]=useState(false)
  const navigate=useNavigate();
  function handleresetPassword(values){
    setisLoding(true)
  axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword'
  
  ,values
  ).then((res)=>{
    setisLoding(false)
  if(  res.status===200){
    //  localStorage.setItem("userToken",res.data.token)
    //  navigate('../Home')

    navigate('../Home')
  
  }
    console.log(res)}
  ).catch((res)=>{
    console.log(res);
    
    setisLoding(false)
    // setApiError(res.response.data.message)
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
      email:"",
      newPassword:"",
      
    },
    // validationSchema:validationSchema,
    onSubmit:handleresetPassword
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
  
  <h1 className='text-start font-semibold '>reset your account password
  </h1>
  
   <form  className="max-w-3xl mx-auto" onSubmit={formik.handleSubmit}>

    <div className=" text-start">
      <label for="email" className=" block mb-1 text-xs   ">email</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id="email" name='email' value={formik.values.email} className=" border  border-gray-300  text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full "  />
      {/* {errors.name&&<p>{errors.name}</p>} */}
      {/* {formik.errors.email&&formik.touched.email?
     <div className='p-2 mb-4 text-sm text-red-700 bg-red-300 my-2 border border-red-400 rounded-md'>{formik.errors.email}</div>
     :null} */}
    </div>
    <div className=" text-start">
      <label for="newPassword" className=" block mb-1 text-xs   ">password</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id="newPassword" name='newPassword' value={formik.values.newPassword} className=" border  border-gray-300  text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full "  />
      {/* {errors.name&&<p>{errors.name}</p>} */}
   
    </div>
   
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
     className="py-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 my-5  text-center ">{isLoding?<i className='fas fa-spinner fa-spin'></i>:null}verify</button>
  <p className='hover:text-green-500' >
  {/* <Link to='forgetpassword'>forget your password ?</Link> */}
  </p>
  

  </div>
   
    </form>
  
  </div>
    </>)
  }
  



