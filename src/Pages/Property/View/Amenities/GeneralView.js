import React from "react";

export default function GeneralView(props) {
  const { generalData } = props;

  return (
    <div className="amlistView">
      <ul>
        {generalData.concierge ? <li>Concierge Available</li> : null}
        {generalData.luggageassistance ? (
          <li>Luggage Assistance Available</li>
        ) : null}

        {generalData.speciallyabledassistance ? (
          <li>
            {generalData.speciallyabledassistanceType !== "" ? (
              <> {generalData.speciallyabledassistanceType},</>
            ) : null}
            {' '}Specially Abled Assistance
          </li>
        ) : null}
        {generalData.wakeupCallService ? (
          <li>Wakeup Call Service Available</li>
        ) : null}
        {generalData.electricalSockets ? (
          <li>
            <span>Electrical Sockets</span>
          </li>
        ) : null}
        {generalData.postalservices ? <li> Postal Services Available</li> : null}
        {generalData.butlerServices ? (
          <li>
            {generalData.butlerServicesType !== "" ? (
              <>{generalData.butlerServicesType}</>
            ) : null}
                      {' '}Butler Services
          </li>
        ) : null}

        {generalData.poolBeachtowels ? (
          <li>Pool-Beach Towels Available</li>
        ) : null}
        {generalData.sightSeeing ? (
          <li>
            {generalData.sightSeeingType !== "" ? (
              <>{generalData.sightSeeingType}</>
            ) : null}
          </li>
        ) : null}

        {generalData.childcareService ? (
          <li>
            {generalData.childcareServiceType !== "" ? (
              <>{generalData.childcareServiceType},</>
            ) : null}
            Child Care Service
          </li>
        ) : null}
      </ul>
    </div>
  );
}
