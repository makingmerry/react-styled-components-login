import { FC, InputHTMLAttributes } from "react"

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  errors?: string[] | undefined
}

const Input: FC<IInputProps> = ({ label, errors, ...props }) => {
  return (
    <label style={{ display: "block", marginTop: "10px" }}>
      {label && <span>{label}</span>}
      <input {...props} />
      {errors && errors.length > 0 && (
        <ul>
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      )}
    </label>
  )
}

export default Input
