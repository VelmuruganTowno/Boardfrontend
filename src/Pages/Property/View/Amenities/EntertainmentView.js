import React from "react";

export default function EntertainmentView(props) {
  const { entertainmentData } = props;
  return (
    <div className="amlistView">
      <ul>
        {entertainmentData.events ? (
          <li>
            {entertainmentData.eventsType !== "" ? (
              <>{entertainmentData.eventsType},</>
            ) : null}
            <span>Events</span>
          </li>
        ) : null}
        {entertainmentData.pub ? <li>Pub Available</li> : null}
        {entertainmentData.photoSession ? (
          <li>Selfie Booth Available</li>
        ) : null}
        {entertainmentData.nightClub ? <li>Night Club Available</li> : null}
        {entertainmentData.beachClub ? <li>Beach Club Available</li> : null}
        {entertainmentData.galadinner ? <li>Gala Dinner Available</li> : null}
        {entertainmentData.casino ? (
          <li>
            {entertainmentData.casinoType !== "" ? (
              <>{entertainmentData.casinoType},</>
            ) : null}
            Casino
          </li>
        ) : null}
        {entertainmentData.indoorgames ? (
          <li>
            {entertainmentData.indoorgamesType !== "" ? (
              <>{entertainmentData.indoorgamesType},</>
            ) : null}
            Indoor Games
          </li>
        ) : null}
        {entertainmentData.beach ? (
          <li>
            {entertainmentData.beachType !== "" ? (
              <>{entertainmentData.beachType},</>
            ) : null}
            Beach Avialable
          </li>
        ) : null}
        {entertainmentData.activities ? (
          <li>
            {entertainmentData.activitiesType !== "" ? (
              <> {entertainmentData.activitiesType},</>
            ) : null}
            Activities
          </li>
        ) : null}
        {entertainmentData.picnicArea ? <li>Picnic Area Avialable</li> : null}
        {entertainmentData.gameRoom ? <li>Gameing Room Avialable</li> : null}
        {entertainmentData.tv ? (
          <li>
            {entertainmentData.tvType !== "" ? (
              <>{entertainmentData.tvType},</>
            ) : null}
            TV Avialable
          </li>
        ) : null}
      </ul>
    </div>
  );
}
