import { createContext, useContext, useState, FC } from "react"

interface IAuthContextValues {
  isAuthenticated: boolean
}

const AuthContext = createContext({
  isAuthenticated: false,
} as IAuthContextValues)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const value: IAuthContextValues = {
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
