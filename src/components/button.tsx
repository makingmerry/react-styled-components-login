import { FC, ButtonHTMLAttributes } from "react"
import styled from "styled-components"

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const StyledButton = styled.button`
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  margin: 1.5rem 0;
  padding: 1rem 3rem;
  overflow: hidden;
  font-family: inherit;
  font-size: var(--text-sm);
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: var(--tracking-wider);
  background: linear-gradient(to right, var(--indigo), var(--blue));
  color: var(--white);
  border: 0;
  border-radius: var(--rounded-md);
  transition: color var(--transition-fast);
  cursor: pointer;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--blue);
    opacity: 0;
    transition: opacity var(--transition-fast),
      background var(--transition-fast);
  }

  &:hover,
  &:focus {
    &::before {
      opacity: 1;
    }
  }

  &:disabled {
    pointer-events: none;
    color: var(--mid-gray);

    &::before {
      opacity: 1;
      background: var(--silver);
    }
  }
`

const Button: FC<IButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>
}

export default Button
