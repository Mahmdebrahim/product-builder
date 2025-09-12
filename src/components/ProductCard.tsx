// import { Children } from "react";
import type { IProduct } from "./Interfaces";
import Button from "./Ui/Button";
import { txtSlicer } from "./Utilities/txtSlicer";
import Image from "./Image";
import CircleColors from "./CircleColors";
interface IProps {
    product: IProduct,
    setProductEdited: (product:IProduct) => void
    openEditModal : () => void,
    setproductEditedIdx: (value: number) => void,
    index: number,
}
const ProductCard = ({product,setProductEdited,openEditModal, setproductEditedIdx,index}:IProps) => {
    const {category, description, imageURL, price, colors, title,} = product;
    
    const onEdit = () => {
      setProductEdited(product)
      openEditModal()
      setproductEditedIdx(index)
    }
    //* ________RENDER_________ *\\
    const circleColorsList =  colors.map(color => <CircleColors key={color} color={color}/>)
    // console.log(colors)
    return (
        <div className="border border-gray-200 p-2 rounded-lg flex flex-col cursor-pointre max-w-sm md:mx-w-lg md:min-h-full m-auto md:mx-0 ">
            <Image ImgUrl={imageURL} alt={category.name} ClassName="rounded-lg md:max-w-md lg:object-cover h-52 w-full"/>
            <div className="">
                <h3 className="font-bold">{title}</h3>
                <p className="text-gray-500">{txtSlicer(description)}</p>
            </div>
            <div className="flex items-center sm:h-5 flex-wrap gap-1 space-x-1 my-4">
                {circleColorsList}
            </div>
            <div className="flex items-center justify-between mt-2">
                <span className="text-indigo-800">${price}</span>
                <div className="flex items-center gap-2">
                    <span className="font-bold text-xs">{category.name}</span>
                    <img src={category.imageURL} alt={category.name} className="h-10 w-10 rounded-full"/>
                </div>
            </div>
            <div className="w-full bg-blue-80 flex  space-x-2 mt-4">
                <Button 
                    className="bg-indigo-800 cursor-pointer" 
                    onClick={onEdit}
                >
                    Edit
                </Button>
                <Button className="bg-red-900 cursor-pointer">Remove</Button>
            </div>
        </div>
    )
}
export default ProductCard;