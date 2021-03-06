import { useState, useEffect, FC } from "react"
import styled from "styled-components"
import { motion, useAnimation } from "framer-motion"
import { useAuth } from "auth/auth-context"
import LoginForm from "auth/login-form"
import LoginSuccessDialog from "auth/login-success-dialog"

const StyledLogin = styled(motion.div)`
  padding: 4rem 1.5rem;
`

const StyledBackground = styled(motion.div)`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--near-black);
`

const StyledFrame = styled.div`
  position: relative;
  z-index: 2;
  max-width: 28rem;
  margin: 0 auto;
  perspective: 40rem;
`

const StyledCard = styled(motion.div)`
  transform-style: preserve-3d;
`

// box-shadow adapted from https://shadows.brumm.af/
const StyledCardFront = styled.div<{
  flipped: boolean
}>`
  backface-visibility: hidden;
  overflow: hidden;
  visibility: ${({ flipped }) => (flipped ? "hidden" : "visible")};
  border-radius: var(--rounded-md);
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
  border-radius: var(--rounded-md);
  transform: rotateY(-180deg);
`

const Login: FC = () => {
  const controls = useAnimation()
  const { user } = useAuth()
  const [flipped, setFlipped] = useState(false)

  // flip from login to success if logged in and vice versa
  useEffect(() => {
    const flipToBack = async () => {
      await controls.start("back")
      setFlipped(true)
    }

    const flipToFront = async () => {
      setFlipped(false)
      await controls.start("front")
    }

    if (user) {
      flipToBack()
      return
    }
    flipToFront()
  }, [controls, user])

  return (
    <StyledLogin
      variants={{
        front: {},
        back: {},
      }}
      transition={{
        staggerChildren: 0.15,
      }}
      animate={controls}
    >
      <StyledBackground
        variants={{
          front: { translateX: 0 },
          back: { translateX: "100%" },
        }}
        transition={{ type: "tween", velocity: 50 }}
      />
      <StyledFrame>
        <StyledCard
          variants={{
            front: { rotateY: "0deg" },
            back: { rotateY: "180deg" },
          }}
        >
          <StyledCardFront flipped={flipped}>
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
