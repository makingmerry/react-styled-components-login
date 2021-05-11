import { useState, FC } from "react"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "auth/auth-context"
import Spinner from "components/spinner"

const StyledLoginSuccessDialog = styled.div`
  display: table;
  height: 100%;
  width: 100%;
  padding: 2rem;
  text-align: center;
  background: linear-gradient(to right, var(--indigo), var(--blue));
`

const StyledContent = styled(motion.div)`
  display: table-cell;
  vertical-align: middle;
`

const StyledSymbol = styled(motion.div)`
  position: relative;
  width: 3.5rem;
  height: 3.5rem;
  margin: 0 auto;
  color: var(--green);
  border: 0.2rem solid currentColor;
  border-radius: 100vw;
`

const StyledIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const StyledWelcome = styled.p`
  margin-top: 0.75rem;
  font-size: var(--text-md);
  font-weight: 600;
  line-height: var(--leading-tight);
  color: var(--white);
`

const StyledLogout = styled.button`
  display: inline-block;
  margin-top: 1rem;
  padding: 0.25rem 0.5rem;
  font-family: inherit;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--green);
  background: transparent;
  border: none;
  transition: color var(--transition-fast);
  cursor: pointer;

  &:hover {
    color: var(--light-green);
  }

  &:disabled {
    color: var(--light-gray);
  }
`

const LoginSuccessDialog: FC = () => {
  const { user, logout } = useAuth()
  const [submitting, setSubmitting] = useState(false)

  const handleLogout = async () => {
    try {
      setSubmitting(true)
      await logout()
    } catch (error) {
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <StyledLoginSuccessDialog>
      <AnimatePresence>
        {user && (
          <StyledContent
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  delayChildren: 0.15,
                },
              },
            }}
            initial='hidden'
            animate='show'
            exit='hidden'
            transition={{
              type: "spring",
              stiffness: 75,
            }}
          >
            <StyledSymbol
              variants={{
                hidden: { scale: 1.5 },
                show: { scale: 1 },
              }}
            >
              <StyledIcon icon={faCheck} />
            </StyledSymbol>
            <StyledWelcome>
              Welcome back <strong>{user.name}</strong>,<br />
              We've missed you!
            </StyledWelcome>
            <StyledLogout
              type='button'
              onClick={() => handleLogout()}
              disabled={submitting}
            >
              {submitting ? <Spinner /> : "Logout"}
            </StyledLogout>
          </StyledContent>
        )}
      </AnimatePresence>
    </StyledLoginSuccessDialog>
  )
}

export default LoginSuccessDialog
