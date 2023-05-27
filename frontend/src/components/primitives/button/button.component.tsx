import { StyledButton } from "./button.styles";

interface ButtonComponentProps {
  label?: string;
  onClick?: () => void;
  style?: any;
}

export const Button = (props: ButtonComponentProps) => {
  const { label, onClick, style } = props;
  return (
    <StyledButton onClick={onClick} style={style}>
      {label}
    </StyledButton>
  );
};
