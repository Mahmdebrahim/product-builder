import type { HTMLAttributes } from "react"

interface IProps extends HTMLAttributes<HTMLSpanElement> {
 color: string,
}
const CircleColors = ({color, ...rest}:IProps) => {
    return (
        <span 
            className= {`block  rounded-4xl  w-5 h-5 cursor-pointer`} 
            style={{backgroundColor: color}}
            {...rest}
        />
    )
}
export default CircleColors