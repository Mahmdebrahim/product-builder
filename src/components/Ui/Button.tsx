import { type ButtonHTMLAttributes, type ReactNode } from "react"

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
    className?: string,
    width?: "w-full" | "w-fit",
}
const Button = ({className, width ="w-full", children, ...rest}:IProps) => {
    return (
        <button className={`${className} ${width} p-1 rounded-md text-white`}{...rest}>
            {children}
        </button>
    )
}
export default Button