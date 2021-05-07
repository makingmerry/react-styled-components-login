import { useState, FC, FormEvent, ChangeEvent } from "react"
import { useAuth } from "auth/auth-context"
import Input from "components/input"
import Button from "components/button"

const LoginForm: FC = () => {
  const { user, login, logout } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setError(false)
      setLoading(true)
      await login({ username, password })
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      setLoading(true)
      await logout()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h2>Login</h2>
      <div>
        {user && (
          <div>
            {user.name}{" "}
            <button type='button' onClick={handleLogout}>
              logout
            </button>
          </div>
        )}
      </div>
      <div>{error && <div>{error}</div>}</div>
      <div>{loading && <div>loading...</div>}</div>
      <form onSubmit={handleSubmit}>
        <Input
          label='Username'
          type='text'
          name='username'
          id='username'
          value={username}
          onChange={handleUsernameChange}
        />
        <Input
          label='Password'
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={handlePasswordChange}
        />
        <Button type='submit'>Login</Button>
      </form>
    </>
  )
}

export default LoginForm
