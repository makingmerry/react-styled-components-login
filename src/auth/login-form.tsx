import { useState, FC } from "react"
import { useAuth } from "auth/auth-context"
import Input from "components/input"
import Button from "components/button"

const LoginForm: FC = () => {
  const { isAuthenticated } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = () => {
    console.log("submiting...")
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
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        label='Password'
        type='password'
        name='password'
        id='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button>Login</Button>
    </form>
  )
}

export default LoginForm
