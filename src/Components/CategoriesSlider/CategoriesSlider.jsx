import React, { useEffect, useRef, useState } from 'react'
import style from "./CategoriesSlider.module.css"
import axios from 'axios'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

export default function CategoriesSlider() {
  let sliderRef = useRef(null);

  const next = () => {
    sliderRef.slickNext();
  };

  const previous = () => {
    sliderRef.slickPrev();
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 5,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [categories, setCategories] = useState([]);

  function getCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Slider
        ref={slider => {
          sliderRef = slider;
        }}
        {...settings}
      >
        {categories.map((category) => (
          <div key={category._id} className='px-2 sm:w-1/2 md:w-1/3 lg:w-1/5'>
            <img src={category.image} className='w-full h-[200px] object-cover' alt={category.name} />
            <h4 className='text-center mt-2'>
              {category.name}
            </h4>
          </div>
        ))}
      </Slider>
      <div className='flex justify-center gap-2 mt-4'>
        <div onClick={previous} className='w-6 h-3 bg-gray-400 rounded-lg cursor-pointer'></div>
        <div onClick={next} className='w-6 h-3 bg-gray-400 rounded-lg cursor-pointer'></div>
      </div>
    </>
  );
}
