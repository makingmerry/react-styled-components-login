import { AuthProvider } from "auth/auth-context"
import LoginForm from "auth/login-form"

const App = () => {
  return (
    <AuthProvider>
      <div>
        <LoginForm></LoginForm>
      </div>
    </AuthProvider>
  )
}

export default App
