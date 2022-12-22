/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import Header from "../Pages/Header/Header";
import MobileHeader from "../Pages/Header/MobileHeader";
import Footer from "../Pages/Header/Footer";

const AgentRoute = ({ component, ...rest }) => {
  let RenderComponents = component;
  let hasauth = localStorage.getItem("unique_id");
  let Role = localStorage.getItem("role");
  let checkAgent = localStorage.getItem("agent");
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        return ((hasauth !== null && Role == "Agent Admin") || checkAgent == "Agent") ? (
          <>
            {width <= 768 ? (
              <>
                <MobileHeader />
                <RenderComponents {...props} />
                <Footer />
              </>
            ) : (
              <>
                <Header />
                <RenderComponents {...props} />
              </>
            )}
          </>
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        );
      }}
    />
  );
};

export default AgentRoute;
