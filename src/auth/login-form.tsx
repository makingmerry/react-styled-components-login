import { useState, FC, FormEvent, ChangeEvent } from "react"
import { useAuth } from "auth/auth-context"
import Input from "components/input"
import Button from "components/button"

const LoginForm: FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { user, login } = useAuth()

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login({ username, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
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
      <Button>Login</Button>
    </form>
  )
}

export default LoginForm
