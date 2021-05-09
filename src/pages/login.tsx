import { FC } from "react"
import styled from "styled-components"
import LoginForm from "auth/login-form"
import LoginSuccessDialog from "auth/login-success-dialog"

const StyledLogin = styled.div`
  padding: 4rem 1.5rem;
`

const StyledFrame = styled.div`
  position: relative;
  max-width: 28rem;
  margin: 0 auto;
`

const Login: FC = () => {
  return (
    <StyledLogin>
      <StyledFrame>
        <LoginSuccessDialog />
        <LoginForm />
      </StyledFrame>
    </StyledLogin>
  )
}

export default Login
