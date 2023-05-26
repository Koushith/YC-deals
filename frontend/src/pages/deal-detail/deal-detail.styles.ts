import { styled } from "styled-components";

export const DealDetailContainer = styled.section`
  max-width: 80rem;
  margin: 4rem auto;

  .company-info {
    display: flex;
    gap: 2rem;
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
  }
`;

export const RichTextEditorContainer = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 1.6rem;
    font-weight: 600;
    line-height: 18px;
    color: #21293c;
  }

  p {
    color: #4b587c;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 18px;
    margin: 2rem 0;
  }

  ul {
    color: #4b587c;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 18px;
    margin: 2rem 0;
    li {
      margin-left: 2rem;
      margin-bottom: 1rem;
    }
  }
`;
