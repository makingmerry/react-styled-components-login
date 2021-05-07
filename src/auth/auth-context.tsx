import { createContext, useContext, useState, FC } from "react"

interface IUser {
  name: string
  email: string
}

interface ICredentials {
  username: string
  password: string
}

interface IAuthContextValues {
  user: IUser | false
  login: (data: ICredentials) => Promise<IUser | void>
}

const AuthContext = createContext({
  user: false,
  login: (data) => {},
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

      const { status } = response
      const result = await response.json()

      if (status !== 200) throw new Error(result.message)
      setUser(result)
    } catch (error) {
      console.error("login error: ", error)
    }
  }

  const value: IAuthContextValues = {
    user,
    login,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
