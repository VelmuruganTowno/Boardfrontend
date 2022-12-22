import React, { useState, useEffect } from "react";
import Lead from "./lead";
import MobileLead from "./MobileLead";

export default function LeadMaster() {
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

      return (<>
      {
          width <= 768 ? <MobileLead />:<Lead />
      }
      </>)
}
