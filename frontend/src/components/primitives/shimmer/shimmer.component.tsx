import React from "react";
import { keyframes, styled } from "styled-components";

export const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const StyledShimmer = styled.div`
  animation-duration: 3s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${shimmer};
  animation-timing-function: linear;
  background: #ddd;
  background: linear-gradient(to right, #f6f6f6 8%, #f0f0f0 18%, #f6f6f6 33%);
`;

interface ShimmerProps {
  height?: string;
  width?: string;
  style?: string | any;
  className?: string;
}

export const Shimmer: React.FC<ShimmerProps> = ({
  height,
  width,
  style,
  className,
}) => <StyledShimmer style={style} className={className} />;
