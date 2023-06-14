import { styled } from "styled-components";
import { phones, tablets } from "../../../utils";

export const NavbarContainer = styled.div`
  background-color: #fffefe;
  box-shadow: 0 0 1px 1px rgba(33, 41, 63, 0.1);

  nav {
    height: 8rem;
    max-width: 1122px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .mobile-nav {
      display: none;
    }

    .logo {
      font-weight: 700;
      font-size: 1.6rem;
      text-decoration: none;
      color: #21293c;
      transition: all 0.3s ease;
      &:hover {
        color: #ff6154;
      }
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
  .mob-nav {
    transition: all 0.3s ease;
    ul {
      list-style: none;
      li {
        display: flex;
        flex-direction: column;
        a {
          text-decoration: none;
          font-size: 1.4rem;
          font-weight: 400;
          color: #4b587c;
          margin-bottom: 2rem;
          transition: all 0.3s ease;
          &:hover {
            color: #ff6154;
          }
        }
      }
    }
  }

  @media (${tablets}) {
    // Styles for tablets (if needed)
  }

  /**************************/
  /* BELOW 544px (Phones) */
  /**************************/

  @media (${phones}) {
    padding: 0 2rem;
    nav {
      ul {
        display: none;
      }
      .mobile-nav {
        display: block;

        height: 20px;
        width: 20px;
      }
    }
  }
`;
