import { createContext, useContext, useState, FC } from "react"

interface IUser {
  name: string
  email: string
}

interface IError {
  code: number
  error: string
  message: string
}

interface ICredentials {
  username: string
  password: string
}

interface IAuthContextValues {
  user: IUser | false
  login: (data: ICredentials) => Promise<IUser | IError | void>
  logout: () => Promise<void>
}

const AuthContext = createContext({
  user: false,
  login: (data) => {},
  logout: () => {},
} as IAuthContextValues)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<IUser | false>(false)

  const login = async (data: ICredentials) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()

      if (!response.ok) {
        return Promise.reject({
          error: response.statusText,
          code: response.status,
          message: result.message,
        })
      }

      setUser(result)
      return Promise.resolve(result)
    } catch (error) {
      console.error(error)
    }
  }

  const logout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const result = await response.json()

      if (!response.ok) {
        return Promise.reject({
          error: response.statusText,
          code: response.status,
          message: result.message,
        })
      }

      setUser(false)
      return Promise.resolve(result)
    } catch (error) {
      console.error(error)
    }
  }

  const value: IAuthContextValues = {
    user,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
