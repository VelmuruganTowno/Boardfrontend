import React from "react";

export default function TransferView(props) {
  const { transferData } = props;

  return (
    <div className="amlistView">
      <ul>
        {transferData.airportTransfers ? (
          <li>
            {transferData.airportTransfersType1 !== "" ? (
              <>{transferData.airportTransfersType1},</>
            ) : null}
            {transferData.airportTransfersType !== "" ? (
              <>{transferData.airportTransfersType},</>
            ) : null}
            Airport Transfers
          </li>
        ) : null}
        {transferData.railwayStationTransfers ? (
          <li>
            {transferData.railwayStationTransfersType1 !== "" ? (
              <>{transferData.railwayStationTransfersType1},</>
            ) : null}
            {transferData.railwayStationTransfersType !== "" ? (
              <>{transferData.railwayStationTransfersType},</>
            ) : null}
            Railway Station Transfers
          </li>
        ) : null}
        {transferData.busStationtransfers ? (
          <li>
            {transferData.busStationtransfersType1 !== "" ? (
              <>{transferData.busStationtransfersType1}</>
            ) : null}
            {transferData.busStationtransfersType !== "" ? (
              <>{transferData.busStationtransfersType}, </>
            ) : null}
            Bus Station transfers
          </li>
        ) : null}
        {transferData.shuttleService ? (
          <li>
            {transferData.shuttleServiceType !== ""
              ? <>{transferData.shuttleServiceType},</>
              : null}
            Shuttle Service
          </li>
        ) : null}
        {transferData.privatetrasfer ? (
          <li>
            {transferData.privatetrasferType !== ""
              ? <>{transferData.privatetrasferType},</>
              : null}
            Private Trasfer
          </li>
        ) : null}
        {transferData.vehicleRentals ? (
          <li>
            {transferData.vehicleRentalsType1 !== "" ? (
              <>{transferData.vehicleRentalsType1},</>
            ) : null}
            {transferData.vehicleRentalsType !== "" ? (
              <>{transferData.vehicleRentalsType},</>
            ) : null}
            Vehicle Rentals
          </li>
        ) : null}
      </ul>
    </div>
  );
}
