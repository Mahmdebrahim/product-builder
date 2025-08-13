
import { productList, formInputsList } from "./components/Data"
import type { IProduct } from "./components/Interfaces"
import ProductCard from "./components/ProductCard"
import Button from "./components/Ui/Button"
import Input from "./components/Ui/Input"
import Modal from "./components/Ui/Model"
import { useState, type ChangeEvent, type FormEvent } from "react"
import { porductValidation } from "./validation"
import ErrorMsg from "./components/ErrorMsg"
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
   const [product,setProduct] = useState<IProduct>(DefaultPtoductObj)
   const [errorMsg, setErrorMsg] = useState(
      {
         title: "",
         description: "",
         imageURL: "",
         price: "", 
      }
   )
   console.log("err:", errorMsg)
   //* ________HANDLER_________ *\\ 
   ///////////////////////////////////////////////////////
   const  open = () => setIsOpen(true);
   const close = () => setIsOpen(false);
   //////
   const changeHandler = (e:ChangeEvent<HTMLInputElement>) =>{
      const {value,name} = e.target;
      setProduct({
         ...product,
         [name]:value,
      })
      setErrorMsg(
         {
            ...errorMsg,
            [name]: ""
         }
      )
   }

   const onCancel = () => {
      console.log("cansle")
      setProduct(DefaultPtoductObj)
      close();
   }

   const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
     event.preventDefault();
     const errors = porductValidation({
        title: product.title,
        description: product.description,
        imageURL:product.imageURL,
        price:product.price
     });
     const errorMsg =  Object.values(errors).some(val => val !== "") 
     if(errorMsg){
      setErrorMsg(errors)
      return;
     }
     console.log(alert("done"));
   }
   //* ________RENDER_________ *\\
   ///////////////////////////////////////////////////////
   const products = productList.map(product => <ProductCard key={product.id}
   product={product}/>);
   const Inputs = formInputsList.map(input => 
      <div className="flex flex-col" key={input.id}>
         <label htmlFor={input.id} className="mb-1 text-sm font-medium  text-indigo-80">{input.label}</label>
         <Input 
            type={input.type} 
            name={input.name} 
            id={input.id} 
            value={product[input.name]} 
            onChange={changeHandler}
         />
         <ErrorMsg msg={errorMsg[input.name]}/>
      </div>
   ) 

   ///////////////////////////////////////////////////////////////////////////
   //! START POINT !\\
    return (
       <main className=" mx-auto">
          <Button className="bg-indigo-800" onClick={open}>build product</Button>
          <Modal close={close} isOpen={isOpen} title="ADD A NEW PRODUCT">
            <form className="flex flex-col gap-4 " onSubmit={submitHandler}>
               {Inputs}
               <div className="flex flex-co gap-4 items-center">
                     <Button className="bg-indigo-800" onClick={()=>{}}>Submit</Button>
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