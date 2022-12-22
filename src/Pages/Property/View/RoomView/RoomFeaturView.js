import React from "react";
import { Card } from "@material-ui/core";

export default function RoomFeaturView(props) {
  const { roomFeatureData } = props;

  return (
    <>
      <Card className="listView">
        <h4 style={{ margin: "0px", padding: "20px 0px 0px 20px" }}>
          Room Features
        </h4>
        <ul>
          {roomFeatureData.closet ? <li>Closet</li> : null}
          {roomFeatureData.clothesRack ? <li>Clothes Rack Available</li> : null}
          {roomFeatureData.hangers ? <li>Hangers Available</li> : null}
          {roomFeatureData.blackoutCurtains ? <li>Blackout Curtains</li> : null}
          {roomFeatureData.centerTable ? <li>Center Table Available</li> : null}
          {roomFeatureData.chargingPoints ? (
            <li>
              {roomFeatureData.chargingPointsType !== ""
                ? roomFeatureData.chargingPointsType
                : null}{" "}
              Charging Points
            </li>
          ) : null}
          {roomFeatureData.couch ? <li>Couch Available</li> : null}
          {roomFeatureData.diningTable ? <li>Dining Table Available</li> : null}
          {roomFeatureData.fireplace ? <li>Fire Place Available</li> : null}
          {roomFeatureData.miniBar ? (
            <li>
              {roomFeatureData.miniBarType1 !== "" ? (
                <>{roomFeatureData.miniBarType1},</>
              ) : null}
              {roomFeatureData.miniBarType !== "" ? (
                <> {roomFeatureData.miniBarType},</>
              ) : null}
              Mini Bar
            </li>
          ) : null}
          {roomFeatureData.miniFridge ? <li>Mini Fridge Available</li> : null}
          {roomFeatureData.mirror ? <li>Mirror Available</li> : null}
          {roomFeatureData.sofa ? (
            <li>
              {roomFeatureData.sofaType !== ""
                ? roomFeatureData.sofaType
                : null}
            </li>
          ) : null}
          {roomFeatureData.telephone ? (
            <li>
              {roomFeatureData.telephoneType !== ""
                ? roomFeatureData.telephoneType
                : null}
              <span style={{ marginLeft: "4px" }}>Telephone</span>
            </li>
          ) : null}
          {roomFeatureData.woodenFloors ? <li>Wooden Floors</li> : null}
          {roomFeatureData.workDesk ? <li>Work Desk Available</li> : null}
          {roomFeatureData.readinglamp ? <li>Reading Lamp Available</li> : null}
          {roomFeatureData.pillowmenu ? <li>Pillow Menu Available</li> : null}
          {roomFeatureData.livingArea ? <li>Living Area Available</li> : null}
          {roomFeatureData.diningArea ? <li>Dining Area Available</li> : null}
          {roomFeatureData.seatingArea ? <li>Seating Area Available</li> : null}
          {roomFeatureData.intercom ? (
            <li>
              {roomFeatureData.intercomType !== ""
                ? roomFeatureData.intercomType
                : null}
              <span style={{ marginLeft: "4px" }}>Intercom</span>
            </li>
          ) : null}
          {roomFeatureData.chair ? <li>Chair Available</li> : null}
          {roomFeatureData.washingMachine ? (
            <li>Washing Machine Available</li>
          ) : null}
          {roomFeatureData.blanket ? (
            <li>
              {roomFeatureData.blanketType !== ""
                ? roomFeatureData.blanketType
                : null}
              <span style={{ marginLeft: "3px" }}>Blanket</span>
            </li>
          ) : null}

          {roomFeatureData.cushions ? <li>cushions</li> : null}
          {roomFeatureData.pillows ? (
            <li>
              Pillows
              {roomFeatureData.pillowsTypes !== ""
                ? roomFeatureData.pillowsTypes
                : null}
            </li>
          ) : null}
          {roomFeatureData.alarmClock ? <li>Alarm Clock Available</li> : null}
          {roomFeatureData.mosquitoNet ? <li>Mosquito Net Available</li> : null}

          {roomFeatureData.safetySecurity ? (
            <li>
              {roomFeatureData.safetySecurityType !== "" ? (
                <>{roomFeatureData.safetySecurityType},</>
              ) : null}
              <span style={{ marginLeft: "3px" }}>Safety</span>
            </li>
          ) : null}
          {roomFeatureData.childCare ? (
            <li>
              {roomFeatureData.childCareType !== ""
                ? roomFeatureData.childCareType
                : null}
              <span style={{ marginLeft: "3px" }}>Child Care</span>
            </li>
          ) : null}
        </ul>
      </Card>
    </>
  );
}
