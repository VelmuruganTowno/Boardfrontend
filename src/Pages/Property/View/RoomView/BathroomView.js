import React from "react";
import { Card } from "@material-ui/core";

export default function BathroomView(props) {
  const { bathroomData } = props;

  return (
    <>
      <Card className="listView">
        <h4 style={{ margin: "0px", padding: "20px 0px 0px 20px" }}>
          Bathroom
        </h4>
        <ul>
          {bathroomData.bathtub ? <li>Bath Tub Available </li> : null}
          {bathroomData.bubbleBath ? <li> Bubble Bath Available </li> : null}
          {bathroomData.dentalKit ? <li>Dental Kit Available </li> : null}

          {bathroomData.geyserWaterheater ? (
            <li>Geyser/Water Heater Available </li>
          ) : null}
          {bathroomData.hairdryer ? <li>Hair Dryer Available </li> : null}

          {bathroomData.hotColdWater ? (
            <li>Hot/Cold Water Available </li>
          ) : null}
          {bathroomData.slippers ? <li>Slippers Available </li> : null}

          {bathroomData.shower ? (
            <li>
              {bathroomData.showerType !== "" ? bathroomData.showerType : null}{" "}
              Shower
            </li>
          ) : null}

          {bathroomData.toiletPapers ? <li>Toilet Papers Available </li> : null}

          {bathroomData.toiletries ? (
            <li>
              {bathroomData.toiletriesType !== "" ? (
                <>{bathroomData.toiletriesType},</>
              ) : null}
              {""}
              Toiletries
            </li>
          ) : null}

          {bathroomData.sanitaryBin ? <li>Sanitary Bin</li> : null}
          {bathroomData.showerCap ? <li>Shower Cap</li> : null}

          {bathroomData.towels ? (
            <li>
              {bathroomData.towelsType !== "" ? bathroomData.towelsType : null}
            </li>
          ) : null}
          {bathroomData.bodyScrub ? <li>Body Scrub Available </li> : null}
          {bathroomData.bodyWrap ? <li>Body Wrap Available </li> : null}
          {bathroomData.hammam ? <li>Hammam Available </li> : null}
          {bathroomData.bathrobes ? <li>Bathrobes Available </li> : null}
          {bathroomData.dustbins ? <li>Dustbins Available </li> : null}
          {bathroomData.westernToiletSeat ? <li>Western Toilet Seat</li> : null}
          {bathroomData.showercubicle ? (
            <li>Shower Cubicle Available </li>
          ) : null}
          {bathroomData.shavingMirror ? (
            <li>Shaving Mirror Available </li>
          ) : null}
          {bathroomData.adaptedbath ? <li>Adapted Bath Available </li> : null}
          {bathroomData.bidet ? <li>Bidet Available </li> : null}
          {bathroomData.toiletwithgrabrails ? (
            <li>Toilet with Grabrails Available </li>
          ) : null}
        </ul>
      </Card>
    </>
  );
}
