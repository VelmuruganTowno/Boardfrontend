import React, { useState, useEffect } from 'react';
import DesktopHome from './DesktopHome';
import MobileHome from './MobileHome'


export function Homepage() {
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => { setWidth(window.innerWidth) };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <>
      {
        width <= 768 ? <MobileHome width={width}/> : <DesktopHome width={width} />
      }
    </>
  );
}
