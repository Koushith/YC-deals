// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { NavLink } from "react-router-dom";
import { NavbarContainer } from "./nav-bar.styles";
import { useState } from "react";
import Bars from "../../../assets/icons/bars.svg";
import Close from "../../../assets/icons/close.svg";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <NavbarContainer>
      <nav>
        <NavLink className="logo" to="/">
          YC Deals
        </NavLink>
        <ul>
          <li>
            <NavLink to="/how-it-works"> How It Works?</NavLink>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
        {/* mobile-nav */}

        {open ? (
          <div className="mobile-nav">
            <img src={Close} alt="close" onClick={() => setOpen(!open)} />
          </div>
        ) : (
          <div className="mobile-nav">
            <img src={Bars} alt="open" onClick={() => setOpen(!open)} />
          </div>
        )}
      </nav>
      {open && (
        <div className="mobile-nav mob-nav">
          <ul>
            <li>
              <NavLink to="/how-it-works" onClick={() => setOpen(!open)}>
                {" "}
                How It Works?
              </NavLink>
              <NavLink to="/about" onClick={() => setOpen(!open)}>
                About
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </NavbarContainer>
  );
};
