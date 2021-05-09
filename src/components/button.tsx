import { FC, ButtonHTMLAttributes } from "react"
import styled from "styled-components"

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const StyledButton = styled.button`
  --primary-button-bg-from: var(--indigo);
  --primary-button-bg-to: var(--blue);
  --primary-button-text-color: var(--white);

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
  background: linear-gradient(
    to right,
    var(--primary-button-bg-from),
    var(--primary-button-bg-to)
  );
  color: var(--primary-button-text-color);
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
    background: var(--primary-button-bg-to);
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
