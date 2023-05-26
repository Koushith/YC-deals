import { StyledInput } from "./input.styles";

interface InputComponentProps {
  value?: string;
  onChange?: () => void;
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
}

export const Input = (props: InputComponentProps) => {
  const { value, onChange, label, name, type, placeholder } = props;
  return (
    <StyledInput>
      <label htmlFor={type}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </StyledInput>
  );
};
