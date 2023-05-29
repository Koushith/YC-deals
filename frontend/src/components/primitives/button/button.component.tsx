import { StyledButton } from "./button.styles";

interface ButtonComponentProps {
  label?: string;
  onClick?: () => void;
  style?: any;
  className?: string;
}

export const Button = (props: ButtonComponentProps) => {
  const { label, onClick, style, className } = props;
  return (
    <StyledButton onClick={onClick} style={style} className={className}>
      {label}
    </StyledButton>
  );
};
