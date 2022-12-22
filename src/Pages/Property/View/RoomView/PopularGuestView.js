import React from "react";

import { Card } from "@material-ui/core";

export default function PopularGuestView(props) {
  const { popularData } = props;

  return (
    <>
      <Card className="listView">
        <h4 style={{ margin: "0px", padding: "20px 0px 0px 20px" }}>
          Popular Guests
        </h4>
        <ul>
          {popularData.airConditioning ? (
            <li>
              {popularData.airConditioningType !== ""
                ? popularData.airConditioningType
                : null}{" "}
              Air Conditioning
            </li>
          ) : null}
          {popularData.interconnectedRoom ? (
            <li>Inter Connected Room Available</li>
          ) : null}
          {popularData.heater ? (
            <li>
              {popularData.heaterType !== "" ? popularData.heaterType : null}{" "}
              {popularData.heaterType1 !== "" ? (
                <>{popularData.heaterType1}</>
              ) : null}
            </li>
          ) : null}
          {popularData.housekeeping ? (
            <li>
              {popularData.housekeepingType !== ""
                ? popularData.housekeepingType
                : null}{" "}
              Housekeeping
            </li>
          ) : null}
          {popularData.inRoomdining ? (
            <li>
              {popularData.inRoomdiningType !== ""
                ? popularData.inRoomdiningType
                : null}{" "}
              In-Room Dining
            </li>
          ) : null}
          {popularData.ironIroningBoard ? (
            <li>Iron-Ironing Board Available</li>
          ) : null}
          {popularData.laundryService ? (
            <li>
              {popularData.laundryServiceType !== ""
                ? popularData.laundryServiceType
                : null}{" "}
              Laundry Service
            </li>
          ) : null}
          {popularData.mineralWater ? <li>Mineral Water Available</li> : null}
          {popularData.roomService ? (
            <li>
              {popularData.roomServiceType !== ""
                ? popularData.roomServiceType
                : null}
              <span style={{ marginLeft: "3px" }}>Room Service</span>
            </li>
          ) : null}
          {popularData.smokingRoom ? <li>Smoking Room Available</li> : null}
          {popularData.electricKettle ? (
            <li>Electric Kettle Available</li>
          ) : null}
          {popularData.wifi ? (
            <li>
              {popularData.wifiType !== "" ? popularData.wifiType : null}
              <span style={{ marginLeft: "3px" }}>Wi-Fi Available</span>
            </li>
          ) : null}
          {popularData.airPurifier ? <li>Air Purifier Available</li> : null}
          {popularData.sanitizers ? (
            <li>
              {popularData.sanitizersType !== ""
                ? popularData.sanitizersType
                : null}
            </li>
          ) : null}
          {popularData.balcony ? (
            <li>
              {popularData.balconyType !== "" ? popularData.balconyType : null}
              <span style={{ marginLeft: "3px" }}>Balcony</span>
            </li>
          ) : null}
          {popularData.jaccuzi ? <li>Jaccuzi Available</li> : null}
          {popularData.privatePool ? <li>Private Pool Available</li> : null}
          {popularData.terrace ? <li>Terrace Available</li> : null}
        </ul>
      </Card>
    </>
  );
}
