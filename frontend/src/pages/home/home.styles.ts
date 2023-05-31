import { styled } from "styled-components";

export const HomePageContainer = styled.section`
  max-width: 90rem;
  margin: 4rem auto;

  .no-deals-found{
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
     height:68vh;
    img{
      height:10rem;
      width:10rem;
    }

      h1{
        text-align:center;
        font-size:1.8rem;
        font-weight:700rem;
        margin-top:2rem;
      }
    }

  .deals-container {
    margin-top: 2rem;  
  }
`;

export const TitleContainer = styled.div`
  margin-left: 2rem;
  h1 {
    font-size: 2.4rem;
    font-weight: 600;
    line-height: 3.2rem;
    color: #21293c;
  }

  p {
    font-size: 1.6rem;
    font-weight: 400;
    color: #4b587c;
  }

  span {
    font-weight: 500;
    color: #ff6154;
    cursor: pointer;
  }
`;
