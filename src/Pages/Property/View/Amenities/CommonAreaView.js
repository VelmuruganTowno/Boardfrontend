import React from "react";

export default function GeneralView(props) {
  const { commonData } = props;

  return (
    <div className="amlistView">
      <ul>
        {commonData.caretaker ? <li>Caretaker Available</li> : null}
        {commonData.lawn ? <li>Lawn Available</li> : null}
        {commonData.fireplace ? (
          <li>
            {commonData.fireplaceType !== "" ? (
              <>{commonData.fireplaceType},</>
            ) : null}
            Fire Place
          </li>
        ) : null}
        {commonData.lounge ? (
          <li>
            {commonData.loungeType !== "" ? (
              <>{commonData.loungeType},</>
            ) : null}{" "}
            Lounge
          </li>
        ) : null}
        {commonData.jacuzzi ? (
          <li>
            {commonData.jacuzziType !== "" ? (
              <>{commonData.jacuzziType},</>
            ) : null}{" "}
            Jacuzzi
          </li>
        ) : null}
        {commonData.seatingArea ? <li>Seating Area Available</li> : null}
        {commonData.templeChapelPrayerRoom ? (
          <li>
            {commonData.templeChapelPrayerRoomType !== "" ? (
              <>{commonData.templeChapelPrayerRoomType},</>
            ) : null}
            Prayer Room Available
          </li>
        ) : null}
        {commonData.verandah ? <li>Verandah Available</li> : null}
        {commonData.livingRoom ? <li>Living Room Available</li> : null}
        {commonData.outdoorFurniture ? (
          <li>
            {commonData.outdoorFurnitureType !== "" ? (
              <>{commonData.outdoorFurnitureType},</>
            ) : null}
            Outdoor Furniture
          </li>
        ) : null}
        {commonData.conferenceArea ? (
          <li>
            {commonData.conferenceAreaType !== "" ? (
              <>{commonData.conferenceAreaType},</>
            ) : null}
            Conference Area
          </li>
        ) : null}
        {commonData.petPlayArea ? <li>Pet Play-Area Available</li> : null}
        {commonData.atm ? <li>ATM Available</li> : null}
        {commonData.shopping ? (
          <li>
            {commonData.shoppingType !== "" ? (
              <>{commonData.shoppingType},</>
            ) : null}
            Shopping Available
          </li>
        ) : null}
        {commonData.childrenPlayArea ? (
          <li>
            {commonData.childrenPlayAreaType !== "" ? (
              <>{commonData.childrenPlayAreaType},</>
            ) : null}
            Children Play-Area Available
          </li>
        ) : null}
      </ul>
    </div>
  );
}
