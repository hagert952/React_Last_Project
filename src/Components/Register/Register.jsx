import React, { useContext, useState } from 'react';
import style from "./Register.module.css";
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { UserContext } from '../../context/usercontext';

export default function Register() {
  let {userLogin,setuserLogin}=useContext(UserContext)
const [ApiError,setApiError]=useState("")
const [isLoding,setisLoding]=useState(false)
const navigate=useNavigate();
function handleRegister(values){
  setisLoding(true)
axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup'

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
  name:Yup.string()
  .min(3,'minimum length is 3')
  .max(10,'max length is 10')
  .required('name is required'),
  email:Yup.string()
  .email("invalid email")
  .required('name is Required')
  ,phone:Yup.string()
  .matches(/^01[0125][0-9]{8}$/,'invalid phone number')
  .required("phone is required"),
  password:Yup.string().matches(/^[a-zA-Z0-9]{6,10}$/
,"password should be between 6 and 10")
    .required("password shuold be required")
,
  rePassword:Yup.string(
  ).oneOf([ Yup.ref("rePassword")],"rePAssword should be same")
  .required('repassword should required')
})

let formik= useFormik({
  initialValues:{
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:"",
    
  },
  validationSchema:validationSchema,
  onSubmit:handleRegister
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
      {ApiError?
 <div className='w-1/2 mx-auto bg-red-600 text-white font-bold rounded-lg p-3'>
   {ApiError} </div>  
  :null  }
 {ApiError}
<div className='container '>

<h1 className='text-start text-4xl max-w-3xl mx-auto font-semibold  '>register now</h1>

 <form  className="max-w-3xl mx-auto my-4" onSubmit={formik.handleSubmit}>
  <div className=" text-start">
    <label for="name" className="block mb-1 text-xs  ">name</label>
    <input onBlur={formik.handleBlur}
    
    onChange={formik.handleChange}  type="text" id="name" name='name' value={formik.values.name}  className="w-full max-w-3xl p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"  />
   {/* {errors.name&&<p>{errors.name}</p>} */}
   {formik.errors.name&&formik.touched.name?
   <div className='p-2 mb-4 text-sm text-red-700 bg-red-300 my-2 border border-red-400 rounded-md'>{formik.errors.name}</div>
   :null}
  </div>
  <div className=" text-start">
    <label for="email" className=" block mb-1 text-xs   ">email</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id="email" name='email' value={formik.values.email}  className="w-full max-w-3xl p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300" />
    {/* {errors.name&&<p>{errors.name}</p>} */}
    {formik.errors.email&&formik.touched.email?
   <div className='p-2 mb-4 text-sm text-red-700 bg-red-300 my-2 border border-red-400 rounded-md'>{formik.errors.email}</div>
   :null}
  </div>
  <div className=" text-start">
    <label for="phone" className=" block mb-1 text-xs   ">phone</label>
    {/* {errors.name&&<p>{errors.name}</p>} */}
   
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" id="phone" name="phone"value={formik.values.phone}  className="w-full max-w-3xl p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"  />
    {formik.errors.phone&&formik.touched.phone?
   <div className='p-2 mb-4 text-sm text-red-700 bg-red-300 my-2 border border-red-400 rounded-md'>{formik.errors.phone}</div>
   :null}
  </div>
  <div className=" text-start">
    <label for="password" className=" block mb-1 text-xs   "> password</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id="password"name='password' value={formik.values.password}  className="w-full max-w-3xl p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"  />
    {/* {errors.name&&<p>{errors.name}</p>} */}
    {formik.errors.password&&formik.touched.password?
   <div className='p-2 mb-4 text-sm text-red-700 bg-red-300 my-2 border border-red-400 rounded-md'>{formik.errors.password}</div>
   :null}
  </div>
  <div className=" text-start">
    <label for="password" className=" block mb-1 text-xs    "> Repassword</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id="rePassword"name='rePassword' value={formik.values.rePassword}  className="w-full max-w-3xl p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"  />
    {/* {errors.name&&<p>{errors.name}</p>} */}
    {formik.errors.rePassword&&formik.touched.rePassword?
   <div className='p-2 mb-4 text-sm text-red-700 bg-red-300 my-2 border border-red-400 rounded-md'>{formik.errors.rePassword}</div>
   :null}
  </div>
<div className='text-end'>
  <button type="submit" 
  disabled={!(formik.isValid&&formik.dirty)}
   className={`py-3      font-medium rounded-lg text-sm w-full sm:w-auto px-5 my-5  text-center ${formik.isValid&&formik.dirty?'bg-green-600 text-white':'text-gray-500 border border-gray-500'}`}>{isLoding?<i className='fas fa-spinner fa-spin'></i>:null}Register</button>
{/* <p >if you have an account
<Link to='/login'>login</Link>
</p> */}
</div>
  </form>

</div>
  </>)
}
