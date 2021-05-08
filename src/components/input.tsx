import { FC, InputHTMLAttributes } from "react"

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Input: FC<IInputProps> = ({ label, ...props }) => {
  return (
    <label style={{ display: "block", marginTop: "10px" }}>
      {label && <span>{label}</span>}
      <input {...props} />
    </label>
  )
}

export default Input
