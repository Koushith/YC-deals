import { NavLink } from "react-router-dom";
import { NavbarContainer } from "./nav-bar.styles";

export const Navbar = () => {
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
      </nav>
    </NavbarContainer>
  );
};
