import { useState, useRef, FC, FormEvent, ChangeEvent } from "react"
import { useAuth } from "auth/auth-context"
import Input from "components/input"
import Button from "components/button"

interface IInputs {
  [key: string]: string
}

interface IInputErrors {
  [key: string]: string[]
}

interface IOptions {
  [key: string]: {
    validator: (input: string) => boolean
    message: string
  }
}

interface IConstraints {
  [key: string]: IOptions
}

// custom validators return if input is valid
const checkEmpty = (input: string): boolean => input.length < 1

const checkMax = (input: string, max: number): boolean => input.length >= max

// constraints for running input values against custom validators
// constraint keys must match input name attribute
const constraints: IConstraints = {
  username: {
    required: {
      validator: (input) => checkEmpty(input),
      message: "Username is required",
    },
    max: {
      validator: (input) => checkMax(input, 60),
      message: "Maximum of 60 characters",
    },
  },
  password: {
    required: {
      validator: (input) => checkEmpty(input),
      message: "Password is required",
    },
    max: {
      validator: (input) => checkMax(input, 60),
      message: "Maximum of 60 characters",
    },
  },
}

const LoginForm: FC = () => {
  const { user, login, logout } = useAuth()
  const [values, setValues] = useState<IInputs>({
    username: "",
    password: "",
  })
  const constraintsRef = useRef<IConstraints>(constraints)
  const [inputErrors, setInputErrors] = useState<IInputErrors>({
    username: [],
    password: [],
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)

  const flatInputErrors = Object.values(inputErrors).flat()
  const invalidInputs = flatInputErrors.length > 0

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    e.preventDefault()

    setError(false)

    const { value } = e.target
    validateInput(name, value)
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateInput = (name: string, value: string) => {
    // reference input constraints for validators,
    // otherwise return no error messages
    const input = constraintsRef.current[name]
    if (!input) return []

    // run input value against constraints for errors
    const errors = Object.values(input)
      .map((constraint) => {
        const { validator, message } = constraint
        const valid = !validator(value)
        // flag false for valid values
        return valid ? false : message
      })
      // filter out valid values from error lines
      .filter((error) => error)

    setInputErrors((prev) => ({
      ...prev,
      [name]: errors as string[],
    }))

    const result = errors.length === 0
    return result
  }

  const validate = () => {
    const errors = Object.entries(values)
      .map(([name, value]) => !validateInput(name, value))
      .filter((error) => error)

    const result = errors.length === 0
    return result
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const valid = validate()
    if (!valid) return

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
      <form onSubmit={(e) => handleSubmit(e)} noValidate>
        <Input
          label='Username'
          type='text'
          name='username'
          id='username'
          value={values.username}
          maxLength={60}
          onChange={(e) => handleInputChange(e, "username")}
          errors={inputErrors.username}
        />
        <Input
          label='Password'
          type='password'
          name='password'
          id='password'
          maxLength={60}
          value={values.password}
          onChange={(e) => handleInputChange(e, "password")}
          errors={inputErrors.password}
        />
        <Button type='submit' disabled={error || invalidInputs}>
          Login
        </Button>
      </form>
    </>
  )
}

export default LoginForm
