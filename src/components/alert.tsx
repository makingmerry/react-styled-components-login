import { FC } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"

const StyledAlert = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  padding: 1rem;
  font-size: var(--text-sm);
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

const StyledIcon = styled(FontAwesomeIcon)`
  flex-shrink: 0;
  margin-right: 0.75rem;
`

const Alert: FC = ({ children }) => {
  return (
    <StyledAlert>
      <StyledIcon icon={faTimesCircle} />
      {children}
    </StyledAlert>
  )
}

export default Alert
