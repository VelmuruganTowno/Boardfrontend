/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import RoomListView from "./RoomListView";
import RoomListMobile from "./RoomListMobile";
import RoomListOther from "./RoomListOther";

export default function RoomMain() {
  const [width, setWidth] = useState(window.innerWidth);
  const Role = localStorage.getItem("role");

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <div>
      {width <= 768 ? (
        <RoomListMobile />
      ) : Role == "Admin" || Role == "Super Admin" ? (
        <RoomListView />
      ) : (
        <RoomListOther />
      )}
    </div>
  );
}
