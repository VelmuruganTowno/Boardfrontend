import React from "react";

export default function FoodView(props) {
  const { foodData } = props;

  return (
    <div className="amlistView">
      <ul>
        {foodData.bar ? <li>Bar Available</li> : null}
        {foodData.barbeque ? <li>Barbeque Available</li> : null}
        {foodData.cafe ? (
          <li>{foodData.cafeType !== "" ? foodData.cafeType : null} Cafe</li>
        ) : null}
        {foodData.diningArea ? (
          <li>
            {foodData.diningAreaType !== "" ? foodData.diningAreaType : null}{" "}
            Dining Area
          </li>
        ) : null}
        {foodData.kidsmeals ? <li>Kids Meals Available</li> : null}
        {foodData.restaurant ? (
          <li>
            {foodData.restaurantType !== "" ? (
              <>{foodData.restaurantType},</>
            ) : null}{" "}
            Restaurant
          </li>
        ) : null}
        {foodData.petFoods ? <li>Pet Food Available</li> : null}
      </ul>
    </div>
  );
}
