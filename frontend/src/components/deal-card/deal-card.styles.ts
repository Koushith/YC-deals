import { styled } from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  border-radius: 4px;
  &:hover {
    background-color: #feede6;
    background-image: linear-gradient(12deg, #fff 50%, hsla(0, 0%, 100%, 0));
    -webkit-transition: background-color 0.3s ease-in;
  }

  .left {
    display: flex;
    gap: 2rem;
    img {
      width: 8rem;
      height: 8rem;
    }

    .deal-title {
      font-size: 1.8rem;
      font-weight: 600;
      color: #21293c;
    }

    .deal-shortdesc {
      color: #4b587c;
      font-size: 1.6rem;
      font-weight: 400;
      line-height: 24px;
      word-wrap: break-word;
      overflow: hidden;
      max-width: 40rem;
      text-overflow: ellipsis;
      /* text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      max-width: 40rem; */
    }

    .website {
      font-size: 1.4rem;
      font-weight: 200;
      color: #4b587c;
    }
  }

  button {
    border: none;
    background: #ff6154;
    border-radius: 4px;
    color: #fff;
    font-size: 1.2rem;
    padding: 0.8rem 1rem;
    cursor: pointer;
    font-weight: 400;
  }

  /* shimmer */
  .btn {
    height: 30px;
    width: 70px;
  }
`;
