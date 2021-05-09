import { FC, InputHTMLAttributes } from "react"
import styled from "styled-components"

const StyledInput = styled.label`
  display: block;
  margin: 1.25rem 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`

const StyledLabel = styled.div`
  margin-bottom: 0.5rem;
  font-size: var(--text-sm);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: var(--mid-gray);
`

const StyledRequired = styled.span`
  color: var(--error-color);
`

interface IStyledField {
  errors: boolean
}

const StyledField = styled.input<IStyledField>`
  display: block;
  width: 100%;
  padding: 0.75rem;
  font-family: inherit;
  font-size: inherit;
  color: var(--dark-gray);
  background: var(--near-white);
  border: 1px solid var(--gray);
  border: 1px solid
    ${({ errors }) => (errors ? "var(--error-color)" : "var(--gray)")};
  border-radius: var(--rounded-md);
  transition: background var(--transition-fast), color var(--transition-fast),
    border-color var(--transition-fast);

  &:focus {
    color: var(--black);
    background: var(--white);
    border-color: var(--blue);
    outline: 0;
  }

  &:disabled {
    background: var(--light-gray);
    color: var(--gray);
  }
`

const StyledErrors = styled.ul`
  display: block;
  margin-top: 0.5rem;
  list-style: none;
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-slight);
  color: var(--error-color);
`

const StyledErrorMessage = styled.li`
  display: flex;

  &::before {
    content: "•";
    flex-shrink: 0;
    margin-right: 0.25rem;
  }
`

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  errors: string[]
}

const Input: FC<IInputProps> = ({ label, errors, ...props }) => {
  return (
    <StyledInput>
      {label && (
        <StyledLabel>
          {label} {props.required && <StyledRequired>*</StyledRequired>}
        </StyledLabel>
      )}
      <StyledField errors={errors.length > 0} {...props} />
      {errors.length > 0 && (
        <StyledErrors>
          {errors.map((error, i) => (
            <StyledErrorMessage key={i}>{error}</StyledErrorMessage>
          ))}
        </StyledErrors>
      )}
    </StyledInput>
  )
}

export default Input
