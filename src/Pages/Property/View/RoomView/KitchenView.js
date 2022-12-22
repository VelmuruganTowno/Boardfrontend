import React from "react";
import { Card } from "@material-ui/core";

export default function KitchenView(props) {
  const { kitchenData } = props;

  return (
    <>
      <Card className="listView">
        <h4 style={{ margin: "0px", padding: "20px 0px 0px 20px" }}>
          Kitchen & Food
        </h4>
        <ul>
          {kitchenData.induction ? <li>Induction Available</li> : null}
          {kitchenData.kitchenette ? (
            <li>
              {kitchenData.kitchenetteType !== "" ? (
                <>{kitchenData.kitchenetteType},</>
              ) : null}
              kitchenette
            </li>
          ) : null}
          {kitchenData.refrigerator ? <li>Refrigerator Available</li> : null}
          {kitchenData.dishwashing ? (
            <li>
              {kitchenData.dishwashingType !== "" ? (
                <>{kitchenData.dishwashingType},</>
              ) : null}
              Dish Washing
            </li>
          ) : null}
          {kitchenData.glasses ? (
            <li>
              {kitchenData.glassesType !== "" ? (
                <>{kitchenData.glassesType},</>
              ) : null}
              Glasses
            </li>
          ) : null}
          {kitchenData.cookingBasics ? (
            <li>
              {kitchenData.cookingBasicsType !== "" ? (
                <>{kitchenData.cookingBasicsType},</>
              ) : null}
              <span>Cooking Basics</span>
            </li>
          ) : null}
          {kitchenData.assortedChocolates ? (
            <li>
              <span> Assorted Chocolates</span>
            </li>
          ) : null}
          {kitchenData.cake ? (
            <li>
              <span> Cake</span>
            </li>
          ) : null}
          {kitchenData.champagne ? (
            <li>
              <span> Champagne</span>
            </li>
          ) : null}
          {kitchenData.cookies ? (
            <li>
              <span> Cookies</span>
            </li>
          ) : null}
          {kitchenData.drinks ? (
            <li>
              <span> Drinks</span>
            </li>
          ) : null}
          {kitchenData.fruitBasket ? (
            <li>
              <span> Fruit Basket</span>
            </li>
          ) : null}
          {kitchenData.fruitWine ? (
            <li>
              <span> Fruit Wine</span>
            </li>
          ) : null}
          {kitchenData.snackBasket ? (
            <li>
              <span> Snack Basket</span>
            </li>
          ) : null}
          {kitchenData.sparklingWine ? (
            <li>
              <span> Sparkling Wine</span>
            </li>
          ) : null}
          {kitchenData.bBQGrill ? (
            <li>
              <span> BBQ Grill</span>
            </li>
          ) : null}
          {kitchenData.cookButlerService ? (
            <li>
              <span> Cook Butler Service</span>
            </li>
          ) : null}
          {kitchenData.cookiePlatter ? (
            <li>
              <span> Cookie Platter</span>
            </li>
          ) : null}
          {kitchenData.beer ? (
            <li>
              <span> Beer</span>
            </li>
          ) : null}
        </ul>
      </Card>
    </>
  );
}
