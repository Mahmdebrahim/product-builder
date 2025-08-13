
import { productList, formInputsList, colors } from "./components/Data"
import type { IProduct } from "./components/Interfaces"
import ProductCard from "./components/ProductCard"
import Button from "./components/Ui/Button"
import Input from "./components/Ui/Input"
import Modal from "./components/Ui/Model"
import { useState, type ChangeEvent, type FormEvent } from "react"
import { porductValidation } from "./validation"
import ErrorMsg from "./components/ErrorMsg"
import CircleColors from "./components/CircleColors"
import { v4 as uuid } from "uuid";
const App = () => {
   //* _________DRY__________ *\\
   const DefaultPtoductObj = {
      title: "",
      description: "",
      imageURL: "",
      price: "",
      colors: [],
      category:{
         name: "",
         imageURL: "",
      }
   }
   //* ________STATE_________ *\\   
   ///////////////////////////////////////////////////////
   const [isOpen, setIsOpen] = useState(false);
   const [productsList,setProductsList] = useState<IProduct[]>(productList)
   const [productInform,setProductInform] = useState<IProduct>(DefaultPtoductObj)
   const [tempColor,setempColor] = useState<string[]>([])
   const [errorMsg, setErrorMsg] = useState(
      {
         title: "",
         description: "",
         imageURL: "",
         price: "", 
      }
   )
   // console.log(tempColor)
   // console.log("err:", errorMsg)
   //* ________HANDLER_________ *\\ 
   ///////////////////////////////////////////////////////
   const  open = () => setIsOpen(true);
   const close = () => setIsOpen(false);
   //////
   const changeHandler = (e:ChangeEvent<HTMLInputElement>) =>{
      // to assign the value when onChage to the name
      const {value,name} = e.target;
      setProductInform({
         ...productInform,
         [name]:value,
      })
      // to remove errorMsg from form in onChange value
      setErrorMsg(
         {
            ...errorMsg,
            [name]: ""
         }
      )
   }

   const onCancel = () => {
      console.log("cansle")
      setProductInform(DefaultPtoductObj)
      close();
   }

   const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
     event.preventDefault();
     const errors = porductValidation({
        title: productInform.title,
        description: productInform.description,
        imageURL:productInform.imageURL,
        price:productInform.price
     });
     const errorMsg =  Object.values(errors).some(val => val !== "") 
     if(errorMsg){
      setErrorMsg(errors)
      return;
     }
     setProductsList(   
      prev => [ { ...productInform, id:uuid(), colors:tempColor }, ...prev]
     )
      setProductInform(DefaultPtoductObj)
      setempColor([])
      close()
   }
   //* ________RENDER_________ *\\
   ///////////////////////////////////////////////////////
   const products = productsList.map(product => <ProductCard key={product.id}
   product={product}/>);
   const Inputs = formInputsList.map(input => 
      <div className="flex flex-col" key={input.id}>
         <label htmlFor={input.id} className="mb-1 text-sm font-medium  text-indigo-80">{input.label}</label>
         <Input 
            type={input.type} 
            name={input.name} 
            id={input.id} 
            value={productInform[input.name]} 
            onChange={changeHandler}
         />
         <ErrorMsg msg={errorMsg[input.name]}/>
      </div>
   )
   const circleColorsList =  colors.map(color => <CircleColors key={color} color={color} 
      onClick={() =>  {
         if(tempColor.includes(color)){
            setempColor(tempColor.filter((col) => col !== color))
            return
         }
         setempColor((prev) => [...prev, color])
      }
    }
   />)

   ///////////////////////////////////////////////////////////////////////////
   //! START POINT !\\
    return (
       <main className=" container mx-auto px-4 py-4">
          <Button className="bg-indigo-800 p-2 block mx-auto font-medium hover:bg-indigo-700 cursor-pointer transition duration-300 ease-in-out " width="w-fit" onClick={open}>build product</Button>
          <Modal close={close} isOpen={isOpen} title="ADD A NEW PRODUCT">
            <form className="flex flex-col gap-4 " onSubmit={submitHandler}>
               {Inputs}
               <div className="flex items-center gap-1 my-2 flex-wrap">
                 {tempColor.map(color => (
                     <span 
                        className="p-1 mr-1 mp-1 text-sm rounded-md text-white"
                        style={{ backgroundColor: color }}
                     >
                        {color}
                     </span>
                  ))}
               </div>
               <div className="flex items-center gap-1 my-2">
                  {circleColorsList}
               </div>
               <div className="flex flex-co gap-4 items-center">
                     <Button className="bg-indigo-800 "  onClick={()=>{}}>Submit</Button>
                     <Button className="bg-gray-400 hover:bg-gray-600         duration-300 ease-out "  
                     onClick={onCancel}>
                     Cansle
                     </Button>
               </div>
            </form>
          </Modal>
          <div className=" p-2 m-5 grid grid-cols-1  sm:grid-cols-2       md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
           {products}
          </div>
       </main>
    )
}
export default App