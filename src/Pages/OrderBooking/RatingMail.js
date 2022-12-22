import React from "react";
import "./Rating.css";

export default function RatingMail(props) {
  const { rating } = props;
  return (
    <div className="rating">
      {rating >= 1 ? <span>&#9733;</span> : null}
      {rating >= 2 ? <span>&#9733;</span> : null}
      {rating >= 3 ? <span>&#9733;</span> : null}
      {rating >= 4 ? <span>&#9733;</span> : null}
      {rating >= 5 ? <span>&#9733;</span> : null}
    </div>
  );
}
