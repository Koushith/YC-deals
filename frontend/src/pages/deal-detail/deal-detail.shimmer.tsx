// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { RichTextEditorContainer } from "./deal-detail.styles";
import { GoBack, Shimmer } from "../../components/primitives";

import { styled } from "styled-components";

export const DealDetailContainer = styled.section`
  max-width: 80rem;
  margin: 4rem auto;

  .company-info {
    display: flex;
    gap: 2rem;
    margin-top: 2rem;
    margin-bottom: 4rem;
    img {
      height: 8rem;
      width: 8rem;
    }

    .info {
      h2 {
        font-size: 1.8rem;
        font-weight: 600;
        color: #21293c;
      }

      .meta-info {
        display: flex;
        gap: 2rem;
      }
      .title {
        color: #4b587c;
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 24px;
      }

      .website {
        font-size: 1.4rem;
        font-weight: 200;
        color: #4b587c;
      }
    }

    /* shimmer */
  }
  .logo-sh {
    height: 8rem;
    width: 8rem;
  }
  .info-sh {
    width: 3rem;
    height: 1rem;
  }

  .title-sh {
    width: 20rem;
    height: 1rem;
    margin-top: 1rem;
  }

  .website-sh {
    width: 6rem;
    height: 1rem;
    margin-top: 1rem;
  }

  .details {
    width: 80rem;
    height: 20rem;
    margin-top: 1rem;
  }
`;

export const DealDeailsShimmer = () => {
  return (
    <DealDetailContainer>
      <div className="company-info">
        <div className="logo">
          <Shimmer className="logo-sh" />
        </div>

        <div className="info">
          <h2>
            <Shimmer className="info-sh" />
          </h2>
          <div className="title">
            <Shimmer className="title-sh" />
          </div>
          <div className="meta-info">
            <div className="website">
              <Shimmer className="website-sh" />
            </div>
            <div className="website">
              <Shimmer className="website-sh" />
            </div>
          </div>
        </div>
      </div>

      <Shimmer className="details" />

      <Shimmer className="details" />
    </DealDetailContainer>
  );
};
