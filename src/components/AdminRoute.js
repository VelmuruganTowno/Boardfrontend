import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import Header from "../Pages/Header/Header";
import MobileHeader from "../Pages/Header/MobileHeader";
import Footer from "../Pages/Header/Footer";

const AdminRoute = ({ component, ...rest }) => {
  let RenderComponents = component;
  let hasauth = localStorage.getItem("unique_id");
  let hasAdmin = localStorage.getItem("role");

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
        return hasauth !== null &&
          (hasAdmin === "Admin" || hasAdmin === "Super Admin") ? (
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
          <Redirect to={{ pathname: "404" }} />
        );
      }}
    />
  );
};

export default AdminRoute;
