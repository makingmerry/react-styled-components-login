import { FC, ButtonHTMLAttributes } from "react"
import styled from "styled-components"

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const StyledButton = styled.button`
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  border: 0;
  padding: 0.75rem 3rem;
  overflow: hidden;
  font-family: inherit;
  font-size: var(--text-small);
  font-weight: 600;
  line-height: var(--leading-normal);
  text-transform: uppercase;
  text-align: center;
  letter-spacing: var(--tracking-wide);
  background: linear-gradient(
    to right,
    var(--primary-button-bg-from),
    var(--primary-button-bg-to)
  );
  color: white;
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
    transition: opacity 0.25s;
  }

  &:hover {
    &::before {
      opacity: 1;
    }
  }
`

const Button: FC<IButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>
}

export default Button
