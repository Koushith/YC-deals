import { StyledButton } from "./button.styles";

interface ButtonComponentProps {
  label?: string;
  onClick?: () => void;
  style?: any;
  className?: string;
  disabled?: boolean;
}

export const Button = (props: ButtonComponentProps) => {
  const { label, onClick, style, className, disabled = false } = props;

  return (
    <StyledButton
      onClick={onClick}
      style={style}
      className={className}
      disabled={disabled}
    >
      {label}
    </StyledButton>
  );
};
