import { useState, useRef, FC, FormEvent, ChangeEvent } from "react"
import { useAuth } from "auth/auth-context"
import Input from "components/input"
import Button from "components/button"

const checkEmpty = (value: string) => value.length < 1

const checkMax = (value: string, max: number) => value.length >= max

interface IInputs {
  [key: string]: string
}

interface IInputErrors {
  [key: string]: string[]
}

interface IOptions {
  required?: boolean
  max?: number
}

interface IConstraints {
  [key: string]: IOptions
}

const LoginForm: FC = () => {
  const { user, login, logout } = useAuth()
  const [values, setValues] = useState<IInputs>({
    username: "",
    password: "",
  })
  const [inputErrors, setInputErrors] = useState<IInputErrors>({
    username: [],
    password: [],
  })
  const constraints = useRef<IConstraints>({
    username: {
      required: true,
      max: 60,
    },
    password: {
      required: true,
      max: 60,
    },
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    e.preventDefault()

    const { value } = e.target
    const errors = validate(key, value)
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }))
    setInputErrors((prev) => ({
      ...prev,
      [key]: errors,
    }))
  }

  const validate = (key: string, value: string) => {
    const options = constraints.current[key]
    if (!options) return []

    const errors = Object.entries(options)
      .map(([symbol, constraint]) => {
        if (!constraint) return false

        if (symbol === "required") {
          const empty = checkEmpty(value)
          if (!empty) return false
          return `${key} is required`
        }

        if (symbol === "max") {
          const max = checkMax(value, constraint)
          if (!max) return false
          return `max characters for ${key}`
        }

        return false
      })
      .filter((error) => error)

    return errors as string[]
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setError(false)
      setSubmitting(true)
      await login({
        username: values.username,
        password: values.password,
      })
    } catch (error) {
      setError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleLogout = async () => {
    try {
      setSubmitting(true)
      await logout()
    } catch (error) {
      setError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <h2>Login</h2>
      <div>
        {user && (
          <div>
            {user.name}{" "}
            <button type='button' onClick={() => handleLogout()}>
              logout
            </button>
          </div>
        )}
      </div>
      <div>{error && <div>{error}</div>}</div>
      <div>{submitting && <div>submitting...</div>}</div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          label='Username'
          type='text'
          name='username'
          id='username'
          value={values.username}
          maxLength={60}
          onChange={(e) => handleInputChange(e, "username")}
        />
        {inputErrors.username.length > 0 && (
          <ul>
            {inputErrors.username.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        )}
        <Input
          label='Password'
          type='password'
          name='password'
          id='password'
          maxLength={60}
          value={values.password}
          onChange={(e) => handleInputChange(e, "password")}
        />
        {inputErrors.password.length > 0 && (
          <ul>
            {inputErrors.password.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        )}
        <Button type='submit'>Login</Button>
      </form>
    </>
  )
}

export default LoginForm
