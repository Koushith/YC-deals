import { styled } from "styled-components";

export const NavbarContainer = styled.div`
  background-color: #fffefe;
  box-shadow: 0 0 1px 1px rgba(33, 41, 63, 0.1);
  /* border: 1px solid #d9e1ec; */
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
        color: #4b587c;
        margin-left: 2rem;
        transition: all 0.3s ease;
        &:hover {
          color: #ff6154;
        }
      }
    }
  }
`;
