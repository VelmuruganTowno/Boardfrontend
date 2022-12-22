import React from "react";

export default function HealthView(props) {
  const { healthData } = props;
  return (
    <div className="amlistView">
      <ul>
        {healthData.reflexology ? <li>Reflexology</li> : null}
        {healthData.yoga ? <li>yoga</li> : null}
        {healthData.gym ? (
          <li>
            {healthData.gymType !== "" ? <>{healthData.gymType},</> : null}
            Gym/Fitness Centre Available
          </li>
        ) : null}
        {healthData.firstaid ? <li>First-aid Services Available</li> : null}
        {healthData.meditationRoom ? <li>Meditation Room Available</li> : null}
        {healthData.bridalmakup ? <li>Bridal Makeup Available</li> : null}
        {healthData.bridalgromming ? <li>Bridal Grooming Available</li> : null}
        {healthData.salon ? (
          <li>
            {healthData.salonType !== "" ? <>{healthData.salonType}</> : null}{" "}
            Salon
          </li>
        ) : null}
        {healthData.spa ? (
          <li>
            {healthData.spaType !== "" ? <> {healthData.spaType},</> : null} Spa
          </li>
        ) : null}
        {healthData.steamSauna ? (
          <li>
            {healthData.steamSaunaType1 !== "" ? (
              <>{healthData.steamSaunaType1},</>
            ) : null}
            {healthData.steamSaunaType !== "" ? (
              <>{healthData.steamSaunaType},</>
            ) : null}
            Steam Sauna
          </li>
        ) : null}
        {healthData.medicalCenter ? <li>Medical Center Available</li> : null}
        {healthData.doctorOnCall ? <li>Doctor On Call Available</li> : null}
        {healthData.medicalAssistance ? (
          <li>Medical Assistance Available</li>
        ) : null}
      </ul>
    </div>
  );
}
