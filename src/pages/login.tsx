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

const StyledCardFront = styled.div`
  backface-visibility: hidden;
  overflow: hidden;
  border-radius: var(--rounded-lg);
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
        <StyledCard animate={controls} transition={{ repeatType: "reverse" }}>
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
