import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import Api from "../../../Service/Api";
import { baseurl } from "../../../Service/httpCommon";

export default function ImageSlider() {
  const [photoList, setPhotoList] = useState([]);
  const { id } = useParams();

  const photoListGet = () => {
    const data = { propertyId: id };
    Api.post("propertyamenitiesphotovalue", data).then((res) => {
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
            <img src={`${baseurl}getimage/${photo.imagepath}`} alt="HotelImage" style={{height:"305px"}}/>
          </div>
        ))}
      </Slider>
    </>
  );
}
