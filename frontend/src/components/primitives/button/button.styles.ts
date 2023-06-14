import { styled } from "styled-components";

export const StyledButton = styled.button`
  border: none;
  background: ${(props) => (props.disabled ? " #FFC170; " : " #ff6154")};
  border-radius: 4px;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 600;
  padding: 0.8rem 1rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-weight: 400;
`;
