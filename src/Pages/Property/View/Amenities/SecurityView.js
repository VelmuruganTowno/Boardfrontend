import React from "react";

export default function SecurityView(props) {
  const { securityData } = props;

  return (
    <div className="amlistView">
      <ul>
        {securityData.safe ? (
          <li>{securityData.safeType !== "" ? securityData.safeType : null}</li>
        ) : null}
        {securityData.security ? (
          <li>
            {securityData.securityType !== ""
              ? securityData.securityType
              : null}
          </li>
        ) : null}
        {securityData.cctv ? <li>CCTV Available</li> : null}
        {securityData.fireExtinguishers ? (
          <li>Fire Extinguisher Available</li>
        ) : null}
        {securityData.smokeAlarms ? <li>Smoke Alarms Available</li> : null}
        {securityData.fireAlarms ? <li>Fire Alarms Available</li> : null}
      </ul>
    </div>
  );
}
