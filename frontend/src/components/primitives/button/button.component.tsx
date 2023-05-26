import { StyledButton } from "./button.styles";

interface ButtonComponentProps {
  label?: string;
  onClick?: () => void;
}

export const Button = (props: ButtonComponentProps) => {
  const { label, onClick } = props;
  return <StyledButton onClick={onClick}>{label}</StyledButton>;
};
