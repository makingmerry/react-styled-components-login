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
  margin-top: 1.5rem;
  padding: 1rem 3rem;
  overflow: hidden;
  font-family: inherit;
  font-size: var(--text-small);
  font-weight: 600;
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
  cursor: pointer;

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
    transition: opacity var(--transition-fast);
  }

  &:hover,
  &:focus {
    &::before {
      opacity: 1;
    }
  }

  &:disabled {
    background: var(--silver);
    color: var(--mid-gray);
    pointer-events: none;
  }
`

const Button: FC<IButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>
}

export default Button
