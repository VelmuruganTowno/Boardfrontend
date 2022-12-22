import React from "react";

export default function BasicFacilitiesView(props) {
  const { basicData } = props;

  return (
    <div className="amlistView">
      <ul>
        {basicData.airconditioning ? (
          <li>
            {basicData.airconditioningType !== "" ? (
              <>{basicData.airconditioningType},</>
            ) : null}
            <span>{' '}Air Conditioning</span>
          </li>
        ) : null}
        {basicData.bathroom ? (
          <li>
            {basicData.bathroomType !== "" ? (
              <>{basicData.bathroomType}, </>
            ) : null}
            <span >{' '}Bathroom</span>
          </li>
        ) : null}
        {basicData.laundry ? (
          <li>
            {basicData.laundryType !== "" ? (
              <>{basicData.laundryType},</>
            ) : null}
            <span>{' '}Laundry</span>
          </li>
        ) : null}
        {basicData.housekeeping ? <li>Housekeeping Available</li> : null}
        {basicData.intercom ? (
          <li>
            {basicData.intercomType !== "" ? (
              <>{basicData.intercomType},</>
            ) : null}
            {' '}Intercom
          </li>
        ) : null}
        {basicData.kitchen ? (
          <li>
            {basicData.kitchenType !== "" ? (
              <> {basicData.kitchenType},</>
            ) : null}
            {' '}Kitchen/Kitchenette
          </li>
        ) : null}
        {basicData.parking ? (
          <li>
            {basicData.parkingType !== "" ? (
              <>{basicData.parkingType},</>
            ) : null}
            {' '}
            {basicData.parkingType1 !== "" ? (
              <>{basicData.parkingType1},</>
            ) : null}
            {' '}Parking
          </li>
        ) : null}
        {basicData.powerbackup ? <li>Power Backup Available </li> : null}
        {basicData.refrigeratorminibar ? (
          <li>
            {basicData.refrigeratorminibarType !== "" ? (
              <>{basicData.refrigeratorminibarType},</>
            ) : null}
            {' '}Refrigerator/Minibar
          </li>
        ) : null}
        {basicData.roomservice ? (
          <li>
            {basicData.roomserviceType !== "" ? (
              <>{basicData.roomserviceType},</>
            ) : null}
            {' '}Room Service
          </li>
        ) : null}
        {basicData.smokedetector ? (
          <li>
            {basicData.smokedetectorType !== "" ? (
              <>{basicData.smokedetectorType},</>
            ) : null}
            {' '}Smoke Detector
          </li>
        ) : null}

        {basicData.swimmingPool ? (
          <li>
            {basicData.swimmingPoolType !== "" ? (
              <>{basicData.swimmingPoolType}</>
            ) : null}
          </li>
        ) : null}
        {basicData.smokingrooms ? <li>Smoking Room Available </li> : null}
        {basicData.publicrestrooms ? (
          <li>Public Restrooms Available </li>
        ) : null}
        {basicData.laundromat ? <li>Laundromat Available </li> : null}
      </ul>
    </div>
  );
}
