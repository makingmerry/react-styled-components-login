import { FC, ButtonHTMLAttributes } from "react"

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<IButtonProps> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>
}

export default Button
