import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "../Carousel.css";
import { useParams } from "react-router-dom";
import Api from "../../../../Service/Api";
import { baseurl } from "../../../../Service/httpCommon";

export default function RoomSlider() {
  const [photoList, setPhotoList] = useState([]);
  const { id, roomid } = useParams();
  const data = { propertyId: id, displayName: roomid, photoType: "rooms" };

  const photoListGet = () => {
    Api.post("propertyamenitiesroomphotovalue", data).then((res) => {
      setPhotoList(res.data);
    });
  };
  
  useEffect(() => {
    photoListGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var settings = {
    dots: false,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <Slider {...settings}>
        {photoList.map((photo) => (
          <div key={photo.id}>
          <img src={`${baseurl}getimage/${photo.imagepath}`} alt="HotelImage" style={{height:"305px",width:"100%"}}/>
          </div>
        ))}
      </Slider>
    </>
  );
}
