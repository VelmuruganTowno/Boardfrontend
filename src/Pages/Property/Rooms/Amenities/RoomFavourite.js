import React, { useState, useEffect } from "react";
import Api from "../../../../Service/Api";
import _ from "lodash";
import { Paper } from "@material-ui/core";

export default function RoomFavourite() {
  const [stayInclusion, setStayInclusion] = useState([]);
  const propertyId = sessionStorage.getItem("propertyId");
  const displayName = sessionStorage.getItem("displayName");

  useEffect(() => {
    Api.get(`stayroominclusion/${propertyId}/${displayName}`).then((res) => {
      setStayInclusion(res.data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Paper
      style={{
        padding: "10px",
        height: "100vh",
        display: "table-cell",
        width: "80%",
      }}
      variant="outlined"
      square
    >
      <h2>Starred Feature</h2>
      <div
        style={{
          background: "#F46D25",
          color: "#fff",
          padding: "10px",
          borderRadius: "4px",
          fontWeight: "600",
        }}
      >
        These features will be reflected on the booking voucher
      </div>
      <div className="listView">
        <ul>
          {stayInclusion.map((stay) => (
            <li key={stay.id}>
              {stay.type1} {stay.type2} , {stay.name}{" "}
              {_.isEmpty(stay.type1) && _.isEmpty(stay.type2)
                ? "Available"
                : null}
            </li>
          ))}
        </ul>
      </div>
    </Paper>
  );
}
