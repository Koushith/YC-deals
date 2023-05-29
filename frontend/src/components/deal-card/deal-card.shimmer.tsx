import { Shimmer } from "../primitives";
import { styled } from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  border-radius: 4px;
  width: 100%;

  .left {
    display: flex;
    gap: 2rem;
    .logo {
      height: 8rem;
      width: 8rem;
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

  .website-shimmer {
    width: 3rem;
    height: 1rem;
  }

  .short-desc-shimmer {
    width: 16rem;
    height: 1rem;
    margin-bottom: 1rem;
  }

  .deal-title-shimmer {
    width: 20rem;
    height: 1rem;
    margin-bottom: 1rem;
  }
`;

export const DealShimmer = () => {
  return (
    <CardContainer>
      <div className="left">
        <Shimmer height="200" width="200" className="logo" />
        <div className="deal-info">
          <h2 className="deal-title">
            <Shimmer className="deal-title-shimmer" />
          </h2>
          <div>
            <p className="deal-shortdesc">
              <Shimmer className="short-desc-shimmer" />
            </p>
          </div>
          <p className="website">
            <Shimmer className="website-shimmer" />
          </p>
        </div>
      </div>
      <div>
        {" "}
        <Shimmer className="btn" />
      </div>
    </CardContainer>
  );
};
