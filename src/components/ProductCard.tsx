// import { Children } from "react";
import type { IProduct } from "./Interfaces";
import Button from "./Ui/Button";
import { txtSlicer } from "./Utilities/txtSlicer";
import Image from "./Image";
import CircleColors from "./CircleColors";
interface IProps {
    product: IProduct,
}
const ProductCard = ({product}:IProps) => {
    const {category, description, imageURL, price, colors, title, } = product;
    
    //* ________RENDER_________ *\\
    const circleColorsList =  colors.map(color => <CircleColors key={color} color={color}/>)
    console.log(colors)
    return (
        <div className="border border-gray-200 p-2 rounded-lg flex flex-col gap-3 cursor-pointre max-w-sm md:min-h-fit m-auto sm:m-0 ">
            <Image ImgUrl={imageURL} alt={category.name} ClassName="rounded-lg md:max-w-md lg:object-cover h-52 w-full"/>
            <div className="">
                <h3 className="font-bold">{title}</h3>
                <p className="text-gray-500">{txtSlicer(description)}</p>
            </div>
            <div className="flex items-center sm:h-5 flex-wrap gap-1 my-2">
                {/* {colors === [] && <span className="block">lmlm</span>} */}
                {circleColorsList}
            </div>
            <div className="flex items-center justify-between">
                <span>${price}</span>
                <div className="flex items-center gap-2">
                    <span className="font-bold text-xs">{category.name}</span>
                    <img src={category.imageURL} alt={category.name} className="h-10 w-10 rounded-full"/>
                </div>
            </div>
            <div className="w-full bg-blue-80 flex gap-2">
                <Button className="bg-indigo-800" onClick={() => {}}>Edit</Button>
                <Button className="bg-red-900">Remove</Button>
            </div>
        </div>
    )
}
export default ProductCard;