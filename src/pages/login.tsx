import { FC } from "react"
import styled from "styled-components"
import LoginPanel from "auth/login-panel"

const StyledLogin = styled.div`
  display: table;
  width: 100%;
  height: 100%;
`

const StyledMiddle = styled.div`
  display: table-cell;
  vertical-align: middle;
`

const StyledCenter = styled.div`
  max-width: 30rem;
  margin: 0 auto;
  padding: 3rem 1.5rem;
`

const Login: FC = () => {
  return (
    <StyledLogin>
      <StyledMiddle>
        <StyledCenter>
          <LoginPanel />
        </StyledCenter>
      </StyledMiddle>
    </StyledLogin>
  )
}

export default Login
