import { FC } from "react"
import styled from "styled-components"

const StyledAlert = styled.div`
  margin: 1.5rem 0;
  padding: 1rem;
  font-size: var(--text-small);
  letter-spacing: var(--tracking-slight);
  color: var(--error-color);
  background: var(--error-bg);
  border-radius: var(--rounded-md);

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`

const Alert: FC = ({ children }) => {
  return <StyledAlert>{children}</StyledAlert>
}

export default Alert
