import React, { useContext, useState } from 'react';
import style from "./Login.module.css";
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { UserContext } from '../../context/usercontext';

export default function Login() {
  const [ApiError,setApiError]=useState("")
  let{userLogin,setuserLogin}=useContext(UserContext)
  const [isLoding,setisLoding]=useState(false)
  const navigate=useNavigate();
  function handleLogin(values){
    setisLoding(true)
  axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin'
  
  ,values
  ).then((res)=>{
    setisLoding(false)
  if(  res.data.message==="success"){
     localStorage.setItem("userToken",res.data.token)
   setuserLogin(res.data.token)
    
     navigate('../Home')
  
  }
    console.log(res)}
  ).catch((res)=>{
    console.log(res);
    
    setisLoding(false)
    setApiError(res.response.data.message)
  }
  )
  
  }
  let validationSchema=Yup.object().shape({
   
    email:Yup.string()
    .email("invalid email")
    .required('name is Required')
    ,
    password:Yup.string().matches(/^[A-Za-z0-9]{6,10}$/,"password should be between 6 and 10")
      .required("password shuold be required")
  ,
  
  })
  
  let formik= useFormik({
    initialValues:{
      email:"",
      password:"",
      
    },
    validationSchema:validationSchema,
    onSubmit:handleLogin
   });
  //  function submit(){
  //   console.log('');
    
  //  }
   function validation(){
    let errors={};
    if(formik.values.name==""){
      errors.name="Name is Required";
    }
    if(formik.values.email==""){
      errors.email="Name is Required";
    }
    if(formik.values.phone==""){
      errors.phone="Name is Required";
    }
    if(formik.values.password==""){
      errors.password="Name is Required";
    }
    if(formik.values.rePassword==""){
      errors.rePassword="Name is Required";
    }
   
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
   {/* {isLoding? */}
  <div className='container'>
  
  <h1 className='text-start font-semibold max-w-3xl text-4xl  mx-auto'>login now</h1>
  
   <form  className="max-w-3xl mx-auto my-4" onSubmit={formik.handleSubmit}>
    
    {ApiError?
   <div className='p-2 mb-4 text-sm text-red-700 bg-red-300 my-2 border border-red-400 rounded-md'>{ApiError}</div>
  :null  
  }
    <div className=" text-start">
      <label for="email" className=" block mb-1 text-xs   ">Email</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id="email" name='email' value={formik.values.email}  className="w-full max-w-3xl p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300" />

      {formik.errors.email&&formik.touched.email?
     <div className='p-2 mb-4 text-sm text-red-700 bg-red-300 my-2 border border-red-400 rounded-md'>{formik.errors.email}</div>
     :null}
    </div>
   
    <div className=" text-start">
      <label for="password" className=" block mb-1 text-xs   "> Password</label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id="password"name='password' value={formik.values.password}  className="w-full max-w-3xl p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"  />
      {/* {errors.name&&<p>{errors.name}</p>} */}
      {formik.errors.password&&formik.touched.password?
     <div className='p-2 mb-4 text-sm text-red-700 bg-red-300 my-2 border border-red-400 rounded-md'>{formik.errors.password}</div>
     :null}
    </div>
  
  <div className='flex items-center justify-between'>
  <p className='hover:text-green-500 mx-4 font-bold text-xl' >
  <Link to='/forgetpassword'>forget your password?</Link>
  </p>
  <button type="submit" 
  disabled={!(formik.isValid&&formik.dirty)}
     className={`py-3  ${formik.isValid&&formik.dirty? 'bg-green-500 text-white':'text-gray-500  border border-gray-500'} font-medium rounded-lg text-sm w-full sm:w-auto px-5 my-5  text-center `}>{isLoding?<i className='fas fa-spinner fa-spin'></i>:null}login now</button>
 
  

  </div>
   
    </form>
  
  </div>
  {/* :null} */}
    </>)
  }
  

