import { useState, FC } from "react"
import styled from "styled-components"
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

const StyledContent = styled.div`
  display: table-cell;
  vertical-align: middle;
`

const StyledSymbol = styled.div`
  position: relative;
  width: 3.5rem;
  height: 3.5rem;
  margin: 0 auto;
  color: var(--green);
  border: 0.2rem solid var(--green);
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
  color: var(--white);
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

  if (!user) return null

  return (
    <StyledLoginSuccessDialog>
      <StyledContent>
        <StyledSymbol>
          <StyledIcon icon={faCheck} />
        </StyledSymbol>
        <StyledWelcome>
          Welcome Back
          <br />
          <strong>{user.name}</strong>
        </StyledWelcome>
        <StyledLogout
          type='button'
          onClick={() => handleLogout()}
          disabled={submitting}
        >
          {submitting ? <Spinner /> : "Logout"}
        </StyledLogout>
      </StyledContent>
    </StyledLoginSuccessDialog>
  )
}

export default LoginSuccessDialog
