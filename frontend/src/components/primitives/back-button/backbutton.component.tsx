import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

export const StyledDiv = styled.div`
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: #ff6154;
  }
  svg {
    height: 1rem;
    width: 1rem;
    font-size: 1rem;
    color: #4b587c !important;
    transform: rotate(-90deg);
    margin-right: 5px; /* Add spacing between the arrow and text */

    &:hover {
      color: #ff6154 !important;
    }
  }
`;

export const GoBack = () => {
  const navigate = useNavigate();
  const backHandler = () => {
    navigate(-1);
  };
  return (
    <StyledDiv onClick={backHandler}>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="far"
        data-icon="arrow-up"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        className="svg-inline--fa fa-arrow-up fa-fw fa-xl"
      >
        <path
          fill="currentColor"
          d="M209.4 39.4C204.8 34.7 198.6 32 192 32s-12.8 2.7-17.4 7.4l-168 176c-9.2 9.6-8.8 24.8 .8 33.9s24.8 8.8 33.9-.8L168 115.9V456c0 13.3 10.7 24 24 24s24-10.7 24-24V115.9L342.6 248.6c9.2 9.6 24.3 9.9 33.9 .8s9.9-24.3 .8-33.9l-168-176z"
          className=""
        ></path>
      </svg>
      <h1>Go Back</h1>
    </StyledDiv>
  );
};
