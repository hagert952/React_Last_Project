
import style from "./Forgetpassword.module.css"
import React, { useState } from 'react';

import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
export default function Forgetpassword() {
  const [ApiError,setApiError]=useState("")
  const [isLoding,setisLoding]=useState(false)
  const navigate=useNavigate();
  function handleForgetpassword(values){
    setisLoding(true)
  axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords'
  
  ,values
  ).then((res)=>{
    setisLoding(false)
  if(  res.data.statusMsg==="success"){
     localStorage.setItem("userToken",res.data.token)
    //  navigate('../Home')

    navigate('../code')
  
  }
    console.log(res)}
  ).catch((res)=>{
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
      password:"",
      
    },
    // validationSchema:validationSchema,
    onSubmit:handleForgetpassword
   });
  //  function submit(){
  //   console.log('');
    
  //  }
   function validation(){
    let errors={};
    // if(formik.values.name==""){
    //   errors.name="Name is Required";
    // }
    if(formik.values.email==""){
      errors.email="Name is Required";
    }
    // if(formik.values.phone==""){
    //   errors.phone="Name is Required";
    // }
    // if(formik.values.password==""){
    //   errors.password="Name is Required";
    // }
    // if(formik.values.rePassword==""){
    //   errors.rePassword="Name is Required";
    // }
   
    return errors;
   }
  //  console.log(formik);
   
    return (
        <>
        {/* {ApiError?
   <div className='w-1/2 mx-auto bg-red-600 text-white font-bold rounded-lg p-3'>
      </div>  
    :null  }
   {ApiError} */}

   {isLoding==false?
  <div className='container'>
  
  <h1 className='text-start font-semibold  text-3xl max-w-3xl mx-auto'>please enter your verification code</h1>
  
   <form  className="max-w-3xl mx-auto my-4" onSubmit={formik.handleSubmit}>

    <div className=" text-start">
      <label for="email" className=" block mb-1 text-xs   ">email</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id="email" name='email' value={formik.values.email} className="w-full max-w-3xl p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"  />
      {/* {errors.name&&<p>{errors.name}</p>} */}
      {formik.errors.email&&formik.touched.email?
     <div className='p-2 mb-4 text-sm text-red-700 bg-red-300 my-2 border border-red-400 rounded-md'>{formik.errors.email}</div>
     :null}
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
     className="py-3 text-green-600 hover:bg-green-600 hover:text-white border border-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 my-5  text-center ">{isLoding?<i className='fas fa-spinner fa-spin'></i>:null}verify</button>
  <p className='hover:text-green-500' >
  {/* <Link to='forgetpassword'>forget your password ?</Link> */}
  </p>
  

  </div>
   
    </form>
  
  </div>
 :(<div className='loading-overlay'>
 <div className='sk-chase'>
     <div className='sk-chase-dot'></div>
              <div className='sk-chase-dot'></div>
        <div className='sk-chase-dot'></div>
                  <div className='sk-chase-dot'></div>
    <div className='sk-chase-dot'></div>
     <div className='sk-chase-dot'></div>
     </div>
        </div>)} </>)
  }
  



