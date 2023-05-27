import { StyledInput } from "./input.styles";

interface InputComponentProps {
  value?: string;
  onChange?: any;
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export const Input = (props: InputComponentProps) => {
  const {
    value,
    onChange,
    label,
    name,
    type,
    placeholder,
    required = false,
  } = props;
  return (
    <StyledInput>
      <label htmlFor={type}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </StyledInput>
  );
};
