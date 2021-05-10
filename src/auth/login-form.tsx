import { useState, useRef, FC, FormEvent, ChangeEvent } from "react"
import styled from "styled-components"
import { useAuth } from "auth/auth-context"
import Input from "components/input"
import Button from "components/button"
import Alert from "components/alert"
import Spinner from "components/spinner"

const StyledFormPanel = styled.div`
  height: 100%;
  padding: 3rem 2rem 2.5rem;
  background: var(--white);
`

const StyledHeading = styled.h1`
  margin-bottom: 0.25rem;
  font-size: var(--text-lg);
  font-weight: 700;
`

const StyledIntro = styled.p`
  margin-bottom: 1.5rem;
  color: var(--mid-gray);
`

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
      message: "Please fill in your username",
    },
    max: {
      validator: (input) => checkMax(input, 60),
      message: "Reached 60 character limit",
    },
  },
  password: {
    required: {
      validator: (input) => checkEmpty(input),
      message: "Please fill in your password",
    },
    max: {
      validator: (input) => checkMax(input, 60),
      message: "Reached 60 character limit",
    },
  },
}

const LoginPanel: FC = () => {
  const { user, login } = useAuth()
  const [values, setValues] = useState<IInputs>({
    username: "din-djarin",
    password: "Grogu123",
  })
  const constraintsRef = useRef<IConstraints>(constraints)
  const [inputErrors, setInputErrors] = useState<IInputErrors>({
    username: [],
    password: [],
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)

  const loggedIn = user !== false
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
      setValues({
        username: "",
        password: "",
      })
    }
  }

  return (
    <StyledFormPanel>
      <StyledHeading>Let's sign you in</StyledHeading>
      <StyledIntro>
        Refer to{" "}
        <a href='https://github.com/makingmerry/react-styled-components-login'>
          repository
        </a>{" "}
        for guest credentials
      </StyledIntro>
      <form onSubmit={(e) => handleSubmit(e)} noValidate>
        <Input
          label='Username'
          type='text'
          name='username'
          id='username'
          value={values.username}
          required
          maxLength={60}
          onChange={(e) => handleInputChange(e, "username")}
          errors={inputErrors.username}
          disabled={loggedIn || submitting}
        />
        <Input
          label='Password'
          type='password'
          name='password'
          id='password'
          value={values.password}
          required
          maxLength={60}
          onChange={(e) => handleInputChange(e, "password")}
          errors={inputErrors.password}
          disabled={loggedIn || submitting}
        />
        <Button
          type='submit'
          disabled={loggedIn || submitting || error || invalidInputs}
        >
          {submitting ? <Spinner /> : "Login"}
        </Button>
      </form>
      {error && <Alert>{error}</Alert>}
    </StyledFormPanel>
  )
}

export default LoginPanel
