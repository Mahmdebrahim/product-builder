// import { Children } from "react";
import Button from "./Ui/Button";
interface IProps {

}
const ProductCard = ({}:IProps) => {


    return (
        <div className="border border-gray-200 p-2 rounded-lg flex flex-col gap-2 cursor-pointre max-w-sm m-auto sm:m-0">
            <img 
            src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvc2V8ZW58MHx8MHx8fDA%3D" 
            alt="" 
            className="rounded-lg md:max-w-md"/>
            <div className="">
                <h3 className="font-bold">Nike athletic shoe</h3>
                <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit Tenetur.</p>
            </div>
            <div className="flex items-center gap-1 my-2">
                <span className=" rounded-4xl bg-red-600 w-5 h-5 cursor-pointer"></span>
                <span className=" rounded-4xl bg-red-700 w-5 h-5 cursor-pointer"></span>
                <span className=" rounded-4xl bg-red-800 w-5 h-5 cursor-pointer"></span>
                <span className=" rounded-4xl bg-red-950 w-5 h-5 cursor-pointer"></span>
            </div>
            <div className="flex items-center justify-between">
                <span>$1750</span>
                <div className="flex items-center gap-2">
                    <span className="font-bold text-xs">Categor</span>
                    <img src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvc2V8ZW58MHx8MHx8fDA%3D" alt="" className="h-10 w-10 rounded-full"/>
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