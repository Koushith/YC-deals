import { styled } from "styled-components";
import { tablets, phones } from "../../utils";

export const StyledDiv= styled.div`
margin-top:8rem;
    margin-bottom:38rem;

    @media (${phones}) {
      margin-top:4rem;
   margin-bottom:6rem;
  }

`

export const VerifyContainer = styled.div`
  border: 1px solid #d9e1ec;
  padding: 2.2rem;
  border-radius: 4px;
  max-width: 50rem;
  margin: 0 auto;

  

  .form-container {
    display: flex;
    /* align-items: center; */
    justify-content: center;
    flex-direction: column;

    gap: 2rem;

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;

      img {
        height: 8rem;
        width: 8rem;
      }
    }
    .title {
      font-size: 2rem;
      text-align: center;
    }

    .qr-code {
      background-color: #fff;
      border: 1px solid #d9e1ec;
      border-radius: 4px;

      margin: 0 auto;

      .react-qr {
        padding: 1rem;
        height: 250px;
        width: 250px;
      }
    }

    span {
      text-align: center;
      font-size: 1.8rem;
      font-weight: 600;
      margin-top: -1rem;
    }

    .link {
      font-size: 1.6rem;
      color: #ff6154;
      text-align: center;
      margin-top: -1rem;
      cursor: pointer;
    }

    .scan-helper-text {
      text-align: center;
      font-size: 1.6rem;
      /* margin-top: 2rem; */
      span {
        font-weight: 600;
        color: #ff6154;
      }
    }
  }
`;

// export const QRContainer = styled.div`
//   border: 1px solid #d9e1ec;
//   padding: 2rem;
//   border-radius: 4px;
//   max-width: 50rem;
//   margin: 0 auto;
// `;
