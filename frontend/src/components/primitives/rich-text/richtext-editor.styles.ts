import { styled } from "styled-components";

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 150px; */
  label {
    font-size: 1.6rem;
    color: #21293c;
    font-weight: 600;
  }

  .input {
    outline: none;
    font-family: inherit;
    border-color: #d9e1ec;
    border-radius: 4px;
    box-shadow: none;
    width: 100%;

    /* font-size: 1.4rem;
    font-weight: 400;
    line-height: 24px; */
    color: #21293c;
    /* padding-left: 1.2rem; */
    background-color: #fff;
    margin-top: 0.4rem;
  }
`;
