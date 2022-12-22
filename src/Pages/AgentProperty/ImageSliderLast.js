import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./ImageSlider.css";
import { baseurl } from "../../Service/httpCommon";
import Api from "../../Service/Api";
import { Link } from "react-router-dom"

export default function ImageSliderLast() {
  const [LastMinute, setLastMinute] = useState([]);

  useEffect(() => {
    Api.get("agentlastminutedealactive").then((res) => {
      setLastMinute(res.data);
    });
  }, []);
  var settings = {
    dots: false,
    slidesToShow: 4,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  return (
    <div className="imm">
      <Slider {...settings}>
        {LastMinute.map((item, index) => (
          <div className="card-item" key={index}>
            <Link to={`/hotelView/${item.propertyId}`}>
              <div className="card-inner">
                <div className="card-top">
                {item.topLeftLabel?<span style={{ borderRadius: '0 5px 5px 0' }}>{item.topLeftLabel}</span>:null}
                  <img src={`${baseurl}getimage/${item.image}`} alt="HotelImage" style={{ height: '10%', borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }} />
                </div>
                <div className="card-bottom" >
                  <div className="card-info">
                    <h5>{item.propertyName}</h5>
                    <p>{item.city}</p>
                    <div style={{ width: "40%", display: "inline-block" }}>
                      <p
                        style={{
                          color: "#f46d25",
                          fontWeight: "bold",
                          fontSize: "14px",
                          lineHeight: "1",
                        }}
                      >
                        Rs.{item.minmumprice}
                      </p>
                      <span
                        style={{
                          fontSize: "12px",
                        }}
                      >
                        Per Night
                      </span>
                    </div>
                    {item.offerVaild !== null && item.offerVaild !== "undefined" && item.offerVaild !== "" ?
                      <div style={{ width: "60%", display: "inline-block" }}>
                        <p
                          style={{
                            background: "#f46d25",
                            color: "#fff",
                            padding: "4px",
                            borderRadius: "5px",
                            fontSize: "12px",
                          }}
                        >
                          {item.offerVaild}
                        </p>
                      </div> : null
                    }

                    <div style={{ width: "40%", display: "inline-block" }}>
                      {item.offerPercentage !== 0 ? (
                        <span
                          style={{
                            background: "#f46d25",
                            color: "#fff",
                            padding: "4px",
                            borderRadius: "5px",
                            fontSize: "12px",
                          }}
                        >
                          {item.offerPercentage} % Off
                        </span>
                      ) : null}
                    </div>
                    {item.offerVaild !== null && item.offerVaild !== "undefined" && item.offerVaild !== "" ?
                      <div style={{ width: "60%", display: "inline-block" }}>
                        <span
                          style={{
                            color: "#f46d25",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          {item.offerLabel}
                        </span>
                      </div>
                      : null
                    }
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
