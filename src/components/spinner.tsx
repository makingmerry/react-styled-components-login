import { FC } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

const StyledSpinner = styled(FontAwesomeIcon)`
  animation: rotate 1.5s linear infinite;

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
`

const Spinner: FC = () => {
  return <StyledSpinner icon={faSpinner} />
}

export default Spinner
