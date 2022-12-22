import React from "react";

import { Card } from "@material-ui/core";

export default function EntertainmentView(props) {
  const { entertainmentData } = props;

  return (
    <>
      <Card className="listView">
        <h4 style={{ margin: "0px", padding: "20px 0px 0px 20px" }}>
          Entertainment
        </h4>
        <ul>
          {entertainmentData.tv ? (
            <li>
              {entertainmentData.tvType !== ""
                ? entertainmentData.tvType
                : null}{" "}
              TV
            </li>
          ) : null}

          {entertainmentData.dvdPlayer ? (
            <li>
              {entertainmentData.dvdPlayerType !== ""
                ? <>{entertainmentData.dvdPlayerType},</>
                : null}
              DVD Player
            </li>
          ) : null}

          {entertainmentData.inhousemovies ? (
            <li>In-House Movies Available</li>
          ) : null}

          {entertainmentData.kindle ? <li>kindle Available</li> : null}

          {entertainmentData.iPodDockingStation ? (
            <li>IPod Docking Station Available</li>
          ) : null}

          {entertainmentData.homeTheatre ? (
            <li>Home Theatre Available</li>
          ) : null}

          {entertainmentData.smartControls ? (
            <li>Smart Controls Available</li>
          ) : null}

          {entertainmentData.soundSpeakers ? (
            <li>Sound Speakers Available</li>
          ) : null}

          {entertainmentData.gameConsole ? (
            <li>
              {entertainmentData.gameConsoleType !== ""
                ? <>{entertainmentData.gameConsoleType},</>
                : null}{" "}
              Gaming Console
            </li>
          ) : null}
        </ul>
      </Card>
    </>
  );
}
