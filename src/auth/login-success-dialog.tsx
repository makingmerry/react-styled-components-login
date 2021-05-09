import { useState, FC } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "auth/auth-context"
import Spinner from "components/spinner"

const StyledLoginSuccessDialog = styled.div`
  padding: 2rem;
  text-align: center;
  background: var(--near-white);
  border-radius: var(--rounded-lg);
`

const StyledSymbol = styled.div`
  position: relative;
  width: 3.5rem;
  height: 3.5rem;
  margin: 0 auto;
  color: var(--blue);
  border: 0.2rem solid var(--blue);
  border-radius: 100vw;
`

const StyledIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const StyledWelcome = styled.div`
  margin-top: 0.75rem;
  font-size: var(--text-md);
  font-weight: 600;
  line-height: var(--leading-tight);
`

const StyledLogout = styled.button`
  display: inline-block;
  margin-top: 1rem;
  padding: 0;
  padding-bottom: 0.1rem;
  font-family: inherit;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--blue);
  background: transparent;
  border: none;
  border-bottom: 0.125rem solid var(--blue);
  transition: color var(--transition-fast), border-color var(--transition-fast);
  cursor: pointer;

  &:hover {
    color: var(--dark-blue);
    border-color: var(--dark-blue);
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

  if (!user) return null

  return (
    <StyledLoginSuccessDialog>
      <StyledSymbol>
        <StyledIcon icon={faCheck} />
      </StyledSymbol>
      <StyledWelcome>
        Welcome Back
        <br />
        <strong>{user.name}</strong>
      </StyledWelcome>
      <StyledLogout type='button' onClick={() => handleLogout()}>
        {submitting ? <Spinner /> : "Logout"}
      </StyledLogout>
    </StyledLoginSuccessDialog>
  )
}

export default LoginSuccessDialog
