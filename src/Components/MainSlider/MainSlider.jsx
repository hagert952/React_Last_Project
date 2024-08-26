import React, { useRef } from 'react'
import style from "./MainSlider.module.css"
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';
import img3  from '../../assets/img3.jpg';
import img4 from '../../assets/img4.jpg';
import img5 from '../../assets/img5.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

export default function MainSlider() {

  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
  const settings = {
    // dots: true,
    
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  return (<>
<div className="container mx-auto p-4"><div className="row flex flex-wrap justify-center">
 <div className="w-full sm:w-1/4 lg:w-1/4"> <Slider
        ref={slider => {
          sliderRef = slider;
        }}
        {...settings}
      >
        <img src={img1} className="w-full h-[240px] object-fill" alt="" />
        <img src={img2} className="w-full h-[240px] object-fill" alt="" />
        <img src={img3} className="w-full h-[140px] object-fill" alt="" /></Slider>
    <div className="flex justify-center gap-3 my-3">
      <div onClick={previous} className="w-6 h-3 bg-gray-400 rounded-lg"></div>
      <div onClick={next} className="w-6 h-3 bg-gray-400 rounded-lg"></div></div></div>
    <div className="w-full sm:w-1/4 lg:w-1/4">
      <img src={img5} className="w-full h-[140px]" alt="" />
      <img src={img4} className="w-full h-[140px]" alt="" /></div></div>
                    </div>




   

  </>)
}
