import React, { useState } from "react";
import towno_white from "../../assets/logo/Board-logo.png";
import towno_logo from "../../assets/logo/Board-Logo-Trans.png";
import "./Header.css";
import { Link } from "react-router-dom"
import { useEffect } from "react";


export function Navbar() {
  const [navbar, setNavbar] = useState(false);

  const changeBackgroundColor = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBackgroundColor);

    return () =>
      window.removeEventListener('scroll', changeBackgroundColor);
  }, []);

  return (
    <header className={navbar ? 'activeheader' : 'header'} >
      <div className="logomain">{navbar ? <img src={towno_logo} alt="logo" /> : <img src={towno_white} alt="logo" />}</div>
      <ul className="links">
        <li className="link-item">Home</li>
        <Link to="/login"><li className="link-item">Login</li></Link>
      </ul>
    </header>
  );
}