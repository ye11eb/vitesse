/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CardItem from '../../components/card/CardItem';

const MainSlider = ({width, manufactures, setOpenedManufacture, likesItems, setLikesItems}) => {
  
  const settings = {
    dots: true,
    infinite: true,
    // speed: 2000,
    slidesToShow: width > 700 ? 2 : 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
  //   <div>
  //   <h2> Single Item</h2>
  //   <Slider {...settings}>
  //     <div className='slide'>
  //       <h3>1</h3>
  //     </div>
  //     <div className='slide'>
  //       <h3>2</h3>
  //     </div>
  //     <div className='slide'>
  //       <h3>3</h3>
  //     </div>
  //   </Slider>
  // </div>
    <Slider {...settings}>
      {manufactures.map((manufacture) => (
        <CardItem item={manufacture} setOpenedManufacture={setOpenedManufacture} likesItems={likesItems} setLikesItems={setLikesItems}/>
        // <div className="">{manufacture.title}</div>
    ))}
    </Slider>
  )
}

export default MainSlider
