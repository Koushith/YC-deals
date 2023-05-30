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
        <h2 className="logo">YC Deals</h2>
        <ul>
          <li>
            <NavLink to="/submit-deal"> How It Works?</NavLink>
            <NavLink to="">Change Log</NavLink>
            <NavLink to="">Feature Request</NavLink>
          </li>
        </ul>
        {/* mobile-nav */}

        {open ? (
          <div className="mobile-nav">
            {" "}
            <img src={Close} alt="close" />
          </div>
        ) : (
          <div className="mobile-nav">
            <img src={Bars} alt="open" />
          </div>
        )}
      </nav>
    </NavbarContainer>
  );
};
