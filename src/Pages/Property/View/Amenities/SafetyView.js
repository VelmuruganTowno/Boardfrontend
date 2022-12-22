import React from "react";

export default function SafetyView(props) {
  const { safetyData } = props;

  return (
    <div className="amlistView">
      <ul>
        {safetyData.disinfection ? (
          <li>
            {safetyData.disinfectionType !== "" ? (
              <>{safetyData.disinfectionType},</>
            ) : null}
            Disinfection
          </li>
        ) : null}
        {safetyData.ppekit ? <li>PPE kit Available</li> : null}
        {safetyData.contactlessroomservice ? (
          <li>Contact less Roomservice Available</li>
        ) : null}
        {safetyData.thermalscreening ? (
          <li>Thermal screening Available</li>
        ) : null}
        {safetyData.sanitizersinstalled ? <li>Sanitizers Installed</li> : null}
        {safetyData.contactlesscheckin ? <li>Contactless Check-in</li> : null}
        {safetyData.disinfectantwipes ? (
          <li>
            {safetyData.disinfectantwipesType !== "" ? (
              <>{safetyData.disinfectantwipesType},</>
            ) : null}
            Disinfectant Wipes
          </li>
        ) : null}
        {safetyData.sanitizers ? (
          <li>
            {safetyData.sanitizersType !== "" ? (
              <>{safetyData.sanitizersType},</>
            ) : null}
            Sanitizers
          </li>
        ) : null}
      </ul>
    </div>
  );
}
