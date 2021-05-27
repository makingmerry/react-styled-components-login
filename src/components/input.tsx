import { useState, FC, InputHTMLAttributes } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

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

const StyledFieldWithIconFrame = styled.div`
  position: relative;
`

const StyledField = styled.input<{ errors: boolean }>`
  display: block;
  width: 100%;
  padding: 0.75rem;
  font-family: inherit;
  font-size: inherit;
  color: var(--dark-gray);
  background: var(--near-white);
  border: 1px solid
    ${({ errors }) => (errors ? "var(--error-color)" : "var(--dark-silver)")};
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

  ${StyledFieldWithIconFrame} & {
    padding-right: 2.5rem;
  }
`

const StyledFieldIconButton = styled.button<{ active: boolean }>`
  position: absolute;
  z-index: 2;
  top: 50%;
  right: 0;
  width: 2.5rem;
  height: 100%;
  text-align: center;
  padding: 0;
  color: var(--dark-gray);
  border: 0;
  cursor: pointer;
  background: transparent;
  transform: translate(0, -50%);
  transition: color var(--transition-fast);

  &:hover,
  &:focus {
    color: var(--blue);
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

interface IFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  errors: boolean
}

const Field: FC<IFieldProps> = ({ errors, ...props }) => (
  <StyledField errors={errors} {...props} />
)

const PasswordField: FC<IFieldProps> = ({ errors, type, ...props }) => {
  const [show, setShow] = useState(false)

  const handleToggle = () => {
    setShow(!show)
  }

  return (
    <StyledFieldWithIconFrame>
      <StyledField
        type={show ? "text" : "password"}
        errors={errors}
        {...props}
      />
      <StyledFieldIconButton
        type='button'
        aria-labelledby='show-password-button-label'
        active={show}
        onClick={() => handleToggle()}
        disabled={props.disabled}
      >
        <span id='show-password-button-label' hidden>
          {show ? "Hide" : "Show"} password
        </span>
        <FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
      </StyledFieldIconButton>
    </StyledFieldWithIconFrame>
  )
}

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
      {props.type === "password" ? (
        <PasswordField errors={errors.length > 0} {...props} />
      ) : (
        <Field errors={errors.length > 0} {...props} />
      )}
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
