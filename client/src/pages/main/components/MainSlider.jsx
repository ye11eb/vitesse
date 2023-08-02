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

    <Slider {...settings}>
      {manufactures.map((manufacture) => (
        <CardItem key={manufacture?._id} item={manufacture} setOpenedManufacture={setOpenedManufacture} likesItems={likesItems} setLikesItems={setLikesItems}/>
    ))}
    </Slider>
  )
}

export default MainSlider
