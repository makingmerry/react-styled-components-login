import { useEffect, FC } from "react"
import styled from "styled-components"
import { motion, useAnimation } from "framer-motion"
import { useAuth } from "auth/auth-context"
import LoginForm from "auth/login-form"
import LoginSuccessDialog from "auth/login-success-dialog"

const StyledLogin = styled.div`
  padding: 4rem 1.5rem;
`

const StyledFrame = styled.div`
  position: relative;
  max-width: 28rem;
  margin: 0 auto;
  perspective: 40rem;
`

const StyledCard = styled(motion.div)`
  transform-style: preserve-3d;
`

// box-shadow adapted from https://shadows.brumm.af/
const StyledCardFront = styled.div`
  backface-visibility: hidden;
  overflow: hidden;
  border-radius: var(--rounded-lg);
  box-shadow: 0 0.175rem 0.1375rem rgba(0, 0, 0, 0.034),
    0 0.41875rem 0.33125rem rgba(0, 0, 0, 0.048),
    0 0.78125rem 0.625rem rgba(0, 0, 0, 0.06),
    0 1.39375rem 1.11875rem rgba(0, 0, 0, 0.072),
    0 2.6125rem 2.0875rem rgba(0, 0, 0, 0.086),
    0 6.25rem 5rem rgba(0, 0, 0, 0.12);
`

const StyledCardBack = styled.div`
  backface-visibility: hidden;
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: var(--rounded-lg);
  transform: rotateY(-180deg);
`

const Login: FC = () => {
  const controls = useAnimation()
  const { user } = useAuth()

  // flip from login to success if logged in and vice versa
  useEffect(() => {
    if (user) {
      controls.start({ rotateY: "180deg" })
      return
    }
    controls.start({ rotateY: "0deg" })
  }, [controls, user])

  return (
    <StyledLogin>
      <StyledFrame>
        <StyledCard animate={controls}>
          <StyledCardFront>
            <LoginForm />
          </StyledCardFront>
          <StyledCardBack>
            <LoginSuccessDialog />
          </StyledCardBack>
        </StyledCard>
      </StyledFrame>
    </StyledLogin>
  )
}

export default Login
