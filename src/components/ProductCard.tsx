// import { Children } from "react";
import type { IProduct } from "./Interfaces";
import Button from "./Ui/Button";
import { txtSlicer } from "./Utilities/txtSlicer";
import Image from "./Image";
interface IProps {
    product: IProduct,
}
const ProductCard = ({product}:IProps) => {
    const {category, description, imageURL, price, title, } = product
    return (
        <div className="border border-gray-200 p-2 rounded-lg flex flex-col gap-2 cursor-pointre max-w-sm m-auto sm:m-0 ">
            <Image ImgUrl={imageURL} alt={category.name} ClassName="rounded-lg md:max-w-md lg:object-cover h-52 w-full"/>
            <div className="">
                <h3 className="font-bold">{title}</h3>
                <p className="text-gray-500">{txtSlicer(description)}</p>
            </div>
            <div className="flex items-center gap-1 my-2">
                <span className=" rounded-4xl bg-red-600 w-5 h-5 cursor-pointer"></span>
                <span className=" rounded-4xl bg-red-700 w-5 h-5 cursor-pointer"></span>
                <span className=" rounded-4xl bg-red-800 w-5 h-5 cursor-pointer"></span>
                <span className=" rounded-4xl bg-red-950 w-5 h-5 cursor-pointer"></span>
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