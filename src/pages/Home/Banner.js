import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./../../styles/CustomBanner.css";

const Banner = () =>{
    const settings = {
        dots: true,
        Infinite: true,
        speed: 500,
        slidesToShow: 1,
        slideToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };

    const images=[
        `${process.env.PUBLIC_URL}/img/banner_diffuser.jpg`,
        `${process.env.PUBLIC_URL}/img/banner_diffuser2.jpg`,
        `${process.env.PUBLIC_URL}/img/banner_perfume.jpg`,
    ];
    return(
        <div className="banner-container">
            <Slider {...settings}>
                {images.map((image,index)=>(
                    <div key={index}>
                        <img
                         src={image}
                         alt={`slide-${index+1}`}
                         style={{width:"100%",height:"90vh",objectFit:"cover"}}
                         />
                    </div>
                ))}
            </Slider>
        </div>
    );

};

export default Banner;