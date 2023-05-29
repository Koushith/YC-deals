import { styled } from "styled-components";

export const SubmitDealContainer = styled.section`
  max-width: 80rem;
  margin: 4rem auto;
  padding: 0.4rem;
  .heading {
    font-size: 2.4rem;
    font-weight: 600;
    line-height: 3.2rem;
    color: #21293c;
    margin-top: 1rem;
  }
`;

export const FormContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 6rem;
  .basic,
  .deal-info {
    padding-bottom: 4rem;
    border-bottom: 1px solid #d9e1ec;
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
  }

  .deal-info {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    margin: 4rem 0 2rem 0;

    .deal-helper-text {
      font-size: 1.4rem;
      padding-top: 1rem;
    }
  }
`;
