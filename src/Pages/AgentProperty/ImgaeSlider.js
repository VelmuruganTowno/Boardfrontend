import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./ImageSlider.css";
import { baseurl } from "../../Service/httpCommon";
import Rating from "../OrderBooking/Rating";
import Api from "../../Service/Api";
import { Link } from "react-router-dom"
import { Card, Paper, Stack } from "@mui/material";
import { twnButtonStyles } from "../../utils/townoStyle";

export default function ImageSlider() {
  const [popularHotels, setPopularHotels] = useState([]);
  useEffect(() => {
    Api.get("agentpopularactive").then((res) => {
      setPopularHotels(res.data);

    });
  }, []);
  var settings = {
    dots: false,
    slidesToShow: 3,
    autoplay: false,
    autoplaySpeed: 2000,
    width: '346px',
  };

  return (
    <div className="imm">
      <Slider {...settings}>
        {popularHotels.map((item,index) => (
          <div className="card-item" key={index}>
            <Link to={`/hotelView/${item.propertyId}`} >
            <div className="card-inner" >
              <div className="card-top">                
              {item.topLeftLabel?<span>{item.topLeftLabel}</span>:null}
                <img src={`${baseurl}getimage/${item.image}`} alt="HotelImage" />
              </div>
              <div className="card-bottom" style={{borderRadius:'0 0 5px 5px'}}>
                <div className="card-info">
                  <Rating rating={item.starRate} />
                  <h5>{item.propertyName}</h5>
                  <p>{item.city}</p>
                  <button>Rs.{item.minmumprice} ...</button>
                </div>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div >
  );
}
