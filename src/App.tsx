import { AuthProvider } from "auth/auth-context"
import LoginForm from "auth/login-form"

if (process.env.REACT_APP_API_MOCKING === "enabled") {
  require("mocks/index")
}

const App = () => {
  return (
    <AuthProvider>
      <LoginForm></LoginForm>
    </AuthProvider>
  )
}

export default App
