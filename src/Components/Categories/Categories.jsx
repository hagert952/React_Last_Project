import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import SubCategories from '../subCategories/subCategories';

export default function Categories() {
  let { _id,category } = useParams();
  const [sub, setSubCategory] = useState(null);
  const [categories, setCategories] = useState([]);
const [categname,setCategname]=useState(null);
const [loading,setloading]=useState(true);
  async function subcat(category) {
    setloading(true)
      return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${category}/subcategories`)
     .then((res)=>{ setSubCategory(res?.data?.data)
      setloading(false);
      console.log(res.data.data);
      setloading
     })
   .catch((res)=>{console.log(res);
   })
  }
  async function categoryid(_id) {

      return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${category}`)
     .then((res)=>{ 
     setCategname(res?.data?.data)

      console.log(res.data.data);
      
     })
   .catch((res)=>{console.log(res);
   })
  }

  async function getAllCategories() {
    setloading(true)
  return  await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  .then((res)=>{
    setloading(false)
    setCategories(res.data.data);
console.log(res.data.data);

  })
    .catch((error)=>
    {  console.log(error),
    setloading(false)}
  )
   
  }

  useEffect(() => {
    getAllCategories();
   categoryid(_id);
      subcat(category);
    
  }, [category,_id]);

  return (
    <>
    {loading==false?
    <div>  <div className="flex flex-wrap">
        {categories?.map((category) => (
          <div key={category?.id} className="w-full sm:w-1/3 lg:w-1/4 p-2">
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <Link to={`/categories/${category._id}/${category._id}`}>
                <img
                  className="rounded-t-lg bg-contain w-full h-[200px] object-cover"
                  src={category.image}
                  alt={category.name}
                />
                <div className="p-5">
                  <h1 className="font-bold text-3xl text-green-950">{category.name}</h1>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

  <h1 className="font-bold text-3xl text-green-600 m-5">{categname?.name} SubCategories</h1>
      {
      sub && (
        <div className="flex flex-wrap">
          {sub.map((subcateg) => (
            <div key={subcateg?.id} className="w-full sm:w-1/3 lg:w-1/3 p-2">
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link to="#">
                  <div className="p-5">
                    <h1 className="font-bold text-3xl text-black">{subcateg?.name}</h1>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <SubCategories />
    </div>:<div className='loading-overlay'>
          <div className='sk-chase'>
              <div className='sk-chase-dot'></div>
                       <div className='sk-chase-dot'></div>
                 <div className='sk-chase-dot'></div>
                           <div className='sk-chase-dot'></div>
             <div className='sk-chase-dot'></div>
              <div className='sk-chase-dot'></div>
              </div>
                 </div> }</>
  );
}
