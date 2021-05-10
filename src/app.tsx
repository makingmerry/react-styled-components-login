import { Reset } from "styled-reset"
import { AuthProvider } from "auth/auth-context"
import Login from "pages/login"
import "app.css"

if (process.env.REACT_APP_API_MOCKING === "enabled") {
  require("mocks/index")
}

const App = () => {
  return (
    <AuthProvider>
      <Reset />
      <Login />
    </AuthProvider>
  )
}

export default App
