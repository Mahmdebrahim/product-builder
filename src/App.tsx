import { productList } from "./components/Data"
import ProductCard from "./components/ProductCard"
import Button from "./components/Ui/Button"
import Modal from "./components/Ui/Model"
import { useState } from "react"
const App = () => {
   /* ________render_________ */
   const products = productList.map(ptoduct => <ProductCard key={ptoduct.id}
    product={ptoduct}/>);
   ///////////////////////////////////////////////////////
   /* ________Modal State_________ */   
   const [isOpen, setIsOpen] = useState(false);

   /* ________Modal Handeler_________ */ 
   function open() {
      setIsOpen(true)
   }
   
   function close() {
      setIsOpen(false)
   }
   ///////////////////////////////////////////////////////////////////////////
   //! START POINT
    return (
       <main className="container mx-auto">
          <Button className="bg-indigo-800" onClick={open}>build product</Button>
          <Modal close={close} isOpen={isOpen} title="ADD A NEW PRODUCT" >
           <div className="flex flex-co gap-2 items-center">
               <Button className="bg-indigo-800" onClick={()=>{}}>Submit</Button>
               <Button className="bg-gray-400 hover:bg-gray-500 "  onClick={close}>Cansle</Button>
           </div>
          </Modal>
          <div className=" p-2 m-5 grid grid-cols-1  sm:grid-cols-2       md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
           {products}
          </div>
       </main>
    )
}
export default App