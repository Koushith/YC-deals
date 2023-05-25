import { styled } from "styled-components";

export const NavbarContainer = styled.div`
  background-color: #21212b;
  nav {
    height: 8rem;
    max-width: 1122px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      font-weight: 700;
      font-size: 1.6rem;
    }

    ul {
      list-style: none;

      a {
        text-decoration: none;
        font-size: 1.4rem;
        font-weight: 400;
        color: #fff;
        margin-left: 2rem;
      }
    }
  }
`;
